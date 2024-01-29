import "./table.scss";
import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/Alluser";
import demoImg from "../../assets/images/placeholderImg.png";
import { imgUrl } from "../../Datatablesource";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";

const List = () => {
  let recentHeading = "Recent Users";
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/MoreRecentUser");
  };

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
          <sapn className='d-block text-center'>{rowIndex + 1}</sapn>
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

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="mb-0">{recentHeading}</h2>
        <button className="btn btn-md btn-primary" onClick={handleRoute}>
          View More
        </button>
      </div>
      <div className="recent-user-table">
        <BootstrapTable
          keyField="_id"
          data={users.slice(0, 10) || []}
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

export default List;
