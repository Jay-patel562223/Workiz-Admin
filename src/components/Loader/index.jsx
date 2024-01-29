import React from 'react';
import loading from "../../assets/images/loading.gif";
import "./loader.scss";

const Loader = () => {
  return (
    <React.Fragment>
    <div className='loader'>
        <img src={loading} alt='loader' className='img-fluid loadingGif' />     
   </div>
    </React.Fragment>
  )
}

export default Loader;