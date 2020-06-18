import React, { Component } from 'react'
import ItemCreateQuestion from '../create-exams/create-exam-step/ItemCreateQuestion';
import { InputBase, Button, Popover, MenuItem, ListItemText, Icon } from '@material-ui/core';
import InputDropDown from '../../../common/InputDropDown';
import { FuseAnimate } from '@fuse';
import constants from '../../../config/utils';
import connect from 'react-redux/es/connect/connect';
import { showMessage } from '../../store/actions/fuse';
import dataService from '../../services/dataService';

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

const InputTextField = (props) => <div className="flex flex-row items-center justify-between mb-16" style={{ width: "35%" }}>
    <h4 className="color_grey mr-12 font-bold">
        {props.title}
    </h4>
    <InputBase
        disabled={props.disable ? true : false}
        value={props.value}
        defaultValue="Naked input"
        onChange={props.onChange}
        style={{ width: "50%" }}
        className="color_blue input_base"
        inputProps={{ 'aria-label': 'naked' }}
    />

</div>
class CreateQuestionPack extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            listQuestion: [],
            listSubject: this.props.location.state.listSubject,
            listGrade: this.props.location.state.listGrade,
            typeTime: this.props.location.state.typeTime,
            userMenu: null,
            questionLevel: null,
            chooseGrade: null,
            chooseSubject: null,
            chooseTypeTime: null
        }

    }
    chooseItem = (key) => (item) => {
        this.setState({
            [key]: item
        })
    }

    render() {
        const { name, listSubject, listGrade, typeTime, listQuestion, userMenu, questionLevel, chooseGrade, chooseTypeTime, chooseSubject } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-24">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Tạo bộ câu hỏi
                </h2>
                    </FuseAnimate>

                    {/* <HeaderButton addbutton importbutton exportbutton menubutton /> */}
                </div>

                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="div_shadow flex flex-col w-full mt-24 items-center justify-center">
                        <h3 className="font-bold color_title mb-24">
                            Thông tin
                </h3>
                        <InputTextField
                            onChange={this.onChangeText("name")}
                            value={name} title="Tên bộ câu hỏi" />

                        {listSubject.length > 0 &&
                            <InputDropDown
                                value={"subjectName"}
                                width={"35%"}
                                className="mb-16 justify-between"
                                widthDrop={"50%"}
                                color={"#296BFF"}
                                list={listSubject}
                                chooseAction={this.chooseItem('chooseSubject')}
                                title="Môn học" />
                        }
                        {listGrade.length > 0 &&
                            <InputDropDown
                                width={"35%"}
                                className="mb-16 justify-between"
                                widthDrop={"50%"}
                                color={"#296BFF"}
                                list={listGrade}
                                chooseAction={this.chooseItem('chooseGrade')}
                                title="Khối học" />
                        }



                        <InputDropDown
                            width={"35%"}
                            className="mb-16 justify-between"
                            widthDrop={"50%"}
                            color={"#296BFF"}
                            list={[
                                constants.questionLevel.EASY,
                                constants.questionLevel.NORMAL,
                                constants.questionLevel.HARD,
                            ]}
                            chooseAction={this.chooseItem('questionLevel')}
                            title="Mức độ đề thi" />


                        {listSubject.length > 0 &&
                            <InputDropDown
                                value={"label"}
                                width={"35%"}
                                className="mb-16 justify-between"
                                widthDrop={"50%"}
                                color={"#296BFF"}
                                list={typeTime}
                                chooseAction={this.chooseItem('chooseTypeTime')}
                                title="Loại hình thời gian" />
                        }
                    </div>
                </FuseAnimate >
                <div className="flex flex-row w-full justify-between mt-32">
                    <Button
                        onClick={this.cancel}
                        variant="contained"
                        className="p-12 gradient_red items-center justify-center  text-white mr-24">
                        <h2 className="text_button_base">Hủy</h2>
                    </Button>
                    <Button
                        onClick={this.createPack}
                        variant="contained"
                        className="p-12 gradient_blue items-center justify-center text-white">
                        <h2 className="text_button_base">Lưu</h2>
                    </Button>
                </div>
            </div >
        )
    }
    validator() {
        const { chooseSubject, name, chooseGrade, chooseTypeTime, questionLevel } = this.state
        if (name == "") return "Tên bộ câu hỏi không để trống"
        if (!chooseSubject) return "Chưa chọn môn học"
        if (!chooseGrade) return "Chưa chọn khối học"
        if (!questionLevel) return "Chưa chọn mức độ đề thi"
        if (!chooseTypeTime) return "Chưa chọn loại hình thời gian"
        return null
    }
    cancel = () => {
        this.props.history.goBack()
    }
    createPack = () => {
        if (this.validator()) {
            this.props.showMessage({ message: this.validator() })
        }
        else {
            const { chooseSubject, name, chooseGrade, chooseTypeTime, questionLevel } = this.state
            var schoolID = this.props.user.school ? this.props.user.school : this.props.user.userRole.schoolId
            var params = {
                subject: chooseSubject.subjectId,
                name: name,
                schoolId: schoolID,
                typeTime: chooseTypeTime.value,
                level: questionLevel,
                classRoom: chooseGrade.toString()
            }
            console.log("params")
            console.log(params)
            dataService.createQuestionPack(params)
            .then(res=>{
                console.log(res)
                this.props.showMessage({ message: "Tạo bộ câu hỏi thành công" })
                this.props.history.goBack()
            })
            .catch(err=>{
                console.log(err.response)
                this.props.showMessage({ message: err.response.data.message?  err.response.data.message : "Lỗi"})
            })
        }

    }
    onChangeText = (key) => (event) => {
        console.log(key)
        this.setState({ [key]: event.target.value })
    }

}

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


export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestionPack)

