import React, { useEffect, useState } from "react";
import styles from "./studentDashboard.module.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { clientServer } from "../../services/api.js";
import MyCourses from "../../components/mycourses.jsx";
import MainLayout from "../../layout/mainlayout.jsx";

function StudentDashboard() {

  let [coursedata, setCoursedata] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }
}, []);

  return (
    <MainLayout>
        <div className="container">
            <div className={styles.toparea}>
              <Navbar></Navbar>
            </div>
            
            <div className={styles.bottom}>
            
              <div className={styles.image}>
                <div className={styles.text}>
                  <h1 style={{paddingLeft:"10px"}}>Learn smarter, grow faster</h1>
                  <h3>Turn your learning into real skills!</h3>
                </div>
                  <img src="https://www.pngkey.com/png/full/830-8302506_free-png-download-students-png-images-background-png.png" alt="" />
              </div>

            </div>
            
        </div> 
    </MainLayout>
  );
}

export default StudentDashboard;
