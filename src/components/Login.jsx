import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    className="h-dvh w-dvw "
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs"
                    alt="background"
                />
            </div>
            <form className="text-white absolute p-12 w-3/12 bg-black/80 rounded-xl border-0 my-36 mx-auto right-0 left-0 ">
                <h1 className="font-bold text-3xl py-4">
                    {isSignIn ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignIn && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                    />
                )}
                <input
                    type="text"
                    placeholder="Email"
                    className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 my-2 w-full bg-gray-700/70 border-[0.5px] border-gray-400 rounded-sm"
                />
                <button className="p-2 my-4 bg-[#d9232e] w-full rounded-sm cursor-pointer">
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
