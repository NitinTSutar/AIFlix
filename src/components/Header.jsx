import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utilts/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utilts/userSlice";
import { APP_LOGO } from "../utilts/constants";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {})
            .catch(() => {
                // An error happened.
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });
        // unsubscribe when component is unmounted.
        return () => unsubscribe();
    }, []);

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-44" src={APP_LOGO} alt="logo" />
            {user && (
                <div className="flex items-center gap-3">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={
                            user?.photoURL || "https://via.placeholder.com/150"
                        }
                        alt="user_logo"
                    />
                    <button
                        onClick={handleSignOut}
                        className="bg-gray-500/50 text-white py-1 px-4 rounded-xl hover:bg-red-600/8 0 cursor-pointer"
                    >
                        (Sign Out)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
