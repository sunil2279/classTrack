import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout.jsx';
import { useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import { clientServer } from '../../services/api.js';


export default function Dashboard() {

  let [student ,setStudent] = useState([]);
  let [courses,setCourses] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
   let fetchdata = async() => {
    try {
      let token = localStorage.getItem("token");

    let studentResponce = await clientServer.get("/admin/students",{
      headers:{
        Authorization:token
      }
    })
    let courseResponce = await clientServer.get("/admin/courses",{
      headers:{
        Authorization:token
      }
    })
    
    setStudent(studentResponce.data);
    setCourses(courseResponce.data);
    } catch (error) {
      console.log(error)
    }
   }
   fetchdata();
  },[]);


   useEffect(() => {
    let token = localStorage.getItem("token");
    if(!token){
      navigate("/admin-login");
    }
  },[]);

  const recentStudents = [...student]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
  .slice(0, 5); 


  return (

     
     <MainLayout>
        <div className={styles.mainContainer}>
      <div className={styles.top}>
       
      <div className={styles.navOption}>
        <h1>welcom user : Harry</h1>
        <div className={styles.user} onClick={() => {
          navigate("/profile");
        }}><i class="fa-solid fa-user"></i> PROFILE</div>
      </div>
    </div>

          
          <div className={styles.contianer}>
            <div className={styles.topCards}>
              <div className={styles.card}>
                <h3>Total Student</h3>
                <p>{student.length}</p>
              </div>

              <div className={styles.card}>
                <h3>Active Courses</h3>
                <p>{courses.length}</p>
              </div>

              <div className={styles.card}>
                <h3>Pending Fees</h3>
                <p>₹2,23,2000</p>
              </div>

              <div className={styles.card}>
                <h3>Total Earnings</h3>
                <p>₹</p>
              </div>

            </div>

            <div className={styles.bottomCards}>
              <div className={styles.status}>
                <h3>Recent Student</h3>
                {
                  recentStudents.map((s, i) => (
                    <div key={i}>
                      <h4>{s.name}</h4>
                      <p>{s.email}</p>
                    </div>
                  ))
                }

              </div>
              <div className={styles.chart}>
                chart
              </div>
            </div>

          </div>

        </div>
    </MainLayout>
  )
}
