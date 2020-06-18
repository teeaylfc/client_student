import React, {Component} from 'react';
import {Paper, Button, Input, Icon, Typography, MuiThemeProvider, Select, MenuItem} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions/users.actions';
import {helpers, RIGHT_ID_ROLEUSER, RIGHT_ACT_CREATE} from "../../../../../common/Constants"
import {TABLE_HEADERS_USER} from "../../../../../common/Constants"

const fields = TABLE_HEADERS_USER.slice(0,-1)
class UsersHeader extends Component {
    state = {
        field: fields[0].id,
    }

    constructor(props) {
        super(props);
        this.props.setField({target: {value: fields[0].id}})
    }

    handleSelectField = event => {
        this.setState({field: event.target.value})
        this.props.setField(event)
    }

    render() {
        const {setSearchText, searchText, mainTheme, user} = this.props
    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="header-right-top-desc flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="mr-7 sm:mr-12">class</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Danh sách người dùng</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

                <MuiThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideDownIn" delay={300}>
                        <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder="Search"
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={setSearchText}
                            />
                            <Select value={this.state.field} onChange={this.handleSelectField}>
                                {fields.map(f => {
                                    return (
                                    <MenuItem value={f.id}>{f.label}</MenuItem>
                                    )
                                })}
                            </Select>
                        </Paper>
                    </FuseAnimate>
                </MuiThemeProvider>

            </div>
            <div style={{display:helpers.getDisplay(user.role.rights, RIGHT_ID_ROLEUSER, RIGHT_ACT_CREATE)}}>
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button component={Link} to="/user/new" className="whitespace-no-wrap" variant="contained">
                        <span className="hidden sm:flex">Tạo người dùng</span>
                        <span className="flex sm:hidden">New</span>
                    </Button>
                </FuseAnimate>
            </div>
        </div>
    );
    }
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setField: Actions.setUserField,
        setSearchText: Actions.setUsersSearchText
    }, dispatch);
}

function mapStateToProps({userApp, fuse, auth})
{
    console.log("usersApp", userApp)
    return {
        field: userApp.users.field,
        searchText: userApp.users.searchText,
        mainTheme : fuse.settings.mainTheme,
        user: auth.login.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersHeader);
