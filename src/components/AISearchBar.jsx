import React, { useRef } from "react";
import lang from "../utilts/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utilts/constants";
import { addAIMovieResult } from "../utilts/aiSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AISearchBar = () => {
    const langkey = useSelector((store) => store.config.lang);
    const dispatch = useDispatch();
    const searhTest = useRef(null);
    let lastRequestTime = 0;

    // search movie in TMDB
    const searchMovieInTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
                movie +
                "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );

        const json = await data.json();

        return json.results;
    };

    const handleAISearchClick = async () => {
        const now = Date.now();
        if (now - lastRequestTime < 5000) {
            // 15-second cooldown
            console.log("Please wait before sending another request.");
            return;
        }
        lastRequestTime = now;

        const AIQuery =
            "Act as a Movie recommendation system and suggest some movies for the query (only give the movie names) " +
            searhTest.current.value +
            ". only give me names of 5 movies, comma separated like the example given ahead. Example result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        // Call Gemini API to fetch suggestions for the search query.
        try {
            const genAI = new GoogleGenerativeAI(
                import.meta.env.VITE_GEMINI_API_KEY
            );
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash",
            });

            const result = await model.generateContent(AIQuery); // No need for `{ prompt: AIQuery }`

            const response = await result.response; // Correct way to get response
            const AIResult = response.text(); // Get text output
            console.log(AIResult);

            let movieNames = [];
            if (AIResult) {
                movieNames = AIResult.split(",").map((name) => name.trim());
            }

            const promiseArray = movieNames.map((movie) =>
                searchMovieInTMDB(movie)
            );

            const tmdbResults = await Promise.all(promiseArray);

            dispatch(
                addAIMovieResult({ movieNames, movieResults: tmdbResults })
            );
        } catch (error) {
            console.error("Error fetching AI results:", error);
        }
    };

    return (
        <div className="pt-34 px-2 md:pt-24 flex justify-center items-center">
            <form
                className="w-full md:w-1/2 bg-black rounded-lg grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searhTest}
                    type="text"
                    className="p-2 md:p-3 m-2 md:m-4 text-sm md:text-lg col-span-9 rounded-md bg-white"
                    placeholder={lang[langkey].AISearchPlaceholder}
                />
                <button
                    className="text-sm md:text-lg p-2 px-2 md:py-2 md:px-4 m-2 md:m-4 col-span-3 bg-[#d9232e] text-white rounded-md"
                    onClick={handleAISearchClick}
                >
                    {lang[langkey].search}
                </button>
            </form>
        </div>
    );
};

export default AISearchBar;
