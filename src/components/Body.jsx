import React from "react";
import Login from "./Login";
import Browse from "./Browse";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const Body = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="browse" element={<Browse />} />
            </Routes>
        </Router>
    );
};

export default Body;
