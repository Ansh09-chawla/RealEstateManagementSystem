const express = require("express");
const cors = require("cors");
const db = require("../database.js");
const router = express.Router();

//router.use(express.json());
//router.use(cors());

router.get("/view-all", (req, res) => {
	db.query("SELECT * FROM TENANT", (error, result) => {
	  	res.send(result);
	});
});

router.get("/view-all-pm/:paramPM_SIN", (req, res) => {
	const { paramPM_SIN } = req.params;
	db.query("SELECT T.SIN, T.First_Name, T.Last_Name, T.PhoneNo, T.Email, T.Credit_Score, T.Rent, T.Start_Date, T.End_Date, T.P_PropertyNo FROM TENANT AS T, PROPERTY AS P WHERE T.P_PropertyNo = P.PropertyNo AND P.PM_SIN = ?", paramPM_SIN, (error, result) => {
	  	res.send(result);
	});
});

router.delete("/remove/:paramSIN", (req, res) => {
	const { paramSIN } = req.params;
	db.query("DELETE FROM TENANT WHERE SIN = ?", paramSIN, (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.get("/view/:paramSIN", (req, res) => {
	const { paramSIN } = req.params;
	db.query("SELECT * FROM TENANT WHERE SIN = ?", paramSIN, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});

router.post("/add", (req, res) => {
	const {SIN, First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo} = req.body;
	db.query("INSERT INTO TENANT (SIN, First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
			[SIN, First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo], (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});

router.post("/add-pm/:paramPM_SIN", (req, res) => {
	const { paramPM_SIN } = req.params;
	const {SIN, First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo} = req.body;
	db.query("SELECT PropertyNo FROM  PROPERTY WHERE PM_SIN = ? AND PropertyNo = ?", [paramPM_SIN, P_PropertyNo] , (error, result) => {
		if(result.length > 0){
			db.query("INSERT INTO TENANT (SIN, First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
					[SIN, First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo], (error_2, result_2) => {
		        if (error_2) {
			       console.log(error_2);
		        }
			});	
       }
    });
});	

router.put("/update/:paramSIN", (req, res) => {
    const {paramSIN} = req.params;
    const {First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo} = req.body;
    db.query("UPDATE TENANT SET First_Name = ?, Last_Name = ?, PhoneNo = ?, Email = ?, Credit_Score = ?, Rent = ?, Start_Date = ?, End_Date = ?, P_PropertyNo = ? WHERE SIN = ?", 
			[First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo, paramSIN], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
    });
});

router.put("/update-pm/:paramPM_SIN/:paramSIN", (req, res) => {
    const {paramPM_SIN, paramSIN} = req.params;
    const {First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo} = req.body;
	db.query("SELECT PropertyNo FROM  PROPERTY WHERE PM_SIN = ? AND PropertyNo = ? ",[paramPM_SIN, P_PropertyNo],  (error, result) => {
		if(result.length>0){    
	        db.query("UPDATE TENANT SET First_Name = ?, Last_Name = ?, PhoneNo = ?, Email = ?, Credit_Score = ?, Rent = ?, Start_Date = ?, End_Date = ?, P_PropertyNo = ? WHERE SIN = ?", 
			[First_Name, Last_Name, PhoneNo, Email, Credit_Score, Rent, Start_Date, End_Date, P_PropertyNo, paramSIN], (error_2, result_2) => {
		        if (error_2) {
			       console.log(error_2);
		        }
		        res.send(result_2);
	       });	
        }
    });
});	

module.exports = router;