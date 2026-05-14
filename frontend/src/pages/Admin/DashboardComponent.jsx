import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout.jsx';
import { useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import { clientServer } from '../../services/api.js';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend
);


export default function Dashboard() {

  let [student ,setStudent] = useState([]);
  let [dashboardData,setDashboardData] = useState({});
  let [statusData, setStatusData] = useState([]);
  let [adminName, setAdminName] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

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
    
    let dashboardStatus = await clientServer.get("/admin/dashboard",{
      headers:{
        Authorization:token
      }
    });

    let res = await clientServer.get("/admin/course-stats", {
      headers: {
        Authorization: token
      }
    });

    let admin = await clientServer.get("/admin/admin-detail",{
      headers:{
        Authorization:token
      }
    });


    setAdminName(admin.data)
    setStatusData(res.data);
    setDashboardData(dashboardStatus.data);
    setStudent(studentResponce.data);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong")
    }
   }
   fetchdata();
  },[]);

const labels = statusData.map(item => item.courseName);
const values = statusData.map(item => item.count);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Students",
        data: values,
        backgroundColor: ["#fb8e5e","#f97656","#2c69f9","#7745fb","#f72da1"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

   useEffect(() => {
    let token = localStorage.getItem("token");
    if(!token){
      navigate("/admin-login");
    }
  },[]);

  const recentStudents = [...student]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
  .slice(0, 5); 

   let rupeeconvert = (rupee) => {
    return Number(rupee || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };
  return (

     
     <MainLayout>
        <div className={styles.mainContainer}>
        {errorMessage && (
          <p className={styles.error}>
            {errorMessage}
          </p>
        )}
      <div className={styles.top}>
       
      <div className={styles.navOption}>
        <p className={styles.username}>Welcome: {adminName.name}</p>
      </div>
    </div>

          
          <div className={styles.contianer}>
            <div className={styles.topCards}>
              <div className={styles.card}>
                <h3><i className="fa-solid fa-user"></i> Total Student</h3>
              </div>

              <div className={styles.card}>
                <h3><i className="fa-solid fa-book"></i> Active Courses</h3>
                <p style={{fontSize:"1.2rem"}}>{dashboardData?.TotalCourse}</p>
              </div>

              <div className={styles.card}>
                <h3><i class="fa-solid fa-indian-rupee-sign"></i> Pending Fees</h3>
                <p style={{fontSize:"1.2rem"}}>{rupeeconvert(dashboardData?.pendingAmount)}</p>
              </div>

              <div className={styles.card}>
                <h3><i class="fa-solid fa-indian-rupee-sign"></i>Total Earnings</h3>  
                <p style={{fontSize:"1.2rem"}}>{rupeeconvert(dashboardData?.totalEarnings)}</p>
              </div>

            </div>

            <div className={styles.bottomCards}>
              <div className={styles.status}>
                <h3>Recent Student</h3>
                {
                  recentStudents.map((s, i) => (
                    <div key={i} className={styles.statusCard}>
                      <h4>{s.name}</h4>
                      <p>{s.email}</p>
                    </div>
                  ))
                }

              </div>
              <div className={styles.chart}>
                <h3>Course Enrollment</h3>
                <div className={styles.doughnut}>
                  <Doughnut data={data} options={options} />
                </div>
              </div>
            </div>

          </div>

        </div>
    </MainLayout>
  )
}
