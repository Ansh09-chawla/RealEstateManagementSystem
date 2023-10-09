import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import "../AddEdit.css";
import Axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    PropertyNo: "",
    NoOfUnits: 0,
    City: "",
    Country: "",
    Street: "",
    Postal_Code: "",
    PM_SIN: "",
};

function AddEditProperty(){

    const [state, setState] = useState(initialState);

    const {PropertyNo, NoOfUnits, City,  Country, Street, Postal_Code, PM_SIN} = state;

    const navigate = useNavigate();

    const {paramPropertyNo} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/property/view/${paramPropertyNo}`).then((response) => setState({ ...response.data[0] }));
    }, [paramPropertyNo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!NoOfUnits || !City || !Country || !Street || !Postal_Code) {
        toast.error("Please provide value into each input field");
        } 
        else {
            if (!paramPropertyNo) {
                Axios.post("http://localhost:3001/api/property/add", {
                    PropertyNo,
                    NoOfUnits,
                    City,
                    Country,
                    Street,
                    Postal_Code,
                    PM_SIN,
                }).then(() => {
                    setState({PropertyNo: "", NoOfUnits: 0, City: "" , Country: "", Street: "", Postal_Code: "", PM_SIN: ""});
                }).catch((err) => toast.error(err.response.data));
                    toast.success("Property Added Successfully");
            } 
            else {
                Axios.put(`http://localhost:3001/api/property/update/${paramPropertyNo}`, {
                    NoOfUnits,
                    City,
                    Country,
                    Street,
                    Postal_Code,
                    PM_SIN,
                }).then(() => {
                    setState({PropertyNo: "", NoOfUnits: 0, City: "" , Country: "", Street: "", Postal_Code: "", PM_SIN: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Property Updated Successfully");
            }

        setTimeout(() => navigate("/owner/manage-properties"), 500);
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
            <label htmlFor="PropertyNo">Property No.</label>
            <input
                type="text"
                id="PropertyNo"
                name="PropertyNo"
                placeholder="Property No..."
                value={PropertyNo || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="NoOfUnits">No. Of Units</label>
            <input
                type="number"
                id="NoOfUnits"
                name="NoOfUnits"
                placeholder="Number of Units..."
                value={NoOfUnits || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="City">City</label>
            <input
                type="text"
                id="City"
                name="City"
                placeholder="City name..."
                value={City || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Country">Country</label>
            <input
                type="text"
                id="Country"
                name="Country"
                placeholder="Country name..."
                value={Country || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Street">Street</label>
            <input
                type="text"
                id="Street"
                name="Street"
                placeholder="Street name..."
                value={Street || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Postal_Code">Postal Code</label>
            <input
                type="text"
                id="Postal_Code"
                name="Postal_Code"
                placeholder="Postal Code..."
                value={Postal_Code || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="PM_SIN">Assigned Property Manager SIN</label>
            <input
                type="text"
                id="PM_SIN"
                name="PM_SIN"
                placeholder="Property Manager SIN..."
                value={PM_SIN || ""}
                onChange={handleInputChange}
            />
            <input type="submit" value={paramPropertyNo ? "Update" : "Save"} />
            <Link to="/owner/manage-properties">
            <input type="button" value="Go Back" />
            </Link>
        </form>
        </div>
    );
}

export default AddEditProperty;