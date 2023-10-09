import React from "react";
import { Link, useParams} from "react-router-dom";
import "../Home.css";



function Home() {

	const {paramT_SIN} = useParams();

	return (
		<div className="Home">
			<h1>Tenant Dashboard</h1>
			<div className="TenantHome">
				<Link to={`/tenant/view-memos/${paramT_SIN}`}>
					<button class="dash-btn manage-btn">View Memos</button>
				</Link>
                <Link to="/">
					<button class="btn dash-btn-logout">Log out</button>
				</Link>
			</div>
		</div>
	);
}

export default Home;