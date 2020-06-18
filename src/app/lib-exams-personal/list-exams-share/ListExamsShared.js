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

class ListExamsShared extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: Date('2014-08-18T21:11:54'),
            data: [
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "60"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "45"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "15"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "60"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "60"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "45"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "15"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "60"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "60"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "45"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "15"
                },
                {
                    name: "Đề thi học kì 1",
                    subject: "Hóa học",
                    countAnswer: "20/45",
                    creator: "Vũ Thị Tuyết Mai",
                    type: "60"
                },
            ]
        }
    }
    componentDidMount() {
    }

    render() {
        const { selectedDate, data } = this.state
        return (
            <div className="div_container overflow-auto">
                <div className="flex flex-row justify-between">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title mb-32">
                            Danh sách bộ đề đã chia sẻ
                </h2>
                    </FuseAnimate>
                    <div className="header-content-right flex flex-row justify-end">
                        <Link to="/home">
                            <p className="color_title">
                                Trang chủ
                        </p>
                        </Link>
                        <span className="arrow color_title">></span>
                        <Link className="color_title" to="/home">
                            <p className="color_title">
                                Dashboard
                        </p>
                        </Link>

                    </div>
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row inline-block">
                            <div className="mr-16 inline-block">
                                <InputDropDown
                                    widthDrop={"80px"}
                                    className
                                    list={[
                                        "10",
                                        "11",
                                        "12"
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Khối học" />
                            </div>
                            <div className="mr-16 inline-block">
                                <InputDropDown
                                    widthDrop={"80px"}
                                    className
                                    list={[
                                        "10A1",
                                        "11A1",
                                        "12A1"
                                    ]}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Lớp" />
                            </div>

                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-row items-center color_grey bg-white px-12 py-2 rounded-lg shadow-sm mr-16">
                                <Icon>search</Icon>
                                <InputBase
                                    className="color_grey ml-12 text-xs"
                                    placeholder="Tìm kiếm đề thi"
                                />
                            </div>
                            <Button className="btn_add mr-0">
                                <img src="assets/images/icons/ic_add.png" className="icon_add" />
                            </Button>
                        </div>
                    </div>
                </FuseAnimate>

                <div className="w-full my-32">
                    <div className="exam_grid">
                        {data.map((item, i) => (
                            <Button style={{ textTransform: "none" }} className={this.backgroundItem(item.type)} variant="contained">
                                <div className="flex flex-col w-full items-start pb-12">
                                    <div className="flex flex-row justify-between items-start w-full">
                                        <div className="bg-white rounded px-4 py-2 mt-8">
                                            <h5 className={`font-bold ${this.textColorItem(item.type)}`}>
                                                {item.name}
                                            </h5>
                                        </div>
                                        <div className="flex shadow-md p-2 backgroundColor_yellow justify-center items-center rounded-full">
                                            <Avatar className="bg-white flex flex-col p-24">
                                                <h3 className="font-bold color_yellow">{item.type}</h3>
                                                <h6 className="color_yellow">phút</h6>
                                            </Avatar>
                                        </div>
                                    </div>
                                    <h6 className="text-white">{`Môn ${item.subject}`}</h6>
                                    <h6 className="text-white my-12">{`Câu trả lời ${item.countAnswer}`}</h6>
                                    <h6 className="text-white">{`Môn ${item.creator}`}</h6>
                                </div>

                            </Button>
                        ))}
                    </div>

                </div>
            </div>
        );
    }
    backgroundItem = (type) => {
        switch (type) {
            case "60":
                return "gradient_blue"
            case "45":
                return "gradient_turquoise"
            case "15":
                return "gradient_orange"
            default:
                return ""
        }
    }
    textColorItem = (type) => {
        switch (type) {
            case "60":
                return "color_blue"
            case "45":
                return "color_turquoise"
            case "15":
                return "color_orange"
            default:
                return ""
        }
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




export default ListExamsShared

