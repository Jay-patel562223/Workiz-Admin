import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./widget.scss";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { BlockList, totalcountRoute } from "../../helper/apiConfig";
import { BsPersonLock } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Widget = () => {
  const [amount, setAmount] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  // call list api

  const getApiData = async () => {
    try {
      const res = await axios.get(totalcountRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAmount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const adminData = [
    {
      id: 0,
      icon: <SupervisedUserCircleOutlinedIcon />,
      title: "users",
      link: "/MoreRecentUser",
      amount: amount?.User,
    },
    {
      id: 1,
      icon: <MdReportProblem />,
      title: "total report",
      link: "/block",
      amount: amount?.totalReport,
    },
    {
      id: 2,
      icon: <AiOutlinePlusCircle />,
      title: "Add roles request",
      link: "/role",
      amount: amount?.totalRequest,
    },
    {
      id: 3,
      icon: <BsPersonLock />,
      title: "Total Block",
      link: "/block",
      amount: amount?.totalBlock,
    },
  ];

  return (
    <React.Fragment>
      <Row>
        {adminData.map((item, index) => {
          const { title, amount, link,icon } = item;
          return (
            <Col md={4} lg={3} sm={6} key={index}>
              <Card className="custom-card">
                <Card.Body>
                  <div className="card-details">
                    {icon}
                    <div className="card-at">
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>{amount}</Card.Text>
                    </div>
                  </div>
                  <Link variant="primary" to={link}>
                    view details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default Widget;
