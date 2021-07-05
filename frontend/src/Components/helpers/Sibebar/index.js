import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import { onSearchValue } from 'Redux/reducers/moviesSlice';

import {
    initialValues,
    getValidationSchema
} from './config';

import { AddButton } from 'Ui';

import MovieForm from 'Components/helpers/MovieForm';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '1em'
    },
    form: {
        padding: theme.spacing(1, 0)
    },
    searchIcon: {
        color: 'rgb(0,0,0,0.42)',
        cursor: 'pointer'
    }
}));

const Sidebar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [activeSearch, setActiveSearch] = useState('');

    useEffect(() => {
        dispatch(onSearchValue(activeSearch));
    }, [activeSearch, dispatch])

    const onCreateOpen = useCallback(() => {
        setIsCreateOpen(true);
    }, []);

    const onCreateClose = useCallback(() => {
        setIsCreateOpen(false);
    }, []);

    const submitHandler = useCallback((values) => {
        setActiveSearch(values.search)
    }, []);

    return (
        <div className={classes.root}>
            <MovieForm
                isOpen={isCreateOpen}
                handleClose={onCreateClose}
                title='Create movie'
            />
            <AddButton variant='contained' color='secondary' fullWidth onClick={onCreateOpen}>
                Add movie
            </AddButton>
            <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema.bind(null)}
                onSubmit={submitHandler}
            >
                {({
                    errors,
                    handleSubmit,
                    setFieldValue,
                    handleChange,
                    handleReset,
                    values,
                    touched
                }) => {
                    return (
                        <form
                            noValidate
                            onSubmit={handleSubmit}
                            className={classes.form}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                        >
                            <div>
                                <TextField
                                    error={touched['search'] && errors['search']}
                                    variant="standard"
                                    margin="none"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.search}
                                    id="search"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Search className={classes.searchIcon} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    label="Search"
                                    name="search"
                                    autoComplete="search"
                                    helperText={touched['search'] && errors['search']}
                                    color='secondary'
                                />
                            </div>
                        </form>
                    )
                }}
            </Formik>
        </div>
    )
};

export default React.memo(Sidebar);