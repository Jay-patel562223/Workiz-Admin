import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("token"));
  
  const checkUserToken = () => {
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn,userToken]);



  return <React.Fragment> {isLoggedIn ? props.children : null}</React.Fragment>;
};

export default ProtectedRoute;
