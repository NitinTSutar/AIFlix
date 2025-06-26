import React from "react";
import useLocalMovieTrailer from "../hooks/useLocalMovieTrailer";
import { IMG_CDN_URL, NO_IMG_CDN_URL } from "../utilts/constants";

const MovieDetails = ({
    movieKey,
    posterPath,
    title,
    description,
    avg_vote,
}) => {
    const trailerVideo = useLocalMovieTrailer(movieKey);

    const poster = posterPath ? IMG_CDN_URL + posterPath : NO_IMG_CDN_URL;

    return (
        <div className="lg:w-full ">
            {trailerVideo ? (
                <iframe
                    className="absolute w-full rounded-2xl lg:h-10/12 aspect-16/9"
                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&loop=1&playlist=${trailerVideo.key}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ pointerEvents: "none" }}
                ></iframe>
            ) : (
                <div className="text-white">Loading trailer...</div>
            )}
            <div className="p-2 relative pt-[40dvw] lg:pt-[60dvh] flex items-end">
                <div className=" w-26 sm:w-30 md:w-34 lg:w-40 ">
                    <img
                        alt="Movie Image"
                        src={poster}
                        className="cursor-pointer"
                    />
                </div>
                <div className="pl-4">
                    <div className="text-white">
                        Average Vote - {avg_vote}
                    </div>
                    <div
                        className="text-white pt-2 text-xl sm:text-2xl md:text-3xl
                 font-bold"
                    >
                        {title}
                    </div>
                </div>
            </div>
            <div className="text-white px-10 pt-4 pb-20">
                
                {description}
            </div>
        </div>
    );
};

export default MovieDetails;
