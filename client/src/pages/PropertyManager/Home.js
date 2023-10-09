import React from "react";
import { Link, useParams} from "react-router-dom";
import "../Home.css";



function Home() {

	const {paramPM_SIN} = useParams();

	return (
		<div className="Home">
			<h1>Property Manager Dashboard</h1>
			<div className="PropertyManagerHome">
				<Link to={`/propertyManager/manage-properties/${paramPM_SIN}`}>
					<button class="dash-btn manage-btn">Manage Properties</button>
				</Link>
				<Link to={`/propertyManager/manage-tenants/${paramPM_SIN}`}>
					<button class="dash-btn manage-btn">Manage Tenants</button>
				</Link>
				<Link to={`/propertyManager/manage-work-orders/${paramPM_SIN}`}>
					<button class="dash-btn manage-btn">Manage Work Orders</button>
				</Link>
				<Link to={`/propertyManager/manage-memos/${paramPM_SIN}`}>
					<button class="dash-btn manage-btn">Manage Memos</button>
				</Link>
				<Link to="/">
					<button class="btn dash-btn-logout">Log out</button>
				</Link>
	
			</div>
		</div>
	);
}

export default Home;