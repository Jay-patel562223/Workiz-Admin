import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./resentActivity.scss";
import { RecentActivity } from "../../helper/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";

const ResentActivity = () => {
  const [Useractivity, setUserActivity] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/MoreActivity");
  };

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
      formatter: (cell, row, rowIndex) => <>
        <sapn className="text-center d-block">
        {rowIndex + 1}
        </sapn>
      </>,
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

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="d-flex justify-content-between mb-4">
          <h2 className="mb-0">{headingName}</h2>
          <button className="btn btn-md btn-primary" onClick={handleRoute}>
            View More Activity
          </button>
        </div>
        <div className="Resend-Table ">
          <BootstrapTable
            keyField="_id"
            data={Useractivity.slice(0, 10) || []}
            columns={columns}
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

export default ResentActivity;
