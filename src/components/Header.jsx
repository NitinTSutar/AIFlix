import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utilts/firebase";
import { useNavigate } from "react-router";

const Header = () => {
    const Navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                Navigate("/");
            })
            .catch((error) => {
                // An error happened.
                Navigate("/error");
            });
    };
    return (
        <div className="absolute w-screen  px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img
                className="w-44"
                src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="logo"
            />
            <div className="flex items-center gap-3">
                <img
                    className="w-9 h-9"
                    src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
                    alt="user_logo"
                />
                <button
                    onClick={() => {
                        handleSignOut();
                    }}
                    className="bg-gray-500 text-white py-1 px-4 rounded-xl hover:bg-red-600 cursor-pointer"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Header;
