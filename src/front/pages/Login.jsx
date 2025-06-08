import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const back_URL = import.meta.env.VITE_BACKEND_URL;
export const Login = () =>{

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${back_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 🔐 importante para CORS con token
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        navigate("/private");
      } else {
        alert(data.error || "Error en el inicio de sesión.");
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
      console.error("Error:", error);
    }
  }

  // const handleLogin = () =>{

  //   const opts ={
  //     method:'POST',
  //     headers:{
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "email":email,
  //       "password":password
  //     })
  //   }
  //   fetch("https://laughing-waffle-wrgpv999qxj52g6jj-3001.app.github.dev/api/logear",opts)
  //   .then(resp=>{
  //     if(resp.status === 200) return resp.json();
  //     else alert("There was an error")
  //   })
  //   .then(data=>
  //     sessionStorage.setItem("logintoken",data.token)
  //   )
  //   .catch(error =>{
  //     console.log("There was some error!!!!!!",error)
  //   })
 
        return (
          <StyledWrapper>
            <div className="form" id="formitem">
              <p className="form-title">Login into your account</p>
              <div className="input-container">
                <input placeholder="Enter email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="input-container">
                <input placeholder="Enter password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <button className="submit" onClick={handleLogin}>
                Sign in
              </button>
              <p className="signup-link">
                No account?
                <Link to={'/signup'}>SignUp</Link>
              </p>
              
            </div>
          </StyledWrapper>
        );
      
}

const StyledWrapper = styled.div`
  .form {
    background-color: #fff;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
  }

  .input-container {
    position: relative;
  }

  .input-container input, .form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
  }

  .input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .input-container span {
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    place-content: center;
  }

  .input-container span svg {
    color: #9CA3AF;
    width: 1rem;
    height: 1rem;
  }

  .submit {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color:rgb(4, 0, 87);
    color:rgb(255, 255, 255);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
  }

  .signup-link {
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  .signup-link a {
    text-decoration: underline;
  }`;
