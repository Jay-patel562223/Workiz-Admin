import React, { useEffect } from "react";
import List from "../list/List";
import { useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/Alluser";
import { useDispatch } from "react-redux";

const Customer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const users = useSelector((state) => state?.user?.users);

  return (
    <React.Fragment>
      <List />
    </React.Fragment>
  );
};

export default Customer;
