import Widget from "../../components/widgets/Widget";
import "./home.scss";
import List from "../../components/table/Table";
import React from "react";
import ResentActivity from "../../components/ResentActivity";
import GlobalSearch from "../../components/Search/GlobalSearch";
import AllDeletedAccounts from "../AllDeletedAccounts";


const Home = () => {
  let dashboardHeading = "Welcome to dashboard";
  return (
    <React.Fragment>
      <h1 className="text-capitalize mb-4">{dashboardHeading}</h1>
      {/* <GlobalSearch /> */}
      <Widget />
      <ResentActivity />
      <List />
      <AllDeletedAccounts />
    </React.Fragment>
  );
};

export default Home;
