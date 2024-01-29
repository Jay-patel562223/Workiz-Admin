import React, { useEffect, useState } from "react";
import "./AllDeletedAccounts.scss";
import BootstrapTable from "react-bootstrap-table-next";
import { AllDeletedAccount, DeletedUserAccount } from "../../helper/apiConfig";
import axios from "axios";
import demoImg from "../../assets/images/placeholderImg.png";
import { imgUrl } from "../../Datatablesource";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import paginationFactory from "react-bootstrap-table2-paginator";

const ViewAllDeletedData = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [deletedUser, setDeletedUser] = useState([]);
  const navigate = useNavigate();

  let AlldeleteHeading = "All Deleted User Accounts";

  useEffect(() => {
    handleAllDeletedList();
  }, []);

  const handleAllDeletedList = async () => {
    await axios
      .get(AllDeletedAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDeletedUser(res?.data?.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteAccount = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${DeletedUserAccount}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        handleAllDeletedList();
        Swal.fire("Deleted!", " ", "success");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const NoDataFound = () => {
    return <p className="text-center mb-0">No Data Available In Table!</p>;
  };



  const columns = [
    {
      dataField: "_id",
      text: "Sr.no",
      formatter: (cell, row, rowIndex) => <>
        <sapn className="text-center d-block">
        {rowIndex + 1}
        </sapn>
        
      </>,
    },
    {
      dataField: "name",
      text: "Name",
      formatter: (cell, row) => (
        <>
          {row?.photo == "" ? (
            <img src={demoImg} alt="demoImg" className="user-img img-fluid" />
          ) : (
            <img
              src={`${imgUrl}/${row?.photo}`}
              alt="user-img"
              className="user-img img-fluid"
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
      dataField: "reason",
      text: "Reason",
      formatter: (cell, row) => (
        <>
          {row?.reason?.customer === "" && row?.reason?.vendor === "" ? (
            <span>No reason specified</span>
          ) : (
            <>
              <div className="d-flex flex-column">
                {row?.reason?.customer !== "" && (
                  <span>Customer- {row?.reason.customer}</span>
                )}
                {row?.reason?.vendor !== "" && (
                  <span>Vendor- {row?.reason.vendor}</span>
                )}
              </div>
            </>
          )}
        </>
      ),
    },
    {
      dataField: "Delete",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <button
            className="btn btn-md btn-danger"
            onClick={() => handleDeleteAccount(row._id)}
          >
            Delete user
          </button>
        </>
      ),
    },
  ];

  const options = {
    sizePerPage: 15,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    paginationSize: 4,
    pageStartIndex: 1,
    totalSize: deletedUser?.length,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true, 
  };

  return (
    <React.Fragment>
      <button className="btn btn-md btn-primary mb-4" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="mb-0 text-capitalize">{AlldeleteHeading}</h2>
      </div>
      <div className="All-Delete-user">
        <BootstrapTable
          keyField="_id"
          data={deletedUser || []}
          columns={columns}
          striped
          hover
          condensed
          noDataIndication={NoDataFound}
          pagination={paginationFactory(options)}
          wrapperClasses="custom-table-wrapper table-responsive"
        />
      </div>
    </React.Fragment>
  );
};

export default ViewAllDeletedData;
