import React, { Component } from 'react';
import { Card, CardContent, Button, Typography, Icon, InputBase, GridList, Avatar, Dialog, DialogContent, RadioGroup, FormControlLabel, Radio, Checkbox } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import InputDropDown from '../../../common/InputDropDown';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker
} from "material-ui-pickers";
import ReactTable from 'react-table';
import dataService from '../../services/dataService';
import connect from 'react-redux/es/connect/connect';
import constants from '../../../config/utils';
import { formatDate } from '../../utils/datetime';
import DialogBase from '../../../common/DialogBase';
import { showMessage } from '../../store/actions/fuse';
import ItemClass from '../../../common/ItemClass';
var _ = require('lodash');
const column = [
    {
        Header: 'STT',
        accessor: "stt",
        maxWidth: 50
    },
    {
        Header: 'Tên đề thi',
        accessor: "nameExam",
        maxWidth: 200
    },
    {
        Header: 'Khối học',
        accessor: "degreeNumber",
        maxWidth: 100
    },
    {
        Header: 'Lớp học',
        accessor: "nameClass",
        maxWidth: 100
    },
    {
        Header: 'Môn học',
        accessor: "subject",
        maxWidth: 150
    },
    {
        Header: 'Loại đề thi',
        accessor: "level",
        maxWidth: 100
    },
    {
        Header: 'Thời gian',
        accessor: "typeTime",
        maxWidth: 100
    },
    {
        Header: 'Ngày tạo',
        accessor: "createDate",
        maxWidth: 120
    },
    {
        Header: 'Action',
        accessor: "action"
    },
]

const ItemCheckbox = (props) =>
    <div className="flex flex-row justify-between">
        <FormControlLabel className="flex w-2/3"
            control={
                <Checkbox
                    checked={props.item.checked}
                    onChange={props.onChange}
                    name={props.item.name}
                    color="primary"
                />
            }
            label={`${props.item.name}(${props.item.email})`}
        />
        {props.item.disableBtn == false ? <Button className="btn_add_contact ml-8" onClick={props.onAddContact}>Thêm vào danh bạ</Button> : null}
    </div>



class ExamPersonalList extends Component {

    handleChange = (index) => () => {
        var listC = [...this.state.listContact];
        listC[index].checked = !listC[index].checked
        this.setState({
            listContact: listC
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: Date('2014-08-18T21:11:54'),
            listSubject: [],
            typeTime: [],
            listGrade: this.getListGrade(),
            data: [],
            listClass: [],
            openDialog: false,
            typeShare: null,
            openDialogShare: false,
            activeButton: false,
            listContact: [],
            txtSearch: '',
            openEditName: false,
            txtEditName: ""
        }

        this.chooseSubject = null
        this.chooseGradeShare = null
        this.chooseGrade = null
        this.chooseTypeTime = null
        this.chooseExam = null
    }
    getListGrade() {
        var schoolType = this.props.school.schoolType
        var newlistGrade = []
        switch (schoolType) {
            case constants.schoolType.TYPE_PRIMARY_SCHOOL:
                newlistGrade = [1, 2, 3, 4, 5]
                break;

            case constants.schoolType.TYPE_SECONDARY_SCHOOL:
                newlistGrade = [6, 7, 8, 9]
                break;

            case constants.schoolType.TYPE_HIGH_SCHOOL:
                newlistGrade = [10, 11, 12]
                break;
            default:
                newlistGrade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                break;
        }
        return newlistGrade
    }
    componentDidMount() {
        var params = {
            userCreate: this.props.user.userId,
        }
        this.getData(params)
        this.getListSubject()
        this.getConstant()
    }
    askRemoveExam = (item) => () => {
        this.setState({
            openDialog: true
        })
        console.log(item)
        this.chooseExam = item
    }
    modalShare = (item) => () => {
        this.setState({
            openDialogShare: true
        })
        console.log(item)
        this.chooseExam = item
    }

    getData(params) {
        dataService.filterListExams(params)
            .then(res => {
                console.log("------------------")
                console.log(res)
                if (res.data) {
                    var list = [...res.data]
                    list.forEach((item, i) => {
                        item.createDate = formatDate(item.isPrivateExam ? item.startTime : item.effectStartTime)
                        item.subject = item.subjectName
                        item.nameClass = item.nameClass[0]
                        item.action = <div className="flex flex-row w-full px-12 justify-between">
                            <Button className="btn_delete" onClick={this._navigateDetail(item._id)} ><img className="color_blue" src="assets/images/icons/ic_view.png" /></Button>
                            <Button onClick={this.editExam(item)} className="btn_delete" ><img className="color_blue" src="assets/images/icons/ic_edit.png" /></Button>
                            <Button onClick={this.askRemoveExam(item)} className="btn_delete"><img className="color_blue" src="assets/images/icons/ic_bin.png" /></Button>
                            <Button className="btn_delete" ><img className="color_blue" src="assets/images/icons/ic_clone.png" /></Button>
                            <Button className="btn_delete" onClick={this.modalEditName(item)} ><img className="color_blue" src="assets/images/icons/ic_setting.png" /></Button>
                            <Button onClick={this.modalShare(item)} className="btn_delete" ><img className="color_blue" src="assets/images/icons/ic_share.png" /></Button>
                        </div>
                        item.stt = i + 1;
                        return item
                    })
                    this.setState({
                        data: list
                    })
                }

            })
    }
    modalEditName = (item) => () => {
        this.chooseExam =  item
        this.setState({
            openEditName: true
        })
    }
    onSubmitEditName = () => {
        dataService.examEditName(this.state.txtEditName,this.chooseExam._id).then(res => {
            this.props.showMessage({ message: "Đổi tên thành công" })
            var params = {
                userCreate: this.props.user.userId,
                degreeNumber: this.chooseGrade && this.chooseGrade,
                subject: this.chooseSubject && this.chooseSubject.subjectId,
                typeTime: this.chooseTypeTime && this.chooseTypeTime.value
            }
            this.getData(params)
            this.setState ({
                openEditName : false
            })
           
        }).catch(err => {
            this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
            this.setState ({
                openEditName : false
            })
        })
    }
    getListClass() {
        var teacherID = this.props.user.userId
        var schoolID = this.props.user.school ? this.props.user.school : this.props.user.userRole.schoolId
        dataService.getClassByGrade(schoolID, this.chooseGradeShare, teacherID)
            .then(res => {
                var list = res.data
                if (list.length == 0) this.props.showMessage({ message: "Khối " + this.chooseGradeShare + " chưa có lớp học nào" })
                this.setState({
                    listClass: list,
                    loading: false
                })
            })
    }
    getConstant() {
        dataService.getConstants()
            .then(res => {
                console.log(res)
                this.setState({
                    typeTime: res.typeTime,
                })
            })
    }
    getListSubject() {
        dataService.getListAllSubjects()
            .then(res => {
                this.setState({
                    listSubject: res.data
                })
            })
    }

    chooseItem = (key) => (item) => {
        this[key] = item
        if (key == "chooseGradeShare") {
            this.getListClass()
        }
        else {
            var params = {
                userCreate: this.props.user.userId,
                degreeNumber: this.chooseGrade && this.chooseGrade,
                subject: this.chooseSubject && this.chooseSubject.subjectId,
                typeTime: this.chooseTypeTime && this.chooseTypeTime.value
            }
            this.getData(params)
        }

    }
    editExam = item => () => {
        this.props.history.push({
            pathname: '/editExam',
            state: { _id: item._id },
        })
    }
    onChangeActiveButton = () => {
        if (this.state.activeButton) {
            this.setState({
                activeButton: false,
                listContact: []
            })
        } else {
            dataService.getContact().then(res => {
                var listTemp = [...res.friends];
                listTemp.map((item, index) => {
                    item.checked = false;
                    item.disableBtn = true;
                })
                this.setState({
                    activeButton: true,
                    listContact: listTemp
                })
            }).catch(err => {
                this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
                this.handleCloseDialog("openDialog")
            })


        }
    }

    delayedQuery = _.debounce(q => this.sendQuery(q), 300);
    onChangeSearchInput = (event) => {
        this.delayedQuery(event.target.value);
        this.setState({
            txtSearch: event.target.value
        })
    }
    onChangeNameInput = (event) => {
        this.setState({
            txtEditName: event.target.value
        })
    }
    sendQuery = (q) => {
        dataService.getSearchUser(this.state.txtSearch).then(res => {
            var listTemp = [...res.data];
            listTemp.map((item, index) => {
                item.disableBtn = false;
                item.checked = false;
            })
            console.log(listTemp);
            this.setState({
                activeButton: false,
                listContact: listTemp
            })
        }).catch(err => {
            console.log(err.response.data)
            this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
            this.handleCloseDialog("openDialog")
        })
    }

    addContact = (id) => () => {
        console.log(id);
        dataService.addContact({
            friend: id
        }).then(res => {
            this.props.showMessage({ message: "Thêm vào danh bạ thành công" })
        }).catch(err => {
            console.log(err.response.data)
            this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
            this.handleCloseDialog("openDialog")
        })
    }
    _navigateDetail = (id) => () => {
        this.props.history.push({
            pathname: '/viewExam',
            state: {
                id: id
            }
        })
    }
    onShareExam = (id) => () => {
        var listIdUser = []
        this.state.listContact.map((item, index) => {
            if (item.checked == true) {
                listIdUser.push(item.userId)
            }
        })
        console.log(id)
        console.log("/")
        console.log(listIdUser)
        dataService.shareExamToUser({
            sharedUser: listIdUser,
            examDefine: id
        }).then(res => {
            console.log(res)
            this.setState({
                openDialogShare: false
            })
            this.props.showMessage({ message: "Chia sẻ đề thành công" })
        }).catch(err => {
            console.log(err.response.data)
            this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
            this.handleCloseDialog("openDialog")
        })
    }
    render() {
        const { data, listSubject, typeTime, listGrade, openDialogShare, openDialog, listContact, activeButton, txtSearch, openEditName, txtEditName } = this.state
        return (
            <div className="div_container overflow-auto">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <h2 className="font-bold color_title mb-24">
                        Danh sách bộ đề cá nhân
                </h2>
                </FuseAnimate>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            {listSubject.length > 0 &&
                                <InputDropDown
                                    value={"subjectName"}
                                    width={"200px"}
                                    color={"#296BFF"}
                                    list={listSubject}
                                    className="mr-24"
                                    chooseAction={this.chooseItem("chooseSubject")}
                                    title="Môn học" />
                            }
                            {typeTime.length > 0 &&
                                <InputDropDown
                                    value={"label"}
                                    width={"200px"}
                                    color={"#296BFF"}
                                    className="mr-24"
                                    list={typeTime}
                                    chooseAction={this.chooseItem("chooseTypeTime")}
                                    title="Loại đề" />
                            }
                            {listGrade.length > 0 &&
                                <InputDropDown
                                    width={"200px"}
                                    color={"#296BFF"}
                                    list={listGrade}
                                    chooseAction={this.chooseItem("chooseGrade")}
                                    title="Khối học" />
                            }
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
                    {data.length > 0 ?
                        <ReactTable
                            data={data}
                            columns={column}
                            defaultPageSize={5}
                            className="-striped -highlight mt-20"
                        />
                        :
                        <h3 className="text-center mt-56">Không có đề thi nào</h3>
                    }
                </div>
                <DialogBase
                    title="Xóa đề thi"
                    content={`Bạn có chắc chắn muốn xóa đề thi ${this.chooseExam && this.chooseExam.nameExam}`}
                    maxWidth="sm"
                    action={this._removeExam}
                    openDialog={openDialog}
                    handleCloseDialog={this.handleCloseDialog("openDialog")}
                />
                <Dialog
                    open={openEditName}
                    onClose={this.handleCloseDialog("openEditName")}
                    maxWidth="sm"
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent className="items-center justify-center flex-col flex py-32">
                        <h2 className="color_blue font-bold my-16">Sửa tên đề thi</h2>
                        <div className="flex flex-row my-16 py-12 items-center color_grey w-full px-12 rounded-lg shadow-lg mx-16">
                        <InputBase
                            value={txtEditName}
                            // onChange={this.onChangeSearchInput}
                            // onChange={this.onChangeText}
                            onChange={this.onChangeNameInput}
                            className="text-xs w-full"
                            placeholder="Nhập tên đề thi mới"
                        />
                        </div>

                        <div className="flex flex-row w-full justify-between mt-24">
                            <Button
                                onClick={this.handleCloseDialog("openEditName")}
                                variant="contained"
                                className="flex flex-1 py-16 gradient_red items-center justify-center text-white mr-40">
                                <h2 className="text_button_base">Hủy</h2>
                            </Button>
                            <Button
                                onClick = {this.onSubmitEditName}
                                variant="contained"
                                className="flex flex-1 py-16 items-center justify-center gradient_blue text-white">
                                <h2 className="text_button_base">Xác nhận</h2>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openDialogShare}
                    onClose={this.handleCloseDialog("openDialogShare")}
                    maxWidth="sm"
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent className="items-center justify-center flex-col flex py-32">
                        <h2 className="color_blue font-bold my-16 items-center">{`Chia sẻ đề ${this.chooseExam && this.chooseExam.nameExam}`}</h2>
                        <div className='flex flex-row p-12 w-full justify-between'>
                            <div className="flex flex-row items-center color_grey w-3/5 px-12 py-2 rounded-lg shadow-lg mr-16">
                                <Icon>search</Icon>
                                <InputBase
                                    value={txtSearch}
                                    // onChange={this.onChangeSearchInput}
                                    // onChange={this.onChangeText}
                                    onChange={this.onChangeSearchInput}
                                    className="ml-12 text-xs w-full"
                                    placeholder="Nhập thông tin người chia sẻ"
                                />

                            </div>
                            <Button
                                className={activeButton ? 'btn_contact_active' : 'btn_contact_disable'}
                                onClick={this.onChangeActiveButton}>
                                Danh bạ</Button>
                        </div>

                        <div className="div_share_contact w-full p-12 my-20 flex flex-col">
                            {
                                listContact.map((item, index) => <ItemCheckbox key={index} index={index} item={item} onChange={this.handleChange(index)} onAddContact={this.addContact(item._id)} />)
                            }
                        </div>

                        <div className="flex flex-row w-full justify-between">
                            <Button className="btn_cancel_contact bg-red-dark p-8" onClick={this.handleCloseDialog("openDialogShare")} >Hủy</Button>
                            <Button className="btn_share_contact bg-blue-dark p-8" onClick={this.onShareExam(this.chooseExam && this.chooseExam._id)}>Chia sẻ</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }


    onChooseClass = (index) => () => {
        var list = [...this.state.listClass]
        list[index].check = !list[index].check ? true : !list[index].check
        this.setState({
            listClass: list
        })
    }
    chooseTypeShare = (event) => {
        this.setState({
            typeShare: event.target.value
        })
    }
    handleCloseDialog = (key) => () => {
        this.setState({
            [key]: false
        })
    }
    _removeExam = () => {
        dataService.deleteExam(this.chooseExam._id)
            .then(res => {
                // console.log(res)
                // var list = [...this.state.data].filter(item => item._id !== this.chooseExam._id)
                // })

                var params = {
                    userCreate: this.props.user.userId,
                    degreeNumber: this.chooseGrade && this.chooseGrade,
                    subject: this.chooseSubject && this.chooseSubject.subjectId,
                    typeTime: this.chooseTypeTime && this.chooseTypeTime.value
                }
                this.getData(params)
                this.setState({
                    // data: list,
                    openDialog: false
                })
                this.props.showMessage({ message: "Đã xóa đề thi " + this.chooseExam.nameExam })
                this.chooseExam = null
                this.handleCloseDialog("openDialog")
            })
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    openDialog: false
                })
                this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
                this.handleCloseDialog("openDialog")
            })
    }
    _createExam = () => {
        this.props.history.push("/createExamStep")
    }
    _shareExam = () => {
        var list = []
        this.state.listClass.forEach((item, i) => {
            if (item.check == true) list.push(item.classId)
        })
        var schoolID = this.props.user.school ? this.props.user.school : this.props.user.userRole.schoolId
        var params = {
            schoolId: schoolID,
            class: list
        }
        dataService.shareExam(this.chooseExam._id, params)
            .then(res => {
                this.setState({
                    openDialogShare: false
                })
                this.props.showMessage({ message: "Chia sẻ đề thành công" })
            })
            .catch(err => {
                console.log(err.response.data)
                this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
            })
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.auth.login.user.user,
        school: state.auth.login.user.school
    }
}
const mapDispatchToProps = dispatch => {
    return {
        showMessage: (mess) => dispatch(showMessage(mess)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExamPersonalList)
