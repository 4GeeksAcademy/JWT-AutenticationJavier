import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const back_URL = import.meta.env.VITE_BACKEND_URL;
import './Private.css';

export const Private = () => {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    }

   useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${back_URL}/api/private`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error("Error en solicitud privada:", err);
        sessionStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="private-page">
      <h1>Pagina personal</h1>
      <p className="private-message alert alert-success">Si ves este mensaje significa que ya estas autenticado</p>
      <p className="private-message">{message}</p>
      <button onClick={logout} className="">Logout</button>
    </div>
  );
}