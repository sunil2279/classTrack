import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from "./mainLayout.module.css";

export default function MainLayout({children}) {
  // console.log("mainlayout working");
  return (
    <div className={styles.homeContianer}>
      <div className={styles.leftContainer}>
        <Sidebar/>
      </div>
      <div  className={styles.rightContainer}>{children}</div>
    </div>
  )
}
