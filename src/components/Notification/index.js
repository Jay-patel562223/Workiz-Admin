import React, { useEffect, useState } from "react";
import { NotificationList } from "../../helper/apiConfig";
import axios from "axios";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoMdNotificationsOutline } from "react-icons/io";
import { imgUrl } from "../../Datatablesource";
import demoImg from "../../assets/images/placeholderImg.png";
import "./notification.scss";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Notification = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [notificationList, setNotificationList] = useState([]);
  

  const navigate = useNavigate("");

  const handelRedirect = () => {
    navigate("/notification");
  };

  useEffect(() => {
    notificationHandler();
  }, []);

  const notificationHandler = async () => {
    await axios
      .get(NotificationList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNotificationList(res.data.notification);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <NavDropdown
        id="basic-nav-dropdown"
        className="notification-dropdown"
        title={
          <span className="notification-icon">
            <IoMdNotificationsOutline />
          </span>
        }
      >
        {notificationList.length > 0 ? (
          notificationList.slice(0, 3).map((notificationItem) => {
            return (
              <React.Fragment key={notificationItem?._id}>
                <NavDropdown.Item to="#" className="abs">
                  <div className="notification-wrapper-Imagetext">
                    {notificationItem?.image === "" ? (
                      <img src={demoImg} alt="demoImg" className="image" />
                    ) : (
                      <img
                        src={notificationItem?.image}
                        alt="user-img"
                        className="image"
                      />
                    )}
                    <h5>{notificationItem?.body}</h5>
                  </div>
                  <div>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip">
                          {notificationItem?.title}.
                        </Tooltip>
                      }
                    >
                      <p className="mb-0 notification-title">
                        {notificationItem?.title}
                      </p>
                    </OverlayTrigger>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </React.Fragment>
            );
          })
        ) : (
          <NavDropdown.Item to="#" className="text-center">
            No Data Available!
          </NavDropdown.Item>
        )}

        <NavDropdown.Item
          to="/notification"
          className="view-more-n"
          onClick={handelRedirect}
        >
          view more notification
        </NavDropdown.Item>
      </NavDropdown>
    </React.Fragment>
  );
};

export default Notification;
