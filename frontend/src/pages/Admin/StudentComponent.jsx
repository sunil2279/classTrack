import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout.jsx'
import styles from "./students.module.css";
import { clientServer } from '../../services/api.js';
import { useNavigate } from 'react-router-dom';

export default function Student() {
  let [students,setStudents] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
      let fetchdata = async() => {
        try {
          let token = localStorage.getItem("token");
          let studentResponce = await clientServer.get("/admin/students", {
            headers:{
              Authorization:token
            }
          })
          setStudents(studentResponce.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchdata();
    },[])
    // console.log(students);
  return (
    <MainLayout>
      <div className={styles.container}>
        {students.map((data) => (
          <div className={styles.cards} key={data._id} onClick={() => navigate(`/admin-student/${data._id}`)}>
            <p>{data.name}</p>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}
