import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Attendance from './Pages/Attendance/Attendance';
import NotFound from './Pages/NotFound/NotFound';

import Home from './Pages/Home/Home';

function Routers() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/attendance" element={<Attendance />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
export default Routers;