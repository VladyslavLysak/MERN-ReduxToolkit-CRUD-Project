import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}movies/${id}`);
        return response.data.movie;
    } catch (error) {
        return rejectWithValue(error);
    };
});

const initialState = {
    movie: null,
    isLoading: true,
    error: null,
};

const moviePageSlice = createSlice({
    name: 'moviePage',
    initialState,
    reducers: {
        clearMoviePage: (state, action) => {
            state.movie = null;
            state.isLoading = true;
        },
    },
    extraReducers: {
        [fetchMovieById.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchMovieById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.movie = action.payload;
        },
        [fetchMovieById.rejected]: (state, action) => {
            state.isLoading = false;
        }
    }
});

export const selectMovieById = (state) => state.moviePage.movie;
export const isMovieLoading = (state) => state.moviePage.isLoading;

export const { clearMoviePage } = moviePageSlice.actions;

export default moviePageSlice.reducer;
