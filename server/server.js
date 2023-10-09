const express = require("express");
const db = require("./database.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());

const propertyRoute = require("./routes/Property.js");
app.use("/api/property", propertyRoute);

const propertyManagerRoute = require("./routes/PropertyManager.js");
app.use("/api/property-manager", propertyManagerRoute);

const tenantRoute = require("./routes/Tenant.js");
app.use("/api/tenant", tenantRoute);

const workOrderRoute = require("./routes/WorkOrder.js");
app.use("/api/work-order", workOrderRoute);

const mortgageRoute = require("./routes/Mortgage.js");
app.use("/api/mortgage", mortgageRoute);

const financialRecordRoute = require("./routes/FinancialRecord.js");
app.use("/api/financial-record", financialRecordRoute);

const memoRoute = require("./routes/Memo.js");
app.use("/api/memo", memoRoute);

app.post("/api/owner-login", (req, res) => {
	const sin = req.body.sin;

	db.query("SELECT * FROM OWNER WHERE SIN = ?", [sin], (err, result) => {
		if (err) {
			res.send({ err: err });
		}
		if (result.length > 0) {
			res.send(result);
		} else {
			res.send({ message: "Incorrect SIN" });
		}
	});
});

app.post("/api/property-manager-login", (req, res) => {
	const sin = req.body.sin;

	db.query("SELECT * FROM PROPERTY_MANAGER WHERE SIN = ?", [sin], (err, result) => {
		if (err) {
			res.send({ err: err });
		}
		if (result.length > 0) {
			res.send(result);
		} else {
			res.send({ message: "Incorrect SIN" });
		}
	});
});

app.post("/api/tenant-login", (req, res) => {
	const sin = req.body.sin;

	db.query("SELECT * FROM TENANT WHERE SIN = ?", [sin], (err, result) => {
		if (err) {
			res.send({ err: err });
		}
		if (result.length > 0) {
			res.send(result);
		} else {
			res.send({ message: "Incorrect SIN" });
		}
	});
});

app.listen(3001, () => {
	console.log("Server is running");
});
