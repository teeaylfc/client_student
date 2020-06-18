import React, { Component } from 'react'
import { Button, Icon, InputBase } from '@material-ui/core'
import HeaderButton from '../../../common/HeaderButton'
import InputDropDown from '../../../common/InputDropDown'
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker
} from "material-ui-pickers";
import { connect } from 'react-redux';
// Or import the input component
import * as Actions from 'app/store/actions';
import { FuseAnimate } from '@fuse';
import constants from '../../../config/utils';
import dataService from '../../services/dataService';
import { bindActionCreators } from 'redux';
import getListGrade from '../../utils/getListGrade';


const InputTextField = (props) => <div className="flex flex-row items-center justify-between" style={{ width: "65%" }}>
    <h4 className="color_grey mr-12 font-bold">
        {props.title}
    </h4>
    <InputBase
        disabled={props.disable ? true : false}
        value={props.value}
        defaultValue="Naked input"
        onChange={props.onChange}
        style={{ width: "55%" }}
        className="color_blue input_base"
        inputProps={{ 'aria-label': 'naked' }}
    />

</div>

class CreateClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: Date('2014-08-18T21:11:54'),
            selectedEndDate: Date('2014-08-18T21:11:54'),
            listSchoolYear: [],
            schoolYear: null,
            year: "",
            classCode: "",
            className: "",
            subject: "",
            listGrade: getListGrade(this.props.school),
            grade: null
        }
    }
    componentDidMount() {
        dataService.getConstants()
            .then(res => {
                console.log("constantsss")
                console.log(res)
                this.setState({
                    listSchoolYear: res.schoolYear
                })
            })
    }

    renderInputDatePicker(title, value, onChange, start) {
        return (
            <div className="flex flex-row items-center justify-between" style={{ width: "65%" }}>
                <h5 className="color_grey mr-12">
                    {title}
                </h5>
                <div className="textField color_blue items-center flex flex-row" style={{ width: "55%" }}>
                    <MuiPickersUtilsProvider className="color_blue" utils={DateFnsUtils}>
                        <DatePicker
                            className="color_blue"
                            maxDate={start ? this.state.selectedEndDate : null}
                            minDate={start ? null : this.state.selectedStartDate}
                            value={value}
                            format="dd/MM/yyyy"
                            animateYearScrolling={true}
                            id="startTime" name="startTime"
                            onChange={(value) => onChange(value)}
                        />
                    </MuiPickersUtilsProvider>
                    <Icon className="color_grey text-xs">
                        calendar_today
        </Icon>
                </div>

            </div>
        )
    }
    render() {
        const { listSchoolYear, listGrade, classCode, className, subject } = this.state
        const { school } = this.props
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Tạo mới lớp học
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton importbutton exportbutton menubutton />
                </div>

                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-col w-full items-center justify-center div_shadow mb-24">
                        <h3 className="font-bold color_title mb-24">
                            Thông tin lớp học
                </h3>
                        <div className="container_Timetable mb-16">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    onChange={this.onChangeText("className")}
                                    value={className} title="Tên lớp" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    className="justify-between"
                                    list={listSchoolYear}
                                    chooseAction={this.chooseSchoolYear}
                                    title="Niên khóa" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-16">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={listGrade}
                                    className="justify-between"
                                    chooseAction={this.chooseGrade}
                                    title="Khối học" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    className="justify-between"
                                    list={[
                                        "Ban nâng cao",
                                        "Ban cơ bản"
                                    ]}
                                    // chooseAction={this.chooseSchoolYear}
                                    title="Ban học" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-16">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    onChange={this.onChangeText("classCode")}
                                    value={classCode} title="Mã lớp" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        "Ban nâng cao",
                                        "Không có"
                                    ]}
                                    className="justify-between"
                                    chooseAction={this.chooseBlockScholl}
                                    title="Lớp chuyên" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-16">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    onChange={this.onChangeText("subject")}
                                    value={subject} title="Môn học" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">

                            </div>
                        </div>
                    </div>
                </FuseAnimate>
                <div className="flex flex-row justify-between w-full">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red  items-center justify-center  text-white mr-24">
                        <h2 className="text_button_base">Hủy</h2>
                    </Button>
                    <Button
                        onClick={this.onCreateClass}
                        variant="contained"
                        className="p-12  items-center justify-center gradient_blue text-white">
                        <h2 className="text_button_base">Tạo lớp học ngay</h2>
                    </Button>
                </div>
            </div>
        )
    }
    chooseGrade = (item) => {
        this.setState({
            grade: item
        })
    }
    chooseSchoolYear = (item) => {
        this.setState({
            schoolYear: item
        })
    }
    validator() {
        const { schoolYear, className, classCode, grade } = this.state
        if (schoolYear == null) return "Chưa chọn niên khóa"
        if (grade == "") return "Chưa chọn khối học"
        if (classCode == "") return "Mã lớp học không được để trống"
        if (className == "") return "Tên lớp học không được để trống"
        return null
    }
    onCreateClass = () => {
        const { schoolYear, className, classCode, grade } = this.state
        const { school, user } = this.props
        if (!this.validator()) {
            var params = {
                classId: classCode,
                className: className,
                schoolId: school.id ? school.id : "",
                schoolName: school.name ? school.name : "",
                schoolYear: schoolYear ? schoolYear : "",
                schoolType: school.schoolType ? school.schoolType : "",
                groupClass: grade,
                teacherManage: user.userId,
                totalStudent: ""
            }
            console.log("params")
            console.log(params)
            dataService.createClass(params)
                .then(res => {
                    console.log("create class")
                    console.log(res)
                    this.setState({
                        schoolYear: null,
                        year: "",
                        classCode: "",
                        className: "",
                        subject: "",
                        grade: null
                    })
                    this.props.showMessage({ message: "Tạo lớp học thành công" })
                    this.props.history.push('./classList')
                })
                .catch(err => {
                    console.log('errr')
                    console.log(err.response)
                    this.props.showMessage({ message: err.response.data.message })
                })
        }
        else {
            this.props.showMessage({ message: this.validator() })
        }

    }
    handleDateChange = (key) => (date) => {
        this.setState({
            [key]: date
        });
    };
    onChangeText = (key) => (event) => {
        console.log(key)
        this.setState({ [key]: event.target.value })
    }
    chooseBlockScholl = (item) => () => {

    }
    chooseClass = (item) => () => {

    }
    chooseSubject = (item) => () => {

    }
}

const mapStateToProps = (state) => {
    console.log("state")
    console.log(state)
    return {
        school: state.auth.login.user.school,
        user: state.auth.login.user.user
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: Actions.showMessage,
    },
        dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateClass)