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
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Constants from 'common/Constants.js';


moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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

class Class extends Component {

    getYear = () => {
        const date = new Date,
          years = [{value: "", label: "--Chọn--"}],
          year = date.getFullYear();

        for (let i = year; i < year + 10; i++) {
            const schoolYearStr = i + ' - ' + (i + 1);
            const schoolYear = {
                value: schoolYearStr,
                label: schoolYearStr
            };
            years.push(schoolYear);
        }
        return years;
    }

    state = {
        tabValue: 0,
        form    : {
            groupOfClass: "",
            idClass: "",
            nameClass: "",
            idSchool: "",
            nameSchool: "",
            professionalClass: false,
            schoolYear: "",
            teacherManage: "",
            totalStudent: "",
            typeClass: "",
            _idSchool:""
        },
        schoolYearList: this.getYear(),
        mandatoryFields: {
            idClass : false,
            nameClass : false,
            idSchool : false,
            groupOfClass : false,
            nameSchool : false,
            teacherManage : false,
            totalStudent : false
        },
        typeClassList: Constants.TYPE_CLASS,
        teacherList: [],
        professionalClassList : Constants.PROFESSIONAL_CLASS,
        schedulerTraining : [
            {
                id: 0,
                title: '12A1',
                allDay: true,
                start: new Date(2019, 3, 30, 9, 0, 0),
                end: new Date(2019, 3, 30, 10, 30, 0),
            },
            {
                id: 1,
                title: '10B1',
                start: new Date(2019, 3, 31, 14, 0, 0),
                end: new Date(2019, 3, 31,14, 45, 0),
            },

        ],
        classRoomListing: [],
        degreeClass1: Constants.DEGREE_CLASS_1,
        degreeClass2: Constants.DEGREE_CLASS_2,
        degreeClass3: Constants.DEGREE_CLASS_3,
    };

    componentDidMount()
    {
        this.updateProductState();
        //this.props.getAllSchool();
        const schoolId = this.props.user.schools[0].id;
        this.props.getTeacher(schoolId)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }

        if ( this.props.classes.classroom &&
            (( this.props.classes.classroom.idClass && !this.state.form.idClass) ||
                (this.props.classes.classroom.idClass && this.state.form.idClass && this.props.classes.classroom.idClass !== this.state.form.idClass))
        ) {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.user.schools.length !== 0) {
            this.setState({form: {
                    ...this.state.form,
                    idSchool: nextProps.user.schools[0].id,
                    nameSchool: nextProps.user.schools[0].name,
                    _idSchool: nextProps.user.schools[0]._id
                }})

            if(nextProps.user.schools[0].degree_number === '1') {
                this.setState({classRoomListing : this.state.degreeClass1})
            } else if(nextProps.user.schools[0].degree_number === '2') {
                this.setState({classRoomListing : this.state.degreeClass2})
            } else {
                this.setState({classRoomListing : this.state.degreeClass3})
            }
        }

        if(nextProps.teachers.teachers.length !== 0) {
            let teachers = nextProps.teachers.teachers.map(teacher => ({ value: teacher.teacherId, label: teacher.nameTeacher }))
            teachers = [{value: "", label: "--Chọn--"}, ...teachers];
            this.setState({teacherList: teachers});
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.classes.classroom});

    };

    updateProductState = () => {

        const params = this.props.match.params;
        const {idClass} = params;

        if ( idClass === 'new' )
        {
            this.props.newClass();
        }
        else
        {
            this.props.getClass(idClass);
        }
    };

    saveClass = ()=> {
        if (this.state.form._id) {
            this.props.updateClass(this.state.form, this.props.history);
        } else {
            this.props.addClass(this.state.form, this.props.history);
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
        } else{
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: false }
            });
        }
    }

    render()
    {
        const {tabValue, form, mandatoryFields, classRoomListing} = this.state;
        console.log('classRoomListing', classRoomListing);
        console.log('form render', form);
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageClass/new">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách lớp học
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        {/*{form.images.length > 0 ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                                        ) : (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                        )}*/}
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" />
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.nameClass ? form.nameClass : 'Thêm mới lớp học'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết lớp học</Typography>
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
                        <Tab className="h-64 normal-case" label="Lịch giảng dạy"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.idSchool}
                                            required
                                            label="Mã trường học"
                                            autoFocus
                                            id="idSchool"
                                            name="idSchool"
                                            value={form.idSchool}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.nameSchool}
                                            required
                                            label="Tên trường học"
                                            id="nameSchool"
                                            name="nameSchool"
                                            value={form.nameSchool}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            disabled={true}
                                            fullWidth
                                        />


                                    </div>
                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-16 w-1/2"
                                            value={this.state.schoolYearList.filter(type => type.value === form.schoolYear)}
                                            onChange={(value) => this.handleChipChange(value, 'schoolYear')}
                                            required
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Niên khóa',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.schoolYearList}
                                            isMulti={false}
                                        />
                                        {/*<TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            label="Khối học"
                                            error={mandatoryFields.groupOfClass}
                                            required
                                            id="groupOfClass"
                                            name="groupOfClass"
                                            value={form.groupOfClass}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />*/}
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={classRoomListing.filter(classRoom => classRoom.value === form.groupOfClass)}
                                            onChange={(value) => this.handleChipChange(value, 'groupOfClass')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label: 'Khối lớp',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'standard'
                                            }}
                                            options={classRoomListing}
                                            isMulti={false}
                                        />
                                    </div>
                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.typeClassList.filter(type => type.value === form.typeClass)}
                                            onChange={(value) => this.handleChipChange(value, 'typeClass')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Ban học',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.typeClassList}
                                            isMulti={false}
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            label="Mã lớp học"
                                            error={mandatoryFields.idClass}
                                            required
                                            id="idClass"
                                            name="idClass"
                                            value={form.idClass}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />



                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            label="Tên lớp học"
                                            error={mandatoryFields.nameClass}
                                            id="nameClass"
                                            name="nameClass"
                                            required
                                            value={form.nameClass}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.teacherList.filter(type => type.value === form.teacherManage)}
                                            onChange={(value) => this.handleChipChange(value, 'teacherManage')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Giáo viên chủ nhiệm',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.teacherList}
                                            isMulti={false}
                                        />



                                    </div>
                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.professionalClassList.filter(type => type.value === form.professionalClass)}
                                            onChange={(value) => this.handleChipChange(value, 'professionalClass')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Lớp chuyên',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.professionalClassList}
                                            isMulti={false}
                                        />

                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            label="Sĩ số"
                                            disabled={true}
                                            id="totalStudent"
                                            name="totalStudent"
                                            value={form.totalStudent}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                </div>
                            )}
                            {tabValue === 1 && (
                                <div className='min-h-640'>
                                    <BigCalendar
                                        events={this.state.schedulerTraining}
                                        step={60}
                                        view='week'
                                        views={allViews}
                                        showMultiDayTimes
                                        defaultDate={new Date(2019, 3, 30)}
                                        localizer={localizer}
                                        startAccessor="start"
                                        endAccessor="end"
                                    />

                                    <BigCalendar


                                    />

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
        getClass : Actions.getClass,
        newClass : Actions.newClass,
        updateClass: Actions.updateClass,
        addClass: Actions.addClass,
        getTeacher: Actions.getTeacherBySchoolId,
        //getAllSchool: Actions.getAllSchool,
        getSchoolByUser: Actions.getSchoolByUser,
    }, dispatch);
}

function mapStateToProps({classesApp, auth})
{
    console.log('auth class', auth)
    return {
        classes: classesApp.classes,
        schools: classesApp.school.schools,
        teachers: classesApp.teachers,
        user : auth.login.user
    }
}

export default withReducer('classesApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Class))));
