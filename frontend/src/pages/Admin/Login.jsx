import React, { useEffect, useState } from "react";
import { clientServer } from "../../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./adminLogin.module.css";
import {jwtDecode} from "jwt-decode";

export default function TeacherLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token){
      try {
        const decode = jwtDecode(token);

        if(decode.role === "admin"){
          navigate("/admin-dashboard");
        }else if(decode.role === "student"){
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        localStorage.clear();
      }
    }
  },[]);

  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await clientServer.post("/admin/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className={styles.mainContianer}>
      <div className={styles.contianer}>
        <h1>Admin Login</h1>

        <input className={styles.input} type="text" name="email" placeholder="Email" onChange={handleChange} />

        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className={styles.btn} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
