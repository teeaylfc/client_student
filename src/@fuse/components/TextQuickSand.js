import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography } from '@material-ui/core';

export default class TextQuickSand extends PureComponent {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    static propTypes = {
        className: PropTypes.string
        
    }
    render() {
        return (
            // <Typography style={[{ fontFamily: "Quicksand" }, this.props?.cumstomStyle? this.props.cumstomStyle : null]} className={this.props.className}>
            <Typography style={{ fontFamily: "Quicksand" }} className={this.props.className}>
                {this.props.children}
            </Typography>
        )
    }
}
