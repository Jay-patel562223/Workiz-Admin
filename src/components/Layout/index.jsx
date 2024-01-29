import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Sidebar from '../sidebar/Sidebar'
import './layout.scss';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
const Layout = () => {

  const [mobileToggle, setmobileToggle] = useState("mobile-sidebar");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const checkUserToken = () => {
    const userToken = JSON.parse(localStorage.getItem("token"));
      if (!userToken || userToken === 'undefined') {
          setIsLoggedIn(false);
      }
      setIsLoggedIn(true);
  }
  useEffect(() => {
      checkUserToken();
  }, [isLoggedIn]);


  return (
    <>
    <div className='wrapper sidebar-mobile-toggle'>
        {isLoggedIn &&  <Sidebar  setmobileToggle={ setmobileToggle}  mobileToggle={mobileToggle} />}
        {isLoggedIn && <Header setmobileToggle={ setmobileToggle} mobileToggle={mobileToggle} />}
       <div className='pages-content'>
        <div className='container-fluid'>
        <Outlet/>
        </div>
       </div>
        {isLoggedIn && <Footer />}
    </div>
    </>
  )
}

export default Layout;