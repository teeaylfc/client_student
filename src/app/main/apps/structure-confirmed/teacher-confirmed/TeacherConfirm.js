import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

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
            teacherId: "",
            nameTeacher: "",
            birthdayTeacher: "",
            genderTeacher: "",
            phoneTeacher : "",
            emailTeacher : "",
            subjectName : "",
            degreeTeacher : "",
            addressTeacher : "",
            statusTeacher: "",
            schoolInfoList : [],
            roleName:"",
        },
        roleList :[]
    };

    async componentDidMount()
    {
        const params = this.props.match.params;
        const {idTeacher} = params;
        await  this.props.getTeacher(idTeacher);
        await this.props.getAllRole();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (
            (this.props.teachers.teacher.teacherId && !this.state.form.teacherId) ||
            (this.props.teachers.teacher.teacherId && this.state.form.teacherId && this.props.teachers.teacher.teacherId !== this.state.form.teacherId)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log('nextProps classes', nextProps)

        if( nextProps.role.roleData.length !==0){
            const roleList = nextProps.role.roleData.map(roleData => ({ value: roleData.name, label: roleData.name }))
            this.setState({form: {
                    ...this.state.form
                }, roleList: roleList})
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.teachers.teacher})

    };

    saveClass = ()=> {
        this.props.activeTeacher(this.state.form.teacherId, this.props.history);
    }

    reject = ()=> {
        this.props.rejectTeacher(this.state.form.teacherId, this.props.history);
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
        }

    }

    render()
    {
        const {tabValue, form} = this.state;
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-96 h-96 sm:h-96 sm:min-h-96"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">
                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageTeacherConfirm">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách phê duyệt giáo viên
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" />
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết giáo viên</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>

                            { this.state.form.statusTeacher === 'I' ?
                                <div className="flex">

                                <div className="mr-16">
                                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                        <Button
                                            className="whitespace-no-wrap"
                                            variant="contained"
                                            onClick={() => this.saveClass(form)}
                                        >
                                            Phê duyệt
                                        </Button>
                                    </FuseAnimate>
                                </div>


                                <div>
                                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                        <Button
                                            className="whitespace-no-wrap"
                                            variant="contained"
                                            onClick={() => this.reject(form)}
                                        >
                                            Từ chối
                                        </Button>
                                    </FuseAnimate>
                                </div>
                            </div> : null
                            }



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
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Mã giáo viên"
                                            autoFocus
                                            id="teacherId"
                                            name="teacherId"
                                            value={form.teacherId}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Tên giáo viên"
                                            autoFocus
                                            id="nameTeacher"
                                            name="nameTeacher"
                                            value={form.nameTeacher}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Ngày sinh"
                                            autoFocus
                                            id="birthdayTeacher"
                                            name="birthdayTeacher"
                                            value={form.birthdayTeacher}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Giới tính"
                                            autoFocus
                                            id="genderTeacher"
                                            name="genderTeacher"
                                            value={form.genderTeacher === 'male' ? "Nam" : "Nữ"}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Số điện thoại"
                                            autoFocus
                                            id="phoneTeacher"
                                            name="phoneTeacher"
                                            value={form.phoneTeacher}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Email"
                                            autoFocus
                                            id="emailTeacher"
                                            name="emailTeacher"
                                            value={form.emailTeacher}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Môn phụ trách"
                                            autoFocus
                                            id="subjectName"
                                            name="subjectName"
                                            value={form.subjectName}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Bằng cấp"
                                            autoFocus
                                            id="degreeTeacher"
                                            name="degreeTeacher"
                                            value={form.degreeTeacher}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Địa chỉ"
                                            autoFocus
                                            id="addressTeacher"
                                            name="addressTeacher"
                                            value={form.addressTeacher}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/2"
                                            label="Trạng thái"
                                            autoFocus
                                            id="statusTeacher"
                                            name="statusTeacher"
                                            value={form.statusTeacher === "I" ? "Đang chờ duyệt" : "Từ chối"}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                    </div>
                                    {
                                        form.statusTeacher === 'I' ? <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.roleList.filter(type => type.value === form.roleName)}
                                            onChange={(value) => this.handleChipChange(value, 'roleName')}
                                            required
                                            placeholder="--Chọn quyền hạn--"
                                            textFieldProps={{
                                                label          : 'Quyền hạn',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.roleList}
                                            isMulti={false}
                                        /> : null
                                    }


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
        activeTeacher: Actions.activeTeacher,
        addTeacher: Actions.addTeacher,
        //getAllClass: Actions.getAllClass,
        getAllRole : Actions.getAllRole,
        rejectTeacher: Actions.rejectTeacher
    }, dispatch);
}

function mapStateToProps({teacherApp})
{
    console.log('teacherApp', teacherApp);
    return {
        teachers: teacherApp.teachers,
        classes: teacherApp.classes,
        role : teacherApp.role
    }
}

export default withReducer('teacherApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Teacher))));
