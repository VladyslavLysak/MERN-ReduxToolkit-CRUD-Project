import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 60px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

const NotFoundPage = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>Page Not Found</h2>
        </div>
    );
};

export default NotFoundPage;