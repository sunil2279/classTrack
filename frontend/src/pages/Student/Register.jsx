import React, { useEffect, useState } from 'react'
import styles from './register.module.css';
import { clientServer } from '../../services/api.js';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";



export default function Register() {
  let navigate = useNavigate();
  
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
             {isError === true ? <p className={styles.errorMessage}>{errorMessage}</p> : <></>}

            <p className={styles.cardleft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
            
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
               className={styles.buttonWithOutline} style={{background:"whitesmoke",opacity:"0.8",color:"black",boxShadow:"5px 4px 7px #433061"}}>

                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
                
              </div>

            </div>


          </div>
          <div className={styles.cardContainer_right}>


              {userLoginMethod ? <p>Don't Have an Account?</p> : <p>Already Have an Account?</p>}
              <div onClick={() => {
                  setUserLoginMethod(!userLoginMethod);
                }}

                style={{alignItems:"center"}}
                 className={styles.buttonWithOutline}>
                  <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
              
                </div>
          </div>
        </div>
      </div>
    </>
  )
}
