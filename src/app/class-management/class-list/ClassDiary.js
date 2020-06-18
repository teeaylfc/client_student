import React, { Component } from 'react'
import ReactTable from 'react-table';
import { List, Button, Avatar } from '@material-ui/core';
import HeaderButton from '../../../common/HeaderButton';
import dataService from '../../services/dataService';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
const ItemExams = (props) =>
    <div className="flex flex-row w-full">
        <div className="flex flex-col items-center">
            <div className={props.index == 0 ? "" : "divider-vertical"} style={{ height: "15px" }} />
            <div className="div-circle" />
            <div className="divider-vertical flex flex-1" />
        </div>
        <div className="item-exam" style={{ marginBottom: props.index == props.lastIndex ? "0px" : "20px" }}>
            <h3 className="font-bold mb-8">{props.item.title}</h3>
            <h5 className="item-time">{props.item.date} vào lúc {props.item.time}</h5>
            <div className="triangle-left" />
        </div>
    </div>
const column_rank = [
    {
        Header: "STT",
        maxWidth: 50,
        accessor: "stt"
    },
    {
        Header: 'Mã học sinh',
        accessor: "studentCode"
    },
    {
        Header: 'Họ và tên',
        accessor: "fullname"
    },
    {
        Header: 'Khối',
        accessor: "group"
    },
    {
        Header: 'Lớp',
        accessor: "class"
    },
    {
        Header: 'Số bài thi',
        accessor: "countExam"
    },
    {
        Header: 'Tổng điểm',
        accessor: "totalPoint"
    },
    {
        Header: 'Thời gian',
        accessor: "time"
    },
]
class ClassDiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRank: [
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
                {
                    studentCode: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    group: "10",
                    class: "10A1",
                    countExam: "10",
                    totalPoint: "100",
                    time: "120 phút"
                },
            ],
            listTime: [],
            listExams: [
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
            ],

            loading: true,
            open: false,
            tab: 0,
            classCode: "",
            total: "",
            schoolYear: "",
            className: ""
        }
    }

    _getData() {
        var schoolID = this.props.user.school ? this.props.user.school : this.props.user.userRole.schoolId;
        var classId = this.props.location.state.classId;
        console.log(classId);
        dataService.getClassesRank(classId, schoolID)
            .then(res => {
                this.setState({
                    listTime: res,
                    loading: false
                })
            })
    }

    componentDidMount() {
        this._getData();
        var listR = [...this.state.listRank]
        listR.forEach((item, index) => {
            item.stt = index + 1
            return item
        })
        this.setState({
            listRank: listR,
            loading: false
        })
    }
    render() {
        const { listExams, loading, listRank, listTime } = this.state
        return (
            <div className="flex flex-col py-24">
                <h4 className="font-bold mb-12">
                    Bảng xếp hạng
            </h4>
                <ReactTable
                    data={listRank}
                    columns={column_rank}
                    defaultPageSize={5}
                    className="-striped -highlight mt-20"
                />
                <h4 className="font-bold mt-32 mb-24 ">
                    Các mốc thời gian
            </h4>
                <div className = "list-log-class">
                    <List component="nav"  >
                        {
                            listTime.map((item, i) => <ItemExams item={item} index={i} lastIndex={listTime.length - 1} />)
                        }
                    </List>
                </div>
                <div className="flex flex-row w-full items-center mt-32 justify-between">
                    <h4 className="font-bold">
                        Bộ đề lớp học
            </h4>
                    <div className="flex flex-row items-center">
                        <h5 className="mr-12">
                            Tải bộ đề lớp học về
            </h5>
                        <HeaderButton importbutton />
                    </div>
                </div>
                <div className="w-full mt-24 mb-32">
                    <div className="exam_grid">
                        {listExams.map((item, i) => (
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
                <div className="w-full justify-center items-center flex">
                    <Button className="button-border-dash color_blue items-center">
                        <img src="assets/images/icons/ic_add_blue.png" width="25px" />
                        <h3 className="text_button_base ml-12 ">Thêm đề thi mới</h3>
                    </Button>
                </div>

            </div>
        )
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
}
const mapStateToProps = (state) => {
    console.log("---------------------")
    console.log(state)
    return {
        user: state.auth.login.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ClassDiary))