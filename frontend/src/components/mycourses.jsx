import React from 'react';
import styles from "./MyCourse.module.css";

export default function MyCourses({data}) {
  return (
    <div className={styles.mycourses}>
      <div className={styles.coursedetails}>
        <h2 className={styles.text}>{data.name}</h2>
        <p className={styles.text}>{data.duration}</p>
        <p className={styles.text}>{data.fees}</p>
      </div>
    </div>
  )
}

