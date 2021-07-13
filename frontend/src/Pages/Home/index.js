import React, { useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchMovies,
    isMoviesLoading,
    selectMovies,
    selectMovieSearch,
    selectIsDesc
} from 'Redux/reducers/moviesSlice';

import { colors } from 'Constants';

import Loader from 'Components/helpers/Loader';
import Sidebar from 'Components/helpers/Sibebar';
import MovieCard from 'Components/cards/MovieCard';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse'
        },
    },
    moviesContainer: {
        paddingRight: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',

        [theme.breakpoints.down('sm')]: {
            padding: 0
        },
    },
    cardWrapper: {
        padding: '1em 0.5em'
    },
    notFoundContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 60px)'
    },
    notFoundText: {
        fontSize: 36,
        color: colors.thirdGrey
    }
}));

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(isMoviesLoading);
    const movies = useSelector(selectMovies);
    const search = useSelector(selectMovieSearch);
    const isDesc = useSelector(selectIsDesc);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch])

    const filteredMovies = movies?.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.actors.find(el => el.name.toLowerCase().includes(search.toLowerCase()) || el.surname.toLowerCase().includes(search.toLowerCase()))
    );
    const sortedMovies = filteredMovies?.sort((a, b) => !isDesc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

    return (
        <Grid container className={classes.root}>
            {isLoading && <Loader />}
            {!filteredMovies.length && !isLoading ? (
                <Grid item xs={12} md={9} className={classes.notFoundContainer}>
                    <h2 className={classes.notFoundText}>
                        Movie not found
                    </h2>
                </Grid>
            ) : (
                <Grid item xs={12} md={9} className={classes.moviesContainer}>
                    {sortedMovies?.map(movie =>
                        <Grid item xs={12} md={6} lg={3} key={movie._id} className={classes.cardWrapper}>
                            <MovieCard movie={movie} />
                        </Grid>
                    )}
                </Grid>
            )}
            <Grid item xs={12} md={3}>
                <Sidebar />
            </Grid>
        </Grid>
    )
}

export default React.memo(Home);