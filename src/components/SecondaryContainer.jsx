import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
    return (
        <div className="bg-black">
            <div className="bg-reed-700 relative md:pl-12  -top-4 z-20 sm:-top-6 lg:-top-44">
                <MovieList
                    title={"Now Playing"}
                    movies={movies.nowPlayingMovies}
                />
                <MovieList title={"Popular"} movies={movies.popularMovies} />
                <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
                <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
            </div>
        </div>
    );
};

export default SecondaryContainer;
