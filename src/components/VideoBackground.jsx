import React, { useEffect } from "react";
import { API_OPTIONS } from "../utilts/constants";

const VideoBackground = ({ movieId }) => {
    const getMovieVideos = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/950396/videos?language=en-US",
            API_OPTIONS
        );
        const json = await data.json();
        
        const filterData =json.results.filter(video => video.type =="Trailer")
        const trailer = filterData.length ?  filterData[0];
        console.log(trailer);
    };
    useEffect(() => {
        getMovieVideos();
    }, []);

    return <div>VideoBackground</div>;
};

export default VideoBackground;
