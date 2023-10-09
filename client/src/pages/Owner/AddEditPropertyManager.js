import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    SIN: "",
    First_Name: "",
    Last_Name: "",
    PhoneNo: "",
    Email: "",
    Background_Check: "",
    O_SIN: "",
};

function AddEditPropertyManager(){

    const [state, setState] = useState(initialState);

    const {SIN, First_Name,  Last_Name, PhoneNo, Email, Background_Check, O_SIN} = state;

    const navigate = useNavigate();

    const {paramSIN} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/property-manager/view/${paramSIN}`).then((response) => setState({ ...response.data[0] }));
    }, [paramSIN]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!First_Name || !Last_Name || !PhoneNo || !Email || !Background_Check || !O_SIN) {
        toast.error("Please provide value into each input field");
        } 
        else {
            if (!paramSIN) {
                Axios.post("http://localhost:3001/api/property-manager/add", {
                    SIN,
                    First_Name,
                    Last_Name,
                    PhoneNo,
                    Email,
                    Background_Check,
                    O_SIN,
                }).then(() => {
                    setState({SIN: "", First_Name: "", Last_Name: "" , PhoneNo: "", Email: "", Background_Check: "", O_SIN: ""});
                }).catch((err) => toast.error(err.response.data));
                    toast.success("Property Manager Added Successfully");
            } 
            else {
                Axios.put(`http://localhost:3001/api/property-manager/update/${paramSIN}`, {
                    First_Name,
                    Last_Name,
                    PhoneNo,
                    Email,
                    Background_Check,
                    O_SIN,
                }).then(() => {
                    setState({ SIN: "", First_Name: "", Last_Name: "" , PhoneNo: "", Email: "", Background_Check: "", O_SIN: "" });
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Property Manager Updated Successfully");
            }

        setTimeout(() => navigate("/owner/manage-property-managers"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "100px" }}>
        <form
            style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
            }}
            onSubmit={handleSubmit}
        >
            <label htmlFor="SIN">SIN</label>
            <input
                type="text"
                id="SIN"
                name="SIN"
                placeholder="SIN..."
                value={SIN || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="First_Name">First Name</label>
            <input
                type="text"
                id="First_Name"
                name="First_Name"
                placeholder="First Name..."
                value={First_Name || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Last_Name">Last Name</label>
            <input
                type="text"
                id="Last_Name"
                name="Last_Name"
                placeholder="Last Name..."
                value={Last_Name || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="PhoneNo">Phone No.</label>
            <input
                type="text"
                id="PhoneNo"
                name="PhoneNo"
                placeholder="Phone No..."
                value={PhoneNo || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Email">Email</label>
            <input
                type="text"
                id="Email"
                name="Email"
                placeholder="Email..."
                value={Email || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Background_Check">Background Check</label>
            <input
                type="text"
                id="Background_Check"
                name="Background_Check"
                placeholder="Background Check..."
                value={Background_Check || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="O_SIN">Supervising Owner SIN</label>
            <input
                type="text"
                id="O_SIN"
                name="O_SIN"
                placeholder="Supervising Owner SIN..."
                value={O_SIN || ""}
                onChange={handleInputChange}
            />
            <input type="submit" value={paramSIN ? "Update" : "Save"} />
            <Link to="/owner/manage-property-managers">
            <input type="button" value="Go Back" />
            </Link>
        </form>
        </div>
    );
}

export default AddEditPropertyManager;