import React, {Component} from 'react';
import {Paper, Button, Input, Icon, Typography, MuiThemeProvider, Select, MenuItem, FormControl, InputLabel, TextField } from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions';
import {helpers, RIGHT_ID_EXAMINATION, RIGHT_ACT_CREATE} from "../../../../../common/Constants"
import {TABLE_HEADERS_EXAM} from "../../../../../common/Constants";
import UploadFileModal from "../../../../utils/UploadFileModal";
import ExamDefineModalResult from "./ExamDefineModalResult";
import ExpandMore from '@material-ui/icons/ExpandMore';
import Formsy from 'formsy-react';

const fields = TABLE_HEADERS_EXAM.slice(0,-1);

const classRoomList = ["10", "11", "12"];   
const subjectLisst = ["Toán", "Văn", "Anh"];

class ExamDefineListHeader extends Component {
    state = {
        field: fields[0].id,
        classRoom: '',
        subjectValue: '',
        subject: '',
        searchAll: '',
        showModal : false,
        showResultModal : false,
        fileUpload: null
    }

    constructor(props) {
        super(props);
        this.props.setField({target: {value: fields[0].id}})
    }

    handleSelectField = event => {
        this.setState({field: event.target.value})
        this.props.setField(event)
    }

    handleSelectRelated = event => {
        this.setState({field: event.target.name, [event.target.name]: event.target.value});
        this.props.setField(event);
        console.log(event.target.name);
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
        // const idSchool = this.props.user.schools[0].id;
        // console.log('idSchool', idSchool);
        // if(idSchool != null) {
        //     this.props.getClassByIdSchool(idSchool);
        // }
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
            // await this.props.uploadClass(file, this.props.user.schools[0].id);
            await this.handleClose();
            await this.setState({showResultModal : true})
        } else {
            alert("Bạn chưa chọn File")
        }
    }

    render() {
        const {setSearchText, searchText, mainTheme, user} = this.props
        return (
            <>
                <div className="flex flex-1 w-full items-center justify-between">

                    <div className="header-right-top-desc flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="mr-7 sm:mr-12">shopping_basket</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="hidden sm:flex" variant="h6">Danh sách Đề thi/ Kiểm tra</Typography>
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
                    <div style={{display:helpers.getDisplay(user.role.rights, RIGHT_ID_EXAMINATION, RIGHT_ACT_CREATE)}}>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button component={Link} to="/examDefine/new" className="whitespace-no-wrap" variant="contained">
                                <span className="hidden sm:flex">Tạo đề thi</span>
                                <span className="flex sm:hidden">Tạo</span>
                            </Button>
                        </FuseAnimate>
                    </div>
                </div>
                <div className="flex flex-1 w-full items-center justify-between header-top-box">
                    <div className="header-right-top-desc flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="mr-7 sm:mr-12">shopping_basket</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="hidden sm:flex" variant="h6">Danh sách gói câu hỏi</Typography>
                        </FuseAnimate>
                    </div>
                    <div className="ml-auto" >
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button className="header-file" variant="contained" onClick={this.handleShow}>
                                <span className="hidden sm:flex"><img src="assets/images/icons/import.png"/></span>
                            </Button>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button className="header-file" variant="contained" onClick={this.handleShow}>
                                <span className="hidden sm:flex"><img src="assets/images/icons/export.png"/></span>
                            </Button>
                        </FuseAnimate>
                        <UploadFileModal
                            showModal={this.state.showModal}
                            handleClose ={this.handleClose}
                            onChangeHandler ={this.onchangeUploadFile}
                            handleUploadFile = {this.handleUploadFile} />

                        <ExamDefineModalResult
                            showModal={this.state.showResultModal}
                            handleClose ={this.handleResultClose}
                            data = {this.props.uploadResult} />
                    </div>
                </div>
                <h4 className="text-search">Tìm kiếm Danh sách Đề thi/ Kiểm tra</h4>
                <Formsy className="row form-fuse-search">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="item">
                                    <div className="item-left">
                                        <Typography variant="subtitle1" className="text-left form-fuse-search-desc">
                                            Khối lớp
                                        </Typography>
                                    </div>
                                    <div className="item-right">
                                        <Select 
                                            className="w-full form-fuse-search-select" 
                                            name={'classRoom'}
                                            value={this.state.classRoom}
                                            onChange={this.handleSelectRelated}
                                            IconComponent = {ExpandMore}
                                        >
                                            <MenuItem value="none">
                                                <em>None</em>
                                            </MenuItem>
                                            {classRoomList.map(f => {
                                                return (
                                                    <MenuItem value={f}>{f}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="item">
                                    <TextField
                                        className="w-full form-fuse-search-select form-fuse-search-select-textField"
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="item">
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Trạng thái
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            className="w-full form-fuse-search-select" 
                                            name={'subject'}
                                            value={this.state.subject}
                                            onChange={this.handleSelectRelated}
                                            IconComponent = {ExpandMore}
                                        >
                                            <MenuItem value="none">
                                                <em>None</em>
                                            </MenuItem>
                                            {subjectLisst.map(f => {
                                                return (
                                                    <MenuItem value={f}>{f}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                        <div className="item item-search">
                            <div className="group-search">
                                <Icon className="mr-8" color="action">search</Icon>
                                <Input
                                    placeholder="Tìm kiếm"
                                    className="w-full form-fuse-search-all"
                                    name={'searchAll'}
                                    value={this.state.searchAll}
                                    onChange={this.handleSelectRelated}
                                />
                            </div>
                            <div className="item-search-icon">
                                <div style={{display:helpers.getDisplay(user.role.rights, RIGHT_ID_EXAMINATION, RIGHT_ACT_CREATE)}}>
                                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                        <Button className="btn-plus" component={Link} to="/questionsPack/new" variant="contained">
                                            <img src="assets/images/icons/icon-plus.svg" alt="Icon Plus"/>
                                        </Button>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                    </div>
                </Formsy> 
                <h4 className="text-search">Danh sách Đề thi/ Kiểm tra</h4>
            </>
        );
    }
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setField: Actions.setExamDefineField,
        setSearchText: Actions.setExamDefineSearchText
    }, dispatch);
}

function mapStateToProps({examDefineApp, fuse, auth})
{
    return {
        field: examDefineApp.examDefines.field,
        searchText: examDefineApp.examDefines.searchText,
        mainTheme : fuse.settings.mainTheme,
        user: auth.login.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamDefineListHeader);
