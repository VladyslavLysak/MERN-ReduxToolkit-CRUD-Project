import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loaderContainer: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    loader: {
        height: '80px !important',
        width: '80px !important',
    }
}));

const Loader = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.loaderContainer}>
                <CircularProgress color="secondary" className={classes.loader} />
            </div>
        </div>
    );
};

export default React.memo(Loader);