import { Dialog, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const noop = () => {};

const MyDialogTitle = withStyles(styles)(props => {
    const { children, classes, closable, onClose } = props;

    const closeButton = closable
        ?  (<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>)
        : '';

    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">
                {children}
            </Typography>
            {closeButton}
        </MuiDialogTitle>
    );
});


const QuizDialog = (props) => (
    <Dialog
        open={props.open}
        onClose={props.onClose || noop}
    >
        <MyDialogTitle
            onClose={props.onClose || noop}
        >
            {props.title}
        </MyDialogTitle>

        <DialogContent>{props.children}</DialogContent>

        <DialogActions>
            <Button
                onClick={props.onClick}
                color="primary"
            >
                {props.buttonLabel}
            </Button>
        </DialogActions>
    </Dialog>
);

export default QuizDialog;