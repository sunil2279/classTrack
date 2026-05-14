import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import styles from "./mainLayout.module.css";

export default function MainLayout({children}) {
  // const[width,setWidth] = useState(0);
  // if(window.screen.width === 750){
  //   setWidth(window.screen.width);
  // }
  // console.log(window.screen.width);
  return (
    <div className={styles.homeContianer}>
      <div className={styles.leftContainer}>
        <Sidebar/>
      </div>
      <div  className={styles.rightContainer}>{children}</div>
    </div>
  )
}
