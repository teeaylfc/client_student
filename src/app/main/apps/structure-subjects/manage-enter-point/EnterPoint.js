import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Table from "react-bootstrap/Table";
import ChipInput from 'material-ui-chip-input'

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

class EnterPoint extends Component {

    constructor(props) {
        super(props);
        const date = new Date,
            years = [],
            year = date.getFullYear();

        for (let i = year; i < year + 10; i++) {
            const schoolYearStr = i + ' - ' + (i + 1);
            const schoolYear = {
                value: schoolYearStr,
                label: schoolYearStr
            };
            years.push(schoolYear);
        }

        this.state = {
            tabValue: 0,
            form    : {
                _id :"",
                studentId: "",
                subjectId: "",
                pointQuiz: [],
                point15MinutesOnline : "",
                point45MinutesOnline : "",
                pointSemesterOnline: "",
                point15Minutes : [],
                point45Minutes : [],
                pointSemester: [],
                pointGPA: "",
                reasonQuiz : "",
                reason15Minutes : "",
                reason45Minutes : "",
                reasonSemester: "",
                userId: ""
            },
            studentInfo: {
                id : "",
                name : "",
                classId: ""
            },
            mandatoryFields: {
                nameClass : false,
                subjectName : false,
            },
            schoolYearListing : years,
            nameTeacherData : [],
            nameClassList : [],
            semesterListing: [
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
                }
            ]
        };
    }

    isNumeric(value) {
        return /^([1-9]{1}\.[0-9]{0,2})|([1-9]{1})$/.test(value);
    }



    componentDidMount()
    {
        this.updateProductState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }

        if (
            (this.props.enterPoint._id && !this.state.form._id) ||
            (this.props.enterPoint._id && this.state.form._id && this.props.enterPoint._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps.user.schools && nextProps.user.schools.length !== 0 && nextProps.teacher) {

            this.setState({form: {
                    ...this.state.form,
                    nameSchool: nextProps.user.schools[0].name,
                    schoolId: nextProps.user.schools[0].id,
                    _idSchool: nextProps.user.schools[0]._id,
                    userId : nextProps.user.user.userId,
                    studentId : this.props.match.params.studentId,
                    subjectId : nextProps.teacher.subjectName
                }});
        }
        console.log('student_info', nextProps.student);
        if(nextProps.student){
            this.setState({studentInfo : {
                    ...this.state.studentInfo,
                    id : nextProps.student.id,
                    name: nextProps.student.name,
                    classId: nextProps.student.className,
                }});
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {

        this.setState({form: this.props.enterPoint})
    };

    updateProductState = async () => {
        const params = this.props.match.params;
        const {studentId, id} = params;
        await this.props.getStudentInfo(studentId);
        await this.props.getTeacherInfo(this.props.user.user.userId);
        if (id === 'new') {
            this.props.newEnterPoint();
        } else {
            this.props.getEnterPointForStudent(id);

        }
    }

    saveTopic = ()=> {
        this.props.updateEnterPoint(this.state.form, this.props.history);
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

    handleChipInputChange = (value, id) => {
        const data = value.map(item => item.value);
        console.log('data', data);


        this.setState({form: {
                ...this.state.form,
                subjectName : data,
            }});
    };


    handleChipInputAdd = (value, id) => {
        if(!this.isNumeric(value) || parseFloat(value) < 0 || parseFloat(value) > 10) {
            alert('Chỉ được phép nhập số!');
            return;
        }
        let data = this.state.form[id];
        data.push(value);


        this.setState({form: {
                ...this.state.form,
                id : data,
            }});
    };

    handleChipInputDelete = (value, index, id) => {
        let data = this.state.form[id];
        data.splice(index, 1)
    
        this.setState({form: {
                ...this.state.form,
                id : data,
            }});
    };


    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        console.log('formTopic', this.state.form);
        const {name} = this.state.form;
        return (
            name && name.length > 0 &&
            !_.isEqual(this.props.topics.topic, this.state.form)
        );
    }

    handleBlur= (event) => {
        if(event.target.value ==='') {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: true }
            });
        } else {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: false }
            });
        }

    }

    render()
    {
        console.log('class state', this.state);
        const {tabValue, form, studentInfo} = this.state;
        console.log('studentInfo', studentInfo);
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageSubject">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách điểm thi
                                    </Typography>
                                </FuseAnimate>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    onClick={() => this.saveTopic(form)}
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
                                    <div>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <strong>Mã học sinh: {studentInfo.id}</strong>
                                                    </td>
                                                    <td>
                                                        <strong>Tên học sinh: {studentInfo.name}</strong>
                                                    </td>
                                                    <td>
                                                        <strong>Mã lớp: {studentInfo.classId}</strong>
                                                    </td>
                                                    <td>
                                                        <strong>Môn học: {form.subjectId}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="mt-20">
                                        <Table>
                                            <thead>
                                            <th>
                                                Môn học
                                            </th>
                                            <th>
                                                Điểm thi online
                                            </th>
                                            <th>
                                                Điểm thi nhập từ giáo viên
                                            </th>
                                            <th>
                                                Lý do cập nhật
                                            </th>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>Miệng</td>
                                                <td><p></p></td>
                                                <td>
                                                    <ChipInput
                                                        className='mt-16 w-100'
                                                        value={form.pointQuiz}
                                                        onAdd={(chips) => this.handleChipInputAdd(chips, 'pointQuiz')}
                                                        onDelete={(chip, index) => this.handleChipInputDelete(chip, index, 'pointQuiz')}
                                                    />
                                                </td>
                                                <td><TextField
                                                    className="mt-16 mb-16 "
                                                    id="reasonQuiz"
                                                    name="reasonQuiz"
                                                    value={form.reasonQuiz}
                                                    onBlur={this.handleBlur}
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td>15 Phút</td>
                                                <td><p>{form.point15MinutesOnline}</p></td>
                                                <td>
                                                    <ChipInput
                                                        className='mt-16 w-100'
                                                        value={form.point15Minutes}
                                                        onAdd={(chips) => this.handleChipInputAdd(chips, 'point15Minutes')}
                                                        onDelete={(chip, index) => this.handleChipInputDelete(chip, index, 'point15Minutes')}
                                                    />
                                                </td>
                                                <td><TextField
                                                    className="mt-16 mb-16 "
                                                    id="reason15Minutes"
                                                    name="reason15Minutes"
                                                    value={form.reason15Minutes}
                                                    onBlur={this.handleBlur}
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td>45 Phút</td>
                                                <td><p>{form.point45MinutesOnline}</p></td>
                                                <td>
                                                    <ChipInput
                                                        className='mt-16 w-100'
                                                        value={form.point45Minutes}
                                                        onAdd={(chips) => this.handleChipInputAdd(chips, 'point45Minutes')}
                                                        onDelete={(chip, index) => this.handleChipInputDelete(chip, index, 'point45Minutes')}
                                                    />
                                                </td>
                                                <td><TextField
                                                    className="mt-16 mb-16 "
                                                    id="reason45Minutes"
                                                    name="reason45Minutes"
                                                    value={form.reason45Minutes}
                                                    onBlur={this.handleBlur}
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                /></td>
                                            </tr>
                                            <tr>
                                                <td>Học kỳ</td>
                                                <td><p>{form.pointSemesterOnline}</p></td>
                                                <td>
                                                    <ChipInput
                                                        className='mt-16 w-100'
                                                        value={form.pointSemester}
                                                        onAdd={(chips) => this.handleChipInputAdd(chips, 'pointSemester')}
                                                        onDelete={(chip, index) => this.handleChipInputDelete(chip, index, 'pointSemester')}
                                                    />
                                                </td>
                                                <td><TextField
                                                    className="mt-16 mb-16 "
                                                    id="reasonSemester"
                                                    name="reasonSemester"
                                                    value={form.reasonSemester}
                                                    onBlur={this.handleBlur}
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    fullWidth
                                                /></td>
                                            </tr>
                                            </tbody>
                                        </Table>
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
        getSchoolByUser: Actions.getSchoolByUser,
        newEnterPoint : Actions.newEnterPoint,
        getEnterPointForStudent: Actions.getEnterPointForStudent,
        updateEnterPoint : Actions.updateEnterPoint,
        getStudentInfo : Actions.getStudent,
        getTeacherInfo :  Actions.getTeacher
    }, dispatch);
}

function mapStateToProps({enterPointApp, auth})
{
    console.log('Topic Detail', enterPointApp);
    return {
        enterPoint: enterPointApp.enterPointReducer.enterPoint,
        schools: enterPointApp.schools,
        classes : enterPointApp.classes,
        user : auth.login.user,
        student: enterPointApp.student.student,
        teacher: enterPointApp.teachers.teacher

    }
}

export default withReducer('enterPointApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterPoint))));
