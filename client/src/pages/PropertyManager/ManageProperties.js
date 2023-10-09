import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import "../Manage.css";


function ManageProperties(){


    const [data, setData] = useState([]);
    const {paramPM_SIN} = useParams();

    const loadData = async () => {
        await Axios.get(`http://localhost:3001/api/property/view-all-pm/${paramPM_SIN}`).then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);



    return (
        <div style={{ marginTop: "150px" }}>
            <Link to={`/propertyManager/home/${paramPM_SIN}`}>
			    <button class="btn btn-back">Go Back</button>
			</Link>
        
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Property No.</th>
                        <th style={{ textAlign: "center" }}>No. of Units</th>
                        <th style={{ textAlign: "center" }}>City</th>
                        <th style={{ textAlign: "center" }}>Country</th>
                        <th style={{ textAlign: "center" }}>Street</th>
                        <th style={{ textAlign: "center" }}>Postal Code</th>
                        <th style={{ textAlign: "center" }}>Property Manager SIN</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                        <tr key={item.PropertyNo}>
                            <th scope="row">{item.PropertyNo}</th>
                            <td>{item.NoOfUnits}</td>
                            <td>{item.City}</td>
                            <td>{item.Country}</td>
                            <td>{item.Street}</td>
                            <td>{item.Postal_Code}</td>
                            <td>{item.PM_SIN}</td>
                            <td>
                                <Link to={`/propertyManager/edit-property/${paramPM_SIN}/${item.PropertyNo}`}>
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                            
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProperties;