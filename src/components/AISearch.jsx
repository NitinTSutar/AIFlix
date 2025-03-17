import React from "react";
import AISearchBar from "./AISearchBar";
import AIMovieSuggestions from "./AIMovieSuggestions";
import { BG_IMG } from "../utilts/constants";

const AISearch = () => {
    return (
        <>
            <div className="fixed -z-10">
                <img
                    className="h-dvh w-dvw object-cover"
                    src={BG_IMG}
                    alt="background"
                />
            </div>
            <div className="">
                <AISearchBar />
                <AIMovieSuggestions />
            </div>
        </>
    );
};

export default AISearch;
