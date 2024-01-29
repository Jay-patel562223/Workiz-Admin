import React, { useState } from "react";
import { ValidationAdminResetPassword } from "../components/ValidationSchema";
import { Formik, ErrorMessage } from "formik";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import frogotImg from "../assets/images/forgotImg.svg";
import Logo from "../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../pages/ResetPassword/resetPassword.scss";
import axios from "axios";
import { ResetPasswords } from "../helper/apiConfig";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

const ResetAdminPassword = () => {
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleResetPassword = async (values, { resetForm }) => {
    setIsLoading(true);
    await axios
      .patch(`${ResetPasswords}/${state?.userId}`, values)
      .then((res) => {
        toast.success(res.data.message);

        navigate("/login");
        resetForm();
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        resetForm();
      });
  };

  return (
    <React.Fragment>
      <Container>
        <div className="row center-reset-card">
          <div className="col-md-8 offset-md-1">
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
                    <Formik
                      onSubmit={(values, resetForm) => {
                        handleResetPassword(values, resetForm);
                      }}
                      initialValues={{
                        password: "",
                      }}
                      validationSchema={ValidationAdminResetPassword}
                    >
                      {({
                        errors,
                        touched,
                        isSubmitting,
                        handleSubmit,
                        values,
                        handleChange,
                        handleBlur,
                      }) => (
                        <form onSubmit={handleSubmit} className="form mb-4">
                          <div className="brand">
                            <Link className="" to="#">
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
                              type={isNewPasswordVisible ? "text" : "password"}
                              placeholder="New Password"
                              name="password"
                              defaultValue={values?.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="off"
                              className={`input ${
                                errors?.password && touched?.password
                                  ? "is-invalid"
                                  : ""
                              }`}
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
                            <p className="text-danger mb-0">
                              <ErrorMessage name="password" />
                            </p>
                          </div>
                          <div className="input-icon-wrapper">
                            <input
                              type={
                                isConfirmPasswordVisible ? "text" : "password"
                              }
                              placeholder="Confirm Password"
                              name="confirmPassword"
                              defaultValue={values.confirmPassword}
                              onChange={handleChange}
                              className="input"
                              autoComplete="off"
                              onBlur={handleBlur}
                            />

                            <p className="text-danger mb-0">
                              <ErrorMessage name="confirmPassword" />
                            </p>
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
                          <div className="d-flex gap-2 justify-content-end">
                            {/* <button
                              className="btn btn-md btn-secondary"
                              onClick={() => navigate(-1)}
                            >
                              Back
                            </button> */}
                            <button
                              type="submit"
                              className="btn btn-md btn-primary"
                              disabled={isSubmitting}
                            >
                              {isLoading ? "Loading..." : "Change Password"}
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ResetAdminPassword;
