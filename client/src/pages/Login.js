import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Login() {

	return (
		<div className="Login">
			<h1>Select Account Type</h1>
			<div className="SelectAccount">
				<div className="OwnerLogin">
					<Link to="/owner-login">
						<button class="dash-btn select-account-btn">Owner</button>
					</Link>
				</div>
				<div className="PropertyManagerLogin">
					<Link to="/property-manager-login">
						<button class="dash-btn select-account-btn">Property Manager</button>
					</Link>
				</div>
				<div className="TenantLogin">
					<Link to="/tenant-login">
						<button class="dash-btn select-account-btn">Tenant</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
