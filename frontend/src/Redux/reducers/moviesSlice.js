import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const existError = "Movie already exists";

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}movies`);
        return response.data.movies;
    } catch (error) {
        console.log(error);
    };
});

export const createMovie = createAsyncThunk('movies/createMovie', async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        return await axios.post(`${process.env.REACT_APP_BASE_URL}movies/addMovie`, { ...data });
    } catch (error) {
        return rejectWithValue(existError)
    }
});

export const updateMovie = createAsyncThunk('movies/editMovie', async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { values, id } = data;
    try {
        return await axios.put(`${process.env.REACT_APP_BASE_URL}movies/${id}`, { ...values });
    } catch (error) {
        return rejectWithValue(existError);
    }
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        return await axios.delete(`${process.env.REACT_APP_BASE_URL}movies/${id}`);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteActor = createAsyncThunk('movies/deleteActor', async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { actor, id } = data;
    try {
        return await axios.put(`${process.env.REACT_APP_BASE_URL}movies/actor/${id}`, actor);
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState = {
    movies: [],
    isLoading: true,
    error: null,
    search: '',
    isDesc: false,
};

const moviesSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        onSearchValue: (state, action) => {
            state.search = action.payload;
        },
        onDescChange: (state, action) => {
            state.isDesc = !state.isDesc;
        }
    },
    extraReducers: {
        [fetchMovies.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.movies = action.payload;
        },
        [fetchMovies.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [createMovie.pending]: (state, action) => {
            state.isLoading = true;
        },
        [createMovie.fulfilled]: (state, action) => {
            const newMovie = action.payload.data?.newMovie;
            state.movies = [...state.movies, newMovie]
            state.isLoading = false;
            state.error = null;
        },
        [createMovie.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [updateMovie.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateMovie.fulfilled]: (state, action) => {
            const newMovie = action.payload?.data?.movie;
            const activeIndex = state.movies.findIndex(el => el._id === newMovie._id);
            state.movies[activeIndex] = newMovie;
            state.isLoading = false;
            state.error = null;
        },
        [updateMovie.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [deleteActor.fulfilled]: (state, action) => {
            const newMovie = action.payload?.data?.movie;
            const activeIndex = state.movies.findIndex(el => el._id === newMovie._id);
            state.movies[activeIndex] = newMovie;
            state.isLoading = false;
            state.error = null;
        },
        [deleteActor.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [deleteActor.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteMovie.fulfilled]: (state, action) => {
            state.movies = state.movies.filter(el => el._id !== action.payload?.data?.movie._id);
            state.isLoading = false;
        },
        [deleteMovie.rejected]: (state, action) => {
            state.isLoading = false;
        },
    }
});

export const selectMovies = (state) => state.movie.movies;
export const isMoviesLoading = (state) => state.movie.isLoading;
export const selectMovieSearch = (state) => state.movie.search;
export const selectMovieError = (state) => state.movie.error;
export const selectIsDesc = (state) => state.movie.isDesc;

export const { onSearchValue, onDescChange } = moviesSlice.actions;

export default moviesSlice.reducer;
