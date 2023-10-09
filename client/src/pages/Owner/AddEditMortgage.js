import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    RefNo: "",
    Principal_Amount: "",
    Monthly_Payment: "",
    Interest_Rate: "",
    Term: "",
    Bank: "",
    P_PropertyNo: "",
};

function AddEditMortgage(){

    const [state, setState] = useState(initialState);

    const {RefNo, Principal_Amount,  Monthly_Payment, Interest_Rate, Term, Bank, P_PropertyNo} = state;

    const navigate = useNavigate();

    const {paramRefNo} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/work-order/view/${paramRefNo}`).then((response) => setState({ ...response.data[0] }));
    }, [paramRefNo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Principal_Amount || !Monthly_Payment || !Interest_Rate || !Term || !Bank || !P_PropertyNo) {
        toast.error("Please provide value into each input field");
        } 
        else {
            if (!paramRefNo) {
                Axios.post("http://localhost:3001/api/mortgage/add", {
                    RefNo,
                    Principal_Amount,
                    Monthly_Payment,
                    Interest_Rate,
                    Term,
                    Bank,
                    P_PropertyNo,
                }).then(() => {
                    setState({RefNo: "", Principal_Amount: "", Monthly_Payment: "" , Interest_Rate: "", Term: "", Bank: "", P_PropertyNo: ""});
                }).catch((err) => toast.error(err.response.data));
                    toast.success("Mortgage Added Successfully");
            } 
            else {
                Axios.put(`http://localhost:3001/api/mortgage/update/${paramRefNo}`, {
                    Principal_Amount,
                    Monthly_Payment,
                    Interest_Rate,
                    Term,
                    Bank,
                    P_PropertyNo,
                }).then(() => {
                    setState({RefNo: "", Principal_Amount: "", Monthly_Payment: "" , Interest_Rate: "", Term: "", Bank: "", P_PropertyNo: ""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("Mortgage Updated Successfully");
            }

        setTimeout(() => navigate("/owner/manage-mortgages"), 500);
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
            <label htmlFor="Principal_Amount">Principal Amount</label>
            <input
                type="text"
                id="Principal_Amount"
                name="Principal_Amount"
                placeholder="Principal Amount..."
                value={Principal_Amount || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Monthly_Payment">Monthly Payment</label>
            <input
                type="text"
                id="Monthly_Payment"
                name="Monthly_Payment"
                placeholder="Monthly Payment..."
                value={Monthly_Payment || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Interest_Rate">Interest Rate</label>
            <input
                type="text"
                id="Interest_Rate"
                name="Interest_Rate"
                placeholder="Interest Rate..."
                value={Interest_Rate || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Term">Term</label>
            <input
                type="text"
                id="Term"
                name="Term"
                placeholder="Term..."
                value={Term || ""}
                onChange={handleInputChange}
            />
            <label htmlFor="Bank">Bank</label>
            <input
                type="text"
                id="Bank"
                name="Bank"
                placeholder="Bank..."
                value={Bank || ""}
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
            <Link to="/owner/manage-mortgages">
            <input type="button" value="Go Back" />
            </Link>
        </form>
        </div>
    );
}

export default AddEditMortgage;