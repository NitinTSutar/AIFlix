import React from "react";
import { IMG_CDN_URL } from "../utilts/constants";
const MovieCart = ({ posterPath }) => {
    return (
        <div className="w-32 ">
            <img alt="Movie Image" src={IMG_CDN_URL + posterPath} />
        </div>
    );
};

export default MovieCart;
 