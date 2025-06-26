import { createSlice } from "@reduxjs/toolkit";

const getSlice = createSlice({
    name: "get",
    initialState: {
        showAISearch: false,
        movieNames: null,
        movieResults: 0,
        loading: false,
    },
    reducers: {
        toggleAISearchView: (state) => {
            state.showAISearch = !state.showAISearch;
        },
        setAILoading: (state, action) =>{
            state.loading = action.payload
        },
        addAIMovieResult: (state, action) => {
            state.movieNames = action.payload.movieNames;
            state.movieResults = action.payload.movieResults;
            state.loading = false;
        },
    },
});

export const { toggleAISearchView, addAIMovieResult, setAILoading  } = getSlice.actions;

export default getSlice.reducer;
