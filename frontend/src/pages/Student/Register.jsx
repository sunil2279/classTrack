import React, { useEffect, useState } from 'react'
import styles from './register.module.css';
import { clientServer } from '../../services/api.js';
import {useNavigate} from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if(token && role == "studnet"){
      navigate('/dashboard');
    }
    if(token && role == "admin"){
      navigate("/admin-dashboard")
    }

  },[]);

  const[userLoginMethod,setUserLoginMethod] = useState(false);
  let [form , setForm] = useState({
    name:"",
    email:"",
    password:"",
    phone:""
  });

  let [errorMessage, setErrorMessage] = useState("");
  let [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      const res = await clientServer.post("/student/register",form);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("role",res.data.role);
      setForm({
        name:"",
        phone:"",
        email:"",
        password:""
      });

      navigate("/dashboard");

    } catch (error) {
      setErrorMessage(error.response?.data?.message);
      setIsError(true);
    }
  }


  const handleLogin = async() => {
    try {
      const res = await clientServer.post("/student/login",form);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("role",res.data.role);
      setForm({
        email:"",
        password:""
      });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage( error.response?.data?.message);
      setIsError(true);
    }
  }

  

  return (
    <>
     <div className={styles.container}>

        <div className={styles.cardContainer}>

          <div className={styles.cardContainer_left}>

            <p className={styles.cardleft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
            
             {isError === true ? <p style={{color:"red"}}>{errorMessage}</p> : <></>}
            <div className={styles.inputContainers}>

              {!userLoginMethod && 
               
              <div className={styles.inputRow}>

                <input name="name" onChange={handleChange} className={styles.inputField} type="text" placeholder="Name"
                value={form.name}/>

                <input name="phone" onChange={handleChange} className={styles.inputField} type="text" placeholder="Phone"
                 value={form.phone}/>

              </div>

              }
                

              <input name="email" onChange={handleChange} className={styles.inputField} type="text" placeholder="Email" value={form.email}/>

              <input name="password" onChange={handleChange} className={styles.inputField} type="password" placeholder="Password" value={form.password}/>

              <div onClick={() => {
                if(!userLoginMethod){
                  handleRegister();
                }else{
                  handleLogin();
                }
              }}
               className={styles.buttonWithOutline}>

                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
                
              </div>

            </div>


          </div>
          <div className={styles.cardContainer_right}>


              {userLoginMethod ? <p>Don't Have an Account?</p> : <p>Already Have an Account?</p>}
              <div onClick={() => {
                  setUserLoginMethod(!userLoginMethod);
                }}

                style={{color:"black", alignItems:"center"}}
                 className={styles.buttonWithOutline}>
                  <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
              
                </div>
          </div>
        </div>
      </div>
    </>
  )
}
