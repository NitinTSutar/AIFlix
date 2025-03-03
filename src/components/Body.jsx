import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utilts/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utilts/userSlice";

const Body = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                    })
                );
            } else {
                // User is signed out
                dispatch(removeUser());
            }
        });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="browse" element={<Browse />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Body;
