import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { clientServer } from "../services/api.js";
import MyCourses from "./mycourses.jsx";
import MainLayout from "../layout/mainlayout.jsx";
import styles from "./myCourses.module.css";
import Navbar from "./Navbar.jsx";


export default function MyCoursePage() {
  let [coursedata, setCoursedata] = useState([]);

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
        console.log(response.data)
        setCoursedata(response.data);
      } catch (error) {
        return error.message?.data?.message;
      }
    };
    fetchCourses();
  }, []);

  return (
    <MainLayout>
      <div className={styles.homeContainer}>
      <Navbar></Navbar>
        <div className={styles.container}>
          My courses
          {coursedata.map((data) => {
            return (<MyCourses key={data._id} data={data} />);
          })}
        </div>
      </div>
    </MainLayout>
  );
}
