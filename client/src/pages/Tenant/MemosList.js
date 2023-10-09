import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import "../Manage.css";


function MemosList(){


    const [data, setData] = useState([]);
    const {paramT_SIN} = useParams();

    const loadData = async () => {
        await Axios.get(`http://localhost:3001/api/memo/view-all-t/${paramT_SIN}`).then((response) => {
            setData(response.data);
        });
      };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to={`/tenant/home/${paramT_SIN}`}>
			    <button class="btn btn-back">Go Back</button>
			</Link>
        
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Memo No.</th>
                        <th style={{ textAlign: "center" }}>Property No.</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                        <tr key={item.MemoNo}>
                            <th scope="row">{item.MemoNo}</th>
                            <td>{item.P_PropertyNo}</td>
                            <td>
                                <Link to={`/tenant/view-memo/${paramT_SIN}/${item.MemoNo}`}>
                                    <button className="btn btn-view">View</button>
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

export default MemosList;