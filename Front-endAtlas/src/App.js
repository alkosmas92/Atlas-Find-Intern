import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GetStudents from "./components/Student/getStudents";
import GetSavedInterships from "./components/Intership/getSavedInterships";
import GetRequestedInterships from "./components/Intership/getRequestedInterships";
import GetAcceptedInterships from "./components/Intership/getaAcceptedInterships";
import GetRejectedInterships from "./components/Intership/getRejectedInterships";
import GetIntership from "./components/Intership/getIntership";
import GetOnlineInterships from "./components/Intership/getOnlineInterships";
import GetCompanySaveInterships from "./components/Intership/getCompanySaveInterships";
import GetCompanyRequestsIntership from "./components/Intership/getCompanyRequestsIntership";
import GetIntershipsByEmployer from "./components/Intership/getallIntershipsByEmployer";
import CreateStudent from "./components/Student/createnewStudent";
import StudentDeleteIntership from "./components/Intership/studentDelIntership";
import Home from "./components/Home/Home";
import UpadateStudent from "./components/Student/upadateStudent";
import DeleteStudent from "./components/Student/DeleteStudent";
import CreateCompany from "./components/Companies/createCompany";
import HomeStudent from "./components/Home/homeStudent";
import HomeCompany from "./components/Home/homeCompany";
import CreateInteship from "./components/Intership/createIntership";
import CheckRelasionship from "./components/Student/CheckRelasionship";
import GetCompanyRequestsInterships from "./components/Companies/GetCompanyRequestsInterships";
import GetCompanyIntershipRequestStudent from "./components/Student/GetCompanyIntershipRequestStudent";
import Search1 from "./components/Intership/seachv2";
import Mathed from "./components/Student/mathed";
import CompanyMathed from "./components/Companies/companyMathed";
import CompanyWaited from "./components/Companies/CompanyWaited";
import "./style.css";
import SigninCompany from "./components/Home/signinCompany";
import SigninStudent from "./components/Home/signinStudent";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/*Home*/}
      <Route path="/" element={<Home />} />

      {/*company*/}
      <Route path="/Company" element={<GetStudents />} />

      {/*student*/}
      <Route path="/Students/:id" element={<GetStudents />} />

      <Route path="/newStudent" element={<CreateStudent />} />

      <Route path="/newcompany" element={<CreateCompany />} />

      <Route path="/Students/:id/delete" element={<DeleteStudent />} />
      <Route path="/Students/:id/update" element={<UpadateStudent />} />

      {/*internship*/}
      <Route path="/:id/GetAllInterships" element={<HomeStudent />} />
      <Route
        path="/Students/GetSavedInterships/:id"
        element={<GetSavedInterships />}
      />
      <Route
        path="/Students/GetRequestedInterships/:id"
        element={<GetRequestedInterships />}
      />
      <Route
        path="/Students/GetAcceptedInterships/:id"
        element={<GetAcceptedInterships />}
      />
      <Route
        path="/Students/GetRejectedInterships/:id"
        element={<GetRejectedInterships />}
      />
      <Route path="/Students/GetMatchedInterships/:id" element={<Mathed />} />

      <Route path="/company/:id" element={<HomeCompany />} />
      <Route path="/company/:id/createintership" element={<CreateInteship />} />

      <Route
        path="/:studentid/GetAllInterships/:id"
        element={<GetIntership />}
      />
      <Route
        path="/Students/:studentid/GetIntership/:id/1"
        element={<CheckRelasionship />}
      />
      <Route
        path="/Company/GetOnlineInterships/:id"
        element={<GetOnlineInterships />}
      />
      <Route
        path="/Company/GetMathedInterships/:id"
        element={<CompanyMathed />}
      />
      <Route
        path="/Company/GetWaitedInterships/:id"
        element={<CompanyWaited />}
      />
      <Route
        path="/Company/GetSavedInterships/:id"
        element={<GetCompanySaveInterships />}
      />
      <Route
        path="/api/request_company_intership/:comp_id"
        element={<GetCompanyRequestsInterships />}
      />
      <Route
        path="/api/request_company_intership/:comp_id/:inter_id"
        element={<GetCompanyIntershipRequestStudent />}
      />
      <Route
        path="/Company/GetRequestsforIntership/:comp_id/:inter_id"
        element={<GetCompanyRequestsIntership />}
      />
      <Route
        path="/Students/GetIntershipByEmployer/:employer"
        element={<GetIntershipsByEmployer />}
      />
      <Route
        path="/Students/DeleteIntership/:stud_id/:inter_id"
        element={<StudentDeleteIntership />}
      />
      <Route path="/login/Student" element={<SigninStudent />} />
      <Route path="/login/Company" element={<SigninCompany />} />
      <Route path="/a" element={<Search1 />} />
    </Routes>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
