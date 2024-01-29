import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { VerifyOTPNumber } from "../helper/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import "./forgotPassword.scss";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleOTPChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleOPTClear = () => {
    setOtp("");
  };

  const handleVerifyOTP = async () => {
    const data = {
      userId: state?.userId,
      otp: otp,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(VerifyOTPNumber, data);
      toast.success(response.data.message);
      setUserId(response);
      setOtp("");
      navigate("/resetAdminPassword", { state: response.data.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="otp-card-wrapper">
              <div className="card otp-verification-card">
                <div className="card-body">
                  <div className="heading-text-wrapper">
                    <h2 className="mb-3">Verification Account </h2>
                    <p className="mb-4">
                      An OTP has been sent to your entered email{" "}
                      {state?.email || "demo123@gmail.com"}
                    </p>
                  </div>

                  <OtpInput
                    maxLength={6}
                    value={otp}
                    onChange={handleOTPChange}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} autoFocus />}
                    inputStyle="inputStyle"
                    isInputNum={false}
                  />
                  <div className="verify-btn-wrapper">
                    <button
                      onClick={handleOPTClear}
                      className="btn btn-md btn-secondary"
                    >
                      Clear
                    </button>
                    <button
                      className="btn btn-md btn-primary "
                      type="submit"
                      disabled={isLoading}
                      onClick={handleVerifyOTP}
                    >
                      {isLoading ? "Loading..." : "Verify"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyOTP;
