import React from 'react';
import {Paper, Input, Icon, Typography, MuiThemeProvider} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions/users.actions';

const TeacherConfirmHeader = ({setSearchText, searchText, mainTheme}) => {

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="header-right-top-desc flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="mr-7 sm:mr-12">class</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Danh sách phê duyệt giáo viên</Typography>
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
                        </Paper>
                    </FuseAnimate>
                </MuiThemeProvider>

            </div>
            {/*<FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button component={Link} to="/user/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">Tạo người dùng</span>
                    <span className="flex sm:hidden">New</span>
                </Button>
            </FuseAnimate>*/}
        </div>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setUsersSearchText
    }, dispatch);
}

function mapStateToProps({teacherConfirmApp, fuse})
{
    return {
        searchText: teacherConfirmApp.teachers.searchText,
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherConfirmHeader);
