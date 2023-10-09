import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Axios from "axios";
import "../Manage.css";

function ManagePropertyManagers(){

    const [data, setData] = useState([]);

    const loadData = async () => {
        await Axios.get("http://localhost:3001/api/property-manager/view-all").then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);

    const deletePropertyManager = (SIN) => {
        if (window.confirm("Are you sure that you wanted to delete this property manager?")) {
            Axios.delete(`http://localhost:3001/api/property-manager/remove/${SIN}`);
            toast.success("Property Manager Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/owner/add-property-manager">
                <button className="btn btn-add">Add Property Manager</button>
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
                        <th style={{ textAlign: "center" }}>Background Check</th>
                        <th style={{ textAlign: "center" }}>Supervising Owner SIN</th>
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
                            <td>{item.Background_Check}</td>
                            <td>{item.O_SIN}</td>
                            <td>
                                <Link to={`/owner/edit-property-manager/${item.SIN}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deletePropertyManager(item.SIN)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManagePropertyManagers;