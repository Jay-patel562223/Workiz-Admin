import "./header.scss";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import adminImg from "../../assets/images/admin.jpg";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import OffsideBarProfile from "../OffsideBarProfile";
import Notification from "../Notification";
import { GiHamburgerMenu } from "react-icons/gi";
import ActiveBreadcrumb from "../ActiveBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/actions/profile";
import { imgUrl } from "../../Datatablesource";

const Header = ({ setmobileToggle, mobileToggle }) => {
  const navigate = useNavigate();
  // let dashboardHeading = "Welcome to dashboard";
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const adminInfo = useSelector((state) => state?.admin?.admin);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleToggleSidebar = () => {
    setmobileToggle();
  };

  return (
    <React.Fragment>
      <header className="custom-header">
        <Navbar bg="white" expand="lg">
          <Container fluid className="responsive-direction">
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className="" /> */}
           
            {/* <h1 className="text-capitalize mb-0">{dashboardHeading}</h1> */}
            <Navbar id="basic-navbar-nav">
            <div className="toggle-Breadcrumb-wrapper">
            <div className="toggle">
              <span className="hamburger-toggle" onClick={handleToggleSidebar}>
                <GiHamburgerMenu />
              </span>
            </div>
            <ActiveBreadcrumb />

            </div>
              <Nav className="ms-auto custom-nav-wrapper">
                <Notification />
                <img
                  className="admin-img"
                  src={`${imgUrl}/${adminInfo?.photo}`}
                  alt="admin pic"
                  onClick={handleShow}
                />
                <OffsideBarProfile
                  show={show}
                  setShow={setShow}
                  logout={logout}
                  adminInfo={adminInfo}
                />
              </Nav>
            </Navbar>
          </Container>
        </Navbar>
      </header>
    </React.Fragment>
  );
};

export default Header;
