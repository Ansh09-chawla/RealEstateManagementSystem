import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
//import "./View.css";

const ViewMemo = () => {
  const [memo, setMemo] = useState({});

  const {paramT_SIN,paramMemoNo } = useParams();

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
          <strong>Message: </strong>
          <span>{memo.Message}</span>
          <br />
          <br />
          <Link to={`/tenant/view-memos/${paramT_SIN}`}>
            <div className="btn btn-back">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewMemo;
