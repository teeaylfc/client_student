import React, { Component } from 'react'
import { Button, Icon, InputBase } from '@material-ui/core'
import HeaderButton from '../../common/HeaderButton'
import InputDropDown from '../../common/InputDropDown'
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker
} from "material-ui-pickers";

// Or import the input component

import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import DropDownItem from '../lib-exams-personal/create-exams/create-exam-step/DropDownItem';
const column = [
    {
        Header: 'Môn học',
        accessor: "subject"
    },
    {
        Header: 'Số tiết học yêu cầu trong 1 tuần',
        accessor: "total_lessons_a_week"
    },
    {
        Header: 'Số buổi có 2 tiết học',
        accessor: "total_two_lessons"
    },
    {
        Header: 'Số buổi có 2 tiết học trở lên',
        accessor: "total_multi_lessons"
    },

]
const subject=[
    "Toán", "Lý", "Hóa", "Văn", "Anh"
]
const data = [
    {
        subject: <DropDownItem
            list={subject} placement="bottom-end"
            width="100%"
        />,
        total_lessons_a_week: "6",
        total_two_lessons: "1",
        total_multi_lessons: "0"
    },
    {
        subject: <DropDownItem
            list={subject} placement="bottom-end"
            width="100%"
        />,
        total_lessons_a_week: "6",
        total_two_lessons: "1",
        total_multi_lessons: "0"
    },
    {
        subject: <DropDownItem
            list={subject} placement="bottom-end"
            width="100%"
        />,
        total_lessons_a_week: "6",
        total_two_lessons: "1",
        total_multi_lessons: "0"
    },
    {
        subject: <DropDownItem
            list={subject} placement="bottom-end"
            width="100%"
        />,
        total_lessons_a_week: "6",
        total_two_lessons: "1",
        total_multi_lessons: "0"
    },

]
const InputTextField = (props) => <div className="flex flex-row items-center justify-between" style={{ width: "65%" }}>
    <h5 className="color_grey mr-12">
        {props.title}
    </h5>
    <InputBase
        value={props.value}
        defaultValue="Naked input"
        onChange={props.onChange}
        style={{ width: "55%" }}
        className="color_blue textField"
        inputProps={{ 'aria-label': 'naked' }}
    />

</div>

export default class TeacherPlanPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: Date('2014-08-18T21:11:54'),
            selectedEndDate: Date('2014-08-18T21:11:54'),
            schoolship: "",
            grade: ""

        }
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
        const { selectedEndDate, selectedStartDate, grade, schoolship } = this.state

        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Quản lý kế hoạch giáo viên
                </h2>
                    </FuseAnimate>

                    <HeaderButton  exportbutton/>
                </div>

                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-col w-full items-center justify-center div_shadow mb-24">
                        <h3 className="font-bold color_title mb-24">
                            Thông tin kế hoạch giáo viên
                </h3>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        "2016-2017",
                                        "2017-2018",
                                        "2018-2019",
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Niên khóa" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        "1",
                                        "2"
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Học kì" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    onChange={this.onChangeText("grade")}
                                    value={grade} title="Khối lớp" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputTextField
                                    onChange={this.onChangeText("schoolship")}
                                    value={schoolship} title="Ban học" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                {this.renderInputDatePicker("Áp dụng từ ngày", selectedStartDate, this.handleDateChange("selectedStartDate"), true)}
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                {this.renderInputDatePicker("Áp dụng đến ngày", selectedEndDate, this.handleDateChange("selectedEndDate"))}

                            </div>
                        </div>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        "Buổi sáng",
                                        "Buổi chiều",
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Ca học" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">

                            </div>
                        </div>

                    </div>
                </FuseAnimate>

                <ReactTable
                    data={data}
                    columns={column}
                    defaultPageSize={5}
                    className="-striped -highlight mt-20"
                />

                <div className="flex flex-row justify-between w-full mt-24">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red  items-center justify-center  text-white">
                        <h2 className="text_button_base">Hủy</h2>
                    </Button>

                    <div className="flex flex-row">
                        <Button
                            // onClick={this.nextStep2}
                            variant="contained"
                            className="p-12  gradient_turquoise items-center justify-center  text-white mr-24">
                            <h2 className="text_button_base">Xem trước</h2>
                        </Button>
                        <Button
                            // onClick={this.nextStep2}
                            variant="contained"
                            className="p-12  items-center justify-center gradient_blue text-white">
                            <h2 className="text_button_base">Lưu</h2>
                        </Button>
                    </div>

                </div>
            </div>
        )
    }

    handleDateChange = (key) => (date) => {
        this.setState({
            [key]: date
        });
    };
    onChangeText = (key) => (event) => {
        this.setState({ [key]: event.target.value })
    }
    chooseBlockScholl = (item) => () => {

    }
    chooseClass = (item) => () => {

    }
    chooseSubject = (item) => () => {

    }
}
