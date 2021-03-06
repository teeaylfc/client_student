import React, { Component } from 'react';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as Actions from "../../auth/store/actions";
class UserMenu extends Component {

    state = {
        userMenu: null
    };

    userMenuClick = event => {
        this.setState({ userMenu: event.currentTarget });
    };

    userMenuClose = () => {
        this.setState({ userMenu: null });
    };

    render() {
        const { user, logout } = this.props;
        const { userMenu } = this.state;
        var itemUser = user.user
        return (
            <React.Fragment>
                {itemUser &&
                    <Button className="h-64" onClick={this.userMenuClick}>
                        {itemUser && itemUser.avatar ?
                            (
                                <Avatar className="" alt="user photo" src={itemUser.avatar} />
                            )
                            :
                            (
                                <Avatar className="" src="assets/images/avatars/andrew.jpg">
                                </Avatar>
                            )
                        }

                        <div className="hidden md:flex flex-col ml-12 items-start">
                            <h3 component="span" className="normal-case font-600 flex">
                                {itemUser && itemUser.name ? itemUser.name : 'User'}
                            </h3>
                            <h4 className="text-11 capitalize" color="textSecondary">
                                {itemUser.userRole && itemUser.userRole.roleName ? itemUser.userRole.roleName : ""}
                            </h4>
                        </div>

                        <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
                    </Button>
                }

                <Popover
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
                        paper: "py-8"
                    }}
                >
                    {user.role === 'guest' ? (
                        <React.Fragment>
                            <MenuItem component={Link} to="/login">
                                <ListItemIcon>
                                    <Icon>lock</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Login" />
                            </MenuItem>
                            <MenuItem component={Link} to="/register">
                                <ListItemIcon>
                                    <Icon>person_add</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Register" />
                            </MenuItem>
                        </React.Fragment>
                    ) :
                        (
                            <React.Fragment>
                                <MenuItem component={Link} to="/pages/profile" onClick={this.userMenuClose}>
                                    <ListItemIcon>
                                        <Icon>account_circle</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="My Profile" />
                                </MenuItem>
                                <MenuItem component={Link} to="/apps/mail" onClick={this.userMenuClose}>
                                    <ListItemIcon>
                                        <Icon>mail</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="Inbox" />
                                </MenuItem>
                                <MenuItem
                                    component={Link} to="/signIn"
                                    onClick={() => {
                                        this.props.logout();
                                        this.userMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <Icon>exit_to_app</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="Logout" />
                                </MenuItem>
                            </React.Fragment>
                        )}
                </Popover>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: Actions.logout
    }, dispatch);
}

function mapStateToProps({ auth }) {

    return {
        user: auth.login.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
