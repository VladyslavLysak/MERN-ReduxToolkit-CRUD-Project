import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles, TextField, Grid, Button, Select, MenuItem } from '@material-ui/core';
import { AddCircle, Close } from '@material-ui/icons';
import { Formik, FieldArray } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from 'Constants';

import {
    initialValues,
    getValidationSchema
} from './config';

import {
    createMovie,
    selectMovieError,
    updateMovie,
    deleteActor
} from 'Redux/reducers/moviesSlice';

import ModalWrapper from 'Components/wrappers/ModalWrapper';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    form: {
        padding: theme.spacing(1, 0)
    },
    buttonsContainer: {
        paddingTop: theme.spacing(3),
    },
    buttonContainer: {
        '&:first-child': {
            paddingRight: theme.spacing(1)
        },
        '&:last-child': {
            paddingLeft: theme.spacing(1)
        },

        [theme.breakpoints.down('sm')]: {
            '&:first-child': {
                padding: theme.spacing(0, 0, 1.5, 0)
            },
            '&:last-child': {
                paddingLeft: theme.spacing(0)
            },
        },
    },
    actorsContainer: {
        padding: theme.spacing(1, 0)
    },
    actorsHead: {
        margin: 0,
        fontSize: 18,
        fontWeight: 500
    },
    selector: {
        paddingTop: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    error: {
        color: 'red'
    },
    plusContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    plusIcon: {
        cursor: 'pointer',
        color: colors.primaryGrey
    },
    newActorText: {
        margin: '0'
    },
    headContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing(1)
    }
}));

const MovieForm = ({ isEdit, isOpen, handleClose, title, movie }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [actorCount, setActorCount] = useState(0);

    const error = useSelector(selectMovieError);

    useEffect(() => {
        setActorCount(0)
    }, [isOpen])

    const submitHandler = useCallback((values) => {
        if (isEdit) {
            dispatch(updateMovie({ values, id: movie._id })).then((res) => {
                if (!res.error) {
                    handleClose();
                }
            });
        } else {
            dispatch(createMovie(values))
                .then((res) => {
                    if (!res.error) {
                        handleClose();
                    }
                });
        };
    }, [dispatch, isEdit, handleClose, movie?._id]);

    const checkIsError = useCallback((errors, touched, index, name) => {
        return errors?.actors?.length &&
            touched?.actors?.length &&
            (name ? touched?.actors[index]?.name : touched?.actors[index]?.surname) &&
            (name ? errors?.actors[index]?.name : errors?.actors[index]?.surname)
    }, []);

    const onDeleteActor = useCallback((index, remove, actor) => {
        remove(index);
        if (movie) {
            dispatch(deleteActor({ actor, id: movie._id }))
        }
    }, [dispatch, movie])

    return (
        <ModalWrapper
            isOpen={isOpen}
            handleClose={handleClose}
            title={title}
        >
            <Formik
                initialValues={movie ? movie : initialValues}
                validationSchema={getValidationSchema.bind(null, actorCount)}
                onSubmit={submitHandler}
            >
                {({
                    errors,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    values,
                    touched
                }) => {
                    return (
                        <form
                            noValidate
                            onSubmit={handleSubmit}
                            className={classes.form}
                        >
                            <div>
                                <TextField
                                    error={touched['title'] && errors['title']}
                                    variant="standard"
                                    margin="dense"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.title}
                                    id="title"
                                    label="Title"
                                    name="title"
                                    required
                                    autoFocus
                                    autoComplete="title"
                                    helperText={touched['title'] && errors['title']}
                                    color='secondary'
                                />
                                <TextField
                                    error={touched['release'] && errors['release']}
                                    variant="standard"
                                    margin="dense"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.release}
                                    id="release"
                                    label="Release"
                                    name="release"
                                    required
                                    autoComplete="release"
                                    helperText={touched['release'] && errors['release']}
                                    color='secondary'
                                />
                                <Select
                                    value={values.format}
                                    onChange={(event) => setFieldValue('format', event.target.value)}
                                    color='secondary'
                                    fullWidth
                                    margin="dense"
                                    className={classes.selector}
                                >
                                    <MenuItem value='VHS'>VHS</MenuItem>
                                    <MenuItem value='DVD'>DVD</MenuItem>
                                    <MenuItem value='Blu-Ray'>Blu-Ray</MenuItem>
                                </Select>
                                <div className={classes.actorsContainer}>
                                    <FieldArray name='actors'>
                                        {({ remove, push }) => (
                                            <div>
                                                {values.actors.length &&
                                                    values.actors.map((actor, index) => (
                                                        <div key={index}>
                                                            <div className={classes.headContainer}>
                                                                <h5 className={classes.newActorText}>New Actor</h5>
                                                                {index ?
                                                                    <Close className={classes.plusIcon} onClick={() => onDeleteActor(index, remove, actor)} />
                                                                    : null
                                                                }
                                                            </div>
                                                            <TextField
                                                                error={
                                                                    checkIsError(errors, touched, index, true)
                                                                }
                                                                variant="standard"
                                                                margin="dense"
                                                                fullWidth
                                                                onChange={handleChange}
                                                                value={actor.name}
                                                                id={`actors.${index}.name`}
                                                                label="Name"
                                                                name={`actors.${index}.name`}
                                                                helperText={
                                                                    checkIsError(errors, touched, index, true)
                                                                }
                                                                required
                                                                color='secondary'
                                                            />
                                                            <TextField
                                                                error={
                                                                    checkIsError(errors, touched, index)
                                                                }
                                                                variant="standard"
                                                                margin="dense"
                                                                fullWidth
                                                                onChange={handleChange}
                                                                value={actor.surname}
                                                                id={`actors.${index}.surname`}
                                                                label="Surname"
                                                                name={`actors.${index}.surname`}
                                                                helperText={
                                                                    checkIsError(errors, touched, index)
                                                                }
                                                                required
                                                                color='secondary'
                                                            />
                                                        </div>
                                                    ))
                                                }
                                                <span className={classes.plusContainer}>
                                                    <AddCircle className={classes.plusIcon} onClick={() => push({ name: '', surname: '' })} />
                                                </span>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <p className={classes.error}>{error}</p>
                                </div>
                                <Grid container className={classes.buttonsContainer}>
                                    <Grid item xs={12} md={6} className={classes.buttonContainer}>
                                        <Button variant='contained' fullWidth onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6} className={classes.buttonContainer}>
                                        <Button variant='contained' color='secondary' fullWidth type='submit'>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    )
                }}
            </Formik>
        </ModalWrapper>
    );
};

export default React.memo(MovieForm);