import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Attendance from './Pages/Attendance/Attendance';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';

import Home from './Pages/Home/Home';
import Management from "./Pages/Management/Management";
import Staffs from "./Pages/Management/Staffs/Staffs";
import Logout from "./Pages/Logout/Logout";

function Routers() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/attendance" element={<Attendance />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/management" element={<Management />} />
                <Route exact path="/logout" element={<Logout />} />

                <Route path="/management/staffs" element={<Staffs />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
export default Routers;