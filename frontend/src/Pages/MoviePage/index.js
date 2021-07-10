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
            <h4>
                {movie.title}
            </h4>
            <h4>
                {movie.format}
            </h4>
            <h4>
                {movie.realease}
            </h4>
            {movie.actors.map(actor => (
                <div key={actor._id}>
                    <h4>
                        {actor.name}
                    </h4>
                    <h4>
                        {actor.surname}
                    </h4>
                </div>
            ))}
        </div>
    );
};

export default React.memo(MoviePage);