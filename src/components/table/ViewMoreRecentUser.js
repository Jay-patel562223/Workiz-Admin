import React from "react";
import "./table.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/Alluser";
import demoImg from "../../assets/images/placeholderImg.png";
import Search from "../Search";
import { imgUrl } from "../../Datatablesource";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";

const ViewMoreRecentUser = () => {
  let recentHeading = "Recent Users";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const users = useSelector((state) => state?.user?.users);

  const NoDataFound = () => {
    return <p className="text-center mb-0">No Data Available In Table!</p>;
  };

  const columns = [
    {
      dataField: "_id",
      text: "Sr.no",
      formatter: (cell, row, rowIndex) => (
        <>
          <sapn className="text-center d-block">{rowIndex + 1}</sapn>
        </>
      ),
    },
    {
      dataField: "name",
      text: "Name",
      formatter: (cell, row) => (
        <>
          {row?.photo == "" ? (
            <img src={demoImg} alt="demoImg" className="user-img" />
          ) : (
            <img
              src={`${imgUrl}/${row?.photo}`}
              alt="user-img"
              className="user-img"
            />
          )}
          {row?.name == "" ? (
            <span style={{ color: "green" }}>User not found</span>
          ) : (
            row?.name
          )}
        </>
      ),
    },
    {
      dataField: "phone",
      text: "Phone Number",
    },
    {
      dataField: "email",
      text: "Email",
    },

    {
      dataField: "address",
      text: "Address",
      formatter: (cell, row) => (
        <>
          <div className="useraddress">{row?.address}</div>
        </>
      ),
    },
    {
      dataField: "type",
      text: "Role Type",
      formatter: (cell, row) => (
        <>
          {row.role?.customer == true && row?.role?.vendor == true
            ? "both"
            : row.role?.customer == true
            ? "customer"
            : row.role?.vendor == true
            ? "vendor"
            : ""}
        </>
      ),
    },
  ];

  const options = {
    sizePerPage: 15,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    totalSize: users?.length,
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
      <div className="mb-3">
        <button className="btn btn-md btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="mb-0">{recentHeading}</h2>
        <Search />
      </div>
      <div className="recent-user-table">
        <BootstrapTable
          keyField="_id"
          data={users.reverse() || []}
          columns={columns}
          pagination={paginationFactory(options)}
          striped
          hover
          condensed
          noDataIndication={NoDataFound}
          wrapperClasses="custom-table-wrapper table-responsive"
        />
      </div>
    </React.Fragment>
  );
};

export default ViewMoreRecentUser;
