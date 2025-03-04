import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
    return (
        <div className="bg-black">
            <div className="pl-12 relative top-[-430px] z-20">
                <MovieList
                    title={"Now Playing"}
                    movies={movies.nowPlayingMovies}
                />
                <MovieList
                    title={"Popular"}
                    movies={movies.popularMovies}
                />
            </div>
        </div>
    );
};

export default SecondaryContainer;
