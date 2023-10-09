import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Axios from "axios";
import "../Manage.css";

function ManageFinancialRecords(){

    const [data, setData] = useState([]);

    const loadData = async () => {
        await Axios.get("http://localhost:3001/api/financial-record/view-all").then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);

    const deleteFinancialRecord = (RecordNo) => {
        if (window.confirm("Are you sure that you wanted to delete this financial record?")) {
            Axios.delete(`http://localhost:3001/api/financial-record/remove/${RecordNo}`);
            toast.success("Financial Record Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/owner/add-financial-record">
                <button className="btn btn-add">Add Financial Record</button>
            </Link>
            <Link to="/owner/home">
			    <button class="btn btn-back">Go Back</button>
			</Link>
        
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Record No.</th>
                        <th style={{ textAlign: "center" }}>Property No.</th>
                        <th style={{ textAlign: "center" }}>Monthly Income</th>
                        <th style={{ textAlign: "center" }}>Expenses</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                        <tr key={item.RecordNo}>
                            <th scope="row">{item.RecordNo}</th>
                            <td>{item.P_PropertyNo}</td>
                            <td>{item.Monthly_Income}</td>
                            <td>{item.Expenses}</td>
                            <td>
                                <Link to={`/owner/edit-financial-record/${item.RecordNo}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteFinancialRecord(item.RecordNo)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageFinancialRecords;