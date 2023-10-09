import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Axios from "axios";
import "../Manage.css";

function ManageTenants(){

    const [data, setData] = useState([]);

    const loadData = async () => {
        await Axios.get("http://localhost:3001/api/tenant/view-all").then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);

    const deleteTenant = (SIN) => {
        if (window.confirm("Are you sure that you wanted to delete this tenant?")) {
            Axios.delete(`http://localhost:3001/api/tenant/remove/${SIN}`);
            toast.success("Tenant Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/owner/add-tenant">
                <button className="btn btn-add">Add Tenant</button>
            </Link>
            <Link to="/owner/home">
			    <button class="btn btn-back">Go Back</button>
			</Link>
        
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>SIN</th>
                        <th style={{ textAlign: "center" }}>First Name</th>
                        <th style={{ textAlign: "center" }}>Last Name</th>
                        <th style={{ textAlign: "center" }}>Phone No.</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Credit Score</th>
                        <th style={{ textAlign: "center" }}>Rent</th>
                        <th style={{ textAlign: "center" }}>Start Date</th>
                        <th style={{ textAlign: "center" }}>End Date</th>
                        <th style={{ textAlign: "center" }}>Property No.</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                        <tr key={item.SIN}>
                            <th scope="row">{item.SIN}</th>
                            <td>{item.First_Name}</td>
                            <td>{item.Last_Name}</td>
                            <td>{item.PhoneNo}</td>
                            <td>{item.Email}</td>
                            <td>{item.Credit_Score}</td>
                            <td>{item.Rent}</td>
                            <td>{item.Start_Date}</td>
                            <td>{item.End_Date}</td>
                            <td>{item.P_PropertyNo}</td>
                            <td>
                                <Link to={`/owner/edit-tenant/${item.SIN}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteTenant(item.SIN)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageTenants;