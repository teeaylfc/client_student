import React, { Component } from 'react'
import { Button, Icon, InputBase } from '@material-ui/core'
import HeaderButton from '../../../common/HeaderButton'
import InputDropDown from '../../../common/InputDropDown'
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker
} from "material-ui-pickers";
// Or import the input component
import { FuseAnimate } from '@fuse';
import dataService from '../../services/dataService';
import ItemQuestion from '../../lib-exams-personal/create-exams/create-exam-step/ItemQuestion';
import ItemCreateQuestion from '../../lib-exams-personal/create-exams/create-exam-step/ItemCreateQuestion';
import generateRandomString from '../../utils/randomID';
import { connect } from 'react-redux';
import { showMessage } from '../../store/actions/fuse';
import constants from '../../../config/utils';


const InputTextField = (props) => <div className="flex flex-row items-center justify-between" style={{ width: "65%" }}>
    <h4 className="color_grey mr-1 font-bold">
        {props.title}
    </h4>
    <InputBase
        disabled={props.disable ? true : false}
        value={props.value}
        defaultValue="Naked input"
        onChange={props.onChange}
        style={{ width: "55%" }}
        className="color_blue input_base"
        inputProps={{ 'aria-label': 'naked' }}
    />

</div>

class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeTimetable: '',
            nameTimetable: "",
            topic: "",
            questionPack: "",
            listSubject: []
        }
        this.answerA = null
        this.answerB = null
        this.answerC = null
        this.answerD = null
        this.indexAnswered = null
        this.subject = null
        this.questionLevel = null
        this.questionString = null
        this.descriptionAnswer = null

    }
    componentDidMount() {
        this.getListSubject()
    }
    getListSubject() {
        dataService.getListAllSubjects()
            .then(res => {
                this.setState({
                    listSubject: res.data
                })
            })
    }
    render() {
        const { codeTimetable, nameTimetable, topic, listSubject, questionPack } = this.state
        const { item } = this.props.location.state
        console.log("question pack")
        console.log(item)
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Tạo câu hỏi
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton importbutton exportbutton menubutton />
                </div>

                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-col w-full items-center justify-center div_shadow mb-24">
                        <h3 className="font-bold color_title mb-24">
                            Thông tin
                </h3>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    disable
                                    onChange={this.onChangeText("codeTimetable")}
                                    value={item.name} title="Tên bộ câu hỏi" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                {listSubject.length > 0 &&
                                    <InputDropDown
                                        className="justify-between"
                                        value={"subjectName"}
                                        width={"65%"}
                                        widthDrop={"55%"}
                                        color={"#296BFF"}
                                        list={listSubject}
                                        chooseAction={this.chooseSubject}
                                        title="Môn học" />
                                }
                            </div>
                        </div>
                        <div className="container_Timetable mb-12">
                            <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    disable
                                    value={item.classRoom} title="Khối học" />
                            </div>
                            <div className="flex flex-1 justify-start pl-56">
                                <InputTextField
                                    onChange={this.onChangeText("topic")}
                                    value={topic} title="Chuyên đề" />
                            </div>
                        </div>
                        <div className="container_Timetable mb-12">
                            {/* <div className="flex flex-1 justify-end pr-56">
                                <InputTextField
                                    onChange={this.onChangeText("questionPack")}
                                    value={questionPack} title="Gói câu hỏi" />
                            </div> */}
                            <div className="flex flex-1 justify-end pr-56">
                                <InputDropDown
                                    width={"65%"}
                                    className="justify-between"
                                    widthDrop={"55%"}
                                    color={"#296BFF"}
                                    list={[
                                        constants.questionLevel.EASY,
                                        constants.questionLevel.NORMAL,
                                        constants.questionLevel.HARD,
                                    ]}
                                    chooseAction={this.chooseLevel}
                                    title="Mức độ kiến thức" />
                            </div>
                              <div className="flex flex-1  pl-56">
                            </div>
                        </div>

                    </div>
                </FuseAnimate>

                <ItemCreateQuestion
                    onChangeQuestionNote={this.onChangeQuestionNote}
                    onChangeQuestionString={this.onChangeQuestionString}
                    onChangeAnswer={this.onChangeAnswer}
                    onChangeTextAnswer={this.onChangeTextAnswer} />
                <div className="flex flex-row w-full justify-between">
                    <Button
                        // onClick={this.nextStep2}
                        variant="contained"
                        className="p-12 gradient_red  items-center justify-center  text-white mr-24">
                        <h2 className="text_button_base">Hủy</h2>
                    </Button>
                    <Button
                        onClick={this.saveQuestion}
                        variant="contained"
                        className="p-12  items-center justify-center gradient_blue text-white">
                        <h2 className="text_button_base">Lưu</h2>
                    </Button>
                </div>
            </div>
        )
    }
    onChangeQuestionString = (value) => {
        this.questionString = value
    }
    onChangeQuestionNote = (value) => {
        this.descriptionAnswer = value
    }
    chooseLevel = (item) => {
        this.questionLevel = item
    }
    chooseSubject = (item) => {
        console.log(item)
        this.subject = item.subjectId
    }
    saveQuestion = () => {
        const { item } = this.props.location.state
        var listAnswer = []
        if (this.answerA) listAnswer.push(this.answerA)
        if (this.answerB) listAnswer.push(this.answerB)
        if (this.answerC) listAnswer.push(this.answerC)
        if (this.answerD) listAnswer.push(this.answerD)
        listAnswer.map((item, i) => {
            item.idAnswer = generateRandomString()
            if (this.indexAnswered == i) item.checked = true
            else item.checked = false
        })
        var params = {
            subject: this.subject,
            classRoom: item.classRoom,
            questionType: constants.QuestionType.QUESTION_TYPE_SINGLE_CHOICE,
            questionsPack: item._id,
            questionLevel: this.questionLevel,
            questionString: this.questionString,
            descriptionAnswer: this.descriptionAnswer,
            image: "",
            answerList: listAnswer,
            schoolId: item.schoolId,
            answerMatchList: [],
            createDate: Date()
        }
        console.log("params")
        console.log(params)
        dataService.createQuestion(params)
            .then(res => {
                console.log("createe")
                console.log(res)
                this.props.showMessage({ message: "Tạo câu hỏi thành công" })
                this.props.history.goBack()

            })
            .catch(err => {
                console.log("err")
                this.props.showMessage({ message: err.response.data.message })
            })
    }
    onChangeAnswer = (index) => {
        this.indexAnswered = index
    }
    onChangeTextAnswer = (index, string) => {
        switch (index) {
            case 0:
                this.answerA = {}
                this.answerA.answerValue = string
                break;
            case 1:
                this.answerB = {}
                this.answerB.answerValue = string
                break;
            case 2:
                this.answerC = {}
                this.answerC.answerValue = string
                break;
            case 3:
                this.answerD = {}
                this.answerD.answerValue = string
                break;
            default:
                break;
        }
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

}


const mapDispatchToProps = dispatch => {
    return {
        showMessage: (mess) => dispatch(showMessage(mess)),
    }
}


export default connect(null, mapDispatchToProps)(CreateQuestion)