import React, { Component } from 'react'
import { FormControl, InputBase, FormHelperText } from '@material-ui/core'

export default class TextInputBase extends Component {
    render() {
        const { value, onChange, className, inputProps, error, type, placeholder, fullWidth, name } = this.props
        return (
            <FormControl className={fullWidth? "w-full" : ""}>
                <InputBase
                    type={type}
                    placeholder={placeholder}
                    id="align"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={className}
                    inputProps={inputProps}
                />
                {error && value.length > 0 && <FormHelperText style={{ alignSelf: "center", fontFamily:"Quicksand" }} error id="my-helper-text">{error}</FormHelperText>}
            </FormControl>
        )
    }
}
