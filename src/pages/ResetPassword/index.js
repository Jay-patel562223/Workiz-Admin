import React, { useState } from "react";
import frogotImg from "../../assets/images/forgotImg.svg";
import Logo from "../../assets/images/logo.png";
import axios from "axios";
import { updatePassword } from "../../helper/apiConfig";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import "./resetPassword.scss";
import { Formik, ErrorMessage } from "formik";
import { ValidationResetPassword } from "../../components/ValidationSchema";
// ValidationResetPassword

const ResetPassword = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!isOldPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!isNewPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // const toggle = () => {
  //   setVisible(!isVisible);
  // };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (password !== confirmPassword) {
      toast.error("New password and confirm password don't match");
      return;
    }
    const data = {
      oldpassword: oldpassword,
      password: password,
    };
    await axios
      .patch(updatePassword, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.error);
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card login-card">
            <div className="row  align-items-center">
              <div className="col-md-12 col-lg-6">
                <img
                  src={frogotImg}
                  className="img-fluid rounded-start login-img"
                  alt="login-img"
                />
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="formContainer">
                  <form onSubmit={handleSubmit} className="form mb-4">
                    <div className="brand">
                      <Link className="" to="/">
                          <img
                            src={Logo}
                            alt="logo"
                            className="img img-fluid mb-4"
                          />
                      </Link>
                    </div>
                    <p className="mb-4 text-capitalize">
                      please reset your password!.
                    </p>
                    <div className="input-icon-wrapper">
                      <input
                        type={isOldPasswordVisible ? "text" : "password"}
                        placeholder="Old Password"
                        name="old Password"
                        value={oldpassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="input"
                        required
                        autoComplete="off"
                      />
                      {/* <ShowHideEye /> */}
                      <span
                        className="show-hide-icon"
                        onClick={toggleOldPasswordVisibility}
                      >
                        {isOldPasswordVisible ? (
                          <AiOutlineEye className="show-data-icon" />
                        ) : (
                          <AiOutlineEyeInvisible className="hide-data-icon" />
                        )}
                      </span>
                    </div>
                    <div className="input-icon-wrapper">
                      <input
                        type={isNewPasswordVisible ? "text" : "password"}
                        placeholder="New Password"
                        name="new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                        autoComplete="off"
                      />
                      
                      <span
                        className="show-hide-icon"
                        onClick={toggleNewPasswordVisibility}
                      >
                        {isNewPasswordVisible ? (
                          <AiOutlineEye className="show-data-icon" />
                        ) : (
                          <AiOutlineEyeInvisible className="hide-data-icon" />
                        )}
                      </span>
                    </div>
                    <div className="input-icon-wrapper">
                      <input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="Confirm  password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                        required
                        autoComplete="off"
                      />
                      
                      <span
                        className="show-hide-icon"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {isConfirmPasswordVisible ? (
                          <AiOutlineEye className="show-data-icon" />
                        ) : (
                          <AiOutlineEyeInvisible className="hide-data-icon" />
                        )}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-md btn-primary mb-4"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
