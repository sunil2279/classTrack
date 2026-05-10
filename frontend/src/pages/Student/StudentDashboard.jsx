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
  let [name , setName] = useState("");
  let [studentInfo , setStudentInfo] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    let fetchCourses = async () => {
      try {
        let token = localStorage.getItem("token");
        let response = await clientServer.get("/student/course", {
          headers: {
            Authorization: token,
          },
        });

        let studentResponse = await clientServer.get("/student/profile",{
          headers:{
            Authorization:token
          }
        });

        console.log(studentResponse.data.student)
        setStudentInfo(studentResponse.data.student);
        setName(studentResponse.data.student.name);
        setCoursedata(response.data);
      } catch (error) {
        return error.message?.data?.message;
      }
    };
    fetchCourses();
  }, []);

  let rupeeconvert = (rupee) => {
  return Number(rupee || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

  const feeData = studentInfo?.fees?.[0] || {};
  const pendingAmount = feeData.totalAmount - feeData.paidAmount;
  return (
    <MainLayout>
      <div className={styles.maincontainer}>
    
        <div className={styles.container}>
          <div className={styles.topContainer}>
            <div className={styles.topsidebar}>

              <p >welcome {name}</p>
            </div>
            <img src="/studentsideimg.png" alt="" />
          </div>

          <div className={styles.midContainer}>
            <h3>finanace</h3>
            <div className={styles.feesOverview}>

              <div className={styles.feescards}>
                <img src="/f1.png" alt="image" />
                <p>{rupeeconvert(feeData.totalAmount || 0)}</p>
                <p className={styles.ammountName}>total</p>
              </div>

              <div className={styles.feescards}>
                <img src="/f2.png" alt="image" />
                <p>{rupeeconvert(feeData.paidAmount || 0)}</p>
                <p className={styles.ammountName}>paidAmount</p>
              </div>
              <div className={styles.feescards}>
                <img src="/f3.png" alt="image" />
                <p>{rupeeconvert(pendingAmount)}</p>
                <p className={styles.ammountName}>pending</p>
              </div>
            </div>

            <h3>Enrolled Courses</h3>
            <div className={styles.enrolledCourses}>
              {
                coursedata.map((data) => (
                  <div className={styles.courseCard} key={data._id}>
                    <p className={styles.courseHead}>{data.name}</p>
                    <p className={styles.courseInfo}>{rupeeconvert(data.fees)}</p>
                    <p className={styles.courseInfo}>{data.duration}</p>
                    <p className={styles.courseInfo}>{data.description}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
       
      </div>
    </MainLayout>
  );
}

export default StudentDashboard;

