import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout.jsx";
import { useParams } from "react-router-dom";
import { clientServer } from "../../services/api.js";
import styles from "./studentProfile.module.css";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const navigate = useNavigate();
  let { id } = useParams();
  let [student, setStudent] = useState({});
  const token = localStorage.getItem("token");

  let [courses, setCourses] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let [courseId, setCourseId] = useState("");
  let [updateFees, setUpdateFees] = useState(false);
  let [updatedAmount, setUpdatedAmount] = useState(0);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let fetchdata = async () => {
      try {
        let responce = await clientServer.get("/admin/courses", {
          headers: {
            Authorization: token,
          },
        });

        setCourses(responce.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message);
      }
    };

    fetchdata();
  }, []);

  const fetchStudentData = async () => {
    try {
      let res = await clientServer.get(`/admin/student/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setStudent(res.data.student);
      
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  let handleAssignCourse = async () => {
    try {
      let responce = await clientServer.post(
        "/admin/assign-course",
        {
          studentId: id,
          courseId: courseId,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      await fetchStudentData();
      setCourseId("");
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    }
  };

  let handlUpdateFees = async () => {
    try {
      await clientServer.put(
        "/admin/update-fees",
        {
          studentId: id,
          paidAmount: updatedAmount,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setUpdatedAmount(0);
      setUpdateFees(false);

      let res = await clientServer.get(`/admin/student/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setStudent(res.data.student);
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    }
  };

  let handleStudentDeletion = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure?");

      if (!confirmDelete) return;

      let res = await clientServer.delete(`/admin/student/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("student deleted!");
      navigate("/admin-students");
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
    }
  };

  let rupeeconvert = (rupee) => {
    return Number(rupee || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  const studentfeeInfo = student?.fees?.[0] || {};
  const pendingFeesInfo =
    (studentfeeInfo.totalAmount || 0) - (studentfeeInfo.paidAmount || 0);

  return (
    <MainLayout>
      <div className={styles.mainContainer}>
        {errorMessage && alert(`${errorMessage}`)}

        <div className={styles.container}>
          <div className={styles.topNav}>
          {/* <i class="fa-solid fa-xmark"></i> */}
            <h2 style={{ "marginBottom": "0", "marginLeft":"2rem"}}>Student Profile</h2>
            <p>24 January,2026</p>
          </div>

          <div className={styles.studentDetail}>
            <div className={styles.studentleftprofile}>
              <img src="/studentprofile.jpg" alt="studentimg" />
            </div>

            <div className={styles.studentrightprofileDetail}>
              <h3>{student.name}</h3>
              <p>
                <i class="fa-regular fa-envelope"></i> {student.email}
              </p>
              <p>
                <i class="fa-solid fa-phone"></i>
                {student.phone}
              </p>
              <p>
                <i class="fa-regular fa-calendar"></i>
                {new Date(student.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className={styles.bottomarea}>
            <div className={styles.EnrolledCourses}>
              <h3>Enrolled Courses </h3>

              {student.course && student.course.length > 0 ? (
                student.course.map((course) => (
                  <div key={course._id} className={styles.courseCard}>
                    <p className={styles.courseName}>{course.name}</p>
                    <p>Duration: {course.duration}</p>
                    <p>
                      Fees:
                      {rupeeconvert(course.fees)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No Courses Assigned</p>
              )}
            </div>

            <div className={styles.righarea}>
                <h2>Fees OverView</h2>
              <div className={styles.feesOverView}>
                <div className={styles.cards}>
                  <div className={styles.fee}>
                    {/* <i class="fa-solid fa-people-group"></i> */}
                    <p>Total Fees</p>
                    <h3>{rupeeconvert(studentfeeInfo.totalAmount || 0)}</h3>
                  </div>
                  <div className={styles.fee}>
                    {/* <i class="fa-solid fa-indian-rupee-sign"></i>{" "} */}
                    <p>Paid Amount</p>
                    <h3>{rupeeconvert(studentfeeInfo.paidAmount || 0)}</h3>
                  </div>
                  <div className={styles.fee}>
                    {/* <i class="fa-regular fa-clock"></i> */}
                    <p>Pending</p>
                    <h3>{rupeeconvert(pendingFeesInfo)}</h3>
                  </div>
                </div>

                {/* <div className={styles.status}>status</div> */}
              </div>

              <h2>Actions </h2>
              <div className={styles.actions}>
                <div className={styles.actionCards}>
                  <p onClick={() => setShowModal(true)} className={styles.assignBtn}>
                    <i class="fa-solid fa-link"></i> Assign Course
                  </p>
                </div>
                <div className={styles.actionCards}>
                  <p onClick={() => setUpdateFees(true)} className={styles.updateBtn}>
                    <i class="fa-solid fa-indian-rupee-sign"></i> Update Fees
                  </p>
                </div>
                <div
                  className={styles.actionCards}
                  onClick={handleStudentDeletion}
                >
                  
                  <p className={styles.deleteBtn}><i class="fa-solid fa-trash-can"></i>Delete Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Select Course</h3>

            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">-- Select Course --</option>

              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>

            <div className={styles.modalButtons}>
              <button className={styles.change}  onClick={handleAssignCourse}>Assign</button>

              <button className={styles.cancelbtn} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {updateFees && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Update fees</h3>
            <input 
              type="number"
              placeholder="Enter Amount"
              onChange={(e) => setUpdatedAmount(Number(e.target.value))}
            />

            <div className={styles.modalButtons}>
              <button className={styles.cancelbtn} onClick={() => setUpdateFees(false)}>cancel</button>
              <button className={styles.change} onClick={handlUpdateFees}>Update Fees</button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
