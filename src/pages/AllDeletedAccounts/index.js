import React, { useEffect, useState } from "react";
import "./AllDeletedAccounts.scss";
import BootstrapTable from "react-bootstrap-table-next";
import { AllDeletedAccount, DeletedUserAccount } from "../../helper/apiConfig";
import axios from "axios";
import demoImg from "../../assets/images/placeholderImg.png";
import { imgUrl } from "../../Datatablesource";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AllDeletedAccounts = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [deletedUser, setDeletedUser] = useState([]);
  const navigate = useNavigate();

  let AlldeleteHeading = "All Deleted User Accounts";

  const handleRoute = () => {
    navigate("/AllDeletedUser");
  };

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

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="mb-0 text-capitalize">{AlldeleteHeading}</h2>
        <button className="btn btn-md btn-primary" onClick={handleRoute}>
          View More
        </button>
      </div>
      <div className="All-Delete-user">
        <BootstrapTable
          keyField="_id"
          data={deletedUser.slice(0, 10)}
          columns={columns}
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

export default AllDeletedAccounts;
