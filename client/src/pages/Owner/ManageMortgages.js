import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Axios from "axios";
import "../Manage.css";

function ManageMortgages(){



    const [data, setData] = useState([]);

    const loadData = async () => {
        await Axios.get("http://localhost:3001/api/mortgage/view-all").then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);

    const deleteMortgage = (SIN) => {
        if (window.confirm("Are you sure that you wanted to delete this mortgage?")) {
            Axios.delete(`http://localhost:3001/api/mortgage/remove/${SIN}`);
            toast.success("Mortgage Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/owner/add-mortgage">
                <button className="btn btn-add">Add Mortgage</button>
            </Link>
            <Link to="/owner/home">
			    <button class="btn btn-back">Go Back</button>
			</Link>
        
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Ref No.</th>
                        <th style={{ textAlign: "center" }}>Principal Amount</th>
                        <th style={{ textAlign: "center" }}>Monthly Payment</th>
                        <th style={{ textAlign: "center" }}>Interest Rate</th>
                        <th style={{ textAlign: "center" }}>Term</th>
                        <th style={{ textAlign: "center" }}>Bank</th>
                        <th style={{ textAlign: "center" }}>Property No.</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                        <tr key={item.RefNo}>
                            <th scope="row">{item.RefNo}</th>
                            <td>{item.Principal_Amount}</td>
                            <td>{item.Monthly_Payment}</td>
                            <td>{item.Interest_Rate}</td>
                            <td>{item.Term}</td>
                            <td>{item.Bank}</td>
                            <td>{item.P_PropertyNo}</td>
                            <td>
                                <Link to={`/owner/edit-mortgage/${item.RefNo}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteMortgage(item.RefNo)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageMortgages;