import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";

function OwnerLogin() {

	const [sin, setSin] = useState("");
	const [loginStatus, setLoginStatus] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const login = () => {
		Axios.post("http://localhost:3001/api/owner-login", {
			sin: sin,
		}).then((response) => {
			if (response.data.message) {
				setLoginStatus(false);
				setStatusMessage("Incorrect SIN");
			} else {
				setLoginStatus(true);
				setStatusMessage("Login Successful");
			}
		});
	};

	if(loginStatus){
		return <Navigate to="/owner/home" />
	}

	return (
		<div className="OwnerLogin">
			<div 
				className="Login"
				style={{
					margin: "auto",
					padding: "15px",
					maxWidth: "400px",
					alignContent: "center",
					}}>
				<h1>Owner Login</h1>
				<label>SIN</label>
				<input

					type="text"
					onChange={(e) => {
						setSin(e.target.value);
					}}
				></input>
				<button class="btn dash-btn-login" onClick={login}>Login</button>
				<h3>{statusMessage}</h3>
			</div>
		</div>
	);
}

export default OwnerLogin;
