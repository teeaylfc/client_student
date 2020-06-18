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
const column = [
    {
        Header: 'Thứ',
        accessor: "day"
    },
    {
        Header: 'Buổi học',
        accessor: "session"
    },
    {
        Header: 'Tiết học',
        accessor: "lesson"
    },
    {
        Header: 'Môn học',
        accessor: "subject"
    },
    {
        Header: 'Giáo viên',
        accessor: "teacher"
    },
    {
        Header: 'Bắt đầu',
        accessor: "start"
    },
    {
        Header: 'Kết thúc',
        accessor: "end"
    },
    {
        Header: 'Tổng thời gian',
        accessor: "totaltime"
    },
    {
        Header: 'Ghi chú',
        accessor: "note"
    },
]
const data = [
    {
        day: "Thứ 2",
        session: "Sáng",
        lesson: "Tiết 1",
        subject: "Vật lý",
        teacher: "Hải",
        start: "07:45",
        end: "08:30",
        totaltime: "45",
        note: "Ghi chú"
    },
    {
        day: "Thứ 3",
        session: "Sáng",
        lesson: "Tiết 1",
        subject: "Vật lý",
        teacher: "Hải",
        start: "07:45",
        end: "08:30",
        totaltime: "45",
        note: "Ghi chú"
    },
    {
        day: "Thứ 4",
        session: "Sáng",
        lesson: "Tiết 1",
        subject: "Vật lý",
        teacher: "Hải",
        start: "07:45",
        end: "08:30",
        totaltime: "45",
        note: "Ghi chú"
    },
    {
        day: "Thứ 5",
        session: "Sáng",
        lesson: "Tiết 1",
        subject: "Vật lý",
        teacher: "Hải",
        start: "07:45",
        end: "08:30",
        totaltime: "45",
        note: "Ghi chú"
    },
    {
        day: "Thứ 6",
        session: "Sáng",
        lesson: "Tiết 1",
        subject: "Vật lý",
        teacher: "Hải",
        start: "07:45",
        end: "08:30",
        totaltime: "45",
        note: "Ghi chú"
    },
    {
        day: "Thứ 7",
        session: "Sáng",
        lesson: "Tiết 1",
        subject: "Vật lý",
        teacher: "Hải",
        start: "07:45",
        end: "08:30",
        totaltime: "45",
        note: "Ghi chú"
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

export default class CreateTimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeTimetable: '',
            selectedStartDate: Date('2014-08-18T21:11:54'),
            selectedEndDate: Date('2014-08-18T21:11:54'),
            nameTimetable: ""

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
        const { codeTimetable, nameTimetable, selectedEndDate, selectedStartDate } = this.state

        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Khai báo thời khóa biểu
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton />
                </div>

                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-col w-full items-center justify-center div_shadow mb-24">
                        <h3 className="font-bold color_title mb-24">
                            Thông tin thời khóa biểu
                </h3>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    onChange={this.onChangeText("codeTimetable")}
                                    value={codeTimetable} title="Mã thời khóa biểu" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputTextField
                                    onChange={this.onChangeText("nameTimetable")}
                                    value={nameTimetable} title="Tên thời khóa biểu" />
                            </div>
                        </div>
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
                                    title="Khối học" />
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
                                {this.renderInputDatePicker("Áp dụng từ ngày", selectedStartDate, this.handleDateChange("selectedStartDate"), true)}
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                {this.renderInputDatePicker("Áp dụng đến ngày", selectedEndDate, this.handleDateChange("selectedEndDate"))}

                            </div>
                        </div>

                    </div>
                </FuseAnimate>
                <div className="w-full flex justify-center">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="flex flex-row gradient_turquoise items-center justify-center text-white">
                        <Icon className="mr-12">add</Icon>
                        <h2 className="text_button_base">TẠO THỜI KHÓA BIỂU</h2>
                    </Button>
                </div>


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

                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_blue  items-center justify-center text-white">
                        <h2 className="text_button_base">Lưu</h2>
                    </Button>


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
