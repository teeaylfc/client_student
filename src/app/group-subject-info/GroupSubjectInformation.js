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

export default class SubjectInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            schoolName: "",
            groupName: "",
            groupCode: ""

        }
    }
    render() {
        const {groupCode, groupName } = this.state

        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Quản lý tổ môn
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton exportbutton />
                </div>

                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-col w-full items-center justify-center div_shadow mb-24">
                        <h3 className="font-bold color_title mb-24">
                            Thông tin tổ môn
                </h3>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        "THPT Lomonoxop",
                                        "THPT Lương Thế Vinh",
                                        "THPT Nguyễn Tất Thành",
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Tên trường học" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputTextField
                                    onChange={this.onChangeText("groupCode")}
                                    value={groupCode} title="Mã tổ môn" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    onChange={this.onChangeText("groupName")}
                                    value={groupName} title="Tên tổ" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        "Vũ Thị Tuyết Mai",
                                        "Lê Hoài Phương"
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Tổ trưởng" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputDropDown
                                    width={"65%"}
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        "Hóa, Sinh",
                                        "Anh, Lý",
                                        "Toán, Văn"
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Tổ môn học" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">

                            </div>
                        </div>

                    </div>
                </FuseAnimate>

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
