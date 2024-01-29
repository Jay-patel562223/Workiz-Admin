import React from "react";
import "./SingleUser.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GetFeedbackData,
  ShowFeedback,
  token,
  userView,
} from "../../helper/apiConfig";
import UserRating from "../../components/UserRating";
// import Map from "../../components/Map";
import demoImg from "../../assets/images/defaultImg.png";
import { toast } from "react-toastify";
import { imgUrl } from "../../Datatablesource";

const SingleUser = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);

  const handleCall = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(`${userView}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(response?.data?.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleCall();
    handleFeedback();
  }, []);

  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  const handleFeedback = async () => {
    await axios
      .get(`${GetFeedbackData}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFeedbackData(res?.data?.feedback);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <div>
            <button
              className="btn btn-md btn-primary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          <div className="card border-0">
            <div className="card-body">
              <div className="top-view-heading">
                {/* <img src={`${imgUrl}/${userId.photo}` } className="card-img-top" alt="userImg"  /> */}
                {userId.photo === "" ? (
                  <img src={demoImg} alt="demoImg" className="image" />
                ) : (
                  <img
                    src={`${imgUrl}/${userId?.photo}`}
                    alt="user-img"
                    className="image"
                  />
                )}
                <h3>{userId.name}</h3>
                <span
                  style={{
                    backgroundColor:
                      userId.isactive == "Active" ? "green" : "red",
                  }}
                  className="active-sign"
                ></span>
                <div className="rating">
                  {userId.role?.vendor && <UserRating userId={userId} />}
                  {/* <UserRating userId={userId} /> */}
                </div>
              </div>
              <form className="row g-3 mt-3" onSubmit={handlerSubmit}>
                <div className="col-md-6">
                  <label htmlFor="userEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    disabled
                    value={userId.email}
                    id="userEmail"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="pNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    id="pNumber"
                    value={userId.phone}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputState" className="form-label">
                    Role Type
                  </label>
                  <select id="inputState" className="form-select" disabled>
                    {userId.role?.customer == true &&
                    userId.role?.vendor == true ? (
                      <option>both</option>
                    ) : userId.role?.customer == true ? (
                      <option>customer</option>
                    ) : userId.role?.vendor == true ? (
                      <option>vendor</option>
                    ) : (
                      ""
                    )}
                  </select>
                </div>
                {userId.role?.customer == true &&
                userId.role?.vendor == true ? (
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      id="ucategory"
                      value={userId?.category?.category}
                    />
                  </div>
                ) : (
                  ""
                )}
                {userId.role?.customer == false &&
                userId.role?.vendor == true ? (
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      id="ucategory"
                      value={userId?.category?.category}
                    />
                  </div>
                ) : (
                  ""
                )}

                {/* {userId.role?.customer == true &&
                userId.role?.vendor == true ? (
                  <div className="col-md-6">
                    <label htmlFor="baddress" className="form-label">
                      Bussiness Address
                    </label>
                    <textarea
                      className="form-control"
                      id="baddress"
                      value={userId?.bussinessAddress}
                      rows="3"
                      disabled
                    ></textarea>
                  </div>
                ) : (
                  ""
                )} */}
                {/* {userId.role?.customer == false &&
                userId.role?.vendor == true ? (
                  <div className="col-md-6">
                    <label htmlFor="baddress" className="form-label">
                      Bussiness Address
                    </label>
                    <textarea
                      className="form-control"
                      id="baddress"
                      value={userId?.bussinessAddress}
                      rows="3"
                      disabled
                    ></textarea>
                  </div>
                ) : (
                  ""
                )} */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      value={userId.address}
                      rows="3"
                      disabled
                    ></textarea>
                  </div>
                </div>
                {userId.role?.customer == true &&
                userId.role?.vendor == true ? (
                  <div className="col-md-12">
                    <label htmlFor="card" className="form-label">
                      Bussiness Card
                    </label>
                    <div className="bussiness-card">
                      {/* {userId?.card.map((bcrad,index) =>{
                      return(
                        <img src={`${imgUrl}/${bcrad}`} alt="CardImg1" className="img-fluid" key={index} />
                      )
                    })
                    }
                    {

                    } */}
                      {userId?.card?.length === 0 ? (
                        <>
                          <img
                            src={demoImg}
                            alt="front side."
                            className="img-fluid"
                          />
                          <img
                            src={demoImg}
                            alt="back side."
                            className="img-fluid"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={`${imgUrl}/${userId?.card[0]}`}
                            alt="front side."
                            className="img-fluid"
                          />
                          <img
                            src={`${imgUrl}/${userId?.card[1]}`}
                            alt="back side."
                            className="img-fluid"
                          />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {userId.role?.customer == false &&
                userId.role?.vendor == true ? (
                  <div className="col-md-12">
                    <label htmlFor="card" className="form-label">
                      Bussiness Card
                    </label>
                    <div className="bussiness-card">
                      {/* {userId?.card.map((bcrad, index) => {
                        console.log("bcrad",bcrad);
                        return (
                          <img
                            src={`${imgUrl}/${bcrad}`}
                            alt="CardImg1"
                            className="img-fluid"
                            key={index}
                          />
                        );
                      })} */}
                      {userId?.card?.length === 0 ? (
                        <>
                          <img
                            src={demoImg}
                            alt="front side."
                            className="img-fluid"
                          />
                          <img
                            src={demoImg}
                            alt="back side."
                            className="img-fluid"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={`${imgUrl}/${userId?.card[0]}`}
                            alt="front side."
                            className="img-fluid"
                          />
                          <img
                            src={`${imgUrl}/${userId?.card[1]}`}
                            alt="back side."
                            className="img-fluid"
                          />
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Location</label>
                  <CustomMap userId={userId} />
                <textarea className="form-control" id="exampleFormControlTextarea1" value={userId.address} rows="3"></textarea>
              </div>
              </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {feedbackData?.map((feedbackItem, index) => {
          return (
            <div className="col-md-4" key={index}>
              <div className="card feedback-card">
                <div className="card-body">
                  <div className="feedback-data-wrapper">
                    <div className="feedback-data">
                      <h3 className="text-capitalize">
                        {feedbackItem?.sender?.name}
                      </h3>
                    </div>
                  </div>
                  <div className="user-feedback">
                    <h5 className="text-capitalize">Feedback</h5>
                    <p className="mb-0">
                      {feedbackItem?.feedback.toLowerCase()}
                    </p>
                  </div>
                  <div className="feedback-comment">
                    <h5 className="comment-text">Comment</h5>
                    <span className="text-icon">{feedbackItem?.comment}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default SingleUser;
