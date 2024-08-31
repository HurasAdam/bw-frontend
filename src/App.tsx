import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AppContextProvider } from "./contexts/AppContext";
import Deparments from "./pages/Deparments";
import HelpdeskPage from "./pages/HelpdeskPage";
import DepartmentsLayouts from "./layouts/DepartmentsLayouts";

import SalesPage from "./pages/SalesPage";
import AdministrationPage from "./pages/AdministrationPage";
import AppointmentPage from "./pages/AppointmentPage";
import SearchPage from "./pages/SearchPage";
import CreateArticlePage from "./pages/CreateArticlePage";

function App() {
    return (
      <main className="w-full min-h-screen bg-main ">
      <Routes>
<Route element={<DefaultLayout/>}>
<Route path="/" element={<Dashboard/>}/>
<Route path="search" element={<SearchPage/>}/>
<Route path="arcticle/new" element={<CreateArticlePage/>}/>
<Route path="departments" element={<Deparments/>}>
<Route index element={<Navigate to="helpdesk" replace />} />
<Route index path="helpdesk" element={<HelpdeskPage/>}/>
<Route path="sales" element={<SalesPage/>}/>
<Route path="administration" element={<AdministrationPage/>}/>
<Route path="appointment" element={<AppointmentPage/>}/>
</Route>
</Route>

<Route element={<GuestLayout/>}>
  <Route path="login" element={<Login/>}/>
  <Route path="register" element={<Register/>}/>
</Route>
      </Routes>
    </main>
    );
  }
  
  export default App;