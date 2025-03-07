import { createSlice } from "@reduxjs/toolkit";

const getSlice = createSlice({
    name: "get",
    initialState: {
        showGptSearch: false,
        movieNames: null,
        movieResults: 0,
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    },
});

export const { toggleGptSearchView, addGptMovieResult } = getSlice.actions;

export default getSlice.reducer;
