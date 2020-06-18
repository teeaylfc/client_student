import React, { Component } from 'react';
import { Card, CardContent, Button, Typography, Icon, InputBase, Checkbox, Popover, MenuItem, ListItemText, Dialog, DialogContent } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import DropDownItem from './DropDownItem';
import ItemCreateQuestion from './ItemCreateQuestion';
import ItemQuestion from './ItemQuestion';
import TextInputBase from '../../../../common/TextInputBase';
import DropMenu from '../../../sign-up/DropMenu';
import connect from 'react-redux/es/connect/connect';
import constants from '../../../../config/utils';
import dataService from '../../../services/dataService';
import InputDropDown from '../../../../common/InputDropDown';
import { showMessage } from '../../../store/actions/fuse';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import ReactTable from 'react-table';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker
} from "material-ui-pickers";

import DateFnsUtils from '@date-io/date-fns';
import { formatDate } from '../../../utils/datetime';
import generateRandomString from '../../../utils/randomID';
import { genObjectID } from '../../../utils/generatorObjectID';
import getListGrade from '../../../utils/getListGrade';

const listQuestionType = [
    {
        string: "Trắc nhiệm 1 đáp án",
        type: constants.QuestionType.QUESTION_TYPE_SINGLE_CHOICE,
    },
    {
        string: "Câu hỏi hình ảnh",
        type: constants.QuestionType.QUESTION_TYPE_MATCHING_IMAGE,
    },

]
const addMoreQuestion = [
    {
        string: "Bộ đề kiểm tra",
        type: "1",
    },
    {
        string: "Bộ câu hỏi",
        type: "2",
    },

]
const column = [
    {
        Header: 'STT',
        accessor: "stt",
        maxWidth: 100
    },
    {
        Header: 'Nội dung câu hỏi',
        accessor: "questionString"
    },

    {
        Header: 'Loại câu hỏi',
        accessor: "questionType",
        maxWidth: 250
    },
    {
        Header: 'Chọn',
        accessor: "checkbox",
        maxWidth: 100
    },
]

class CreateExamStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            listGrade: getListGrade(this.props.school),
            listSubject: [],
            nameExam: "",
            listClass: [],
            disableClass: true,
            showTotalTime: false,
            typeTime: [],
            totalTime: "",
            isPrivateExam: [],
            isOnlineExam: [],
            listQuestion: [],
            chooseGrade: null,
            selectedStartDate: null,
            selectedEndDate: null,
            mixQuestion: false,
            mixAnswer: false,
            typePoint: null,
            checkPrivateExam: false,
            userMenu: null,
            openDialog: false,
            libQuestion: [],
            loadMoreMenu: null,
            typeAddMore: null,
            questionPack: [],
            questionPackDetail: []
        }
        this.chooseSubject = null
        this.chooseClass = null
        this.chooseTypeTime = null
        this.choosePrivateExam = null
        this.chooseIsOnline = null
        this.questionLevel = null
        this.choosePack = null
        this.listFinal = []

    }
    componentDidMount() {
        this.getListSubject()
        this.getConstant()
    }
    getQuestionPack() {
        var teacherID = this.props.user.userId
        var params = {
            userCreate: teacherID,
            typeTime: this.chooseTypeTime.value
        }
        dataService.filterQuestionPack(params)
            .then(res => {
                this.setState({
                    questionPack: res.data
                })
                console.log("res")
                console.log(res)
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
    getConstant() {
        dataService.getConstants()
            .then(res => {
                this.setState({
                    typeTime: res.typeTime,
                    isPrivateExam: res.isPrivateExam,
                    isOnlineExam: res.isOnlineExam
                })
            })
    }
    getListClass() {
        var teacherID = this.props.user.userId
        var schoolID = this.props.user.school ? this.props.user.school : this.props.user.userRole.schoolId
        console.log("this.chooseGrade")
        console.log(this.state.chooseGrade)
        dataService.getClassByGrade(schoolID, this.state.chooseGrade, teacherID)
            .then(res => {
                var list = res.data
                if (list.length == 0) this.props.showMessage({ message: "Khối " + this.state.chooseGrade + " chưa có lớp học nào" })
                this.setState({
                    listClass: list,
                    loading: false
                })
            })
    }
    onChange = (index) => () => {
        var list = [...this.state.questionPackDetail]
        var obj = this.state.questionPackDetail[index]
        obj.checkbox = <Checkbox
            checked={obj.check ? false : true}
            onChange={this.onChange(index)}
            value="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        obj.check = obj.check ? false : true
        list[index] = obj
        this.setState({
            questionPackDetail: list,
        }, () => console.log(this.state.questionPackDetail))
    }
    getDetailQuestionPack(item) {
        dataService.getDetailQuestionPack(item._id)
            .then(res => {
                console.log("88888888888")
                console.log(res)
                var list = [...res]
                list.forEach((item, i) => {
                    item.checkbox = <Checkbox
                        checked={false}
                        onChange={this.onChange(i)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    item.stt = i + 1
                    return item
                })
                this.setState({
                    questionPackDetail: res
                })
            })
    }
    

    buttonStep = (index) => {
        const { step } = this.state
        return (
            <div className={`flex flex-row items-center ${index == 4 ? "" : "flex-1"} `}>
                <Button
                    style={{
                        minWidth: "unset",
                        border: step == 4 ? "1px solid #FFFFFF" : "1px solid #296BFF"
                    }}
                    onClick={this._changeStep(index)}
                    className={`${step == index ? "backgroundColor_blue" : "border_step"} rounded-full w-48 h-48 `}
                >
                    <p className={`${step == index ? "text-white" : "color_blue"} text-lg`} >
                        {index}
                    </p>
                </Button>
                {index !== 4 &&
                    <Divider className={`divider_Exam flex flex-1 ${step == 4 ? "bg-white" : "backgroundColor_blue"}`} light />
                }
            </div>
        )
    }
    validatorStep1() {
        const { nameExam, showTotalTime, totalTime, selectedEndDate, selectedStartDate, checkPrivateExam } = this.state
        if (nameExam == "") return "Tên đề thi không được để trống"
        if (!this.chooseSubject) return "Chưa chọn môn học"
        if (!this.state.chooseGrade) return "Chưa chọn khối lớp"
        if (!this.chooseClass) return "Chưa chọn lớp học"
        if (!this.questionLevel) return "Chưa chọn mức độ đề"
        if (!this.chooseTypeTime) return "Chưa chọn loại hình thời gian"
        // if (!this.chooseIsOnline) return "Chưa chọn hình thức thi"
        if (!this.choosePrivateExam) return "Chưa chọn loại đề thi"
        if (showTotalTime && totalTime == "") return "Chưa nhập thời gian làm bài"
        if (!selectedStartDate) return "Chưa chọn thời gian bắt đầu"
        if (!selectedEndDate && !checkPrivateExam) return "Chưa chọn thời gian kết thúc"
        return null
    }
    _changeStep = (index) => () => {
        console.log(index)
        var newList = this.state.listQuestion.filter(item => item.disable == true)
        if (index == 2 && this.validatorStep1()) {
            this.props.showMessage({ message: this.validatorStep1() })
        }
        else if ((index == 3 && newList.length == 0) || (index == 4 && newList.length == 0)) {
            this.props.showMessage({ message: "Đề thi phải có ít nhất một câu hỏi" })
        }
        else {
            this.setState({
                step: index
            })
        }

    }
    updateListQuestion = (item, index) => {
        this.state.listQuestion[index] = item
        console.log("this.state.listQuestion")
        console.log(this.state.listQuestion)
    }
    render() {
        const { step, listSubject } = this.state
        return (
            <div style={step == 4 ? { backgroundImage: "url(assets/images/backgrounds/background_exam.png)" } : null}
                className="div_container flex flex-col items-center" >
                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <div className="flex flex-row items-center w-full justify-center mt-32 mb-48">
                        <div style={{ width: "50%" }} className="flex flex-row">
                            {this.buttonStep(1)}
                            {this.buttonStep(2)}
                            {this.buttonStep(3)}
                            {this.buttonStep(4)}
                        </div>
                    </div>
                </FuseAnimate>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    {
                        step == 1 ?
                            this.renderStep1()
                            :
                            step == 2 ?
                                this.renderStep2() : step == 3 ? this.renderStep3() :

                                    this.renderStep4()
                    }
                </FuseAnimate>
            </div>
        );
    }
    chooseItem = (key) => (item) => {
        if (key == "choosePrivateExam") {
            console.log(item)
            this.setState({
                checkPrivateExam: JSON.parse(item.value),
            }, () => console.log(this.state.checkPrivateExam))
        }
        if (key == "chooseGrade") {
            this.chooseClass = null
            this.setState({
                disableClass: false,
                [key]: item,
            }, () => this.getListClass())

        }
        else {
            this[key] = item
        }
        if (key == "chooseTypeTime") {
            if (item.value == constants.typeTime.SEMESTER || item.value == constants.typeTime.OTHER) {
                this.setState({
                    showTotalTime: true
                })
            }
            else {
                this.setState({
                    showTotalTime: false
                })
            }
            this.getQuestionPack()
        }

    }

    onChangeText = (key) => (event) => {
        this.setState({
            [key]: event.target.value
        })
    }
    renderStep1() {
        const { typePoint, mixQuestion, mixAnswer, checkPrivateExam, nameExam, totalTime, listSubject, listGrade, listClass, typeTime, isPrivateExam, isOnlineExam, showTotalTime } = this.state
        return (
            <div className="flex flex-col w-full items-center">
                <h2 className="font-bold color_title mb-32">
                    Thông tin đề thi
        </h2>
                <div className="form-step-1">
                    <div className="flex flex-row items-center mb-24">
                        <h3 className="text-white mr-24">NHẬP TÊN ĐỀ THI</h3>
                        <TextInputBase
                            value={nameExam}
                            onChange={this.onChangeText("nameExam")}
                            className="color_blue input_base"
                        />
                    </div>
                    <div className="flex flex-row mb-24 items-center">
                        <h4 className="text-white" style={{ width: "100px" }}>Môn học</h4>
                        <DropMenu
                            value={"subjectName"}
                            width="100px"
                            list={listSubject}
                            currentItem={this.chooseSubject}
                            chooseItem={this.chooseItem('chooseSubject')}
                        />
                        <h4 className="text-white ml-40 mr-16">Khối học</h4>
                        <DropMenu
                            width="100px"
                            list={listGrade}
                            currentItem={this.state.chooseGrade}
                            chooseItem={this.chooseItem('chooseGrade')}
                        />
                        <h4 className="text-white ml-40 mr-16">Lớp học</h4>
                        <DropMenu
                            value="classId"
                            width="100px"
                            idParent={this.state.chooseGrade ? this.state.chooseGrade : null}
                            disabled={(this.state.chooseGrade && listClass.length > 0) ? false : true}
                            list={listClass.length > 0 ? listClass : []}
                            currentItem={this.chooseClass}
                            chooseItem={this.chooseItem('chooseClass')}
                        />

                    </div>
                    <div className="flex flex-row items-center">
                        <h4 style={{ width: "100px" }} className="text-white">Loại đề thi</h4>
                        <DropMenu
                            value="label"
                            width="100px"
                            currentItem={this.choosePrivateExam}
                            list={isPrivateExam}
                            chooseItem={this.chooseItem('choosePrivateExam')}
                        />
                        <h4 className="text-white ml-40 mr-16">Loại hình thời gian</h4>
                        <DropMenu
                            value={"label"}
                            width="120px"
                            list={typeTime}
                            currentItem={this.chooseTypeTime}
                            chooseItem={this.chooseItem('chooseTypeTime')}
                        />
                        {/* <h4 className="text-white ml-40 mr-16">Hình thức thi</h4>
                        <DropMenu
                            value="label"
                            width="100px"
                            currentItem={this.chooseIsOnline}
                            list={isOnlineExam}
                            chooseItem={this.chooseItem('chooseIsOnline')}
                        /> */}
                        <h4 className="text-white ml-40 mr-16">Mức độ đề thi</h4>
                        <DropMenu
                            width="140px"
                            list={[
                                constants.questionLevel.EASY,
                                constants.questionLevel.NORMAL,
                                constants.questionLevel.HARD,
                            ]}
                            currentItem={this.questionLevel}
                            chooseItem={this.chooseItem('questionLevel')}
                        />

                    </div>
                    {
                        showTotalTime ?
                            <div className="flex flex-row mt-24 items-center">
                                <h4 className="text-white" style={{ width: "100px" }}>Thời gian làm bài</h4>
                                <TextInputBase
                                    value={totalTime}
                                    onChange={this.onChangeText("totalTime")}
                                    className="color_blue input_base"
                                />
                            </div>
                            : null
                    }
                    <div className="flex flex-row w-full items-center justify-between mt-24">
                        <div className="flex flex-row items-center mr-24">
                            <h4 className="text-white" style={{ width: "100px" }}>Thời gian</h4>
                            {checkPrivateExam ? this.showPickDatePrivate() : this.showPickDate()}
                        </div>
                        <div className="flex flex-row items-center flex-1">
                            <div className="flex flex-row items-center mr-32">
                                <Checkbox
                                    className="text-white"
                                    type='checkbox'
                                    checked={mixQuestion}
                                    onChange={this.changeValue('mixQuestion')}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <h4 className="text-white">Xáo trộn câu hỏi</h4>

                            </div>
                            <div className="flex flex-row items-center">
                                <Checkbox
                                    className="text-white"
                                    type='checkbox'
                                    checked={mixAnswer}
                                    onChange={this.changeValue('mixAnswer')}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <h4 className="text-white">Xáo trộn đáp án</h4>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-1/4 mt-24 justify-between">
                    <div className="flex flex-row items-center">
                        <Checkbox
                            icon={<CircleUnchecked />}
                            checkedIcon={<CircleChecked />}
                            className="color_text"
                            type='checkbox'
                            checked={typePoint == 1 ? true : false}
                            onChange={this.changeTypePoint(1)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <h4 className="color_text">Tự chia điểm</h4>

                    </div>
                    <div className="flex flex-row items-center">
                        <Checkbox
                            icon={<CircleUnchecked />}
                            checkedIcon={<CircleChecked />}
                            className="color_text "
                            type='checkbox'
                            checked={typePoint == 0 ? true : false}
                            onChange={this.changeTypePoint(0)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <h4 className="color_text">Nhập điểm</h4>

                    </div>
                </div>
                <Button
                    onClick={this._changeStep(2)}
                    variant="contained"
                    className="p-12 flex flex-row gradient_turquoise items-center justify-center text-white mt-24">
                    <h2 className="text_button_base mr-32">Tiếp tục</h2>
                    <Icon>keyboard_arrow_right</Icon>
                </Button>

            </div>
        )
    }
    showPickDatePrivate() {
        const { selectedEndDate, selectedStartDate } = this.state
        return (
            <div className="input_base flex flex-row items-center">
                <h4 className="color_text mr-12">Bắt đầu:</h4>
                <Icon className="color_grey mr-8 text-xs">
                    calendar_today
        </Icon>
                <MuiPickersUtilsProvider className="color_blue" utils={DateFnsUtils}>
                    <DatePicker
                        style={{ width: "100px", textAlign: "center" }}
                        className="color_blue"
                        maxDate={selectedEndDate}
                        value={selectedStartDate}
                        format="dd/MM/yyyy"
                        animateYearScrolling={true}
                        id="startTime"
                        name="startTime"
                        onChange={this.handleDateChange("selectedStartDate")}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
    showPickDate() {
        const { selectedEndDate, selectedStartDate } = this.state
        return (
            <div className="input_base flex flex-row items-center">
                <h4 className="color_text mr-12">Bắt đầu:</h4>
                <Icon className="color_grey mr-8 text-xs">
                    calendar_today
        </Icon>
                <MuiPickersUtilsProvider className="color_blue" utils={DateFnsUtils}>
                    <DatePicker
                        style={{ width: "100px", textAlign: "center" }}
                        className="color_blue"
                        maxDate={selectedEndDate}
                        value={selectedStartDate}
                        format="dd/MM/yyyy"
                        animateYearScrolling={true}
                        id="startTime" name="startTime"
                        onChange={this.handleDateChange("selectedStartDate")}
                    />
                </MuiPickersUtilsProvider>
                <h4 className="color_text mx-24">|</h4>
                <h4 className="color_text mr-12">Kết thúc:</h4>
                <Icon className="color_grey mr-8 text-xs">
                    calendar_today
        </Icon>
                <MuiPickersUtilsProvider className="color_blue" utils={DateFnsUtils}>
                    <DatePicker
                        style={{ width: "100px", textAlign: "center" }}
                        className="color_blue"
                        minDate={selectedStartDate}
                        value={selectedEndDate}
                        format="dd/MM/yyyy"
                        animateYearScrolling={true}
                        id="endTime" name="endTime"
                        onChange={this.handleDateChange("selectedEndDate")}
                    />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
    changeTypePoint = (type) => () => {
        this.setState({
            typePoint: type
        })
    }
    changeValue = (key) => (event) => {
        this.setState({
            [key]: event.target.checked
        })
    }
    handleDateChange = (key) => (date) => {
        this.setState({
            [key]: date
        });
    };

    onChangeAnswer = (indexAnswered, indexQuestion) => {
        var list = [...this.state.listQuestion]
        list[indexQuestion].indexAnswered = indexAnswered
        this.setState({
            listQuestion: list
        })
    }
    removeQuestion = (index) => {
        var list = this.state.listQuestion.filter((item, i) => i != index)
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
    }
    onChangeQuestionString = (value, index) => {
        console.log(value)
        console.log(index)
        var list = [...this.state.listQuestion]
        list[index].questionString = value
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
    }
    onChangeQuestionNote = (value, index) => {
        var list = [...this.state.listQuestion]
        list[index].descriptionAnswer = value
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
    }
    onChangeTextAnswer = (index, string, indexQuestion) => {
        var list = [...this.state.listQuestion]
        list[indexQuestion].answerList[index].answerValue = string
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
    }
    onChangePoint = (value, index) => {
        var list = [...this.state.listQuestion]
        list[index].point = value
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
    }
    addAnwser = (index) => {
        var list = [...this.state.listQuestion]
        var answer = {}
        list[index].answerList = list[index].answerList ? [...list[index].answerList, answer] : [answer]
        list[index].loadQuestion = list[index].loadQuestion ? !list[index].loadQuestion : true
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
    }
    saveQuestion = (index, response) => {
        var list = [...this.state.listQuestion]
        list[index].disable = true
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
        this.listFinal.push(response)
        console.log("this.listFinal")
        console.log(this.listFinal)
    }
    saveQuestionFromLib = (index, response) => {
        var list = [...this.state.listQuestion]
        list[index].disable = true
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
        this.listFinal[index] = response
        console.log("this.listFinal")
        console.log(this.listFinal)
    }
    actionAddmore = (key) => (event) => {
        this.setState({
            [key]: event.currentTarget
        })
    }
    loadmoreMenuClose = () => {
        this.setState({ loadMoreMenu: null, });
    }
    userMenuClose = () => {
        this.setState({ userMenu: null, });
    }

    chooseTypeQuestion = (item, i) => (event) => {
        this.userMenuClose()
        var list = [...this.state.listQuestion]
        list.push({
            type: item.type
        })
        this.setState({
            listQuestion: list,
        })
        console.log(this.state.listQuestion)
    }
    handleUploadFile = (index, image) => {
        var list = [...this.state.listQuestion]
        list[index].image = image
        list[index].loadQuestion = list[index].loadQuestion ? !list[index].loadQuestion : true
        this.setState({
            listQuestion: list
        }, () => console.log(this.state.listQuestion))
    }
    showLibQuestion = () => {
        this.setState({
            openDialog: true
        })
    }
    chooseMenuLoadmore = (item, i) => () => {
        this.setState({
            typeAddMore: item.type
        })
        this.loadmoreMenuClose()
        this.showLibQuestion()
    }
    renderStep2() {
        const { listQuestion, userMenu, openDialog, libQuestion, loadMoreMenu, questionPack, questionPackDetail, typeAddMore } = this.state
        return (
            <div className="flex flex-col w-full items-center">
                <h2 className="font-bold  mb-32" style={{ color: "#374A92" }}>
                    Tạo câu hỏi
    </h2>
                <Button onClick={this.actionAddmore("loadMoreMenu")} className="py-12 px-48 mb-24 gradient_blue text-white items-center">
                    <Icon>assignment</Icon>
                    <h3 className="text_button_base ml-12">Thư viện câu hỏi</h3>
                </Button>
                <Popover
                    open={Boolean(loadMoreMenu)}
                    anchorEl={loadMoreMenu}
                    onClose={this.loadmoreMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    classes={{
                        paper: "py-0"
                    }}
                >
                    <React.Fragment>
                        {
                            addMoreQuestion.map((item, i) =>
                                <MenuItem key={i} onClick={this.chooseMenuLoadmore(item, i)}>
                                    <ListItemText className="pl-0" >
                                        <h4 style={{ fontFamily: "Quicksand" }} className="color_text">{item.string}</h4>
                                    </ListItemText>
                                </MenuItem>
                            )
                        }
                    </React.Fragment>
                </Popover>
                {listQuestion.length > 0 && listQuestion.map((item, index) =>
                    <ItemCreateQuestion
                        item={item}
                        key={index}
                        loadQuestion={item.loadQuestion}
                        save={this.saveQuestion}
                        saveQuestionFromLib={this.saveQuestionFromLib}
                        onChangePoint={this.onChangePoint}
                        removeQuestion={this.removeQuestion}
                        classRoom={this.state.chooseGrade}
                        chooseSubject={this.chooseSubject}
                        questionLevel={this.questionLevel}
                        index={index}
                        onChangeQuestionNote={this.onChangeQuestionNote}
                        onChangeQuestionString={this.onChangeQuestionString}
                        onChangeAnswer={this.onChangeAnswer}
                        onChangeTextAnswer={this.onChangeTextAnswer}
                        addAnwser={this.addAnwser}
                        handleUploadFile={this.handleUploadFile}
                    />
                )}

                <Button onClick={this.actionAddmore("userMenu")} className="button-border-dash color_blue items-center">
                    <img src="assets/images/icons/ic_add_blue.png" width="25px" />
                    <h3 className="text_button_base ml-12">Thêm câu hỏi</h3>
                </Button>

                <Popover
                    open={Boolean(userMenu)}
                    anchorEl={userMenu}
                    onClose={this.userMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    classes={{
                        paper: "py-0"
                    }}
                >
                    <React.Fragment>
                        {
                            listQuestionType.map((item, i) =>
                                <MenuItem key={i} onClick={this.chooseTypeQuestion(item, i)}>
                                    <ListItemText className="pl-0" >
                                        <h4 style={{ fontFamily: "Quicksand" }} className="color_text">{item.string}</h4>
                                    </ListItemText>
                                </MenuItem>
                            )
                        }
                    </React.Fragment>
                </Popover>

                <Button
                    onClick={this._changeStep(3)}
                    variant="contained"
                    className="p-12 flex flex-row gradient_turquoise items-center justify-center text-white mt-24">
                    <h2 className="text_button_base mr-32">Tiếp tục</h2>
                    <Icon>keyboard_arrow_right</Icon>
                </Button>

                <Dialog
                    open={openDialog}
                    onClose={this.handleCloseDialog}
                    maxWidth="md"
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <h2 className="font-bold text-center mb-32" style={{ color: "#374A92" }}>
                            Danh sách câu hỏi
    </h2>
                        <InputDropDown
                            width={"100%"}
                            widthDrop={"150px"}
                            color={"#296BFF"}
                            list={questionPack}
                            value="name"
                            currentItem={this.choosePack}
                            chooseAction={this.choosePackQuestion}
                            title={typeAddMore == "1" ? "Chọn bộ đề kiểm tra" : "Chọn bộ câu hỏi"} />
                        {questionPackDetail.length > 0 &&
                            <ReactTable
                                data={questionPackDetail}
                                columns={column}
                                defaultPageSize={5}
                                className="-striped -highlight mt-20"
                            />
                        }
                        <div className="flex flex-row w-full justify-between mt-32">
                            <Button
                                onClick={this.handleCloseDialog}
                                variant="contained"
                                className="p-12 gradient_red items-center justify-center  text-white mr-24">
                                <h2 className="text_button_base">Hủy</h2>
                            </Button>
                            <Button
                                onClick={this.saveAddmore}
                                variant="contained"
                                className="p-12 gradient_blue items-center justify-center text-white">
                                <h2 className="text_button_base">Lưu</h2>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
    saveAddmore = () => {
        console.log(this.state.questionPackDetail)
        var list = this.state.questionPackDetail.filter(item => item.check == true)
        console.log("list")
        console.log(list)
        list.forEach(item => {
            item.disableForm = true
            return item
        })
        var newList = [...this.state.listQuestion, ...list]
        this.setState({
            listQuestion: newList
        }
            , () => {
                var final = [...this.state.listQuestion].map(item => {
                    delete item.check
                    if (item.disableForm) delete item.disableForm
                    return item
                })
                console.log("final")
                console.log(final)
                this.listFinal = final
            }
        )
        this.handleCloseDialog()
    }
    choosePackQuestion = (item) => {
        this.choosePack = item
        this.getDetailQuestionPack(item)
    }
    handleCloseDialog = () => {
        this.setState({
            openDialog: false
        })
    }
    renderStep3() {
        const { listQuestion, nameExam, } = this.state
        var newList = listQuestion.filter(item => item.disable == true)
        return (
            <div className="flex flex-col w-full items-center">
                <h2 className="font-bold mb-32" style={{ color: "#374A92" }}>
                    Xem đề thi vừa tạo
    </h2>
                <div className="form-step-1 content_exam flex w-full flex-row mb-32">
                    <ItemHeaderStep3
                        title1={"Tên đề thi: "}
                        value1={nameExam}
                        title2={"Môn: "}
                        value2={this.chooseSubject.subjectName}
                    />
                    <ItemHeaderStep3
                        title1={"Thời gian đề thi: "}
                        value1={this.chooseTypeTime.label}
                        title2={"Số câu: "}
                        value2={newList.length}
                    />
                    <ItemHeaderStep3
                        title1={"Thời gian bắt đầu thi: "}
                        value1={formatDate(this.state.selectedStartDate)}
                        title2={this.state.selectedEndDate ? "Thời gian kết thúc thi: " : ""}
                        value2={this.state.selectedEndDate ? formatDate(this.state.selectedEndDate) : ""}
                    />
                </div>
                {newList.length > 0 && newList.map((obj, index) =>
                    <ItemQuestion
                        key={index}
                        obj={obj}
                        index={index}
                    />
                )}
                <div className="flex flex-row justify-center w-full">
                    <Button
                        onClick={this._changeStep(4)}
                        variant="contained"
                        className="p-12 flex flex-row gradient_turquoise items-center justify-center text-white mt-24">
                        <h2 className="text_button_base mr-32">Tiếp tục</h2>
                        <Icon>keyboard_arrow_right</Icon>
                    </Button>

                </div>
            </div>
        )
    }
    clickCreateExam = () => {
        var schoolID = this.props.user.school ? this.props.user.school : this.props.user.userRole.schoolId
        var params = {
            idExamDefine: generateRandomString(),
            subject: this.chooseSubject.subjectId,
            degreeNumber: this.state.chooseGrade.toString(),
            nameExam: this.state.nameExam,
            nameClass: [this.chooseClass.classId],
            typeTime: this.chooseTypeTime.value,
            // isOnlineExam: this.chooseIsOnline.value,
            isPrivateExam: this.choosePrivateExam.value,
            startTime: this.choosePrivateExam.value ? this.state.selectedStartDate.toISOString() : null,
            effectStartTime : this.choosePrivateExam.value ? null : this.state.selectedStartDate.toISOString(),
            effectEndTime  : this.choosePrivateExam.value ? null :  this.state.selectedEndDate.toISOString(),
            totalTime: (this.chooseTypeTime.value == constants.typeTime.SEMESTER || this.chooseTypeTime.value == constants.typeTime.OTHER) ? this.state.totalTime : null,
            isRandomQuestion: this.state.mixQuestion,
            isRandomResult: this.state.mixAnswer,
            schoolId: schoolID,
            level: this.questionLevel,
            draft: false,
            examDefineList: [],
            questionList: this.listFinal
        }
        console.log("params")
        console.log(params)
        dataService.createExam(params)
            .then(res => {
                console.log("create exxam")
                console.log(res)
                this.props.showMessage({ message: "Tạo đề thi thành công" })
                this.props.history.push("/examPersonalList")
            })
            .catch(err => {
                console.log("err create exam")
                console.log(err)
                this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
            })
    }
    renderStep4() {
        return (
            <div className="mockExam-background items-center justify-center flex flex-col">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <h3 className="text-white text-4xl font-bold mb-32">
                        Hoàn thành đề thi
                </h3>
                </FuseAnimate>
                <img style={{ width: "28%", objectFit: "contain" }} src="assets/images/backgrounds/bg_doneExam.png" />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row w-full mt-32 justify-between">
                        <Button
                            onClick={this._changeStep(3)}
                            variant="contained"
                            className="p-12 flex flex-row bg-white items-center justify-center text-white">
                            <h2 className="text_button_base color_blue">Quay lại</h2>
                            <Icon>keyboard_arrow_right</Icon>
                        </Button>
                        <Button
                            className="items-center border-white border bg-transparent  py-8 px-12">
                            <p className="text_button_base text-white">Chia sẻ đề thi</p>
                        </Button>
                        <Button
                            onClick={this.clickCreateExam}
                            variant="contained"
                            className="p-12 items-center justify-center gradient_green text-white">
                            <h2 className="text_button_base">Hoàn thành</h2>
                        </Button>
                    </div>

                </FuseAnimate>
            </div>
        )
    }
}

const ItemHeaderStep3 = (props) =>
    <div className="flex flex-col flex-1">
        <div className="flex flex-row items-center mb-12">
            <div style={{ width: "8px", height: "8px" }} className="rounded-full bg-white mr-12" />
            <h5 className="font-bold text-white">{props.title1} <span className="fontweight_medium">{props.value1}</span></h5>
        </div>
        <div className="flex flex-row items-center">
            <div style={{ width: "8px", height: "8px" }} className="rounded-full bg-white mr-12" />
            <h5 className="font-bold text-white">{props.title2} <span className="fontweight_medium">{props.value2}</span></h5>
        </div>
    </div>

const mapStateToProps = (state) => {
    console.log("state")
    console.log(state)
    return {
        school: state.auth.login.user.school,
        user: state.auth.login.user.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        showMessage: (mess) => dispatch(showMessage(mess)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExamStep)

