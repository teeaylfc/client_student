import React, { Component } from 'react'
import InputDropDown from '../../../common/InputDropDown'
import { Button, Icon, InputBase, Checkbox, Link, List, Avatar, Card, Dialog, DialogContent } from '@material-ui/core'
import ReactTable from 'react-table';
import ItemNotification from '../../../common/ItemNotification';
import { formatDate } from '../../utils/datetime';
import dataService from '../../services/dataService';
import constants from '../../../config/utils';
import { connect } from 'react-redux'
import * as Actions from 'app/store/actions';
import { bindActionCreators } from 'redux';
import getListGrade from '../../utils/getListGrade';
const InputTextField = (props) =>
    <div
        className="flex flex-row items-center justify-between"
        style={{
            width: "40%",
            marginLeft: props.marginLeft ? "10%" : "",
        }}
    >
        <h5 className="color_grey mr-12">
            {props.title}
        </h5>
        <InputBase
            // type={props.type? props.type : "text"}
            value={props.value}
            defaultValue="Naked input"
            onChange={props.onChange}
            style={{ width: "55%" }}
            className="color_blue textField"
            inputProps={{ 'aria-label': 'naked' }}
        />
    </div>

const column_class = [
    {
        Header: '',
        maxWidth: 50,
        accessor: "checkbox"
    },
    {
        Header: 'STT',
        maxWidth: 50,
        accessor: "stt"
    },
    {
        Header: 'Tên khối',
        accessor: "group_name"
    },
    {
        Header: 'Mã lớp',
        accessor: "class_code"
    },
    {
        Header: 'Tên lớp',
        accessor: "class_name"
    },
    {
        Header: 'Sĩ số',
        accessor: "total_student"
    },

    {
        Header: 'Lớp chuyên',
        accessor: "special_class"
    },
    {
        Header: '',
        accessor: "info_class"
    },
]

const ItemInfo = (props) => <div className="flex flex-1 items-center flex-row">
    <div className="item-dot" />
    <h5 className="font-bold color_text">{`${props.title} ${props.value ? props.value : "Chưa có thông tin"}`}</h5>
</div>
class ClassInfo extends Component {
    constructor(props) {

        super(props);
        this.state = {
            data: [
                {
                    student_code: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    birdthday: "01/01/2000",
                    gender: "Nam",
                    phone: "0968751426",
                    email: "khang@gmail.com"
                },
                {
                    student_code: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    birdthday: "01/01/2000",
                    gender: "Nam",
                    phone: "0968751426",
                    email: "khang@gmail.com"
                },
                {
                    student_code: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    birdthday: "01/01/2000",
                    gender: "Nam",
                    phone: "0968751426",
                    email: "khang@gmail.com"
                },
                {
                    student_code: "HS001",
                    fullname: "Nguyễn Minh Khang",
                    birdthday: "01/01/2000",
                    gender: "Nam",
                    phone: "0968751426",
                    email: "khang@gmail.com"
                },

            ],
            listTime: [
                {
                    name: "Kiểm tra 15 phút",
                    time: "Thứ Hai 11/2 lúc 9:30"
                },
                {
                    name: "Kiểm tra 60 phút",
                    time: "Thứ Hai 12/2 lúc 9:30"
                },
                {
                    name: "Kiểm tra 45 phút",
                    time: "Thứ Hai 13/2 lúc 9:30"
                },
                {
                    name: "Kiểm tra 15 phút",
                    time: "Thứ Hai 14/2 lúc 9:30"
                },
            ],
            dataClass: [
                {
                    group_name: "10",
                    class_code: "2018.10A1",
                    class_name: "10A1",
                    total_student: "50",
                    special_class: "Toán"
                },
                {
                    group_name: "10",
                    class_code: "2018.10A1",
                    class_name: "10A1",
                    total_student: "50",
                    special_class: "Toán"
                },
                {
                    group_name: "10",
                    class_code: "2018.10A1",
                    class_name: "10A1",
                    total_student: "50",
                    special_class: "Toán"
                },
                {
                    group_name: "10",
                    class_code: "2018.10A1",
                    class_name: "10A1",
                    total_student: "50",
                    special_class: "Toán"
                },
                {
                    group_name: "10",
                    class_code: "2018.10A1",
                    class_name: "10A1",
                    total_student: "50",
                    special_class: "Toán"
                },
                {
                    group_name: "10",
                    class_code: "2018.10A1",
                    class_name: "10A1",
                    total_student: "50",
                    special_class: "Toán"
                },
                {
                    group_name: "10",
                    class_code: "2018.10A1",
                    class_name: "10A1",
                    total_student: "50",
                    special_class: "Toán"
                },

            ],
            listNoti: [
                {
                    body: "Đề thi đã được tạo"
                },
                {
                    body: "Đề thi đã được tạo"
                },
                {
                    body: "Đề thi đã được tạo"
                },
            ],
            loading: true,
            open: false,
            classCode: this.props.item.classId ? this.props.item.classId : "",
            total: this.props.item.totalStudent ? this.props.item.totalStudent : "",
            schoolYear: this.props.item.schoolYear ? this.props.item.schoolYear : "",
            class_name: this.props.item.className ? this.props.item.className : "",
            groupClass: this.props.item.groupClass ? this.props.item.groupClass : "",
            listGroupClass: getListGrade(this.props.item),
            edit: false,
            password: "",
            subject: ""
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
            item.info_student = <Link onClick={this._navigateDetail} className="color_blue">
                <h5 className="info-class">Xem thông tin học sinh</h5>
            </Link>
        })

        var listClass = this.state.dataClass
        listClass.map((item, index) => {
            item.checkbox = <Checkbox
                checked={false}
                onChange={this.onChange(index)}
                value="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            item.stt = index + 1
            item.info_class = <Link onClick={this._navigateDetail} className="color_blue">
                <h5 className="info-class">Xem thông tin lớp học</h5>
            </Link>
        })
        this.setState({
            data: list,
            
            loading: false
        })
    }
    render() {
        const { edit } = this.state
        return (
            edit ? this.renderEditClass() : this.renderFormClass()
        )
    }
    renderFormClass() {
        const { listNoti, open, password } = this.state
        const { item } = this.props
        return (
            <div className="flex flex-col w-full">
                <div className="flex flex-row w-full">
                    <div className="image-class-detail pt-24 pr-48">
                        <img className="image-class" src="assets/images/notes/road-trip.jpeg" />
                    </div>
                    <div className="form-class-detail mt-24">
                        <h2 className="font-bold color_text mb-16">{item.className ? item.className : ""}</h2>
                        <div className="flex flex-row w-full mb-12">
                            <ItemInfo title="Tên lớp học: " value={item.className ? item.className : null} />
                            <ItemInfo title="Ban học: " value="Tự nhiên" />
                            <ItemInfo title="Lớp chuyên: " value="Có" />
                        </div>
                        <div className="flex flex-row w-full mb-12">
                            <ItemInfo title="Niên khóa: " value={item.schoolYear ? item.schoolYear : null} />
                            <ItemInfo title="Mã số lớp học: " value={item.classId ? item.classId : null} />
                            <ItemInfo title="Sĩ số: " value={item.totalStudent ? item.totalStudent : null} />
                        </div>
                        <div className="flex flex-row w-full">
                            <ItemInfo title="Khối học: " value={item.groupClass ? item.groupClass : null} />
                            <ItemInfo title="Môn học: " value="Toán" />
                            <ItemInfo title="Ngày tạo: " value={item.createDate ? formatDate(item.createDate) : null} />
                        </div>

                    </div>
                </div>
                <h4 className="font-bold mt-32 mb-12">
                    Thông báo
            </h4>
                <div className="bg-white w-full rounded mb-24">
                    <List className="list-noti" component="nav" aria-label="main mailbox folders">
                        {
                            listNoti.map((item, i) => <ItemNotification key={i} item={item} />)
                        }
                    </List>
                </div>
                <div className="flex flex-row justify-between">
                    <Button
                        onClick={this.enableDialog(true)}
                        variant="contained"
                        className="pt-12 pb-12 pr-24 pl-24 gradient_red items-center justify-center text-white mr-24">
                        <h2 className="text_button_base">Xóa</h2>
                    </Button>
                    <Button
                        onClick={this.editInfo(true)}
                        variant="contained"
                        className="pt-12 pb-12 pr-24 pl-24 items-center justify-center gradient_blue text-white">
                        <h2 className="text_button_base">Cập nhật</h2>
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={this.enableDialog(false)}
                    maxWidth="md"
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent className="items-center justify-center flex-col flex py-32">
                        <h2 className="color_text font-bold my-16">Bạn có chắc chắn muốn xóa lớp học này?</h2>
                        <h4 className="color_grey mb-12">Nhập mật khẩu để xác nhận</h4>
                        <div style={{ width: "30%" }} className="flex items-center justify-center flex-col">

                            <InputBase
                                id="align"
                                value={password}
                                defaultValue="Naked input"
                                onChange={this.onChangeText("password")}
                                placeholder="*****"
                                type="password"
                                className="color_blue textField w-full"
                                inputProps={{ 'aria-label': 'naked', style: { textAlign: 'center' } }}
                            />
                            <div className="flex flex-row w-full justify-between mt-24">
                                <Button
                                    onClick={this.enableDialog(false)}
                                    variant="contained"
                                    className="flex flex-1 py-12 gradient_red items-center justify-center text-white mr-40">
                                    <h2 className="text_button_base">Hủy</h2>
                                </Button>
                                <Button
                                    onClick={this.enableDialog(false)}
                                    variant="contained"
                                    className="flex flex-1 py-12 items-center justify-center gradient_blue text-white">
                                    <h2 className="text_button_base">Xóa ngay</h2>
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div >

        )
    }
    enableDialog = (status) => () => {
        this.setState({
            open: status
        })
    }
    editInfo = (status) => () => {
        const { classCode, class_name, total, schoolYear, groupClass } = this.state
        const { item } = this.props
        var params = {
            _id: item._id,
            classId: classCode,
            className: class_name,
            schoolId: item.schoolId,
            schoolName: item.schoolName,
            schoolYear: schoolYear,
            schoolType: item.schoolType,
            groupClass: groupClass.toString(),
            teacherManage: item.teacherManage,
            totalStudent: total
        }

        console.log("edittttttttttt")
        console.log(params)
        dataService.editInfoClass(params)
            .then(res => {
                console.log("000000000")
                this.props.editInfo(res)
                this.props.showMessage({ message: "Lưu thông tin thành công" })
                console.log(res)
            })
            .catch(err => {
                console.log("errrr")
                this.props.showMessage({ message: "Lưu thông tin thất bại" })
                console.log(err.response)
            })
        this.setState({
            edit: status
        })
    }
    renderEditClass() {
        const { classCode, total, schoolYear, class_name, loading, dataClass, subject, listGroupClass, groupClass } = this.state
        return (
            <div className="flex flex-col w-full">
                <div className="flex flex-row w-full">
                    <div className="image-class-detail pt-24 pr-48">
                        <img className="image-class" src="assets/images/notes/road-trip.jpeg" />
                        <h4 className="mt-12 self-center">Ảnh đại diện lớp học</h4>
                    </div>
                    <div className="form-class-edit">
                        <div className="flex flex-row pt-24">
                            <InputTextField
                                onChange={this.onChangeText("class_name")}
                                value={class_name} title="Tên lớp học" />
                            <InputTextField
                                marginLeft
                                onChange={this.onChangeText("schoolYear")}
                                value={schoolYear} title="Niên khóa" />
                        </div>
                        <div className="flex flex-row pt-24">
                            <InputDropDown
                                width={"40%"}
                                className="justify-between"
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                hint={groupClass}
                                list={listGroupClass}
                                chooseAction={this.choossGrade}
                                title="Khối học" />
                            <div style={{ width: "10%" }} />
                            <InputDropDown
                                width={"40%"}
                                className="justify-between"
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                list={[
                                    "Ban nâng cao",
                                    "Ban cơ bản",
                                ]}
                                chooseAction={this.chooseBlockScholl}
                                title="Ban học" />
                        </div>
                        <div className="flex flex-row pt-24">
                            <InputTextField
                                onChange={this.onChangeText("classCode")}
                                value={classCode} title="Mã số lớp học" />
                            <InputTextField
                                marginLeft
                                onChange={this.onChangeText("total")}
                                value={total} title="Sĩ số" />
                        </div>
                        <div className="flex flex-row pt-24">
                            <InputTextField
                                onChange={this.onChangeText("subject")}
                                value={subject} title="Môn học" />
                            <div style={{ width: "10%" }} />
                            <InputDropDown
                                width={"40%"}
                                className="justify-between"
                                widthDrop={"55%"}
                                color={"#296BFF"}
                                list={[
                                    "Không có",
                                    "Chuyên Toán",
                                ]}
                                chooseAction={this.chooseBlockScholl}
                                title="Lớp chuyên" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex mt-40 justify-center">
                    <Button
                        onClick={this.editInfo(false)}
                        variant="contained"
                        className="pt-12 pb-12 pl-32 pr-32  items-center justify-center gradient_turquoise text-white">
                        <h2 className="text_button_base">Lưu thông tin</h2>
                    </Button>
                </div>

                <h4 className="font-bold mt-32 mb-12">
                    Danh sách lớp học đã tạo
            </h4>
                {loading ? null :
                    <ReactTable
                        data={dataClass}
                        columns={column_class}
                        defaultPageSize={5}
                        className="-striped -highlight mt-20"
                    // TrGroupComponent={this.customTrGroupComponent}
                    />
                }
            </div >
        )
    }
    choossGrade = (item) => {
        this.setState({
            groupClass: item
        })
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
    onChangeText = (key) => (event) => {
        console.log(key)
        this.setState({ [key]: event.target.value })
    }
    chooseBlockScholl = (item) => () => {

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: Actions.showMessage,
    },
        dispatch);
}

export default connect(null, mapDispatchToProps)(ClassInfo)