import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utilts/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utilts/userSlice";
import { APP_LOGO, SUPPORTED_LANGUAGES } from "../utilts/constants";
import { toggleGptSearchView } from "../utilts/gptSlice";
import { changeLanguage } from "../utilts/configSlice";
import lang from "../utilts/languageConstant";
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSeach = useSelector((store) => store.gpt.showGptSearch);
     const langkey = useSelector((store) => store.config.lang);

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

    const handleGptSearchClick = () => {
        // togle gpt search
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-44" src={APP_LOGO} alt="logo" />
            {user && (
                <div className="flex items-center gap-3">
                   {showGptSeach &&  <select
                        className=" p-2 m-2 bg-gray-900 text-white"
                        onChange={handleLanguageChange}
                    >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <option
                                key={lang.identifier}
                                value={lang.identifier}
                            >
                                {lang.name}
                            </option>
                        ))}
                    </select>}

                    <button
                        className="py-2 px-4 m-2 text-black bg-white/50 hover:bg-white cursor-pointer rounded-md"
                        onClick={handleGptSearchClick}
                    >
                        {showGptSeach ?   lang[langkey].homeBtn : "GPT Search"}
                    </button>
                    <img
                        className="w-12 h-12 rounded-full"
                        src={
                            user?.photoURL || "https://via.placeholder.com/150"
                        }
                        alt="user_logo"
                    />
                    <button
                        onClick={handleSignOut}
                        className="bg-gray-500/50 text-white py-1 px-4 rounded-md hover:bg-red-600/80 cursor-pointer"
                    >
                        {lang[langkey].signOutBtn}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
