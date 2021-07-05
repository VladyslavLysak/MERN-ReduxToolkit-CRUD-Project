import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchMovieById,
    isMovieLoading,
    selectMovieById,
    clearMoviePage
} from 'Redux/reducers/moviePageSlice';

import Loader from 'Components/helpers/Loader';

const MoviePage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(isMovieLoading);
    const movie = useSelector(selectMovieById);

    useEffect(() => {
        dispatch(fetchMovieById(id));

        return () => {
            dispatch(clearMoviePage())
        }
    }, [dispatch, id]);

    if (isLoading) {
        return <Loader />
    };

    return (
        <div>
            {movie.title}
        </div>
    );
};

export default React.memo(MoviePage);