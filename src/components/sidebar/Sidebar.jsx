import "./sidebar.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { sidebarMenu } from "../../Datatablesource";
import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { MdOutlinePrivacyTip } from "react-icons/md";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import customerIcon from "../../assets/images/Customer.png";
import vendorIcon from "../../assets/images/Vendor.png";

const Sidebar = ({ setmobileToggle, mobileToggle }) => {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  const handleToggleRemove = () => {
    setmobileToggle(true);
  };

  return (
    <React.Fragment>
      <div className={`sidebar ${mobileToggle ? "toogle-sidebar" : ""}`}>
        <div className="sidebar-top-logo">
          <Link to="/" className="admin-logo">
            <img src={Logo} alt="logo" className="img-fluid" />
          </Link>
          <span className="close-toggle" onClick={handleToggleRemove}>
            <AiOutlineClose className="" />
          </span>
        </div>

        <div className="sidebar-bottom-menu">
          <div className="center">
            {/* <nav className="navbar"> */}
            <ul className="navbar-nav">
              {sidebarMenu?.map((items, index) => {
                const { link, icon, title } = items;
                return (
                  <li
                    key={index}
                    className="main-menu"
                    onClick={handleToggleRemove}
                  >
                    <NavLink to={link}>
                      {icon}
                      <span>{title}</span>
                    </NavLink>
                  </li>
                );
              })}
              <li className="main-menu sub-menu-wrapper">
                <Link
                  onClick={() => setOpens(!opens)}
                  aria-controls="example-collapse-text"
                  aria-expanded={opens}
                  type="button"
                  className="inner-menu-list"
                >
                  <AiOutlineCheckCircle className="icon" />
                  <span>Terms & Condition</span>

                  <AiOutlinePlus className="plus-icon right-arrow" />
                  <AiOutlineMinus className="minus-icon right-arrow" />
                </Link>
                <Collapse in={opens}>
                  <div id="example-collapse-text" className="sub-menu-lists">
                    <ul className="sub-menu-ul pl-25">
                      <li onClick={handleToggleRemove}>
                        <NavLink to="/customerTC">
                          <img src={customerIcon} alt="customerIcon" className='icon' style={{width:"22px", height:"auto"}} />
                          <span>customer T&C</span>
                        </NavLink>
                      </li>
                      <li onClick={handleToggleRemove}>
                        <NavLink to="/venderTC">
                        <img src={vendorIcon} alt="customerIcon" className='icon' style={{width:"22px", height:"auto"}} />
                          <span>vendor T&C</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </li>

              <li className="main-menu sub-menu-wrapper">
                <Link
                  onClick={() => setOpen(!open)}
                  aria-controls="sub-collapse-menu"
                  aria-expanded={open}
                  type="button"
                  className="inner-menu-list"
                >
                  <MdOutlinePrivacyTip className="icon" />
                  <span>Privacy Policy</span>

                  <AiOutlinePlus className="plus-icon right-arrow" />
                  <AiOutlineMinus className="minus-icon right-arrow" />
                </Link>
                <Collapse in={open}>
                  <div id="sub-collapse-menu" className="sub-menu-list">
                    <ul className="sub-menu-ul">
                      <li onClick={handleToggleRemove}>
                        <NavLink to="/customerPolicy">
                        <img src={customerIcon} alt="customerIcon" className='icon' style={{width:"22px", height:"auto"}} />
                          <span>customer Policy</span>
                        </NavLink>
                      </li>
                      <li onClick={handleToggleRemove}>
                        <NavLink to="/vendorPolicy">
                        <img src={vendorIcon} alt="customerIcon" className='icon' style={{width:"22px", height:"auto"}} />
                          <span>vendor Policy</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </li>
              <li className="main-menu" onClick={handleToggleRemove}>
                <NavLink to="/appinfo">
                  <BsInfoCircle className="icon" />
                  <span>App info</span>
                </NavLink>
              </li>
            </ul>

            {/* </nav> */}
          </div>
        </div>
      </div>
      <div
        className={`overlay-sidebar ${mobileToggle ? "toogle-sidebar" : ""}`}
        onClick={handleToggleRemove}
      ></div>
    </React.Fragment>
  );
};

export default Sidebar;
