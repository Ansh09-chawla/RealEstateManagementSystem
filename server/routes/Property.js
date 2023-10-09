const express = require("express");
const cors = require("cors");
const db = require("../database.js");
const router = express.Router();

//router.use(express.json());
//router.use(cors());

router.get("/view-all", (req, res) => {
	db.query("SELECT * FROM PROPERTY", (error, result) => {
	  	res.send(result);
	});
});

router.get("/view-all-pm/:paramPM_SIN", (req, res) => {
	const { paramPM_SIN } = req.params;
	db.query("SELECT * FROM PROPERTY WHERE PM_SIN = ?", paramPM_SIN, (error, result) => {
		if (error) {
			res.send(error);
		}
		res.send(result);
	});
});

router.delete("/remove/:paramPropertyNo", (req, res) => {
	const { paramPropertyNo } = req.params;
	db.query("DELETE FROM PROPERTY WHERE PropertyNo = ?", paramPropertyNo, (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.get("/view/:paramPropertyNo", (req, res) => {
	const { paramPropertyNo } = req.params;
	db.query("SELECT * FROM PROPERTY WHERE PropertyNo = ?", paramPropertyNo, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.post("/add", (req, res) => {
	const { PropertyNo, NoOfUnits, City, Country, Street, Postal_Code, PM_SIN } = req.body;
	db.query("INSERT INTO PROPERTY (PropertyNo, NoOfUnits, City, Country, Street, Postal_Code, PM_SIN) VALUES (?, ?, ?, ?, ?, ?, ?)", 
			[PropertyNo, NoOfUnits, City, Country, Street, Postal_Code, PM_SIN], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.put("/update/:paramPropertyNo", (req, res) => {
    const {paramPropertyNo} = req.params;
    const {NoOfUnits, City, Country, Street, Postal_Code, PM_SIN} = req.body;
    db.query("UPDATE PROPERTY SET NoOfUnits = ?, City = ?, Country = ?, Street = ?, Postal_Code = ?, PM_SIN = ? WHERE PropertyNo = ?", 
			[NoOfUnits, City, Country, Street, Postal_Code, PM_SIN, paramPropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
    });
});

module.exports = router;