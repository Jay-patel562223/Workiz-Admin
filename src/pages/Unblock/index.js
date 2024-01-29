import React, { useEffect, useState } from "react";
import { BlockList, UnblockUser } from "../../helper/apiConfig";
import axios from "axios";
import "./unblock.scss";
import { toast } from "react-toastify";
import ReportList from "./ReportList";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
const Unblock = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const blockHeading = "Block List";
  const reportHeading = "User Report List";
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    handlerBlock();
  }, []);

  const NoDataFound = () => {
    return <p className="text-center mb-0">No Data Available In Table!</p>;
  };
  // block listing

  const handlerBlock = async () => {
    await axios
      .get(BlockList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlockList(res?.data?.list);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // update

  const handleUnblock = async (blockListItem) => {
    const data = {
      sender: blockListItem?.sender?._id,
      to: blockListItem?.receiver?._id,
      user_type: blockListItem?.user_type,
    };

    await axios
      .patch(UnblockUser, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res?.data?.Message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    handlerBlock();
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
          <span>{row?.receiver?.name}</span> &nbsp;( <span>{row?.receiver_type}</span>
          )
        </>
      ),
    },
    {
      dataField: "Unblock",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <button
            className="btn btn-md btn-primary text-capitalize"
            onClick={() => handleUnblock(row)}
          >
            unblock
          </button>
        </>
      ),
    },
  ];

  const options = {
    sizePerPage: 15,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    totalSize: blockList?.length,
    paginationSize: 4,
    pageStartIndex: 1,
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
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-3 text-capitalize">{blockHeading}</h2>
          <BootstrapTable
            keyField="_id"
            data={blockList || []}
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
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-4 text-capitalize">{reportHeading}</h2>
          <ReportList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Unblock;
