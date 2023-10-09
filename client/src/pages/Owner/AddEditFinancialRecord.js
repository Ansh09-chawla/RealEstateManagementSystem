import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import "../AddEdit.css";
import Axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    RecordNo: "",
    P_PropertyNo: "",
};

function AddEditFinancialRecord(){

    const [state, setState] = useState(initialState);

    const {RecordNo, P_PropertyNo} = state;

    const navigate = useNavigate();

    const {paramRecordNo} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/financial-record/view/${paramRecordNo}`).then((response) => setState({ ...response.data[0] }));
    }, [paramRecordNo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!RecordNo || !P_PropertyNo) {
        toast.error("Please provide value into each input field");
        } 
        else {
            if (!paramRecordNo) {
                Axios.post("http://localhost:3001/api/financial-record/add", {
                    RecordNo,
                    P_PropertyNo,
                }).then(() => {
                    setState({RecordNo: "", P_PropertyNo: ""});
                }).catch((err) => toast.error(err.response.data));
                    toast.success("Financial Record Created Successfully");
            } 
            // else {
            //     Axios.put(`http://localhost:3001/api/financial-record/update/${paramRecordNo}`, {
            //         P_PropertyNo,
            //         Monthly_Income,
            //         Expenses,
            //     }).then(() => {
            //         setState({RecordNo: "", P_PropertyNo: "", Monthly_Income: "", Expenses: ""});
            //     })
            //     .catch((err) => toast.error(err.response.data));
            //     toast.success("Financial Record Updated Successfully");
            // }

        setTimeout(() => navigate("/owner/manage-financial-records"), 500);
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
            <label htmlFor="RecordNo">Record No.</label>
            <input
                type="text"
                id="RecordNo"
                name="RecordNo"
                placeholder="Record No..."
                value={RecordNo || ""}
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
            <input type="submit" value={paramRecordNo ? "Update" : "Save"} />
            <Link to="/owner/manage-financial-records">
            <input type="button" value="Go Back" />
            </Link>
        </form>
        </div>
    );
}

export default AddEditFinancialRecord;