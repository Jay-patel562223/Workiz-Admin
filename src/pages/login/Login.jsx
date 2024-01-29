import React, { useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../../assets/images/logo.png";
import loginImg from "../../assets/images/login.svg";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { loginRoute } from "../../helper/apiConfig";
import jwt_decode from "jwt-decode";
import { Container, Row } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [isAddPasswordVisible, setAddPasswordVisible] = useState(false);

  const toggleAddPasswordVisibility = () => {
    setAddPasswordVisible(!isAddPasswordVisible);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.clear();
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(loginRoute, {
        name,
        password,
      });

      localStorage.clear();
      localStorage.setItem("token", JSON.stringify(response.data?.user?.token));
      toast.success(response.data.message);

      navigate("/");
      setName("");
      setPassword("");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <div className="custom-login">
            <div className="card login-card">
              <div className="row  align-items-center">
                <div className="col-md-12 col-lg-6">
                  <div className="login-demo-img">
                    <img
                      src={loginImg}
                      className="img-fluid rounded-start login-img"
                      alt="login-img"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="formContainer">
                    <form
                      action=""
                      onSubmit={handleSubmit}
                      className="form mb-4"
                    >
                      <div className="brand">
                        <img
                          src={Logo}
                          alt="logo"
                          className="img img-fluid mb-4"
                        />
                      </div>
                      <p className="mb-4">
                        To Keep connected with us please login with your
                        personal info.
                      </p>
                      <input
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        min="3"
                        className="input mb-4"
                      />
                      <div className="show-hide-wrapper">
                        <input
                          type={isAddPasswordVisible ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input show-data-input"
                        />
                        <span
                          className="show-hide-icon"
                          onClick={toggleAddPasswordVisibility}
                        >
                          {isAddPasswordVisible ? (
                            <AiOutlineEye className="show-data-icon" />
                          ) : (
                            <AiOutlineEyeInvisible className="hide-data-icon" />
                          )}
                        </span>
                      </div>

                      <div className="forgot-wrapper">
                        <button
                          type="submit"
                          className="btn btn-md btn-primary mb-4"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "Sign In"}
                        </button>
                        <Link to="/forgotpassword" className="forgot-text">
                          Forgot password ?
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Login;
