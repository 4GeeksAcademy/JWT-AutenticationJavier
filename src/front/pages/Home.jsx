import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
export const Home = () => {
	return (
		<div className="container text-center home-page">
			<h1>JAVIER USER VIEW</h1>
			<p>¿Tienes ya una cuenta?</p>
			<Link to="/login" className="btn btn-primary btn-lg">
					LOGIN
			</Link>

			<p>Registrate si no tienes un usuario </p>
			
			<Link to="/signup" >
				<button>Register</button>
			</Link>
			

		</div>
	);
}; 