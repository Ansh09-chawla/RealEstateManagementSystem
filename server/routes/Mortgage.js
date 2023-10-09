const express = require("express");
const cors = require("cors");
const db = require("../database.js");
const router = express.Router();

//router.use(express.json());
//router.use(cors());

router.get("/view-all", (req, res) => {
	db.query("SELECT * FROM MORTGAGE", (error, result) => {
	  	res.send(result);
	});
});

router.delete("/remove/:paramRefNo", (req, res) => {
	const { paramRefNo } = req.params;
	db.query("DELETE FROM MORTGAGE WHERE RefNo = ?", paramRefNo, (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.get("/view/:paramRefNo", (req, res) => {
	const { paramRefNo } = req.params;
	db.query("SELECT * FROM MORTGAGE WHERE RefNo = ?", paramRefNo, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.post("/add", (req, res) => {
	const {RefNo, Principal_Amount,  Monthly_Payment, Interest_Rate, Term, Bank, P_PropertyNo} = req.body;
	db.query("INSERT INTO MORTGAGE (RefNo, Principal_Amount,  Monthly_Payment, Interest_Rate, Term, Bank, P_PropertyNo) VALUES (?, ?, ?, ?, ?, ?, ?)", 
			[RefNo, Principal_Amount,  Monthly_Payment, Interest_Rate, Term, Bank, P_PropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.put("/update/:paramRefNo", (req, res) => {
    const {paramRefNo} = req.params;
    const {Principal_Amount,  Monthly_Payment, Interest_Rate, Term, Bank, P_PropertyNo} = req.body;
    db.query("UPDATE MORTGAGE SET Principal_Amount = ?, Monthly_Payment = ?, Interest_Rate = ?, Term = ?, Bank = ?, P_PropertyNo = ? WHERE RefNo = ?", 
			[Principal_Amount,  Monthly_Payment, Interest_Rate, Term, Bank, P_PropertyNo, paramRefNo], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
    });
});

module.exports = router;