import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/';
import reducer from '../store/reducers';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            boxShadow: theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class User extends Component {

    state = {
        tabValue: 0,
        form: {
            userId: "",
            name: "",
            phone: "",
            email: "",
            address: "",
            passport: "",
            typeUser: "",
            degree: "",
            password: "",
            avatar: "",
            userRole: {
                nameSchool: "",
                idSchool: "",
                nameClassManage: "",
                nameClassTeach: "",
                nameClassStudy: "",
                roleName: "",
                roleId: "",
                subjectNameTeach: "",
                status: ""
            },

        },
        isManager: false,
        isTeacher: false,
        isStudent: false
        ,
        typeUserList: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "QTV",
                label: "Quản trị viên"
            },
        ],
        typeGV: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "GV",
                label: "Giáo viên"
            },
        ],
        mandatoryFields: {
            userId: false,
            name: false,
        },
        degreeList: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "CNSP",
                label: "Cử nhân sư phạm"
            },
            {
                value: "THS",
                label: "Thạc sĩ"
            },
            {
                value: "TS",
                label: "Tiến sĩ"
            }
        ],
        classRoomListing: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "1",
                label: "1"
            },
            {
                value: "2",
                label: "2"
            },
            {
                value: "3",
                label: "3"
            },
            {
                value: "4",
                label: "4"
            },
            {
                value: "5",
                label: "5"
            },
            {
                value: "6",
                label: "6"
            },
            {
                value: "7",
                label: "7"
            },
            {
                value: "8",
                label: "8"
            },
            {
                value: "9",
                label: "9"
            },
            {
                value: "10",
                label: "10"
            },
            {
                value: "11",
                label: "11"
            },
            {
                value: "12",
                label: "12"
            }
        ],
        statusList: [],
        statusTeacherList: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "A",
                label: "Đang công tác"
            },
            {
                value: "I",
                label: "Ngừng công tác"
            }
        ],
        statusStudentList: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "A",
                label: "Đang theo học"
            },
            {
                value: "I",
                label: "Nghỉ học"
            }
        ],
        nameSchoolList: [],
        roleList: [],
        nameClassList: [],
        currentSchool: ""


    };

    async componentDidMount() {
        await this.props.clearUser();
        /*if(this.props.userLogin.user.role) {
            const typeUser = this.props.userLogin.user.role.type_user;
            if(typeUser === 'S') {
                await this.props.getRoleForStaff();
            } else if(typeUser =='P') {
                await this.props.getAllRoleBySchoolId(this.props.userLogin.schools[0].id);
            }
        }
        else {
            await this.props.getAllRole();
        }*/
        await this.props.getAllRoleBySchoolId(this.props.userLogin.schools[0].id);

        //const userType = this.props.userLogin.user.role.type_user;
        await this.updateProductState();


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.updateProductState();
        }

        if (
            (this.props.users.user.userId && !this.state.form.userId) ||
            (this.props.users.user.userId && this.state.form.userId && this.props.users.user.userId !== this.state.form.userId)
        ) {
            //this.updateFormState();
            this.setState({
                form: {
                    ...this.props.users.user, userRole: {...this.props.users.user.userRole}
                }
            });
            const type = this.props.users.user.typeUser;
            if (type === "QTV") {
                const typeUsers = this.state.typeUserList.filter((x) => x.value != 'HS')
                console.log('typeUsers', typeUsers);
                this.setState({
                    isManager: true,
                    isTeacher: false,
                    isStudent: false,
                    statusList: this.state.statusTeacherList,
                    typeUserList: typeUsers
                })
            } else if (type === "GV") {
                const typeUsers = this.state.typeGV;
                this.setState({
                    isManager: false,
                    isTeacher: true,
                    isStudent: false,
                    statusList: this.state.statusTeacherList,
                    typeUserList: typeUsers
                })
            } else if (type === "HS") {
                const typeUsers = this.state.typeUserList.filter((x) => x.value === 'HS')
                this.setState({
                    isManager: false,
                    isTeacher: false,
                    isStudent: true,
                    statusList: this.state.statusStudentList,
                    typeUserList: typeUsers
                })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.schools.schools.length !== 0)) {
            let result = nextProps.schools.schools.map(schoolData => ({value: schoolData.id, label: schoolData.name}));
            result = [{value: "", label: "--Chọn--"}, ...result];
            console.log('result', result);
            this.setState({
                form: {
                    ...this.state.form
                }, nameSchoolList: result
            })
        }

        if (nextProps.role.roleData.length !== 0) {
            let roleList = nextProps.role.roleData.map(roleData => ({value: roleData.roleId, label: roleData.name}))
            roleList = [{value: "", label: "--Chọn--"}, ...roleList];
            this.setState({
                form: {
                    ...this.state.form
                }, roleList: roleList
            })
        }

        if ((nextProps.classes.classData.length !== 0)) {
            let classList = nextProps.classes.classData.map(classData => ({
                value: classData.idClass,
                label: classData.nameClass
            }));
            classList = [{value: "", label: "--Chọn--"}, ...classList];
            this.setState({
                form: {
                    ...this.state.form,
                }, nameClassList: classList
            })
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.users.user})
        const type = this.props.users.user.typeUser;
        if (type === "QTV") {
            const typeUsers = this.state.typeUserList.filter((x) => x.value === 'QTV')
            console.log('typeUsers', typeUsers);
            this.setState({
                isManager: true,
                isTeacher: false,
                isStudent: false,
                statusList: this.state.statusTeacherList,
                typeUserList: typeUsers
            })
        } else if (type === "GV") {
            const typeUsers = this.state.typeUserList.filter((x) => x.value === 'GV')
            this.setState({
                isManager: false,
                isTeacher: true,
                isStudent: false,
                statusList: this.state.statusTeacherList,
                typeUserList: typeUsers
            })
        } else if (type === "HS") {
            const typeUsers = this.state.typeUserList.filter((x) => x.value === 'HS')
            this.setState({
                isManager: false,
                isTeacher: false,
                isStudent: true,
                statusList: this.state.statusStudentList,
                typeUserList: typeUsers
            })
        }

    };

    updateProductState = () => {
        const userID = this.props.userLogin.user.userId;
        if (userID === 'ssAdmin') {
            this.props.getAllSchool();
        } else {
            this.props.getSchoolByUser(this.props.userLogin.user.email);

            if (this.props.schools.schools && this.props.schools.schools.length > 0) {
                const schoolId = this.props.schools.schools[0].id;
                this.props.getClassByIdSchool(schoolId)
            }
        }

        const params = this.props.match.params;
        const {idUser} = params;
        if (idUser === 'new') {
            this.props.newUser();
        } else {
            this.props.getUser(idUser);
        }
    };

    saveClass = () => {
        if (this.state.form._id) {
            this.props.updateUser(this.state.form, this.props.history);
        } else {
            this.props.addUser(this.state.form, this.props.history);
        }
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

    handleNameSchoolChange = (value, name) => {
        this.props.getClassByIdSchool(value.value)
        this.setState({form: _.set({...this.state.form}, name, value.value)});
        //TODO: setState 2 value
        /*this.setState({form: {
                ...this.state.form, userRole : {... this.state.form.userRole ,idSchool: value.value}}});*/
    }


    handleTypeUserChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
        const type = value.value;
        if (type === "QTV") {
            this.setState({
                isManager: true,
                isTeacher: false,
                isStudent: false,
                statusList: this.state.statusTeacherList
            })
        } else if (type === "GV") {
            this.setState({
                isManager: false,
                isTeacher: true,
                isStudent: false,
                statusList: this.state.statusTeacherList
            })
        } else if (type === "HS") {
            this.setState({
                isManager: false,
                isTeacher: false,
                isStudent: true,
                statusList: this.state.statusStudentList
            })
        }
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted() {
        const {name} = this.state.form;
        return (
            name && name.length > 0 &&
            !_.isEqual(this.props.users.user, this.state.form)
        );
    }

    handleBlur = (event) => {
        if (event.target.value === '') {
            this.setState({
                mandatoryFields: {...this.state.mandatoryFields, [event.target.name]: true}
            });
        } else {
            this.setState({
                mandatoryFields: {...this.state.mandatoryFields, [event.target.name]: false}
            });
        }

    }

    render() {
        const {tabValue, form, mandatoryFields} = this.state;
        console.log('form in render', form);
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header: "min-h-96 h-96 sm:h-96 sm:min-h-96"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">
                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link}
                                                role="button" to="/manageUser/new">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách người dùng
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        {/*{form.images.length > 0 ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                                        ) : (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                        )}*/}
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                                             src="assets/images/ecommerce/product-image-placeholder.png"/>
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.nameClass ? form.nameClass : 'Người dùng mới'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết người dùng</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    //disabled={!this.canBeSubmitted()}
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
                        {/*<Tab className="h-64 normal-case" label="Lịch giảng dạy"/>*/}
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-16 w-1/2"
                                            error={mandatoryFields.userId}
                                            required
                                            label="Mã đăng nhập"
                                            autoFocus
                                            id="userId"
                                            name="userId"
                                            value={form.userId}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.name}
                                            required
                                            label="Tên đầy đủ"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />


                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-16 w-1/2"
                                            label="Số điện thoại"
                                            autoFocus
                                            id="phone"
                                            name="phone"
                                            value={form.phone}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            label="Email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />


                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-16 w-1/2"
                                            label="Địa chỉ"
                                            autoFocus
                                            id="address"
                                            name="address"
                                            value={form.address}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            label="CMT"
                                            id="passport"
                                            name="passport"
                                            value={form.passport}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-16 w-1/2"
                                            value={this.state.typeUserList.filter(type => type.value === form.typeUser)}
                                            onChange={(value) => this.handleTypeUserChange(value, 'typeUser')}
                                            required
                                            disable="true"
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label: 'Loại người dùng',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'standard'
                                            }}
                                            options={this.state.typeUserList}
                                            isMulti={false}
                                        />
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.degreeList.filter(type => type.value === form.degree)}
                                            onChange={(value) => this.handleChipChange(value, 'degree')}
                                            required
                                            placeholder="--Bằng cấp--"
                                            textFieldProps={{
                                                label: 'Trình độ học vấn',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'standard'
                                            }}
                                            options={this.state.degreeList}
                                            isMulti={false}
                                        />
                                    </div>
                                    <h3 className="text-blue-light">Phân quyền người dùng</h3>
                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.nameSchoolList.filter(type => type.value === form.userRole.idSchool)}
                                            onChange={(value) => this.handleNameSchoolChange(value, 'userRole.idSchool')}
                                            required
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label: 'Trường học',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'standard'
                                            }}
                                            options={this.state.nameSchoolList}
                                            isMulti={false}
                                        />
                                        {/*<TextField
                                            className="mt-16 mb-16 mr-16 w-1/2"
                                            error={mandatoryFields.nameSchool}
                                            required
                                            label="Tên trường học"
                                            id="nameSchool"
                                            name="nameSchool"
                                            value={form.userRole.nameSchool}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />*/}
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.roleList.filter(type => type.value === form.userRole.roleId)}
                                            onChange={(value) => this.handleChipChange(value, 'userRole.roleId')}
                                            required
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label: 'Quyền hạn',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'standard'
                                            }}
                                            options={this.state.roleList}
                                            isMulti={false}
                                        />
                                    </div>
                                    {this.state.isTeacher === true ?
                                        <div className="flex">
                                            <FuseChipSelect
                                                className="mt-8 mb-16 mr-16 w-1/2"
                                                value={this.state.nameClassList.filter(type => type.value === form.userRole.nameClassManage)}
                                                onChange={(value) => this.handleChipChange(value, 'userRole.nameClassManage')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label: 'Lớp chủ nhiệm',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'standard'
                                                }}
                                                options={this.state.nameClassList}
                                                isMulti={false}
                                            />

                                            <FuseChipSelect
                                                className="mt-8 mb-16 mr-8 w-1/2"
                                                value={this.state.nameClassList.filter(type => type.value === form.userRole.nameClassTeach)}
                                                onChange={(value) => this.handleChipChange(value, 'userRole.nameClassTeach')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label: 'Lớp dạy hiện tại',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'standard'
                                                }}
                                                options={this.state.nameClassList}
                                                isMulti={false}
                                            />
                                        </div> : null
                                    }
                                    {this.state.isStudent === true ?
                                        <div className="flex">
                                            <FuseChipSelect
                                                className="mt-8 mb-16 mr-16 w-1/2"
                                                value={this.state.classRoomListing.filter(type => type.value === form.userRole.degreeNumber)}
                                                onChange={(value) => this.handleChipChange(value, 'userRole.degreeNumber')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label: 'Khối hiện tại',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'standard'
                                                }}
                                                options={this.state.classRoomListing}
                                                isMulti={false}
                                            />

                                            <FuseChipSelect
                                                className="mt-8 mb-16  mr-8 w-1/2"
                                                value={this.state.nameClassList.filter(type => type.value === form.userRole.nameClassStudy)}
                                                onChange={(value) => this.handleChipChange(value, 'userRole.nameClassStudy')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label: 'Lớp học hiện tại',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'standard'
                                                }}
                                                options={this.state.nameClassList}
                                                isMulti={false}
                                            />
                                        </div> : null
                                    }

                                    <div>
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-16 w-1/2"
                                            value={this.state.statusList.filter(type => type.value === form.userRole.status)}
                                            onChange={(value) => this.handleChipChange(value, 'userRole.status')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label: 'Trạng thái',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'standard'
                                            }}
                                            options={this.state.statusList}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser: Actions.getUser,
        newUser: Actions.newUser,
        updateUser: Actions.updateUser,
        addUser: Actions.addUser,
        getAllSchool: Actions.getAllSchool,
        getSchoolByUser: Actions.getSchoolByUser,
        getAllClass: Actions.getAllClass,
        getClassByIdSchool: Actions.getClassByIdSchool,
        getAllRole: Actions.getAllRole,
        getAllRoleBySchoolId: Actions.getAllRoleBySchoolId,
        getRoleForStaff: Actions.getRoleForStaff,
        clearUser: Actions.clearUser
    }, dispatch);
}

function mapStateToProps({userApp, auth}) {
    console.log('auth', auth.login.user);
    return {
        users: userApp.users,
        classes: userApp.classes,
        role: userApp.role,
        userLogin: auth.login.user,
        schools: userApp.schools
    }
}

export default withReducer('userApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(User))));
