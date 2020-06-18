import React, {Component} from 'react';
import {Paper, Button, Input, Icon, Typography, MuiThemeProvider, Select, MenuItem} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions/students.actions';
import UploadFileModal from "../../../../utils/UploadFileModal";
import StudentModalResult from "./StudentModalResult";
import {TABLE_HEADERS_STUDENT} from "../../../../../common/Constants";

const fields = TABLE_HEADERS_STUDENT.slice(0,-1)

class StudentsHeader extends  Component {
    state = {
        showModal : false,
        showResultModal : false,
        fileUpload: null,
        loading: false,
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

    handleClose = () => {
        this.setState({ showModal: false });
    }

    handleShow = () => {
        this.setState({ showModal: true });
    }

    handleResultClose = () => {
        this.setState({ showResultModal: false });
        //history.push('/manageTeacher');
        //this.props.history.push('/manageTeacher');
        const idSchool = this.props.user._id;
        console.log('idSchool', idSchool);
        if(idSchool != null) {
            this.props.getStudentBySchoolId(idSchool);
        }
    }

    handleResultShow = () => {
        this.setState({ showResultModal: true });
    }

    onchangeUploadFile= (event) => {
        console.log(event.target.files[0])
        this.setState({fileUpload: event.target.files[0],
            loaded: 0})
    }

    handleUploadFile = async () => {
        const file = this.state.fileUpload;
        if(file) {
            await this.props.uploadStudent(file);
            await this.handleClose();
            await this.setState({showResultModal : true})
        } else {
            alert("Bạn chưa chọn File")
        }
    }
    render (){
        const {setSearchText, searchText, mainTheme} = this.props;
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="header-right-top-desc flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="mr-7 sm:mr-12">people</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="hidden sm:flex" variant="h6">Danh sách học sinh</Typography>
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

                <div className="custom-header-import">
                    <div className="mr-16" >
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button variant="contained" onClick={this.handleShow}>
                                <span className="hidden sm:flex"><img src="assets/images/icons/import.png"/></span>
                            </Button>
                        </FuseAnimate>
                    </div>

                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                        <Button component={Link} to="/students/new" className="whitespace-no-wrap" variant="contained">
                            <span className="hidden sm:flex">Thêm mới học sinh</span>
                            <span className="flex sm:hidden">New</span>
                        </Button>
                    </FuseAnimate>
                    <UploadFileModal
                        showModal={this.state.showModal}
                        handleClose ={this.handleClose}
                        onChangeHandler ={this.onchangeUploadFile}
                        handleUploadFile = {this.handleUploadFile} />

                    <StudentModalResult
                        showModal={this.state.showResultModal}
                        handleClose ={this.handleResultClose}
                        data = {this.props.uploadResult} />

                </div>
            </div>
        );
    }

};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setField: Actions.setStudentField,
        setSearchText: Actions.setStudentsSearchText,
        getStudentBySchoolId : Actions.getStudentBySchoolId,
        uploadStudent : Actions.uploadStudent,
    }, dispatch);
}

function mapStateToProps({studentsApp, fuse, auth})
{
    return {
        field: studentsApp.student.field,
        searchText: studentsApp.student.searchText,
        mainTheme : fuse.settings.mainTheme,
        uploadResult : studentsApp.student.uploadResult,
        user : auth.login.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsHeader);
