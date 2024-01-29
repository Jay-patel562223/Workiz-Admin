import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { useLocation, useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { AiOutlineEye } from "react-icons/ai";
import demoImg from "../../assets/images/placeholderImg.png";
import { imgUrl } from "../../Datatablesource";
import { useSelector } from "react-redux";

const Datatable = () => {
  const [forList, setForList] = useState([]);
  console.log("forList", forList);

  const users = useSelector((state) => state?.user?.users);
  const navigate = useNavigate();
  const location = useLocation();

  const customerData = users?.filter((d) => {
    return d?.role?.customer == true && d?.role?.vendor == false
      ? d?.role?.customer == true
      : "";
  });

  const venderData = users?.filter((venderItem) => {
    return venderItem?.role?.customer == false &&
      venderItem?.role?.vendor == true
      ? venderItem?.role?.vendor == true
      : "";
  });

  const bothData = users?.filter((bothItem) => {
    return bothItem?.role?.customer == true && bothItem?.role?.vendor == true;
  });

  const NoDataFound = () => {
    return <p className="text-center mb-0">No Data Available In Table!</p>;
  };

  useEffect(() => {
    if (location.pathname == "/customer") {
      setForList(customerData);
    } else if (location.pathname == "/vendor") {
      setForList(venderData);
    } else {
      setForList(bothData);
    }
  }, [users]);

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
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "phone",
      text: "Phone Number",
    },
    {
      dataField: "category",
      text: "Category",
      formatter: (cell, row) => (
        <>{row?.category?.category}</>
      ),
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
    // {
    //   dataField: "type",
    //   text: "Role Type",
    //   formatter: (cell, row) => (
    //     <>
    //       {row.role?.customer == true && row?.role?.vendor == true
    //         ? "both"
    //         : row.role?.customer == true
    //         ? "customer"
    //         : row.role?.vendor == true
    //         ? "vendor"
    //         : ""}
    //     </>
    //   ),
    // },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => (
        <>
          <button
            style={{ background: "#0c3469" }}
            className="common-tbale-btn viewButton"
            onClick={() => navigate(row?._id, { state: row })}
          >
            <AiOutlineEye />
          </button>
        </>
      ),
    },
  ];

  const options = {
    sizePerPage: 15,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    totalSize: forList?.length,
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
    <BootstrapTable
      keyField="_id"
      data={forList.reverse() || []}
      columns={columns}
      pagination={paginationFactory(options)}
      striped
      hover
      condensed
      noDataIndication={NoDataFound}
      wrapperClasses="custom-table-wrapper table-responsive"
    />
  );
};

export default Datatable;
