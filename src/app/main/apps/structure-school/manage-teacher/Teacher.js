import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/';
import reducer from '../store/reducers';
import DatePickers from "../../../../../common/DatePickers";
import Constants from 'common/Constants.js';
import ImageUpload from "../../../../../common/ImageUpload";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
var randomize = require('randomatic');
const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class Teacher extends Component {

    state = {
        tabValue: 0,
        form    : {
            userName: "",
            teacherId: "",
            nameTeacher: "",
            nameClass: "",
            passport : "",
            dateOfIssue : "",
            phoneTeacher : "",
            emailTeacher : "",
            subjectName : "",
            addressTeacher : "",
            statusTeacher : "",
            typeJob : "",
            degreeTeacher : "",
            _idSchool: "",
            idSchool: "",
            nameSchool: "",
            birthdayTeacher: "",
            genderTeacher: "",
            schoolInfoList : [],
            roleName: "",
            userId : "",
            avatar : ""
        },
        mandatoryFields: {
            teacherId: false,
            nameTeacher: false,
            topicName: false,
            nameClass: false,
            phoneTeacher : false,
            passport : false,
            emailTeacher : false,
        },
        professionalClassList : Constants.PROFESSIONAL_CLASS,
        nameClassList : [],
        subjectNameList : [],
        statusTeacherList : Constants.STATUS_TEACHER,
        typeJobList : [
        ],
        degreeList : Constants.DEGREE_TEACHER,
        genderList : Constants.GENDER_DROP_DOWN


    };

    componentDidMount()
    {
        this.updateProductState();
        this.props.getClassByIdSchool(this.props.user.schools[0].id);
        this.props.getAllRoleBySchoolId(this.props.user.schools[0].id);
        this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }

        if (
            (this.props.teachers.teacher.teacherId && !this.state.form.teacherId) ||
            (this.props.teachers.teacher.teacherId && this.state.form.teacherId && this.props.teachers.teacher.teacherId !== this.state.form.teacherId)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {

        if(nextProps.user.schools.length !== 0) {
            this.setState({form: {
                    ...this.state.form,
                    nameSchool: nextProps.user.schools[0].name,
                    idSchool: nextProps.user.schools[0].id,
                    _idSchool: nextProps.user.schools[0]._id,
                    userId : nextProps.user.user.userId,
                }});
        }


        if(nextProps.classes.classData.length !==0 && nextProps.role.roleData.length !== 0) {
            let result = nextProps.classes.classData.map(classData => ({ value: classData.idClass, label: classData.nameClass }));
            result = [{value: "", label: "--Chọn--"}, ...result];

            console.log('roleData',nextProps.role.roleData)
            let roleList = nextProps.role.roleData.map(roleData => ({ value: roleData.roleId, label: roleData.name }))
            roleList = [{value: "", label: "--Chọn--"}, ...roleList];

            this.setState({nameClassList: result, typeJobList: roleList})
        }

        if(nextProps.subjects.subjectsData.length != 0) {
            let subjects = nextProps.subjects.subjectsData.map(subjectData => ({ value: subjectData.subjectId, label: subjectData.subjectName }))
            subjects = [{value: "", label: "--Chọn--"}, ...subjects];
            this.setState({subjectNameList: subjects})
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.teachers.teacher})

    };

    updateProductState = () => {
        const params = this.props.match.params;
        const {idTeacher} = params;

        if ( idTeacher === 'new' )
        {
            this.props.newTeacher();
        }
        else
        {
            this.props.getTeacher(idTeacher);

        }
    };

    saveClass = ()=> {
        if (this.state.form._id) {
            this.props.updateTeacher(this.state.form, this.props.history);
        } else {
            this.props.addTeacher(this.state.form, this.props.history);
        }
    }

    _handleImageChange = (file,name) => {
        this.setState({form: {
                ...this.state.form,
                avatar : file
            }})
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    handleClickRandomValue = (event) => {
        const userName = this.state.form.idSchool + '-GV-'+ randomize('Aa0', 4);

        console.log("userName", userName);
        this.setState({form: _.set({...this.state.form}, 'userName', userName)});
    }

    canBeSubmitted()
    {
        console.log('formClass', this.state.form);
        const {name} = this.state.form;
        return (
            name && name.length > 0 &&
            !_.isEqual(this.props.classes.classroom, this.state.form)
        );
    }

    handleBlur= (event) => {
        if(event.target.value ==='') {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: true }
            });
        } else{
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: false }
            });
        }
    }

    handleChangeDate = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    render()
    {
        const {tabValue, form, mandatoryFields} = this.state;
        console.log('form', form);
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">
                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageTeacher/new">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách giáo viên
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" />
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.nameTeacher ? form.nameTeacher : 'Thêm mới giáo viên'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết giáo viên</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    onClick={() => this.saveClass(form)}
                                >
                                    Lưu
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Thông tin"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <div>
                                    <div className="flex">
                                        <FormControl className="flex mt-16 mb-16 mr-16 w-1/3 h-100">
                                            <InputLabel htmlFor="adornment-password">Mã đăng nhập</InputLabel>
                                            <Input
                                                id="userName"
                                                value={form.userName}
                                                onChange={this.handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password"
                                                            onClick={this.handleClickRandomValue}
                                                        >
                                                            <i className="far fa-plus-square"></i>
                                                        </IconButton>

                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            error={mandatoryFields.teacherId}
                                            required
                                            label="Mã giáo viên"
                                            id="teacherId"
                                            name="teacherId"
                                            value={form.teacherId}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            error={mandatoryFields.nameTeacher}
                                            required
                                            label="Tên giáo viên"
                                            id="nameTeacher"
                                            name="nameTeacher"
                                            value={form.nameTeacher}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                    </div>
                                    <div className="flex mt-8 mb-16">
                                        <p className="textLabel mt-8 mb-5 mr-16">Avatar</p>
                                        <ImageUpload file={form.avatar}
                                                     imagePreviewUrl={form.imagePreviewUrl}
                                                     name ={'avatar'}
                                                     uploadImage={this._handleImageChange}
                                        />
                                    </div>
                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/2 mr-20"
                                            value={this.state.genderList.filter(type => type.value === form.genderTeacher)}
                                            onChange={(value) => this.handleChipChange(value, 'genderTeacher')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Giới tính',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.genderList}
                                            isMulti={false}
                                        />
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20  w-1/2"
                                            value={this.state.subjectNameList.filter(type => type.value === form.subjectName)}
                                            onChange={(value) => this.handleChipChange(value, 'subjectName')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Môn phụ trách',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.subjectNameList}
                                            isMulti={false}
                                        />
                                    </div>
                                    <div className="flex">
                                        <div className="mt-8 mb-16 mr-20 w-1/2">
                                            <DatePickers
                                                label="Ngày sinh"
                                                id="birthdayTeacher"
                                                name="birthdayTeacher"
                                                onChange={this.handleChangeDate}
                                                value={form.birthdayTeacher}
                                            />
                                        </div>
                                        <TextField
                                            className="mt-8 mb-16 mr-20"
                                            label="Số điện thoại"
                                            id="phoneTeacher"
                                            name="phoneTeacher"
                                            error={mandatoryFields.phoneTeacher}
                                            required
                                            value={form.phoneTeacher}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-20"
                                            label="CMTND"
                                            error={mandatoryFields.passport}
                                            required
                                            id="passport"
                                            name="passport"
                                            value={form.passport}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <div className="mt-8 mb-16 mr-20 w-1/2">
                                            <DatePickers
                                                label="Ngày cấp CMTND"
                                                id="dateOfIssue"
                                                name="dateOfIssue"
                                                onChange={this.handleChangeDate}
                                                value={form.dateOfIssue}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Email"
                                            error={mandatoryFields.emailTeacher}
                                            id="emailTeacher"
                                            name="emailTeacher"
                                            required
                                            value={form.emailTeacher}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/2 mr-20"
                                            value={this.state.statusTeacherList.filter(type => type.value === form.statusTeacher)}
                                            onChange={(value) => this.handleChipChange(value, 'statusTeacher')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Trạng thái',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.statusTeacherList}
                                            isMulti={false}
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20"
                                            label="Địa chỉ"
                                            id="addressTeacher"
                                            name="addressTeacher"
                                            value={form.addressTeacher}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />


                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/2"
                                            value={this.state.typeJobList.filter(type => type.value === form.typeJob)}
                                            onChange={(value) => this.handleChipChange(value, 'typeJob')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : '' +
                                                    'Vị trí công tác',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.typeJobList}
                                            isMulti={false}
                                        />
                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/2 mr-20"
                                            value={this.state.degreeList.filter(type => type.value === form.degreeTeacher)}
                                            onChange={(value) => this.handleChipChange(value, 'degreeTeacher')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Bằng cấp',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.degreeList}
                                            isMulti={false}
                                        />


                                    </div>

                                </div>
                            )}
                        </div>
                    )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getTeacher : Actions.getTeacher,
        newTeacher : Actions.newTeacher,
        updateTeacher: Actions.updateTeacher,
        addTeacher: Actions.addTeacher,
        getAllClass: Actions.getAllClass,
        getClassByIdSchool: Actions.getClassByIdSchool,
        getAllRole : Actions.getAllRole,
        getAllRoleBySchoolId : Actions.getAllRoleBySchoolId,
        getTeacherBySchoolId : Actions.getTeacherBySchoolId,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool
    }, dispatch);
}

function mapStateToProps({teacherApp, auth})
{
    console.log('auth', auth);
    return {
        teachers: teacherApp.teachers,
        classes: teacherApp.classes,
        role : teacherApp.role,
        subjects: teacherApp.subjects,
        user : auth.login.user
    }
}

export default withReducer('teacherApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Teacher))));
