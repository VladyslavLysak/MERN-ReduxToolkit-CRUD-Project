import React from 'react';
import { makeStyles, Modal, Button, Grid, Backdrop, Fade } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { colors } from 'Constants';

const useStyles = makeStyles((theme) => ({
    modalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: theme.spacing(2),
        borderRadius: 10,
        width: 420,
        maxHeight: 600,
        overflowY: 'auto',

        [theme.breakpoints.down('sm')]: {
            width: 300,
            maxHeight: 400,
            padding: theme.spacing(1),
        },
    },
    modalHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing(1)
    },
    cross: {
        cursor: 'pointer',
        color: colors.primaryGrey
    },
    modalTitle: {
        marginRight: theme.spacing(1),
        fontWeight: '500',
        fontSize: 24,
        margin: 0
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
        }
    }
}));

const ModalWrapper = ({ isOpen, handleClose, children, title, submitHandler }) => {

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            className={classes.modalContainer}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={classes.modalContent}>
                    <div className={classes.modalHead}>
                        <h3 className={classes.modalTitle}>
                            {title}
                        </h3>
                        <Close className={classes.cross} onClick={handleClose} />
                    </div>
                    {children}
                    {submitHandler &&
                        <Grid container className={classes.buttonsContainer}>
                            <Grid item xs={12} md={6} className={classes.buttonContainer}>
                                <Button variant='contained' fullWidth onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.buttonContainer}>
                                <Button variant='contained' color='secondary' fullWidth onClick={submitHandler}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </div>
            </Fade>
        </Modal>
    );
};

export default ModalWrapper;