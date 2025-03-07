import React from "react";
import { IMG_CDN_URL } from "../utilts/constants";
const MovieCart = ({ posterPath }) => {
    let poster;

    if (posterPath) {
        poster = IMG_CDN_URL + posterPath;
    } else {
        poster =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s";
    }

    return (
        <div className="relative">
            <div className="w-26 sm:w-30 md:w-34 lg:w-40 ">
                <div className="">
                    <img alt="Movie Image" src={poster} />
                </div>
            </div>
        </div>
    );
};

export default MovieCart;
