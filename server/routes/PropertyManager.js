const express = require("express");
const cors = require("cors");
const db = require("../database.js");
const router = express.Router();

//router.use(express.json());
//router.use(cors());

router.get("/view-all", (req, res) => {
	db.query("SELECT * FROM PROPERTY_MANAGER", (error, result) => {
	  	res.send(result);
	});
});

router.delete("/remove/:paramSIN", (req, res) => {
	const { paramSIN } = req.params;
	db.query("DELETE FROM PROPERTY_MANAGER WHERE SIN = ?", paramSIN, (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.get("/view/:paramSIN", (req, res) => {
	const { paramSIN } = req.params;
	db.query("SELECT * FROM PROPERTY_MANAGER WHERE SIN = ?", paramSIN, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.post("/add", (req, res) => {
	const {SIN, First_Name, Last_Name, PhoneNo, Email, Background_Check, O_SIN} = req.body;
	db.query("INSERT INTO PROPERTY_MANAGER (SIN, First_Name, Last_Name, PhoneNo, Email, Background_Check, O_SIN) VALUES (?, ?, ?, ?, ?, ?, ?)", 
			[SIN, First_Name, Last_Name, PhoneNo, Email, Background_Check, O_SIN], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.put("/update/:paramSIN", (req, res) => {
    const {paramSIN} = req.params;
    const {First_Name, Last_Name, PhoneNo, Email, Background_Check, O_SIN} = req.body;
    db.query("UPDATE PROPERTY_MANAGER SET First_Name = ?, Last_Name = ?, PhoneNo = ?, Email = ?, Background_Check = ?, O_SIN = ? WHERE SIN = ?", 
			[First_Name, Last_Name, PhoneNo, Email, Background_Check, O_SIN, paramSIN], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
    });
});

module.exports = router;