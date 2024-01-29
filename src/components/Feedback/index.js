import React, { useEffect, useState } from 'react';
import "./feedback.scss";
import axios from 'axios';
import { ShowFeedback, token } from '../../helper/apiConfig';
import { toast } from 'react-toastify';
import feedbackImg from '../../assets/images/feedbackImg.png';


const Feedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    useEffect(() =>{
        handleFeedback()
    },[]);
   const handleFeedback = async () =>{
    await axios
    .get(ShowFeedback, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setFeedbackData(res.data.feedbacks);
    })
    .catch((error) => {
      toast.error(error);
      console.log(error);
    });
   }

  return (
    <React.Fragment>
            <div className='container-fluid'>
                <div className='col-12'>
                  <div className='feedback-heading'>
                  <img src={feedbackImg} alt='senderImg' className='img-fluid' />
                  <h1 className='mb-0'>Feedback </h1>
                  </div>
                </div>
                <div className='row'>
                  
                {feedbackData?.map((feedbackItem,index) =>{
                  return(
                    <div className='col-md-4' key={index}>
                        <div className='card feedback-card'>
                           <div className='card-body'>
                              <div className='feedback-data-wrapper'>
                            <div className='feedback-data'>
                              <h3 className='text-capitalize'> {feedbackItem?.sender?.name}</h3>
                            </div>
                            <div className='feedback-data'>
                              <h3 className='text-capitalize'>{feedbackItem?.receiver?.name || "demo"}</h3>
                            </div>
                              </div>
                              <div className='user-feedback'>
                              <h5 className='text-capitalize'>Feedback</h5>
                              <p className='mb-0'>
                              { feedbackItem?.feedback.toLowerCase()}
                                </p> 
                              </div>
                            <div className='feedback-comment'>
                              <h5 className='comment-text'>Comment</h5>
                              <span className='text-icon'>{feedbackItem?.comment}</span> 
                            </div>
                           </div>
                      </div>
                    </div>
                  )
                })

                }

                </div>
              

            </div>
    </React.Fragment>
  )
}

export default Feedback;