import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utilts/constants";

const useLocalMovieTrailer = (movieId) => {
    const [trailerVideo, setTrailerVideo] = useState(null);

    useEffect(() => {
        const getMovieVideos = async () => {
            const data = await fetch(
                "https://api.themoviedb.org/3/movie/" +
                    movieId +
                    "/videos?language=en-US",
                API_OPTIONS
            );
            const json = await data.json();

            const filterData = json.results.filter(
                (video) => video.type === "Trailer"
            );
            const trailer = filterData.length ? filterData[0] : json.results[0];
            setTrailerVideo(trailer);
        };
        getMovieVideos();
    }, [movieId]);

    return trailerVideo;
};

export default useLocalMovieTrailer;