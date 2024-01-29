import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/images/logo.png";
import "./offSideBarProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineProfile } from "react-icons/ai";
import React, { useEffect } from "react";
import { imgUrl } from "../../Datatablesource";

const OffsideBarProfile = ({ show, setShow, logout, adminInfo }) => {
  const handleClose = () => setShow(false);
   const navigate = useNavigate();
  const handlerRoute = () => {
    navigate("/resetPassword");
    setShow(false)
  };
  

  return (
    <React.Fragment>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton className="mb-3">
          <Offcanvas.Title>
            <img src={logo} alt="logo" className="img-fluid offsidebar-logo" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="offcanvas-wrapper">
            <img
              src={`${imgUrl}/${adminInfo?.photo}`}
              alt="adminImg"
              className="img-fluid"
            />
            <h5>{adminInfo.name}</h5>
            <p>{adminInfo.email}</p>
            <div>
              <button className="btn btn-md btn-primary me-2" onClick={logout} >
                Logout
              </button>
              <button className="btn btn-md btn-primary" onClick={handlerRoute}>
                Reset password
              </button>
            </div>
          </div>
          <div className="inner-card-data" onClick={handleClose}>
            <Link className="redirect-data" to="/profile">
              <AiOutlineProfile className="profile-icon" />
              <span className="text-values">View Profile</span>
            </Link>
          </div>
          {/* <div  className='inner-card-data view-feedback-data'>
          <Link className='redirect-data' to="/feedback">
            <VscFeedback className="profile-icon" />
             <span className='text-values'>View Feedback</span>
            </Link>

          </div> */}
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default OffsideBarProfile;
