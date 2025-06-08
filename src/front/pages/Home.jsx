import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div className="container text-center">
			<h1>JAVIER USER VIEW</h1>
			<p>Inicia sesion o registrate</p>

			<div className="d-flex justify-content-center gap-3">
				<Link to="/login" className="btn btn-primary btn-lg">
					LOGIN
				</Link>
				<Link to="/signup" className="btn btn-outline-primary btn-lg">
					REGISTER
				</Link>
			</div>

		</div>
	);
}; 