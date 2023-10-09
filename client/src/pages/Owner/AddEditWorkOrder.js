import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    RefNo: "",
    Task: "",
    Expense: "",
    Time: "",
    Date: "",
    Approval_Date: "",
    O_SIN: "",
    PM_SIN: "",
    P_PropertyNo: "",
};

function AddEditWorkOrder(){

    const [state, setState] = useState(initialState);

    const {RefNo, Task,  Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo} = state;

    const navigate = useNavigate();

    const {paramRefNo} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/work-order/view/${paramRefNo}`).then((response) => setState({ ...response.data[0] }));
    }, [paramRefNo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Task || !Expense || !Time || !Date ||  !O_SIN || !PM_SIN || !P_PropertyNo) {
        toast.error("Please provide value into each input field");
        } 
        else {
            if (!paramRefNo) {
                Axios.post("http://localhost:3001/api/work-order/add", {
                    RefNo,
                    Task,
                    Expense,
                    Time,
                    Date,
                    Approval_Date,
                    O_SIN,
                    PM_SIN,
                    P_PropertyNo,
                }).then(() => {
                    setState({RefNo: "", Task: "", Expense: "" , Time: "", Date: "", Approval_Date: "", O_SIN: "", PM_SIN: "", P_PropertyNo: ""});
                }).catch((err) => toast.error(err.response.data));
                    toast.success("Work Order Added Successfully");
            } 
            else {
                Axios.put(`http://localhost:3001/api/work-order/update/${paramRefNo}`, {
                    Task,
                    Expense,
                    Time,
                    Date,
                    Approval_Date,
                    O_SIN,
                    PM_SIN,
                    P_PropertyNo,
                }).then(() => {
                    setState({RefNo: "", Task: "", Expense: "" , Time: "", Date: "", Approval_Date: "", O_SIN: "", PM_SIN: "", P_PropertyNo: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Work Order Updated Successfully");
            }

        setTimeout(() => navigate("/owner/manage-work-orders"), 500);
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
            <label htmlFor="RefNo">Ref No.</label>
            <input
                type="text"
                id="RefNo"
                name="RefNo"
                placeholder="Ref No..."
                value={RefNo || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Task">Task</label>
            <input
                type="text"
                id="Task"
                name="Task"
                placeholder="Task..."
                value={Task || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Expense">Expense</label>
            <input
                type="text"
                id="Expense"
                name="Expense"
                placeholder="Expense..."
                value={Expense || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Time">Time</label>
            <input
                type="text"
                id="Time"
                name="Time"
                placeholder="Time..."
                value={Time || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Date">Date</label>
            <input
                type="text"
                id="Date"
                name="Date"
                placeholder="Date..."
                value={Date || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Approval_Date">Approval Date</label>
            <input
                type="text"
                id="Approval_Date"
                name="Approval_Date"
                placeholder="Approval Date..."
                value={Approval_Date || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="O_SIN">Owner SIN</label>
            <input
                type="text"
                id="O_SIN"
                name="O_SIN"
                placeholder="Owner SIN..."
                value={O_SIN || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="PM_SIN">Property Manager SIN</label>
            <input
                type="text"
                id="PM_SIN"
                name="PM_SIN"
                placeholder="Property Manager SIN..."
                value={PM_SIN || ""}
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
            <input type="submit" value={paramRefNo ? "Update" : "Save"} />
            <Link to="/owner/manage-work-orders">
            <input type="button" value="Go Back" />
            </Link>
        </form>
        </div>
    );
}

export default AddEditWorkOrder;