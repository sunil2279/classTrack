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

        setName(studentResponse.data.student.name);
        setCoursedata(response.data);
      } catch (error) {
        return error.message?.data?.message;
      }
    };
    fetchCourses();
  }, []);

  let rupeeconvert = (rupee) => {
    return rupee.toLocalString("en-IN", {
      style: "curency",
      currency: "INR",
    });
  };

  
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
            <h5>finanace</h5>
            <div className={styles.feesOverview}>

              <div className={styles.feescards}>
                <img src="/f1.png" alt="image" />
                <p>$10,0000</p>
                <p className={styles.ammountName}>total</p>
              </div>

              <div className={styles.feescards}>
                <img src="/f2.png" alt="image" />
                <p>$5,000</p>
                <p className={styles.ammountName}>pending</p>
              </div>
              <div className={styles.feescards}>
                <img src="/f3.png" alt="image" />
                <p>$300</p>
                <p className={styles.ammountName}>paid</p>
              </div>
            </div>

            <h5>Enrolled Courses</h5>
            <div className={styles.enrolledCourses}>
              {
                coursedata.map((data) => (
                  <div className={styles.courseCard} key={data._id}>
                    <p>{data.name}</p>
                    <p>{data.description}</p>
                    <p>{data.fees}</p>
                    <p>{data.duration}</p>
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


//  <div className={styles.container}>
//           <div className={styles.topcontainer}>
//             <div className={styles.box}>
//               <div className={styles.text}>
//                 <h1>Best Coaching For</h1>
//                 <h2>10,12 & Competitive Exams</h2>
//                 <h4>Get Succes with Expent Guidance</h4>
//               </div>
//               <div className={styles.studentimage}>
//                 <img src="/college_student.png" alt="img" />
//               </div>
//             </div>
//               <h2 style={{textAlign:"center"}}>Why Choose US</h2>
//             <div className={styles.about}>
//               {/* <hr /> */}
//               <div className={styles.image}>
//                 <img src="/undraw_lecture_hul3 (1).svg" alt="" />
//                 <p>gggg</p>
//               </div>
//               <div className={styles.image}>
//                 <img src="/documents.svg" alt="" />
//                 <p>gggg</p>
//               </div>
//               <div className={styles.image}>
//                 <img src="/rupee.jpeg" alt="" />
//                 <p>gggg</p>
//               </div>
//               <div className={styles.image}>
//                 <img src="/tp.jpeg" alt="" />
//                 <p>gggg</p>
//               </div>
//             </div>
//           </div>
//         </div>