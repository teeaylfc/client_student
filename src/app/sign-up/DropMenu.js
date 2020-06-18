import React, { PureComponent } from 'react'
import { Button, Menu, MenuItem, Icon, Popover, ListItemText } from '@material-ui/core'

export default class DropMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            anchorEl: null,
            selectedIndex: null
        }
    }
    componentDidMount() {
        if (this.props.currentItem) {
            var indexCurrent = this.props.list.map(e => this.props.value ? e[this.props.value] : e).indexOf(this.props.value ? this.props.currentItem[this.props.value] : this.props.currentItem)
            console.log("indexCurrent")
            console.log(indexCurrent)
            // console.log(indexCurrent)
            this.setState({
                selectedIndex: indexCurrent > 0 ? indexCurrent : 0
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.idParent != nextProps.idParent) {
            this.setState({
                selectedIndex: null
            })
        }
    }
    handleClickListItem = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuItemClick = (item, index) => {
        console.log(index)
        if (this.props.chooseItem) this.props.chooseItem(item)
        this.setState({
            anchorEl: null,
            selectedIndex: index
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };
    render() {
        const { anchorEl, selectedIndex } = this.state
        const { hint, list, name, disabled, width, value } = this.props
        return (
            <div style={{ width: width ? width : "120px" }}>
                <Button
                    disabled={disabled}
                    style={{ paddingBottom: "10px", paddingTop: "10px" }}
                    className="input_base flex flex-row justify-between items-center w-full"
                    onClick={this.handleClickListItem}
                >
                    <h4 className="color_blue mr-12 text_button_base text-left">
                        {selectedIndex == null ? hint : (list[selectedIndex].name && list.length > 0) ? list[selectedIndex].name : value ? list[selectedIndex][value] : list[selectedIndex]}
                    </h4>
                    <Icon style={{ color: 'grey' }} fontSize="small">keyboard_arrow_down </Icon>
                </Button>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    classes={{
                        paper: "py-0"
                    }}
                >
                    <React.Fragment>
                        {
                            list.map((option, index) =>
                                <MenuItem key={index} selected={index === selectedIndex} onClick={(event) => this.handleMenuItemClick(option, index)}>
                                    <ListItemText className="pl-0 " >
                                        <h4 style={{ fontFamily: "Quicksand" }}>{name ? option.name : value ? option[value] : option}</h4>
                                    </ListItemText>
                                </MenuItem>
                            )
                        }
                    </React.Fragment>
                </Popover>
            </div>
        )
    }
}
