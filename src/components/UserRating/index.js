import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import './rating.scss';

const UserRating = ({ userId }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
   
    return (
      <span key={index}>
        {userId?.avgrating >= index + 1 ? (
          <AiFillStar className="icon" />
        ) : userId?.avgrating >=  number ? (
          <FaStarHalfAlt className="half-icon"  />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });
  return (
    <>
     <div className="wrapper">
       <div className="icon-style">
        {ratingStar}
       </div>
     </div>
    </>
  );
};

export default UserRating;
