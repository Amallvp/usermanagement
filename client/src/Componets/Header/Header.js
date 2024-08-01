import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate=useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className="header w-100 p-5 d-flex">
      <div className="headerComponents d-flex align-items-center justify-content-between w-100">
        <h3 className="fs-2 text-white ps-5 f-5">UMS !</h3>
        <h3 className="fs-4 text-white pe-5" onClick={handleLogout}>logout</h3>
      </div>
    </div>
  );
}

export default Header;
