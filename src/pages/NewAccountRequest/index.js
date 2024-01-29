import React, { useEffect, useState } from "react";
import {
  AcceptAccountReq,
  AllNewAccountReq,
  RejectAccountReq,
} from "../../helper/apiConfig";
import axios from "axios";
import "../RoleChange/roleChange.scss";
import "../Unblock/unblock.scss";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const NewAccountRequest = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const NewAccountHeading = "New Account Request";
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    handlerAccountRequest();
  }, []);

  const NoDataFound = () => {
    return <p className="text-center mb-0">No Data Available In Table!</p>;
  };

  const handlerAccountRequest = async () => {
    await axios
      .get(AllNewAccountReq, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccountList(res?.data?.request);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleAcceptAccount = async (id) => {
    await axios
      .delete(`${AcceptAccountReq}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
    handlerAccountRequest();
  };

  const handleRejectAccount = async (id) => {
    await axios
      .delete(`${RejectAccountReq}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
    handlerAccountRequest();
  };

  const columns = [
    {
      dataField: "_id",
      text: "Sr.no",
      formatter: (cell, row, rowIndex) => <>{rowIndex + 1}</>,
    },
    {
      dataField: "name",
      text: "Name",
      formatter: (cell, row) => (
        <div className="d-flex flex-column">
          <span>{row?.userId?.name}</span>
          <span>
            {new Date(`${row?.createdAt}`).toLocaleDateString()} &nbsp;
            {new Date(`${row?.createdAt}`).toLocaleTimeString("en-US")}
          </span>
        </div>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      formatter: (cell, row) => (
        <>
          <span>{row?.userId?.email}</span>
        </>
      ),
    },
    {
      dataField: "address",
      text: "Address",
      formatter: (cell, row) => (
        <>
          <span>{row?.userId?.address}</span>
        </>
      ),
    },
    {
      dataField: "",
      text: "Action",
      formatter: (cell, row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-md btn-success text-capitalize"
            onClick={() => handleAcceptAccount(row?.userId?._id)}
          >
            Accept
          </button>
          <button
            className="btn btn-md btn-danger text-capitalize"
            onClick={() => handleRejectAccount(row?.userId?._id)}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  const options = {
    sizePerPage: 15,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    totalSize: accountList?.length,
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-3 text-capitalize">{NewAccountHeading}</h2>
          {/* <div className="card main-list-card border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4"></div>
              <div className="row">
                {accountList?.length > 0 ? (
                  accountList?.map((accountListItem) => {
                    return (
                      <div
                        className="col-md-12"
                        key={accountListItem?._id}
                      >
                        <div className="block-list-wrapper mb-4">
                          <div className="d-flex justify-content-between mb-2">
                            <h5 className="mb-0 text-capitalize">
                              {accountListItem?.userId?.name || "demo"}
                            </h5>
                            <span>
                              {new Date(
                                `${accountListItem?.createdAt}`
                              ).toLocaleDateString()}{" "}
                              &nbsp;
                              {new Date(
                                `${accountListItem?.createdAt}`
                              ).toLocaleTimeString("en-US")}
                            </span>
                          </div>
                          <p className="type mb-3">
                            Email :{" "}
                            <span className="text-lowercase">
                              {accountListItem?.userId?.email ||
                                "lorem@gmail.com"}
                            </span>
                          </p>
                          <p className="type mb-3">
                            Phone Number :{" "}
                            <span>
                              {accountListItem?.userId?.phone || "123456789"}
                            </span>
                          </p>
                          <p className="type">
                            Address :{" "}
                            <span>
                              {accountListItem?.userId?.address}
                            </span>
                          </p>
                          <div className="d-flex justify-content-end gap-3">
                            <button
                              className="btn btn-md btn-success text-capitalize"
                              onClick={() =>
                                handleAcceptAccount(
                                  accountListItem?.userId?._id
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-md btn-danger text-capitalize"
                              onClick={() =>
                                handleRejectAccount(
                                  accountListItem?.userId?._id
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h3 className="text-center">No Data Available!</h3>
                )}
              </div>
            </div>
          </div> */}
          <BootstrapTable
            keyField="_id"
            data={accountList || []}
            columns={columns}
            pagination={paginationFactory(options)}
            striped
            hover
            condensed
            noDataIndication={NoDataFound}
            wrapperClasses="custom-table-wrapper table-responsive"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewAccountRequest;
