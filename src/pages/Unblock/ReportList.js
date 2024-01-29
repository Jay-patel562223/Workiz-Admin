import React, { useEffect, useState } from "react";
import { Report } from "../../helper/apiConfig";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import "./unblock.scss";

const ReportList = () => {
  const [reportList, setReportList] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    handleReportData();
  }, []);
  // call api report listing

  const NoDataFound = () => {
    return <p className="text-center mb-0">No Data Available In Table!</p>;
  };

  const handleReportData = async () => {
    await axios
      .get(Report, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReportList(res?.data?.list);
      })
      .catch((error) => {
        console.log("error data", error);
      });
  };

  const showFullDescriptionHandler = (rowIndex) => {
    setReportList((prevList) =>
      prevList.map((item, index) =>
        index === rowIndex
          ? { ...item, showFullDescription: !item.showFullDescription }
          : item
      )
    );
  };

  const columns = [
    {
      dataField: "_id",
      text: "Sr.no",
      formatter: (cell, row, rowIndex) => <>{rowIndex + 1}</>,
    },
    {
      dataField: "sender",
      text: "By",
      formatter: (cell, row) => (
        <>
          <span>{row?.sender?.name}</span> &nbsp;(<span>{row?.user_type}</span>)
        </>
      ),
    },
    {
      dataField: "receiver",
      text: "Whom",
      formatter: (cell, row) => (
        <>
          <span>{row?.receiver?.name}</span> &nbsp;({" "}
          <span>{row?.receiver_type}</span>)
        </>
      ),
    },
    {
      dataField: "reason",
      text: "Reason",
    },
    {
      dataField: "description",
      text: "Description",
      formatter: (cell, row, rowIndex) => (
        <div className="d-flex gap-2">
          <div className="userdescription">
            {row.showFullDescription
              ? row?.description
              : row?.description.slice(0, 100)}
          <span onClick={() => showFullDescriptionHandler(rowIndex)} className="read-more-btn">
            Read {row.showFullDescription ? "Less" : "More"}
          </span>
          </div>
        </div>
      ),
    },
  ];

  const options = {
    sizePerPage: 15,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    totalSize: reportList?.length,
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
      <BootstrapTable
        keyField="_id"
        data={reportList || []}
        columns={columns}
        pagination={paginationFactory(options)}
        striped
        hover
        condensed
        noDataIndication={NoDataFound}
        wrapperClasses="custom-table-wrapper table-responsive"
      />
    </React.Fragment>
  );
};

export default ReportList;
