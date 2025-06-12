import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-transparent">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 navbartitle">HOME</span>
				</Link>
				
			</div>
		</nav>
	);
};