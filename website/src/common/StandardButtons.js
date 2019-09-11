import React from 'react';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1,3),
        minWidth: `14rem`,
        minHeight: `4rem`,
    },
    iconLeft: {
        marginRight: theme.spacing(1)
    },
    iconRight: {
        marginLeft: theme.spacing(1)
    }
}));

export const CancelButton = ({ onCancel }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            className={classes.button}
            onClick={onCancel}
        >
            <CancelIcon className={classes.iconLeft} />
            Cancel
        </Button>
    );
}

export const AbortButton = ({ onAbort }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={onAbort}
        >
            <DeleteIcon className={classes.iconLeft} />
            Abort
        </Button>
    );
}

export const NextButton = ({ onNext }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onNext}
        >
            Next
            <NavigateNextIcon className={classes.iconRight} />
        </Button>
    );
}

