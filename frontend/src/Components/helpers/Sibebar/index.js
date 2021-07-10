import React, { useCallback, useState } from 'react';
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import { Search, ArrowUpwardOutlined } from '@material-ui/icons';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from 'Constants';

import {
    onSearchValue,
    onDescChange,
    selectIsDesc
} from 'Redux/reducers/moviesSlice';

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
    },
    sortIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1, 0),
    },
    sortIcon: {
        cursor: 'pointer',
        color: colors.secondaryGrey,
        transition: '1s'
    },
    sortAnimation: {
        transform: 'rotate(180deg)'
    }
}));

const Sidebar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const isDesc = useSelector(selectIsDesc);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const onCreateOpen = useCallback(() => {
        setIsCreateOpen(true);
    }, []);

    const onCreateClose = useCallback(() => {
        setIsCreateOpen(false);
    }, []);

    const onSearchChange = useCallback((e, handleChange) => {
        const search = e.target.value;
        if (search.length < 3) {
            dispatch(onSearchValue(''));
        } else {
            dispatch(onSearchValue(search));
        }
        handleChange(e);
    }, [dispatch]);

    const onSortChange = useCallback(() => {
        dispatch(onDescChange())
    }, [dispatch]);

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
            >
                {({
                    errors,
                    handleSubmit,
                    handleChange,
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
                                    onChange={(e) => onSearchChange(e, handleChange)}
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
            <div className={classes.sortIconContainer} onClick={onSortChange}>
                <ArrowUpwardOutlined className={`${classes.sortIcon} ${isDesc ? classes.sortAnimation : ''}`} />
            </div>
        </div>
    )
};

export default React.memo(Sidebar);