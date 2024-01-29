import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./resentActivity.scss";
import { RecentActivity } from "../../helper/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import paginationFactory from 'react-bootstrap-table2-paginator';

const ViewMoreActivity = () => {
  const [Useractivity, setUserActivity] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  const NoDataFound = () => {
    return <p className="text-center mb-0">No Data Available In Table!</p>;
  };

  useEffect(() => {
    handleActivity();
  }, []);

  let headingName = "All Recent Activity";

  const handleActivity = () => {
    axios
      .get(RecentActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserActivity(res.data.activity);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const columns = [
    {
      dataField: "_id",
      text: "Sr.no",
      formatter: (cell, row, rowIndex) => (
        <>
          <span className="text-center d-block">{rowIndex + 1}</span>
        </>
      ),
    },
    {
      dataField: "sender",
      text: "By",
      formatter: (cell, row) => (
        <>{row?.sender?.name || row?.user?.name || "Admin"}</>
      ),
    },
    {
      dataField: "receiver",
      text: "Whom",
      formatter: (cell, row) => <>{row?.receiver?.name}</>,
    },
    {
      dataField: "activity",
      text: "Activity",
      formatter: (cell, row) => (
        <>
          <div className="recent-wrapper">
            <p className="mb-0">{row?.activity}</p>
            <Link
              to={`/${
                row.activity.replace(/\s/g, "").toLowerCase() == "unblock"
                  ? "block"
                  : row.activity.replace(/\s/g, "").toLowerCase() ==
                    "Update Role"
                  ? "Update-Role"
                  : row.activity.replace(/\s/g, "").toLowerCase()
              }`}
            >
              view more
            </Link>
          </div>
        </>
      ),
    },
    {
      dataField: "message",
      text: "Message",
      formatter: (cell, row) => (
        <>
          <div>
            <p className="message-text">{row?.message}</p>
          </div>
        </>
      ),
    },
  ];

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPage: 20,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    totalSize: Useractivity?.length,
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
      <div className="col-md-12">
        <div className="mb-3">
          <button
            className="btn btn-md btn-primary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        <h2 className="mb-4">{headingName}</h2>
        <div className="Resend-Table ">
          <BootstrapTable
            keyField="_id"
            data={Useractivity || []}
            columns={columns}
            pagination={paginationFactory(options)}
            condensed
            bordered={false}
            noDataIndication={NoDataFound}
            wrapperClasses="custom-table-wrapper table-responsive"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewMoreActivity;
