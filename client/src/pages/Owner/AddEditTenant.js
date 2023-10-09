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
    Credit_Score: "",
    Rent: "",
    Start_Date: "",
    End_Date: "",
    P_PropertyNo: "",
};

function AddEditTenant(){

    const [state, setState] = useState(initialState);

    const {SIN, First_Name,  Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo} = state;

    const navigate = useNavigate();

    const {paramSIN} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/tenant/view/${paramSIN}`).then((response) => setState({ ...response.data[0] }));
    }, [paramSIN]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!First_Name || !Last_Name || !PhoneNo || !Email || !Credit_Score || !Rent || !Start_Date || !End_Date || !P_PropertyNo) {
        toast.error("Please provide value into each input field");
        } 
        else {
            if (!paramSIN) {
                Axios.post("http://localhost:3001/api/tenant/add", {
                    SIN,
                    First_Name,
                    Last_Name,
                    PhoneNo,
                    Email,
                    Credit_Score,
                    Rent,
                    Start_Date,
                    End_Date,
                    P_PropertyNo,
                }).then(() => {
                    setState({SIN: "", First_Name: "", Last_Name: "" , PhoneNo: "", Email: "", Credit_Score: "", Rent: "", Start_Date: "", End_Date: "", P_PropertyNo: ""});
                }).catch((err) => toast.error(err.response.data));
                    toast.success("Tenant Added Successfully");
            } 
            else {
                Axios.put(`http://localhost:3001/api/tenant/update/${paramSIN}`, {
                    First_Name,
                    Last_Name,
                    PhoneNo,
                    Email,
                    Credit_Score,
                    Rent,
                    Start_Date,
                    End_Date,
                    P_PropertyNo,
                }).then(() => {
                    setState({SIN: "", First_Name: "", Last_Name: "" , PhoneNo: "", Email: "", Credit_Score: "", Rent: "", Start_Date: "", End_Date: "", P_PropertyNo: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Tenant Updated Successfully");
            }

        setTimeout(() => navigate("/owner/manage-tenants"), 500);
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
            <label htmlFor="Credit_Score">Credit Score</label>
            <input
                type="number"
                id="Credit_Score"
                name="Credit_Score"
                placeholder="Credit Score..."
                value={Credit_Score || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Rent">Rent</label>
            <input
                type="text"
                id="Rent"
                name="Rent"
                placeholder="Rent..."
                value={Rent || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Start_Date">Start Date</label>
            <input
                type="text"
                id="Start_Date"
                name="Start_Date"
                placeholder="Start Date..."
                value={Start_Date || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="End_Date">End Date</label>
            <input
                type="text"
                id="End_Date"
                name="End_Date"
                placeholder="End Date..."
                value={End_Date || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="P_PropertyNo">Property No.</label>
            <input
                type="text"
                id="P_PropertyNo"
                name="P_PropertyNo"
                placeholder="Property No..."
                value={P_PropertyNo || ""}
                onChange={handleInputChange}
            />
            <input type="submit" value={paramSIN ? "Update" : "Save"} />
            <Link to="/owner/manage-tenants">
            <input type="button" value="Go Back" />
            </Link>
        </form>
        </div>
    );
}

export default AddEditTenant;