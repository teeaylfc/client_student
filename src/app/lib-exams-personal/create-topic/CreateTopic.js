import React, { Component } from 'react';
import { Card, CardContent, Button, Typography, Icon, InputBase, GridList, Avatar } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import InputDropDown from '../../../common/InputDropDown';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker
} from "material-ui-pickers";
import HeaderButton from 'common/HeaderButton';


const InputTextField = (props) => <div className="flex flex-row items-center justify-between" style={{ width: "30%" }}>
    <h4 className="color_grey mr-12 font-bold">
        {props.title}
    </h4>
    <InputBase
        value={props.value}
        defaultValue="Naked input"
        onChange={props.onChange}
        style={{ width: "55%" }}
        className="color_blue textField"
        inputProps={{ 'aria-label': 'naked' }}
    />
</div>


class CreateTopic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topicName: ""
        }
    }
    componentDidMount() {
    }
  

    render() {
        const { topicName } = this.state
        return (
            <div className="div_container overflow-auto">
                <div className="flex flex-row justify-between mb-24">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Tạo mới chuyên đề
                </h2>
                    </FuseAnimate>
                    <HeaderButton importbutton exportbutton menubutton />
                </div>
                <div className="flex flex-row justify-between">
                    <InputDropDown
                        widthDrop={"80px"}
                        list={[
                            "10",
                            "11",
                            "12"
                        ]}
                        chooseAction={this.chooseBlockScholl}
                        title="Chọn bộ lọc" />
                    <div className="flex flex-row">
                        <div className="flex flex-row items-center color_grey bg-white px-12 py-2 rounded-lg shadow-sm mr-16">
                            <Icon>search</Icon>
                            <InputBase
                                className="color_grey ml-12 text-xs"
                                placeholder="Tìm kiếm chuyên đề"
                            />
                        </div>
                        <Button className="btn_add mr-0">
                            <img src="assets/images/icons/ic_add.png" className="icon_add" />
                        </Button>
                    </div>
                </div>

                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="div_shadow flex flex-col w-full mt-24 items-center justify-center">
                        <h3 className="font-bold color_title mb-32">
                            Thông tin chuyên đề

                </h3>
                        <InputDropDown
                            width={"30%"}
                            className="mb-16 justify-between"
                            widthDrop={"55%"}
                            color={"#296BFF"}
                            list={[
                                "2017-2018",
                                "2018-2019",
                                "2019-2020",
                            ]}
                            chooseAction={this.chooseBlockScholl}
                            title="Niên khóa" />
                        <InputDropDown
                            width={"30%"}
                            className="mb-16 justify-between"
                            widthDrop={"55%"}
                            color={"#296BFF"}
                            list={[
                                "10",
                                "11",
                                "12",
                            ]}
                            chooseAction={this.chooseBlockScholl}
                            title="Khối lớp" />
                        <InputDropDown
                            width={"30%"}
                            className="mb-16 justify-between"
                            widthDrop={"55%"}
                            color={"#296BFF"}
                            list={[
                                "Hóa học",
                                "Toán học",
                                "Vật lý",
                            ]}
                            chooseAction={this.chooseBlockScholl}
                            title="Môn học" />
                        <InputDropDown
                            width={"30%"}
                            className="mb-16 justify-between"
                            widthDrop={"55%"}
                            color={"#296BFF"}
                            list={[
                                "Nâng cao",
                                "Cơ bản",
                            ]}
                            chooseAction={this.chooseBlockScholl}
                            title="Chuyên đề" />

                        <InputTextField
                            onChange={this.onChangeText("topicName")}
                            value={topicName} title="Niên khóa" />
                        <div className="mb-48" />
                    </div>
                </FuseAnimate>

                <div className="flex flex-row w-full justify-between mt-32">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red items-center justify-center  text-white mr-24">
                        <h2 className="text_button_base">Hủy</h2>
                    </Button>
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_blue items-center justify-center text-white">
                        <h2 className="text_button_base">Lưu</h2>
                    </Button>
                </div>
            </div>
        );
    }
    onChangeText = (key) => (event) => {
        console.log(key)
        this.setState({ [key]: event.target.value })
    }


    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        });
    };
    _createExam = () => {
        this.props.history.push("/createExamStep")
    }
}




export default CreateTopic

