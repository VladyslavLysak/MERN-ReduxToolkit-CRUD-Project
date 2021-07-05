import { combineReducers } from 'redux';
import moviesSlise from './moviesSlice';
import moviePageSlice from './moviePageSlice';

export default combineReducers({
    movie: moviesSlise,
    moviePage: moviePageSlice,
});