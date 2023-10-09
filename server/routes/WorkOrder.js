const express = require("express");
const cors = require("cors");
const db = require("../database.js");
const router = express.Router();

//router.use(express.json());
//router.use(cors());

router.get("/view-all", (req, res) => {
	db.query("SELECT * FROM WORK_ORDER", (error, result) => {
	  	res.send(result);
	});
});
router.get("/view-all-pm/:paramPM_SIN", (req, res) => {
	const { paramPM_SIN } = req.params;
	db.query("SELECT * FROM WORK_ORDER WHERE PM_SIN = ? ",paramPM_SIN, (error, result) => {
	  	res.send(result);
	});
});

router.delete("/remove/:paramRefNo", (req, res) => {
	const { paramRefNo } = req.params;
	db.query("DELETE FROM WORK_ORDER WHERE RefNo = ?", paramRefNo, (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.get("/view/:paramRefNo", (req, res) => {
	const { paramRefNo } = req.params;
	db.query("SELECT * FROM WORK_ORDER WHERE RefNo = ?", paramRefNo, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.post("/add", (req, res) => {
	const {RefNo, Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo} = req.body;
	db.query("INSERT INTO WORK_ORDER (ReFNo, Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
			[RefNo, Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});
router.post("/add-pm/:paramPM_SIN", (req, res) => {
	const { paramPM_SIN } = req.params;
	const {RefNo, Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo} = req.body;
	db.query("SELECT PropertyNo FROM  PROPERTY WHERE PM_SIN = ? AND PropertyNo = ?", [paramPM_SIN, P_PropertyNo] , (error, result) => {
		if(result.length > 0){
	        db.query("INSERT INTO WORK_ORDER (ReFNo, Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
			        [RefNo, Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo], (error_2, result_2) => {
		        if (error_2) {
			        console.log(error_2);
		        }
		   });	
	    }
    });
});	
router.put("/update/:paramRefNo", (req, res) => {
    const {paramRefNo} = req.params;
    const {Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo} = req.body;
    db.query("UPDATE WORK_ORDER SET Task = ?, Expense = ?, Time = ?, Date = ?, Approval_Date = ?, O_SIN = ?, PM_SIN = ?, P_PropertyNo = ? WHERE RefNo = ?", 
			[Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo, paramRefNo], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
    });
});

router.put("/update-pm/:paramPM_SIN/:paramRefNo", (req, res) => {
    const {paramPM_SIN, paramRefNo} = req.params;
    const {Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo} = req.body;
	db.query("SELECT PropertyNo FROM  PROPERTY WHERE PM_SIN = ? AND PropertyNo = ? ",[paramPM_SIN, P_PropertyNo],  (error, result) => {
		if(result.length>0){
            db.query("UPDATE WORK_ORDER SET Task = ?, Expense = ?, Time = ?, Date = ?, Approval_Date = ?, O_SIN = ?, PM_SIN = ?, P_PropertyNo = ? WHERE RefNo = ?", 
			[Task, Expense, Time, Date, Approval_Date, O_SIN, PM_SIN, P_PropertyNo, paramRefNo], (error_2, result_2) => {
		        if (error_2) {
			        console.log(error_2);
		        }
		        res.send(result_2);
			});	
        }
    });
});	

module.exports = router;