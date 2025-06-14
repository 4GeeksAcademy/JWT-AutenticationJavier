import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
const back_URL = import.meta.env.VITE_BACKEND_URL;

export const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${back_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cuenta creada. Ahora inicia sesión.");
        navigate("/login");
      } else {
        alert(data.msg || "Error en el registro.");
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
      console.error("Signup error:", error);
    }
  };
  return (
    
    <StyledWrapper>
      <form className="form" onSubmit={handleSignup}>
        <p className="title">Registrate </p>
        <p className="message">Signup now and get full access to our app. </p>
        <label>
          <input className="input" placeholder="Introduce tu correo"  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <span>Email</span>
        </label> 
        <label>
          <input className="input" placeholder="Introduce tu contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span>Password</span>
        </label>
        <button className="submit">Registrar</button>
        <p className="signin">Already have an acount ? 
          <Link to={'/login'}>Login</Link>
        </p>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .message, 
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #00bfff;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    background-color: #00bfff;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

