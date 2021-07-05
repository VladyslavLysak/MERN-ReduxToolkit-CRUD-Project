import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'calc(100vh - 60px)',
        padding: '30px 100px',
        background: 'radial-gradient(circle, rgba(255,221,250,1) 0%, rgba(128,115,115,1) 100%)',
        [theme.breakpoints.down('sm')]: {
            minHeight: 'calc(100vh - 20px)',
            padding: '10px',
        },
    },
}));

const MainWrapper = ({ children }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    )
};

export default MainWrapper;