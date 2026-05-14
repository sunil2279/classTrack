import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import styles from "./createNewCourses.module.css";
import { clientServer } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateNewCourse() {

  let [formdata, setFormdata] = useState({
    name: "",
    fees: "",
    duration: "",
    description: "",
  });
  let navigate = useNavigate();

  let handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  let handlesubmit = async () => {
    try {
      let token = localStorage.getItem("token");

      let response = await clientServer.post(
        "/admin/course",
        {
          ...formdata,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      
      navigate("/admin-courses");
      setFormdata({});

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <h1>Create New Course</h1>

          <label htmlFor="coursename">Enter Course Name</label>
          <input
            type="text"
            name="name"
            id="coursename"
            onChange={handleChange}
            placeholder="enter course name"
          />

          <label htmlFor="fees">Fees</label>
          <input type="number" name="fees" onChange={handleChange} />

          <label htmlFor="duration">Enter Course Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            onChange={handleChange}
          />

          <label htmlFor="description">Enter Description</label>
          <textarea
            name=""
            id="description"
            name="description"
            onChange={handleChange}
          ></textarea>

          <button onClick={handlesubmit} className={styles.button}> Create </button>
        </div>
      </div>
    </MainLayout>
  );
}
