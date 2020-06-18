import React, { Component } from 'react';
import { AppBar, Hidden, MuiThemeProvider, Toolbar, withStyles, InputBase, Icon, Button, Popover, MenuItem, ListItemIcon, ListItemText, Menu, Fade, Paper, Popper } from '@material-ui/core';
import { FuseSearch, FuseShortcuts } from '@fuse';
import { Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';

const listSubject = [
    {
        name: "Ngoại ngữ",
        child: [
            {
                class: "Lớp 1"
            },
            {
                class: "Lớp 2"
            },
            {
                class: "Lớp 3"
            },
        ]
    },
    {
        name: "Lịch sử",
        child: [
            {
                class: "Lớp 1"
            },
            {
                class: "Lớp 2"
            },
            {
                class: "Lớp 3"
            },
        ]
    },
    {
        name: "Địa lý",
        child: [
            {
                class: "Lớp 1"
            },
            {
                class: "Lớp 2"
            },
            {
                class: "Lớp 3"
            },
        ]
    },
    {
        name: "Ngữ Văn",
        child: [
            {
                class: "Lớp 1"
            },
            {
                class: "Lớp 2"
            },
            {
                class: "Lớp 3"
            },
        ]
    },
    {
        name: "Toán học",
        child: [
            {
                class: "Lớp 1"
            },
            {
                class: "Lớp 2"
            },
            {
                class: "Lớp 3"
            },
        ]
    },
]

const styles = theme => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
});

class ToolbarLayout1 extends Component {
    state = {
        userMenu: null,
        childMenu: null,
        listChild: []
    };

    userMenuClick = event => {
        console.log("event")
        console.log(event.currentTarget)
        this.setState({ userMenu: event.currentTarget });
    };
    childMenuClick = (item) => (event) => {
        this.setState({ childMenu: event.currentTarget, listChild: item.child, });
    }
    userMenuClose = () => {
        this.setState({ userMenu: null, });
    };
    childMenuClose = () => {
        this.setState({ childMenu: null });
    }
    chooseItemChild = () => {
        this.setState({ childMenu: null });
    }
    render() {
        const { toolbarTheme, settings } = this.props
        const { userMenu, childMenu, listChild } = this.state;
        const layoutConfig = settings.layout.config;
        return (
            <MuiThemeProvider theme={toolbarTheme}>
                <AppBar id="fuse-toolbar" className="flex relative z-10 bg-white" color="default">
                    <Toolbar className="p-0">

                        {/* {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0" />
                            <div className={classes.separator} />
                        </Hidden>
                    )} */}

                        <div className="flex flex-1 flex-row px-32 items-center">
                            {/* <Hidden mdDown>
                            <FuseShortcuts className="px-16" />
                        </Hidden> */}
                            {/* <Button onClick={this.userMenuClick} className="min-w-0">
                                <img style={{ objectFit: "contain", width: "25px" }} src="assets/images/icons/menu.png" />
                            </Button> */}
                            <div className="div-search-header">
                                <InputBase className="search-header" placeholder="Tìm kiếm..." />
                                <div className="div-icon-header">
                                    <Icon className="text-white">search</Icon>
                                </div>
                            </div>
                        </div>
                        <Popover
                            style={{ marginTop: "15px", marginLeft: "45px" }}
                            open={Boolean(userMenu)}
                            anchorEl={userMenu}
                            onClose={this.userMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                            }}
                            classes={{
                                paper: "py-0"
                            }}
                        >
                            <React.Fragment>
                                {
                                    listSubject.map((item, i) =>
                                        <MenuItem key={i} onClick={this.childMenuClick(item)}>
                                            <ListItemIcon>
                                                <Icon style={{ fontSize: "20px" }} className="color_blue">book</Icon>
                                            </ListItemIcon>
                                            <ListItemText className="pl-0" >
                                                <h4 style={{ fontFamily: "Quicksand" }} className="color_blue">{item.name}</h4>
                                            </ListItemText>
                                        </MenuItem>
                                    )
                                }
                            </React.Fragment>
                        </Popover>

                        <Popover
                            open={Boolean(childMenu)}
                            anchorEl={childMenu}
                            onClose={this.childMenuClose}
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
                                    listChild.map((item, i) =>
                                        <MenuItem key={i} onClick={this.chooseItemChild}>
                                            <ListItemText className="pl-0 " >
                                                <h4 style={{ fontFamily: "Quicksand" }} className="color_blue">{item.class}</h4>
                                            </ListItemText>
                                        </MenuItem>
                                    )
                                }
                            </React.Fragment>
                        </Popover>

                        <div className="flex pr-16">

                            <UserMenu />

                            {/* <FuseSearch /> */}

                            {/* <div className={classes.separator} /> */}

                            {/* <QuickPanelToggleButton /> */}
                        </div>

                        {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
                            <Hidden lgUp>
                                <NavbarMobileToggleButton />
                            </Hidden>
                        )}
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        )
    }
}


function mapStateToProps({ fuse }) {
    return {
        settings: fuse.settings.current,
        toolbarTheme: fuse.settings.toolbarTheme
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(ToolbarLayout1)));
