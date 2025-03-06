import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_IMG } from "../utilts/constants";

const GPTSearch = () => {
    return (
        <>
            <div className="fixed -z-10">
                <img className="h-dvh w-dvw object-cover" src={BG_IMG} alt="background" />
            </div>
            <div className="">
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </>
    );
};

export default GPTSearch;
