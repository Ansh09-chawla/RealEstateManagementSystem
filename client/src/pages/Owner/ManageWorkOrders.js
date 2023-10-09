import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Axios from "axios";
import "../Manage.css";

function ManageWorkOrders(){

    const [data, setData] = useState([]);

    const loadData = async () => {
        await Axios.get("http://localhost:3001/api/work-order/view-all").then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);

    const deleteWorkOrder = (SIN) => {
        if (window.confirm("Are you sure that you wanted to delete this work order?")) {
            Axios.delete(`http://localhost:3001/api/work-order/remove/${SIN}`);
            toast.success("Work Order Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/owner/add-work-order">
                <button className="btn btn-add">Add Work Order</button>
            </Link>
            <Link to="/owner/home">
			    <button class="btn btn-back">Go Back</button>
			</Link>
        
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Ref No.</th>
                        <th style={{ textAlign: "center" }}>Task</th>
                        <th style={{ textAlign: "center" }}>Expense</th>
                        <th style={{ textAlign: "center" }}>Time</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Approval Date</th>
                        <th style={{ textAlign: "center" }}>Owner SIN</th>
                        <th style={{ textAlign: "center" }}>Property Manager SIN</th>
                        <th style={{ textAlign: "center" }}>Property No.</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                        <tr key={item.RefNo}>
                            <th scope="row">{item.RefNo}</th>
                            <td>{item.Task}</td>
                            <td>{item.Expense}</td>
                            <td>{item.Time}</td>
                            <td>{item.Date}</td>
                            <td>{item.Approval_Date}</td>
                            <td>{item.O_SIN}</td>
                            <td>{item.PM_SIN}</td>
                            <td>{item.P_PropertyNo}</td>
                            <td>
                                <Link to={`/owner/edit-work-order/${item.RefNo}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteWorkOrder(item.RefNo)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageWorkOrders;