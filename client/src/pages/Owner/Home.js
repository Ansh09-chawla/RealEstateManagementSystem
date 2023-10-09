import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";

function Home() {

	return (
		<div className="Home">
			<h1>Owner Dashboard</h1>
			<div className="OwnerHome">
				<Link to="/owner/manage-properties">
					<button class="dash-btn manage-btn">Manage Properties</button>
				</Link>
				<Link to="/owner/manage-property-managers">
					<button class="dash-btn manage-btn">Manage Property Managers</button>
				</Link>
				<Link to="/owner/manage-tenants">
					<button class="dash-btn manage-btn">Manage Tenants</button>
				</Link>
				<Link to="/owner/manage-work-orders">
					<button class="dash-btn manage-btn">Manage Work Orders</button>
				</Link>
				<Link to="/owner/manage-mortgages">
					<button class="dash-btn manage-btn">Manage Mortgages</button>
				</Link>
				<Link to="/owner/manage-financial-records">
					<button class="dash-btn manage-btn">Manage Financial Records</button>
				</Link>
				<Link to="/owner/manage-memos">
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