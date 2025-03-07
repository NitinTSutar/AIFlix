import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import LoadingShimmer from "./LoadingShimmer";

const GptMovieSuggestions = () => {
    const { movieNames, movieResults } = useSelector((store) => store.gpt);

    const data = movieNames;

    if (data === null) return <LoadingShimmer />;

    return (
        <div className="p-4 m-4 bg-black/90 text-white rounded-lg">
            <div>
              {movieNames.map((movieName, index) => <MovieList key={movieName} title={movieName} movies={movieResults[index]}/>)}
              
            </div>
            <MovieList />
        </div>
    );
};

export default GptMovieSuggestions;
