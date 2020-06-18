import React, { Component } from 'react'
import HeaderButton from '../../../common/HeaderButton'
import ReactTable from 'react-table';
import { Button, Checkbox, Link, DialogContent, InputBase, Dialog, FormHelperText } from '@material-ui/core';
import constants from '../../../config/utils';
import { formatDate } from '../../utils/datetime';
import dataService from '../../services/dataService';
import TextInputBase from '../../../common/TextInputBase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'app/store/actions';
const column = [
    {
        Header: "",
        maxWidth: 50,
        accessor: "checkbox"
    },
    {
        Header: 'Mã học sinh',
        accessor: "id"
    },
    {
        Header: 'Họ và tên',
        accessor: "name"
    },
    {
        Header: 'Ngày sinh',
        accessor: "birthday"
    },
    {
        Header: 'Giới tính',
        maxWidth: 100,
        accessor: "gender"
    },
    {
        Header: 'Điện thoại',
        accessor: "mobile"
    },
    {
        Header: 'Email',
        accessor: "email"
    },
    {
        Header: '',
        accessor: "info_student"
    },
]
class StudentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            open: false,
            studentCode: ""
        }
    }

    componentDidMount() {
        this.getListStudent()
    }
    getListStudent() {
        var classId = this.props.location.state.classId
        var schoolId = this.props.location.state.schoolId
        dataService.getListStudentInClass(classId, schoolId)
            .then(res => {
                console.log('list student')
                console.log(res)
                var list = [...res.data]
                list.map((item, index) => {
                    item.checkbox = <Checkbox
                        checked={false}
                        onChange={this.onChange(index)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    item.birthday = formatDate(item.birthday)
                    item.gender = item.gender == constants.Gender.MALE ? "Nam" : "Nữ"
                    item.info_student = <Link onClick={this._navigateDetail(item._id)} className="color_blue">
                        <h5 className="info-class">Xem thông tin học sinh</h5>
                    </Link>
                })
                this.setState({
                    data: list,
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }
    _navigateDetail = (id) => () => {
        this.props.history.push({
            pathname: '/studentInfo',
            state: {
                idStudent : id
            }
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
    render() {
        const { data, loading, open, studentCode } = this.state
        return (
            <div className="flex flex-col pt-20">
                <div className="flex flex-row w-full justify-between">
                    <div />
                    <HeaderButton addbutton={this.enableDialog(true)} exportbutton />
                </div>
                {
                    loading ? null :
                        <ReactTable
                            data={data}
                            columns={column}
                            defaultPageSize={5}
                            className="-striped -highlight mt-20"
                        />
                }
                <div className="flex flex-row w-full justify-between mt-32">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red items-center justify-center  text-white mr-24">
                        <h2 className="text_button_base">Xóa</h2>
                    </Button>
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_blue items-center justify-center text-white">
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
                        <h2 className="color_text font-bold my-16">Nhập mã học sinh để thêm học sinh vào lớp học</h2>
                        <h4 className="color_grey mb-12">Mã học sinh</h4>

                        <div style={{ width: "30%" }} className="flex items-center justify-center flex-col">
                            <TextInputBase
                                fullWidth
                                value={studentCode}
                                onChange={this.onChangeText("studentCode")}
                                className="color_blue textField w-full"
                                inputProps={{ 'aria-label': 'naked', style: { textAlign: 'center' } }}
                                error={studentCode.length < 2 ? "Mã học sinh không dưới 2 kí tự" : null}
                            />
                            <div className="flex flex-row w-full justify-between mt-24">
                                <Button
                                    onClick={this.enableDialog(false)}
                                    variant="contained"
                                    className="flex flex-1 py-12 gradient_red items-center justify-center text-white mr-40">
                                    <h2 className="text_button_base">Hủy</h2>
                                </Button>
                                <Button
                                    disabled={this.validatorString()}
                                    onClick={this.addStudent}
                                    variant="contained"
                                    className={`flex flex-1 py-12 items-center justify-center text-white ${!this.validatorString() && "gradient_blue"}`}>
                                    <h2 className="text_button_base">Thêm</h2>
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
    enableDialog = (status) => () => {
        this.setState({
            open: status
        })
    }
    validatorString() {
        const { studentCode } = this.state
        if (studentCode == "") return true
        if (studentCode.length < 2) return true
        return false
    }

    addStudent = () => {
        var classId = this.props.location.state.classId
        var schoolId = this.props.location.state.schoolId
        var params = {
            classId: classId,
            schoolId: schoolId
        }
        console.log(params)
        dataService.addStudentIntoClass(this.state.studentCode, params)
            .then(res => {
                console.log(res)
                this.getListStudent()
                this.props.showMessage({ message: "Thêm học sinh thành công" })
                this.setState({
                    open: false
                })
            })
            .catch(err => {
                console.log(err.response)
                this.props.showMessage({ message: err.response.data.message })
            })
    }
    onChangeText = (key) => (event) => {
        this.setState({ [key]: event.target.value })
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: Actions.showMessage,
    },
        dispatch);
}

export default connect(null, mapDispatchToProps)(StudentsList)