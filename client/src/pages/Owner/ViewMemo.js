import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
//import "./View.css";

const ViewMemo = () => {
  const [memo, setMemo] = useState({});

  const { paramMemoNo } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/memo/view/${paramMemoNo}`).then((resp) => 
        setMemo({ ...resp.data[0] }));
  }, [paramMemoNo]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Memo Details</p>
        </div>
        <div className="container">
          <strong>MemoNo: </strong>
          <span>{memo.MemoNo}</span>
          <br />
          <br />
          <strong>Property No.: </strong>
          <span>{memo.P_PropertyNo}</span>
          <br />
          <br />
          <strong>Message: </strong>
          <span>{memo.Message}</span>
          <br />
          <br />
          <strong>Owner SIN: </strong>
          <span>{memo.O_SIN}</span>
          <br />
          <br />
          <strong>Property Manager SIN: </strong>
          <span>{memo.PM_SIN}</span>
          <br />
          <br />
          <Link to="/owner/manage-memos">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewMemo;
