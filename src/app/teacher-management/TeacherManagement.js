import React, { Component } from 'react'
import { Button, Icon, Checkbox, InputBase } from '@material-ui/core'
import HeaderButton from '../../common/HeaderButton'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FuseAnimate } from '@fuse';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import ReactTable from 'react-table';
import DropDownItem from '../lib-exams-personal/create-exams/create-exam-step/DropDownItem';
import InputDropDown from '../../common/InputDropDown';


const column = [
    {
        Header: '',
        accessor: "checkbox",
        maxWidth: 50
    },
    {
        Header: 'Mã giáo viên',
        accessor: "teacher_code"
    },
    {
        Header: 'Tên giáo viên',
        accessor: "teacher_name"
    },
    {
        Header: 'Điện thoại',
        accessor: "phoneNumber"
    },
    {
        Header: 'Bộ môn',
        accessor: "subject"
    },
    {
        Header: 'Chủ nhiệm',
        accessor: "chairman"
    },
    {
        Header: 'Trạng thái',
        accessor: "status"
    },
]
const columnTab2 = [
    {
        Header: "",
        accessor: "lession"
    },
    {
        Header: 'Thứ 2',
        accessor: "mon"
    },
    {
        Header: 'Thứ 3',
        accessor: "tue"
    },
    {
        Header: 'Thứ 4',
        accessor: "wed"
    },
    {
        Header: 'Thứ 5',
        accessor: "thu"
    },
    {
        Header: 'Thứ 6',
        accessor: "fri"
    },
    {
        Header: 'Thứ 7',
        accessor: "sat"
    },
    {
        Header: 'CN',
        accessor: "sun"
    },
]
const dataTab2 = [
    {
        lession: "Tiết 1 - Sáng",
        mon: "",
        tue: "10",
        wed: "10",
        thu: "",
        fri: "",
        sat: "10A1",
        sun: ""
    },
    {
        lession: "Tiết 2 - Sáng",
        mon: "12A2",
        tue: "10",
        wed: "10",
        thu: "",
        fri: "10A3",
        sat: "",
        sun: ""
    },
    {
        lession: "Tiết 3 - Sáng",
        mon: "",
        tue: "10",
        wed: "10",
        thu: "",
        fri: "",
        sat: "10A1",
        sun: ""
    },
    {
        lession: "Tiết 4 - Sáng",
        mon: "12A2",
        tue: "10",
        wed: "10",
        thu: "",
        fri: "10A3",
        sat: "",
        sun: ""
    },

]
const columnTab3 = [
    {
        Header: "Gói câu hỏi",
        accessor: "question_package"
    },
    {
        Header: 'Môn học',
        accessor: "subject"
    },
    {
        Header: 'Khối',
        accessor: "grade"
    },
    {
        Header: 'Số lượng câu hỏi',
        accessor: "question_count"
    },
    {
        Header: 'Ghi chú',
        accessor: "note"
    },
    {
        Header: 'Ngày tạo',
        accessor: "create_date"
    },
]
const dataTab3 = [
    {
        question_package: "Kiểm tra 15 phút",
        subject: "Hóa học",
        grade: "10",
        question_count: "10",
        note: "",
        create_date: "12/08/2018 10:00:00"
    },
    {
        question_package: "Kiểm tra 15 phút",
        subject: "Sinh học",
        grade: "10",
        question_count: "10",
        note: "",
        create_date: "12/08/2018 10:00:00"
    },
    {
        question_package: "Kiểm tra 1 tiết",
        subject: "Toán học",
        grade: "10",
        question_count: "10",
        note: "",
        create_date: "12/08/2018 10:00:00"
    },
    {
        question_package: "Kiểm tra 1 tiết",
        subject: "Toán học",
        grade: "10",
        question_count: "10",
        note: "",
        create_date: "12/08/2018 10:00:00"
    },

]
const status = [
    "Đang giảng dạy", "Đã nghỉ dạy"
]

const InputTextField = (props) => <div className="flex flex-row items-center justify-between" style={{ width: "90%" }}>
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

export default class TeacherManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            data: [
                {
                    teacher_code: "GV001",
                    teacher_name: "Vũ Thị Mai Anh",
                    phoneNumber: "0986457827",
                    subject: "Toán Lý",
                    chairman: "10A1",
                    status: "Đang giảng dạy",

                },
                {
                    teacher_code: "GV001",
                    teacher_name: "Vũ Thị Mai Anh",
                    phoneNumber: "0986457827",
                    subject: "Toán Lý",
                    chairman: "10A1",
                    status: "Đang giảng dạy",
                },
                {
                    teacher_code: "GV001",
                    teacher_name: "Vũ Thị Mai Anh",
                    phoneNumber: "0986457827",
                    subject: "Toán Lý",
                    chairman: "10A1",
                    status: "Đang giảng dạy",
                },
                {
                    teacher_code: "GV001",
                    teacher_name: "Vũ Thị Mai Anh",
                    phoneNumber: "0986457827",
                    subject: "Toán Lý",
                    chairman: "10A1",
                    status: "Đang giảng dạy",
                },
                {
                    teacher_code: "GV001",
                    teacher_name: "Vũ Thị Mai Anh",
                    phoneNumber: "0986457827",
                    subject: "Toán Lý",
                    chairman: "10A1",
                    status: "Đang giảng dạy",
                },

            ],
            loading: true,
            open: false,
            tab: 0,
            codeTeacher: "GV001",
            cmnd: "123456",
            subject_management: "Hóa",
            address: "Phú Đô, Mỹ Đình, Hà Nội",
            email: "tuyetmai@gmail.com",
            phone: "0986457827",
            teacherName: "Vũ Thị Mai Anh"
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
        const { open, loading, data, tab } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Quản lý giáo viên
                </h2>
                    </FuseAnimate>

                    <HeaderButton exportbutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-col ">
                        <div className="flex flex-row mb-16">
                            <DropDownItem placeholder="Trạng thái" shadow list={status} placement="bottom-end" color={"#296BFF"} />

                        </div>
                        <div className="flex flex-row mb-16">
                            <DropDownItem placeholder="Chọn bộ lọc" shadow list={status} placement="bottom-end" color={"#296BFF"} />
                        </div>
                    </div>

                </FuseAnimate>

                {loading ? null :
                    <ReactTable
                        data={data}
                        columns={column}
                        defaultPageSize={5}
                        className="-striped -highlight mt-20"
                        TrGroupComponent={this.customTrGroupComponent}
                    />
                }

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    maxWidth="md"
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent>
                        <Tabs indicatorColor="transparent" value={tab} onChange={this.handleChangeTab} aria-label="simple tabs example">
                            <Tab
                                label="Thông tin"
                                {...this.propsTab(0)}
                            />
                            <Tab
                                label="Lịch giảng dạy"
                                {...this.propsTab(1)}
                            />
                            <Tab
                                label="Đề thi đã đăng"
                                {...this.propsTab(2)}
                            />
                        </Tabs>
                        <Divider style={{ height: "1.5px" }} className="backgroundColor_blue" />
                        {
                            this.renderTab()
                        }

                    </DialogContent>
                </Dialog>
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
    onChangeText = (key) => (event) => {
        console.log(key)
        this.setState({ [key]: event.target.value })
    }
    renderTab() {
        switch (this.state.tab) {
            case 0:
                return this.renderTab1()
            case 1:
                return this.renderTab2()
            case 2:
                return this.renderTab3()
            default:
                return null;
        }
    }
    renderTab1() {
        const { codeTeacher, teacherName, phone, address, email, cmnd, subject_management } = this.state
        return (
            <div className="flex flex-col w-full">
                <div className="flex flex-row pt-24">
                    <div style={{ flex: 3, }} className="flex">
                        <div className="flex flex-1 flex-col items-start justify-between">
                            <InputTextField
                                onChange={this.onChangeText("codeTimetable")}
                                value={codeTeacher} title="Mã giáo viên" />
                            <InputTextField
                                onChange={this.onChangeText("teacherName")}
                                value={teacherName} title="Tên giáo viên" />
                            <InputTextField
                                onChange={this.onChangeText("phone")}
                                value={phone} title="Số điện thoại" />
                            <InputTextField
                                onChange={this.onChangeText("email")}
                                value={email} title="Email" />
                            <InputTextField
                                onChange={this.onChangeText("address")}
                                value={address} title="Địa chỉ" />
                            <InputDropDown
                                width={"90%"}
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                list={[
                                    "Giáo viên bộ môn",
                                    "Trưởng bộ môn",
                                ]}
                                chooseAction={this.chooseBlockScholl}
                                title="Vị trí công tác" />
                        </div >
                        <div className="flex flex-1 flex-col items-end justify-between">
                            <InputDropDown
                                width={"90%"}
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                list={[
                                    "Toán Lý",
                                    "Hóa Sinh",
                                    "Văn Anh"
                                ]}
                                chooseAction={this.chooseBlockScholl}
                                title="Học kì" />
                            <InputDropDown
                                width={"90%"}
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                list={[
                                    "10A3",
                                    "11A3",
                                    "12A3"
                                ]}
                                chooseAction={this.chooseBlockScholl}
                                title="Lớp chủ nhiệm" />
                            <InputTextField
                                onChange={this.onChangeText("cmnd")}
                                value={cmnd} title="CMND" />
                            <InputTextField
                                onChange={this.onChangeText("subject_management")}
                                value={subject_management} title="Môn phụ trách" />

                            <InputDropDown
                                width={"90%"}
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                list={[
                                    "Đang giảng dạy",
                                    "Đã nghỉ dạy",
                                ]}
                                chooseAction={this.chooseBlockScholl}
                                title="Trạng thái" />
                            <InputDropDown
                                width={"90%"}
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                list={[
                                    "Cử nhân sư phạm",
                                    "Thạc sĩ",
                                    "Tiến sĩ"
                                ]}
                                chooseAction={this.chooseBlockScholl}
                                title="Bằng cấp" />
                        </div>
                    </div>
                    <div style={{ flex: 0.3 }} />
                    <div style={{ flex: 0.9 }} className="flex flex-col">
                        <img style={{ borderRadius: "10px" }} className="w-full object-contain" src="assets/images/avatars/andrew.jpg" />
                        <div className="w-full shadow-md mt-24 flex-1 p-8" style={{ borderRadius: "5px", minHeight: "120px" }}>
                            <InputBase
                                lasses="w-full"
                                multiline={true}
                                style={{ borderRadius: "5px", height: "140px", textAlign:"center"}}
                                placeholder="Ghi chú">
                            </InputBase>
                        </div>

                    </div>
                </div>
                <div className="flex flex-row justify-between w-full mt-24">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red  items-center justify-center  text-white">
                        <h2 className="text_button_base">Xóa</h2>
                    </Button>

                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12  items-center justify-center gradient_blue text-white">
                        <h2 className="text_button_base">Cập nhật</h2>
                    </Button>
                </div>

            </div>
        )
    }
    renderTab2() {
        const { open, loading, data, tab } = this.state
        return (
            <div className="flex flex-col">
                <ReactTable
                    data={dataTab2}
                    columns={columnTab2}
                    defaultPageSize={5}
                    className="-striped -highlight mt-20"
                />
                <div className="flex flex-row justify-between w-full mt-24">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red  items-center justify-center  text-white">
                        <h2 className="text_button_base">Xóa</h2>
                    </Button>

                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12  items-center justify-center gradient_blue text-white">
                        <h2 className="text_button_base">Cập nhật</h2>
                    </Button>
                </div>

            </div>
        )
    }
    renderTab3() {
        return (
            <div className="flex flex-col">
                <ReactTable
                    data={dataTab3}
                    columns={columnTab3}
                    defaultPageSize={5}
                    className="-striped -highlight mt-20"
                />
                <div className="flex flex-row justify-between w-full mt-24">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red  items-center justify-center  text-white">
                        <h2 className="text_button_base">Xóa</h2>
                    </Button>

                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12  items-center justify-center gradient_blue text-white">
                        <h2 className="text_button_base">Cập nhật</h2>
                    </Button>
                </div>

            </div>
        )
    }
    propsTab = (index) => {
        const { tab } = this.state
        return {
            className: tab == index ? "rounded-t gradient_blue text_button_base text-white" : "text_button_base",
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    customTrGroupComponent = (props) => {
        return <Button
            onClick={this.clickItem(props)}
            className='rt-tr-group p-0 text_button_base'
            style={{ fontWeight: "unset" }}>
            {props.children}
        </Button>;
    }
    handleChangeTab = (event, newValue) => {
        this.setState({
            tab: newValue
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    clickItem = (props) => () => {
        console.log("propspropsprops")
        console.log(props)
        this.setState({
            open: true
        })
    }
    chooseBlockScholl = (item) => () => {

    }
    chooseClass = (item) => () => {

    }
    chooseSubject = (item) => () => {

    }
}
