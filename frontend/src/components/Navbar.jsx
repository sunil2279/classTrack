import React from 'react'
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({children}) {
  let navigate = useNavigate();


  return (
    <div className="top">
       
      <div className="navOption">
        <h1>welcom user : KOMAL</h1>
        <div className="user" onClick={() => {
          navigate("/profile");
        }}><i class="fa-solid fa-user"></i> PROFILE</div>
      </div>

      {children}
    </div>
  )
}

export default Navbar
