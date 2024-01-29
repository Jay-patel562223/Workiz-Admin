import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, useLocation } from "react-router-dom";
import "./activeBreadcrumb.scss";
const ActiveBreadcrumb = () => {
  const location = useLocation();
  const { state } = useLocation();

  const getPathnameParts = () => {
    const pathnames = location.pathname
      .split("/")
      .filter((path) => path !== "");
    return pathnames.map((path, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;

      const stateName = isLast ? state?.name : "";

      return (
        <Breadcrumb.Item
          key={routeTo}
          linkAs={Link}
          linkProps={{ to: { pathname: routeTo, state: { name: stateName } } }}
          active={!isLast}
          className="d-flex text-capitalize"
        >
          {pathnames[0]}
          {stateName && ` - ${stateName}`}
        </Breadcrumb.Item>
      );
    });
  };

  return (
    <React.Fragment>
      <Breadcrumb className="custom-breadCrumb">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Dashboard
        </Breadcrumb.Item>
        {getPathnameParts()}
      </Breadcrumb>
    </React.Fragment>
  );
};

export default ActiveBreadcrumb;
