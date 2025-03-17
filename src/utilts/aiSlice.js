import { createSlice } from "@reduxjs/toolkit";

const getSlice = createSlice({
    name: "get",
    initialState: {
        showAISearch: false,
        movieNames: null,
        movieResults: 0,
    },
    reducers: {
        toggleAISearchView: (state) => {
            state.showAISearch = !state.showAISearch;
        },
        addAIMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    },
});

export const { toggleAISearchView, addAIMovieResult } = getSlice.actions;

export default getSlice.reducer;
