import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import loginImg from "../assets/images/login.svg";
import { Formik, ErrorMessage } from "formik";
import { ValidationForgotEmail } from "../components/ValidationSchema";
import axios from "axios";
import { VerifyEmail } from "../helper/apiConfig";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./forgotPassword.scss";
import { Container } from "react-bootstrap";

const ForgotPassword = () => {
  const [emailVerfiy, SetEmailVerfiy] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSend = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(VerifyEmail, values);
      toast.success(response.data.message);
      SetEmailVerfiy(response.data.data);
      navigate("/verifyOPT", { state: response.data.data });
      resetForm();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="row center-reset-card">
          <div className="col-md-8 offset-md-1">
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
                    <Formik
                      onSubmit={(values, resetForm) => {
                        handleEmailSend(values, resetForm);
                      }}
                      initialValues={{
                        email: "",
                      }}
                      validationSchema={ValidationForgotEmail}
                    >
                      {({
                        errors,
                        touched,
                        isSubmitting,
                        handleSubmit,
                        values,
                        handleChange,
                      }) => (
                        <form onSubmit={handleSubmit} className="form mb-4">
                          <div className="brand">
                            <img
                              src={Logo}
                              alt="logo"
                              className="img img-fluid mb-4"
                            />
                          </div>
                          <p className="mb-4"> Forgot Your Password.</p>
                          <input
                            type="email"
                            placeholder="Enter your Email"
                            autoComplete="off"
                            name="email"
                            className="input mb-3"
                            onChange={handleChange}
                            defaultValue={values?.email}
                          />
                          <p className="text-danger mb-0">
                            <ErrorMessage name="email" />
                          </p>
                          <button
                            className="btn btn-md btn-primary"
                            disabled={isSubmitting}
                            type="submit"
                          >
                            {isLoading ? "Loading..." : "submit"}
                          </button>
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

export default ForgotPassword;
