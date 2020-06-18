import React, { PureComponent } from 'react'
import { Card, CardContent, Button, Typography, Icon, Select } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import ExpandMore from '@material-ui/icons/ExpandMore';
const ITEM_HEIGHT = 48;
export default class DropDownItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: this.props.list,
            itemChoose: "",
            anchorEl: null,
        }
    }
    componentDidMount() {
        const { placeholder } = this.props
        console.log(placeholder)
        this.setState({
            itemChoose: placeholder ? placeholder : this.state.value[0]
        })
    }
    // handleToggle = event => {
    //     this.setState({
    //         open: true,
    //         anchorEl: event.currentTarget
    //     })
    // };

    handleListKeyDown = event => {
        if (event.key === 'Tab') {
            this.setState({
                open: false
            })
        }
    }
    chooseItem = event => {
        this.setState({
            itemChoose: event.target.value,
        })
        console.log(event.target.value)
        this.props.chooseAction(event.target.value)
    }
    // handleClose = () => {
    //     this.setState({
    //         // anchorEl: null
    //     })
    // };
    render() {
        const { open, value, itemChoose, anchorEl } = this.state
        const { width, placement, list, shadow, color, placeholder } = this.props
        return (
            <Select
                style={{ color: color ? color : "#334690", width: width, fontWeight: "normal", fontSize: "13px", paddingTop: "4px", paddingBottom: "4px" }}
                className={`flex flex-row justify-start border-none px-12 rounded-lg bg-white ${shadow && "shadow"}`}
                value={itemChoose}
                onChange={this.chooseItem}
            >
                {value.map((item, i) => {
                    return (
                        <MenuItem
                            key={i}
                            value={item}
                        >
                            <p style={{ color: color ? color : "#334690", fontWeight: "normal", fontSize: "13px" }}>
                                {item}
                            </p>
                        </MenuItem>
                    )
                })}
            </Select>
        )
    }
}
