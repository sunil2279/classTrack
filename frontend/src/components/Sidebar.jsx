import React, { Children, useEffect } from "react";
import "../styles/sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function Sidebar({ children }) {
  

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const handleLogout = () => {
  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  localStorage.clear();

  if (role === "admin") {
    navigate("/admin-login");
  } else {
    navigate("/"); // student login
  }
};

  return (
    <div className="container">
      <div className="sidebar">
        <div>
          <h1>
            <i className="fa-solid fa-graduation-cap"></i> ClassTrack
          </h1>
        </div>

        {role === "student" ? (
          <div>
            <div
              className={`sidebar-item ${location.pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <i className="fa-solid fa-house"></i> Dashboard
            </div>

            {/* <div
              className={`sidebar-item ${location.pathname === "/feesStatus" ? "active" : ""}`}
              onClick={() => {
                navigate("/feesStatus");
              }}
            >
              <span className="rupee">₹</span> Fees
            </div> */}
            {/* <div
              className={`sidebar-item ${location.pathname === "/profile" ? "active" : ""}`}
              onClick={() => {
                navigate("/profile");
              }}
            >
              {" "}
              <i className="fa-solid fa-user"></i>Profile
            </div> */}


            {/* <div
              className={`sidebar-item ${location.pathname === "/mycourses" ? "active" : ""}`}
              onClick={() => {
                navigate("/mycourses");
              }}
            >
              {" "}
              <i className="fa-solid fa-book"></i> My Course
            </div> */}


          </div>
        ) 
        : 
        (
          <div>
            <div
              className={`sidebar-item ${location.pathname === "/admin-dashboard" ? "active" : ""}`}
              onClick={() => {
                navigate("/admin-dashboard");
              }}
            >
              <i className="fa-solid fa-house"></i>Dashboard
            </div>

            <div
              className={`sidebar-item ${location.pathname === "/admin-students" ? "active" : ""}`}
              onClick={() => {
                navigate("/admin-students");
              }}
            >
              {" "}
              <i className="fa-solid fa-user"></i>Students
            </div>

            <div
              className={`sidebar-item ${location.pathname === "/admin-courses" ? "active" : ""}`}
              onClick={() => {
                navigate("/admin-courses");
              }}
            >
              {" "}
              <i className="fa-solid fa-book"></i>Courses
            </div>
          </div>
        )}

        <hr style={{ opacity: 0.3 }} />
        <div
          className="sidebar-item"
          onClick={handleLogout}
          //   () => {
          //   localStorage.clear();
          //   navigate("/");
          // }
        // }
        >
          <i className="fa-solid fa-power-off"></i> LogOut
        </div>
      </div>
    </div>
  );
}
