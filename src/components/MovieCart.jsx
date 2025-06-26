import React, { useState } from "react";
import { IMG_CDN_URL, NO_IMG_CDN_URL } from "../utilts/constants";
import MovieDetails from "./MovieDetails";

const MovieCart = ({
    movieKey,
    posterPath,
    original_title,
    description,
    avg_vote,
}) => {
    const [showDescription, setShowDescription] = useState(false);

    const poster = posterPath ? IMG_CDN_URL + posterPath : NO_IMG_CDN_URL;

    return (
        <div className="relative">
            <div className="w-26 sm:w-30 md:w-34 lg:w-40 ">
                <div>
                    <img
                        alt="Movie Image"
                        src={poster}
                        onClick={() => setShowDescription(true)}
                        className="cursor-pointer"
                    />
                </div>
                <div className="text-white">{original_title}</div>
            </div>
            {showDescription && (
                <div className="fixed overflow-y-auto inset-0 z-50  bg-zinc-950/98 m-1 rounded-lg border-1 border-gray-500 flex justify-center">
                    <div
                        className="w-full "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MovieDetails
                            movieKey={movieKey}
                            posterPath={posterPath}
                            title={original_title}
                            description={description}
                            avg_vote={avg_vote}
                        />
                        <button
                            className="absolute top-4 right-4 text-white bg-red-600 px-3 py-1 rounded"
                            onClick={() => setShowDescription(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieCart;
