import React, { useRef } from "react";
import lang from "../utilts/languageConstant";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
    const langkey = useSelector((store) => store.config.lang);
    const searhTest = useRef(null);
    let lastRequestTime = 0;

    const handleGPTSearchClick = async () => {
        const now = Date.now();
        if (now - lastRequestTime < 2500) {  // 5-second cooldown
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
            // console.log("API Key:", apiKey); // Ensure the API key is correctly logged

            const getResults = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    // "HTTP-Referer": "https://your-site-url.com", // Optional. Site URL for rankings on openrouter.ai.
                    // "X-Title": "Nefflix", // Optional. Site title for rankings on openrouter.ai.
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-r1-distill-llama-70b:free",
                    messages: [
                        {
                            role: "user",
                            content: gptQuery
                        }
                    ]
                })
            });

            const gptResult = await getResults.json();
            console.log("GPT Result:", gptResult);

            if (gptResult.choices && gptResult.choices.length > 0) {
                console.log("GPT Choices:", gptResult.choices[0].message.content || "No responce received");
            } else {
                console.log("No choices found in GPT result.");
            }
        } catch (error) {
            console.error("Error fetching GPT results:", error);
        }
    };

    return (
        <div className="pt-[10%] flex justify-center items-center">
            <form
                className="w-1/2 bg-black rounded-lg grid grid-cols-12"
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