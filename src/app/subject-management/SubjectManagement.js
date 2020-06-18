import React, { Component } from 'react'
import { Button, Icon, InputBase, Checkbox } from '@material-ui/core'
import HeaderButton from '../../common/HeaderButton'
import InputDropDown from '../../common/InputDropDown'
import ReactTable from 'react-table';
// Or import the input component

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTable } from 'react-table';

import { FuseAnimate } from '@fuse';

const column = [
    {
        Header: 'Lớp học',
        columns: [
            {
                Header: '',
                accessor: 'class'
            }
        ]
    },
    {
        Header: 'Môn học',
        columns: [
            {
                Header: '',
                accessor: 'subject'
            }
        ]
    },
    {
        Header: 'Chọn',
        columns: [
            {
                Header: '',
                accessor: 'checkbox'
            }
        ]
    },
    {
        Header: 'Số tiết yêu cầu trong tuần',
        columns: [
            {
                Header: '',
                accessor: 'lesson_in_week'
            }
        ]
    },
    {
        Header: 'Điểm hệ số 1',
        columns: [
            {
                Header: 'Miệng',
                accessor: 'speak'
            },
            {
                Header: 'Viết',
                accessor: 'write1'
            },
            {
                Header: 'Thực hành',
                accessor: 'practice1'
            }
        ]
    },
    {
        Header: 'Điểm hệ số 2',
        columns: [
            {
                Header: 'Viết',
                accessor: 'write2'
            },
            {
                Header: 'Thực hành',
                accessor: 'practice2'
            }
        ]
    },
    {
        Header: 'HK',
        columns: [
            {
                Header: 'HK',
                accessor: 'average'
            },
        ]
    },
]
const status = [
    "Đang giảng dạy", "Đã nghỉ dạy"
]
export default class SubjectManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    class: "10A1",
                    subject: "Toán",
                    lesson_in_week: "6",
                    speak: "1",
                    write1: "2",
                    practice1: "0",
                    write2: "2",
                    practice2: "0",
                    average: "1"
                },
                {
                    class: "10A1",
                    subject: "Toán",
                    lesson_in_week: "6",
                    speak: "1",
                    write1: "2",
                    practice1: "0",
                    write2: "2",
                    practice2: "0",
                    average: "1"
                },
                {
                    class: "10A1",
                    subject: "Toán",
                    lesson_in_week: "6",
                    speak: "1",
                    write1: "2",
                    practice1: "0",
                    write2: "2",
                    practice2: "0",
                    average: "1"
                },
                {
                    class: "10A1",
                    subject: "Toán",
                    lesson_in_week: "6",
                    speak: "1",
                    write1: "2",
                    practice1: "0",
                    write2: "2",
                    practice2: "0",
                    average: "1"
                },

            ],
            loading: true
        }
    }
    componentDidMount() {
        var list = this.state.data
        list.map((item, index) => {
            item.checkbox = <Checkbox
                checked={false}
                onChange={this.onChange(index)}
                value="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        })
        console.log("list")
        this.setState({
            data: list,
            loading: false
        })
        console.log(this.state.data)
    }
    onChange = (index) => () => {
        var list = [...this.state.data]
        var obj = this.state.data[index]
        obj.checkbox = <Checkbox
            checked={obj.check ? false : true}
            onChange={this.onChange(index)}
            value="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        obj.check = obj.check ? false : true
        list[index] = obj
        this.setState({
            data: list,
        })
    }
    render() {
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Quản lý môn học
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton exportbutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="inline-flex">
                        <InputDropDown
                            widthDrop={"100px"}
                            className
                            list={[
                                "10",
                                "11",
                                "12"
                            ]}
                            // chooseAction={this.chooseBlockScholl}
                            title="Học kì" />
                    </div>

                </FuseAnimate>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row justify-between mt-16">
                        <div className="flex flex-row">
                            <div className="mr-16">
                                <InputDropDown
                                    widthDrop={"100px"}
                                    list={[
                                        "10",
                                        "11",
                                        "12"
                                    ]}
                                    // chooseAction={this.chooseBlockScholl}
                                    title="Khối lớp" />
                            </div>
                            <InputDropDown
                                list={[
                                    "10A1, 10A2, 11A2, 12A3, 12A5",
                                    "10A1, 10A2, 11A2, 12A3, 12A5",
                                    "10A1, 10A2, 11A2, 12A3, 12A5",
                                ]}
                                // chooseAction={this.chooseSubject}
                                title="lớp học học" />
                        </div>
                        <Button
                            variant="contained"
                            className="gradient_blue rounded-lg text-white flex flex-row">
                            <Icon>search</Icon>
                            <p className="text_button_base ml-16">Tìm kiếm</p>
                        </Button>

                    </div>


                </FuseAnimate>
                {this.state.loading ? null :
                    <ReactTable
                        data={this.state.data}
                        columns={column}
                        defaultPageSize={5}
                        className="-striped -highlight mt-20"
                    />
                }

                <div className="flex w-full justify-end mt-24">
                    <Button variant="contained"
                        className="gradient_blue rounded-lg text-white">
                        <p className="text_button_base">Lưu</p>
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
