import React, { useRef } from "react";
import lang from "../utilts/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utilts/constants";
import { addGptMovieResult } from "../utilts/gptSlice";

const GptSearchBar = () => {
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

    const handleGPTSearchClick = async () => {
        const now = Date.now();
        if (now - lastRequestTime < 15000) {
            // 5-second cooldown
            console.log("Please wait before sending another request.");
            return;
        }
        lastRequestTime = now;

        const gptQuery =
            "Act as a Movie recommendation system and suggest some movies for the query (only give the movie names) " +
            searhTest.current.value +
            ". only give me names of 5 movies, comma separated like the example given ahead. Example result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        // Call OpenRouter API to fetch suggestions for the search query.
        try {
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
            console.log("API Key:", apiKey); // Ensure the API key is correctly logged
            const getResults = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        // "HTTP-Referer": "https://your-site-url.com", // Optional. Site URL for rankings on openrouter.ai.
                        // "X-Title": "Nefflix", // Optional. Site title for rankings on openrouter.ai.
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "deepseek/deepseek-r1:free",
                        messages: [
                            {
                                role: "user",
                                content: gptQuery,
                            },
                        ],
                    }),
                }
            );

            const gptResult = await getResults.json();
            console.log("GPT Result:", gptResult);

            let movieNames = [];
            if (gptResult.choices && gptResult.choices.length > 0) {
                const content = gptResult.choices[0].message.content;
                movieNames = content.split(",").map((name) => name.trim());
                console.log("Movie Names:", movieNames);
            } else {
                movieNames = [
                    "Andaz Apna Apna",
                    "Hera Pheri",
                    "Chupke Chupke",
                    "Phir Hera Pheri",
                    "Jaane Bhi Do Yaaro",
                ];
            }

            const promiseArray = movieNames.map((movie) =>
                searchMovieInTMDB(movie)
            );

            const tmdbResults = await Promise.all(promiseArray);

            dispatch(
                addGptMovieResult({ movieNames, movieResults: tmdbResults })
            );
        } catch (error) {
            console.error("Error fetching GPT results:", error);
        }
    };

    return (
        <div className="pt-40 md:pt-24 flex justify-center items-center">
            <form
                className="w-full md:w-1/2 bg-black rounded-lg grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searhTest}
                    type="text"
                    className="p-4 m-4 col-span-10 rounded-md bg-white"
                    placeholder={lang[langkey].GptSearchPlaceholder}
                />
                <button
                    className="py-2 px-4 m-4 col-span-2 bg-[#d9232e] text-white rounded-md"
                    onClick={handleGPTSearchClick}
                >
                    {lang[langkey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
