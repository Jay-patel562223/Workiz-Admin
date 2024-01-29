import React from 'react';
import ErrorImg from "../assets/images/error.png";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
   
  const handlerRoute = () =>{
     navigate('/');
  }

  return (
    <div className='container'>
      <div className='error'>
       <img className='img-fluid' src={ErrorImg} alt="error-img"  />
       <button className='btn btn-md btn-primary' onClick={handlerRoute}>Back to home</button>
      </div>
    </div>
  )
}

export default NotFoundPage;