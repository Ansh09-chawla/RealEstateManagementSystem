import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login.js";
import OwnerLogin from "./pages/OwnerLogin.js";
import PropertyManagerLogin from "./pages/PropertyManagerLogin.js";
import TenantLogin from "./pages/TenantLogin.js";

import OHome from "./pages/Owner/Home.js";
import OManageProperties from "./pages/Owner/ManageProperties.js"
import OAddEditProperty from "./pages/Owner/AddEditProperty.js"
import OManagePropertyManagers from "./pages/Owner/ManagePropertyManagers.js"
import OAddEditPropertyManager from "./pages/Owner/AddEditPropertyManager.js"
import OManageTenants from "./pages/Owner/ManageTenants.js"
import OAddEditTenant from "./pages/Owner/AddEditTenant.js"
import OManageWorkOrders from "./pages/Owner/ManageWorkOrders.js"
import OAddEditWorkOrder from "./pages/Owner/AddEditWorkOrder.js"
import OManageMortgages from "./pages/Owner/ManageMortgages.js"
import OAddEditMortgage from "./pages/Owner/AddEditMortgage.js"
import OManageFinancialRecords from "./pages/Owner/ManageFinancialRecords.js"
import OAddEditFinancialRecord from "./pages/Owner/AddEditFinancialRecord.js"
import OManageMemos from "./pages/Owner/ManageMemos.js"
import OAddEditMemo from "./pages/Owner/AddEditMemo.js"
import OViewMemo from "./pages/Owner/ViewMemo.js"

import PMHome from "./pages/PropertyManager/Home.js";
import PMManageProperties from "./pages/PropertyManager/ManageProperties.js";
import PMEditProperty from "./pages/PropertyManager/EditProperty.js";
import PMManageTenants from "./pages/PropertyManager/ManageTenants.js";
import PMAddEditTenant from "./pages/PropertyManager/AddEditTenant.js";
import PMManageWorkOrder from "./pages/PropertyManager/ManageWorkOrders.js";
import PMAddEditWorkOrder from "./pages/PropertyManager/AddEditWorkOrders.js";
import PMManageMemos from "./pages/PropertyManager/ManageMemos.js";
import PMAddEditMemo from "./pages/PropertyManager/AddEditMemo.js";
import PMViewMemo from "./pages/PropertyManager/ViewMemo.js"

import THome from "./pages/Tenant/Home.js";
import TViewMemos from "./pages/Tenant/MemosList.js"
import TViewMemo from "./pages/Tenant/ViewMemo.js"



function App() {

	return (

		<Router>
			<div className="App">
				<ToastContainer position="top-center" />
				<Routes>
					<Route exact path="/" element={<Login />}/>
					<Route exact path="/owner-login" element={<OwnerLogin />}/>
					<Route exact path="/property-manager-login" element={<PropertyManagerLogin />}/>
					<Route exact path="/tenant-login" element={<TenantLogin />}/>

					<Route exact path="/owner/home" element={<OHome />}/>
					<Route exact path="/owner/manage-properties" element={<OManageProperties />}/>
					<Route exact path="/owner/add-property" element={<OAddEditProperty />}/>
					<Route exact path="/owner/edit-property/:paramPropertyNo" element={<OAddEditProperty />}/>

					<Route exact path="/owner/manage-property-managers" element={<OManagePropertyManagers />}/>
					<Route exact path="/owner/add-property-manager" element={<OAddEditPropertyManager />}/>
					<Route exact path="/owner/edit-property-manager/:paramSIN" element={<OAddEditPropertyManager />}/>

					<Route exact path="/owner/manage-tenants" element={<OManageTenants />}/>
					<Route exact path="/owner/add-tenant" element={<OAddEditTenant />}/>
					<Route exact path="/owner/edit-tenant/:paramSIN" element={<OAddEditTenant />}/>

					<Route exact path="/owner/manage-work-orders" element={<OManageWorkOrders />}/>
					<Route exact path="/owner/add-work-order" element={<OAddEditWorkOrder />}/>
					<Route exact path="/owner/edit-work-order/:paramRefNo" element={<OAddEditWorkOrder />}/>

					<Route exact path="/owner/manage-mortgages" element={<OManageMortgages />}/>
					<Route exact path="/owner/add-mortgage" element={<OAddEditMortgage />}/>
					<Route exact path="/owner/edit-mortgage/:paramRefNo" element={<OAddEditMortgage />}/>

					<Route exact path="/owner/manage-financial-records" element={<OManageFinancialRecords />}/>
					<Route exact path="/owner/add-financial-record" element={<OAddEditFinancialRecord />}/>
					<Route exact path="/owner/edit-financial-record/:paramRecordNo" element={<OAddEditFinancialRecord />}/>

					<Route exact path="/owner/manage-memos" element={<OManageMemos />}/>
					<Route exact path="/owner/add-memo" element={<OAddEditMemo />}/>
					<Route exact path="/owner/edit-memo/:paramMemoNo" element={<OAddEditMemo />}/>
					<Route exact path="/owner/view-memo/:paramMemoNo" element={<OViewMemo />}/>

					<Route exact path="/propertyManager/home/:paramPM_SIN" element={<PMHome />}/>

					<Route exact path="/propertyManager/manage-properties/:paramPM_SIN" element={<PMManageProperties />}/>
					<Route exact path="/propertyManager/edit-property/:paramPM_SIN/:paramPropertyNo" element={<PMEditProperty />}/>

					<Route exact path="/propertyManager/manage-tenants/:paramPM_SIN" element={<PMManageTenants />}/>
					<Route exact path="/propertyManager/add-tenant/:paramPM_SIN" element={<PMAddEditTenant />}/>
					<Route exact path="/propertyManager/edit-tenant/:paramPM_SIN/:paramSIN" element={<PMAddEditTenant />}/>

					<Route exact path="/propertyManager/manage-work-orders/:paramPM_SIN" element={<PMManageWorkOrder />}/>
					<Route exact path="/propertyManager/add-work-order/:paramPM_SIN" element={<PMAddEditWorkOrder />}/>
					<Route exact path="/propertyManager/edit-work-order/:paramPM_SIN/:paramRefNo" element={<PMAddEditWorkOrder />}/>

					<Route exact path="/propertyManager/manage-memos/:paramPM_SIN" element={<PMManageMemos />}/>
					<Route exact path="/propertyManager/add-memo/:paramPM_SIN" element={<PMAddEditMemo />}/>
					<Route exact path="/propertyManager/edit-memo/:paramPM_SIN/:paramMemoNo" element={<PMAddEditMemo />}/>
					<Route exact path="/propertyManager/view-memo/:paramPM_SIN/:paramMemoNo" element={<PMViewMemo />}/>

					<Route exact path="/tenant/home/:paramT_SIN" element={<THome />}/>
					<Route exact path="/tenant/view-memos/:paramT_SIN" element={<TViewMemos />}/>	
					<Route exact path="/tenant/view-memo/:paramT_SIN/:paramMemoNo" element={<TViewMemo />}/>

				</Routes>
			</div>
		</Router>
	);
}

export default App;
