import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { colors } from 'Constants';
import { deleteToast } from 'Components/helpers/Toast';

import {
    deleteMovie
} from 'Redux/reducers/moviesSlice';

import ModalWrapper from 'Components/wrappers/ModalWrapper';
import MovieForm from 'Components/helpers/MovieForm';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
        transition: '0.5s',
        cursor: 'pointer',
        borderRadius: 10,
        height: '100%',

        '&:hover': {
            backgroundColor: '#83CEFF',
        },

        '&:first-child': {
            marginTop: 0
        },
    },
    cardWrapper: {
        height: '100%'
    },
    itemContainer: {
        borderBottom: `1px solid ${colors.primaryGrey}`,
        paddingBottom: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'space-between',

        '& h5': {
            fontWeight: '500',
            margin: theme.spacing(0.5, 0)
        },

        '&:last-child': {
            border: 'none'
        }
    },
    cardTitle: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    iconsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        color: colors.primaryGrey
    },
    actorsContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    actorContainer: {
        borderBottom: `1px solid ${colors.secondaryGrey}`,

        '&:last-child': {
            border: 'none'
        }
    },
    actorRow: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const MovieCard = ({ movie }) => {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [isDeleteOpen, setIsDeteteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const onCardClick = useCallback(() => {
        history.push(`/movie/${movie._id}`)
    }, [movie?._id, history]);

    const onDeleteOpen = useCallback((event) => {
        event.stopPropagation();
        setIsDeteteOpen(true);
    }, []);

    const onDeleteClose = useCallback(() => {
        setIsDeteteOpen(false);
    }, [])

    const onDeleteMovie = useCallback(() => {
        dispatch(deleteMovie(movie._id))
            .then(res => {
                if (!res.error) {
                    deleteToast();
                }
            });
    }, [dispatch, movie?._id]);

    const onEditOpen = useCallback((event) => {
        event.stopPropagation();
        setIsEditOpen(true);
    }, []);

    const onEditClose = useCallback(() => {
        setIsEditOpen(false);
    }, [])

    return (
        <div className={classes.cardWrapper}>
            <MovieForm
                isOpen={isEditOpen}
                handleClose={onEditClose}
                title='Edit movie'
                isEdit
                movie={movie}
            />
            <ModalWrapper
                isOpen={isDeleteOpen}
                handleClose={onDeleteClose}
                title='Delete Movie'
                submitHandler={onDeleteMovie}
            >
                <p>Are you sure to delete the movie?</p>
            </ModalWrapper>
            <div className={classes.root} onClick={onCardClick}>
                <div className={classes.iconsContainer}>
                    <Edit onClick={(event) => onEditOpen(event)} />
                    <Delete onClick={(event) => onDeleteOpen(event)} />
                </div>
                <div className={`${classes.itemContainer} ${classes.cardTitle}`}>
                    <h4>
                        {movie.title}
                    </h4>
                </div>
                <div className={`${classes.itemContainer}`}>
                    <h5>Release:</h5>
                    <h5>{movie.release}</h5>
                </div>
                <div className={`${classes.itemContainer}`}>
                    <h5>Format:</h5>
                    <h5>{movie.format}</h5>
                </div>
                {movie?.actors?.length &&
                    <div className={`${classes.itemContainer} ${classes.actorsContainer}`}>
                        <h5>Actors</h5>
                        {movie.actors.map(actor => (
                            <div className={classes.actorContainer} key={actor._id}>
                                <div className={classes.actorRow}>
                                    <h5>Name:</h5>
                                    <h5>{actor.name}</h5>
                                </div>
                                <div className={classes.actorRow}>
                                    <h5>Surname:</h5>
                                    <h5>{actor.surname}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
};

export default React.memo(MovieCard);