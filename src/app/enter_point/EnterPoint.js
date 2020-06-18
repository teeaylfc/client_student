import React, { Component } from 'react'
import { Button, Icon } from '@material-ui/core'
import HeaderButton from '../../common/HeaderButton'
import InputDropDown from '../../common/InputDropDown'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
const listBlock = [
    "10",
    "11",
    "12"
]
const listClass = [
    "10A1",
    "10A2",
    "11A1",
    "11A2",
    "12A1"
]
const listSubject = [
    "Toán",
    "Lý",
    "Hóa"
]

const column = [
    {
        Header: 'STT',
        accessor: "stt"
    },
    {
        Header: 'Học sinh',
        accessor: "student"
    },
    {
        Header: 'Ngày sinh',
        accessor: "birthday"
    },
    {
        Header: 'Miệng',
        accessor: "M"
    },
    {
        Header: '15 phút',
        accessor: "fifteen_minutes"
    },
    {
        Header: '1 tiết',
        accessor: "sixty_minutes"
    },
    {
        Header: 'Học kỳ',
        accessor: "semester"
    },
    {
        Header: 'TBHK',
        accessor: "average"
    },
    {
        Header: 'Ghi chú',
        accessor: "note"
    },
]
const data = [
    {
        stt: "1",
        student: "Nguyễn Minh Khang",
        birthday: "17/05/2000",
        M: "8",
        fifteen_minutes: "8",
        sixty_minutes: "8",
        semester: "8",
        average: "8",
        note: "Đã sửa điểm ngày 28/02/2019"
    },
    {
        stt: "1",
        student: "Nguyễn Minh Khang",
        birthday: "17/05/2000",
        M: "8",
        fifteen_minutes: "8",
        sixty_minutes: "8",
        semester: "8",
        average: "8",
        note: "Đã sửa điểm ngày 28/02/2019"
    },
    {
        stt: "1",
        student: "Nguyễn Minh Khang",
        birthday: "17/05/2000",
        M: "8",
        fifteen_minutes: "8",
        sixty_minutes: "8",
        semester: "8",
        average: "8",
        note: "Đã sửa điểm ngày 28/02/2019"
    },
    {
        stt: "1",
        student: "Nguyễn Minh Khang",
        birthday: "17/05/2000",
        M: "8",
        fifteen_minutes: "8",
        sixty_minutes: "8",
        semester: "8",
        average: "8",
        note: "Đã sửa điểm ngày 28/02/2019"
    },
    {
        stt: "1",
        student: "Nguyễn Minh Khang",
        birthday: "17/05/2000",
        M: "8",
        fifteen_minutes: "8",
        sixty_minutes: "8",
        semester: "8",
        average: "8",
        note: "Đã sửa điểm ngày 28/02/2019"
    },
]
export default class EnterPoint extends Component {
   
    render() {
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Nhập điểm
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton exportbutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <h4 className="font-bold color_blue mb-12">
                        TÌM KIẾM ĐIỂM
                </h4>
                </FuseAnimate>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row w-full items-center justify-between mb-24">
                        <div className="flex flex-row">

                            <div className="mr-16">
                                <InputDropDown
                                    widthDrop={"100px"}
                                    className
                                    list={listBlock}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Khối học" />
                            </div>
                            <div className="mr-16">
                                <InputDropDown
                                    widthDrop={"100px"}
                                    list={listClass}
                                    chooseAction={this.chooseClass}
                                    title="Lớp học" />
                            </div>
                            <InputDropDown
                                widthDrop={"100px"}
                                list={listSubject}
                                chooseAction={this.chooseSubject}
                                title="Môn học" />
                        </div>
                        <div className="flex flex-row items-center color_grey bg-white px-12 py-2 rounded-lg shadow-sm">
                            <Icon>search</Icon>
                            <InputBase
                                className="color_grey ml-12 text-xs"
                                placeholder="Tìm kiếm"
                            />
                        </div>
                    </div>
                </FuseAnimate>

                <h4 className="font-bold color_blue mb-12">
                    NHẬP ĐIỂM
                </h4>

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
                            className="p-12 gradient_blue  items-center justify-center  text-white mr-24">
                            <h2 className="text_button_base">Lưu nháp</h2>
                        </Button>
                        <Button
                            // onClick={this.nextStep2}
                            variant="contained"
                            className="p-12  items-center justify-center gradient_turquoise text-white">
                            <h2 className="text_button_base">Ghi số</h2>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
    chooseBlockScholl = (item) => () => {

    }
    chooseClass = (item) => () => {

    }
    chooseSubject = (item) => () => {

    }
}
