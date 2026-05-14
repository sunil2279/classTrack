import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/mainlayout'
import styles from './profile.module.css';
import { clientServer } from '../../services/api';

export default function Profile() {
  let [studentdata, setStudentData] = useState({});
  useEffect(() => {
    let fetchData = async() => {
      try {
        let token = localStorage.getItem("token")
        let res = await clientServer.get("/student/profile",{
          headers:{
            Authorization:token
          }
        })
        console.log(res.data);
        setStudentData(res.data.student);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[]);

  return (
    <MainLayout>
      <h2>On Progress...</h2>
      <div className={styles.container}>
        {/* <div className={styles.nav}>
          <h1>Student Profile</h1>
          <p>view and manage your profile</p>
        </div> */}
        {/* <div className={styles.topContainer}>
          <div className={styles.studentProfile}>
            <img src="/studentprofile.jpg" alt="" />
          </div>
          <div>
            <p>{studentdata?.name}</p>
            <p>{studentdata?.email}</p>
            <p>{studentdata?.phone}</p>
            <p>{new Date(studentdata?.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}</p>
          </div>
        </div> */}
      </div>
    </MainLayout>
  )
}
