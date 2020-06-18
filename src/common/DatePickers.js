import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop : theme.spacing.unit,
        width: "100%",
    },
});

function DatePickers(props) {
    const { classes } = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                id={props.id}
                name={props.name}
                label={props.label}
                type="date"
                onChange = {props.onChange}
                value = {props.value}
                required
                className={classes.textField}
                disabled={props.disabled}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

DatePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
