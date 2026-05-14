import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import styles from "./coursesComponent.module.css";
import { useNavigate } from "react-router-dom";
import { clientServer } from "../../services/api";

export default function CoursesComponent() {
  let [courses, setCourses] = useState([]);
  let [formdata, setFormdata] = useState({
    name: "",
    duration: "",
    fees: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let fetchdata = async () => {
      try {
        let token = localStorage.getItem("token");
        let coursesResponse = await clientServer.get("/admin/courses", {
          headers: {
            Authorization: token,
          },
        });

        setCourses(coursesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  let createNewCourse = async () => {
    navigate("/admin-addnewcourse");
  };

  let handlecourseDelete = async (id) => {
    try {
      let token = localStorage.getItem("token");
      let coursesResponse = await clientServer.delete(
        `/admin/delete-course/${id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
   
      setCourses((prev) => {
        return prev.filter((course) => course._id.toString() !== id.toString());
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className={styles.container}>
          <div className={styles.coursenav}>
            <div>
              <h1>Courses</h1>
              <p>Manage All Courses and Create New Course</p>
            </div>
            <button onClick={createNewCourse} className={styles.addbtn}>
              <i class="fa-solid fa-plus"></i>Add Course
            </button>
          </div>

          <div className={styles.StudentCourses}>
            {courses.map((course) => (
              <div className={styles.course} key={course._id}>
                <p>{course.name}</p>
                <p>{course.description}</p>
                <p>{rupeeconvert(course.fees)}</p>
                <p>{course.duration}</p>
                <button className={styles.deletebtn} onClick={() => handlecourseDelete(course._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
