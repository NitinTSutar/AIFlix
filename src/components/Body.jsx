import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GPTSearch from "./GPTSearch";


const Body = () => {
    

    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="browse" element={<Browse />} />
                {/* <Route path="gptsearch" element={<GPTSearch />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Body;
