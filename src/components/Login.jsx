import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utilts/validations";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../utilts/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utilts/userSlice";
import { BG_IMG, photoURL } from "../utilts/constants";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validating the form data.
        const message = checkValidData(
            email.current.value,
            password.current.value
        );
        setErrorMessage(message);

        if (message) return;

        if (!isSignIn) {
            // Sign up logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: photoURL, // Correct property name
                    })
                        .then(() => {
                            // Profile updated!
                            const { uid, email, displayName, photoURL } =
                                auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL, // Correct property name
                                })
                            );
                        })
                        .catch((error) => {
                            // An error occurred
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            // Sign in logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    className="h-dvh w-dvw "
                    src={BG_IMG}
                    alt="background"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="text-white absolute p-12 w-[450px] bg-black/80 rounded-xl border-0 my-36 mx-auto right-0 left-0 "
            >
                <h1 className="font-bold text-3xl py-4">
                    {isSignIn ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignIn && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email"
                    className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                />
                <p className="text-red-600 text-lg py-2">{errorMessage}</p>
                <button
                    className="p-2 my-4 bg-[#d9232e] w-full rounded-sm cursor-pointer"
                    onClick={() => handleButtonClick()}
                >
                    {isSignIn ? "Sign In" : "Sign UP"}
                </button>
                <p
                    className="py-4 cursor-pointer"
                    onClick={() => toggleSignInForm()}
                >
                    {isSignIn
                        ? "New to Nefflix? Sign Up Now"
                        : "Already Registered? Sign In Now"}
                </p>
            </form>
        </div>
    );
};

export default Login;