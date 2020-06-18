import React, { Component } from 'react'
import CreateAnswer from './CreateAnswer'
import InputBase from '@material-ui/core/InputBase';
import { Button, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'app/store/actions';
import constants from '../../../../config/utils';
import generateRandomString from '../../../utils/randomID';
import dataService from '../../../services/dataService';
import { genObjectID } from '../../../utils/generatorObjectID';
import UploadFileModal from '../../../utils/UploadFileModal';
import { uploadImage } from '../../../services/uploadFile';
import getImage from '../../../../common/getImageNetwork';

class ItemCreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionString: "",
            listAnswer: [],
            showModal: false,
            fileUpload: null,
            indexAnswered: null,
            note: "",
            disable: this.props.item && this.props.item.disable ? this.props.item.disable : false,
            disableForm: this.props.item && this.props.item.disableForm ? this.props.item.disableForm : false
        }
        this.subject = null
        this.questionLevel = null
    }
    onChangeQuestionString = (event) => {
        this.props.onChangeQuestionString && this.props.onChangeQuestionString(event.target.value, this.props.index)
        this.setState({ questionString: event.target.value })
    }
    onChangePoint = (event) => {
        this.props.onChangePoint && this.props.onChangePoint(event.target.value, this.props.index)
    }
    onChangeQuestionNote = (event) => {
        this.props.onChangeQuestionNote && this.props.onChangeQuestionNote(event.target.value, this.props.index)
        this.setState({ note: event.target.value })
    }
    handleClose = () => {
        this.setState({ showModal: false });
    }
    onchangeUploadFile = (event) => {
        console.log(event.target.files[0])
        this.setState({
            fileUpload: event.target.files[0],
        })
    }
    handleShow = () => {
        this.setState({ showModal: true });
    }
    handleUploadFile = async () => {
        const file = this.state.fileUpload;
        console.log(file)
        if (file) {
            await this.handleClose();
            uploadImage(file)
                .then(res => {
                    console.log("imageeee")
                    console.log(res)
                    this.props.handleUploadFile && this.props.handleUploadFile(this.props.index, res.result)
                })
                .catch(err => {
                    console.log("errrr")
                    this.props.showMessage({ message: "Tải ảnh không thành công" })
                    console.log(err.response)
                })
        } else {
            alert("Bạn chưa chọn File")
        }
    }
    render() {
        const { index, save, item, point } = this.props
        const { obj, questionString, listAnswer, indexAnswered, note, disable, showModal, disableForm } = this.state
        console.log("7777777777777777")
        console.log(item)
        var answerList = item && item.answerList ? item.answerList : listAnswer
        return (
            <div key={index} className="div_shadow content_exam flex w-full flex-col mb-32">
                <div className="w-full flex flex-row justify-between mb-24">
                    <div className="title_question">
                        <p className="color_blue font-bold">{`Câu hỏi: ${index != null ? index + 1 : ""}`}</p>
                    </div>
                    {
                        this.props.item &&
                        <div className="flex flex-row items-center">
                            <p className="color_text font-bold mr-12">Nhập điểm</p>
                            <InputBase
                                type="number"
                                style={{ fontSize: "14px" }}
                                disabled={disable ? true : false}
                                className="create_point text-white font-bold"
                                inputProps={{ 'aria-label': 'naked', style: { textAlign: 'center' } }}
                                value={point ? point : item.point ? item.point : null}
                                onChange={this.onChangePoint}
                            />
                        </div>
                    }
                </div>
                {item && item.type == constants.QuestionType.QUESTION_TYPE_MATCHING_IMAGE &&
                    <div onClick={!item.image ? this.handleShow : null} className={`${!item.image ? "button-border-dash" : ""} items-center justify-center self-center w-2/5 mb-32`}>
                        {item.image ? <img src={getImage(item.image)} /> :
                            <img className="my-40" src="assets/images/icons/file-upload.png" />
                        }
                    </div>
                }
                {item && item.type == constants.QuestionType.QUESTION_TYPE_MATCHING_IMAGE &&
                    <UploadFileModal
                        showModal={showModal}
                        handleClose={this.handleClose}
                        onChangeHandler={this.onchangeUploadFile}
                        handleUploadFile={this.handleUploadFile} />
                }
                <div className="container_question">
                    {/* <p className="text_question font-bold">{"obj.question.questionString"}</p> */}
                    <InputBase
                        disabled={disable ? true : disableForm ? true : false}
                        className="flex flex-1"
                        value={item && item.questionString ? item.questionString : questionString}
                        placeholder="Nhập nội dung câu hỏi"
                        onChange={this.onChangeQuestionString}
                    />
                </div>
                <div className="flex flex-row my-16">
                    <div className="question_gridAnswer">
                        {answerList.length > 0 && answerList.map((k, i) =>
                            item ?
                                <CreateAnswer
                                    disable={disableForm ? disableForm : this.state.disable}
                                    type={constants.QuestionType.QUESTION_TYPE_SINGLE_CHOICE}
                                    key={i}
                                    check={k.checked ? true : item.indexAnswered == i ? true : false}
                                    item={k}
                                    index={i}
                                    onChange={this.onChangeAnswer}
                                    onChangeTextAnswer={this.onChangeTextAnswer}
                                />
                                :
                                <CreateAnswer
                                    type={constants.QuestionType.QUESTION_TYPE_SINGLE_CHOICE}
                                    key={i}
                                    check={i == indexAnswered ? true : false}
                                    item={k}
                                    index={i}
                                    onChange={this.onChangeAnswer}
                                    onChangeTextAnswer={this.onChangeTextAnswer}
                                />
                        )}
                    </div>
                    {
                        disable ? null : disableForm ? null :
                            <div className="flex flex-row items-center">
                                <Button onClick={this.addAnwser} className="gradient_blue rounded-full unset_content_button mr-12">
                                    <Icon className="text-white text-3xl">add</Icon>
                                </Button>
                                <h5 className="font-bold">Thêm đáp án</h5>
                            </div>
                    }


                </div>
                <div className="flex flex-col">
                    {save &&
                        <div className="flex flex-row w-full justify-end mt-24 mb-12">
                            {
                                disable ? null : <Button
                                    onClick={disableForm ? this.saveQuestionFromLib : this.saveQuestion}
                                    variant="contained"
                                    className="p-12 items-center justify-center gradient_green text-white">
                                    <h2 className="text_button_base">Lưu</h2>
                                </Button>
                            }
                            <Button
                                onClick={this.removeQuestion}
                                variant="contained"
                                className="p-12 ml-24 items-center justify-center gradient_red text-white">
                                <h2 className="text_button_base">Xóa</h2>
                            </Button>
                        </div>
                    }
                    <div className="container_note flex-1">
                        <InputBase
                            disabled={disable ? true : disableForm ? true : false}
                            value={item && item.descriptionAnswer ? item.descriptionAnswer : note}
                            onChange={this.onChangeQuestionNote}
                            className="color_blue"
                            style={{ fontSize: "14px" }}
                            placeholder="Ghi chú"
                        />

                    </div>
                </div>

            </div>
        )
    }
    removeQuestion = () => {
        this.props.removeQuestion(this.props.index)
    }
    validator() {
        var item = this.props.item
        if (item.type == constants.QuestionType.QUESTION_TYPE_MATCHING_IMAGE && !item.image) return "Chưa chọn hình ảnh cho câu hỏi"
        if (!item.questionString || (item.questionString == "")) return "Chưa nhập nội dung câu hỏi"
        if (!item.point || (item.point == "")) return "Chưa nhập điểm cho câu hỏi"
        if (!item.answerList || item.answerList.length < 2) return "Câu hỏi phải có tối thiểu 2 đáp án"
        if (typeof (item.indexAnswered) !== "number") return "Chưa chọn đáp án đúng"
        return null
    }
    saveQuestion = () => {
        var schoolID = this.props.school.id
        var item = this.props.item
        var params = {}
        if (!this.validator()) {
            this.props.item.answerList.map((k, i) => {
                k.idAnswer = generateRandomString()
                if (this.props.item.indexAnswered == i) k.checked = true
                else k.checked = false
            })
            params = {
                subject: this.props.chooseSubject.subjectId,
                classRoom: this.props.classRoom,
                questionType: item.type,
                examDefine: genObjectID(),
                questionsPack: "",
                questionLevel: this.props.questionLevel,
                questionString: this.props.item.questionString,
                descriptionAnswer: this.props.item.descriptionAnswer ? this.props.item.descriptionAnswer : "",
                image: item.type == constants.QuestionType.QUESTION_TYPE_MATCHING_IMAGE ? item.image : "",
                answerList: this.props.item.answerList,
            }
            dataService.createQuestion(params)
                .then(res => {
                    console.log("createe")
                    console.log(res)
                    this.props.showMessage({ message: "Tạo câu hỏi thành công" })
                    this.setState({
                        disable: true
                    })
                    var itemQuestion = {
                        point: JSON.parse(this.props.item.point),
                        question: res
                    }
                    this.props.save && this.props.save(this.props.index, itemQuestion)
                })
                .catch(err => {
                    console.log("err")
                    console.log(err)
                    this.props.showMessage({ message: "err" })
                })
        }
        else {
            this.props.showMessage({ message: this.validator() })
        }

    }
    saveQuestionFromLib = () => {
        console.log("this.props.item.point")
        console.log(this.props.item)
        if (this.props.item.point == "" || !this.props.item.point) {
            this.props.showMessage({ message: "Chưa nhập điểm cho câu hỏi" })
        }
        else {
            var newItem = { ...this.props.item }
            delete newItem.point
            delete newItem.stt
            delete newItem.checkbox
            delete newItem.disable
            var response = {
                point: JSON.parse(this.props.item.point),
                question: newItem
            }
            this.props.saveQuestionFromLib && this.props.saveQuestionFromLib(this.props.index, response)
            this.setState({
                disable: true
            })
        }
    }
    addAnwser = () => {
        if (this.props.item) {
            if (this.props.item.answerList && this.props.item.answerList.length > 3) {
                this.props.showMessage({ message: "Chỉ tạo tối đa 4 đáp án cho câu hỏi" })
            }
            else {
                this.props.addAnwser(this.props.index)
            }
        }
        else {
            if (this.state.listAnswer.length < 4) {
                var answer = {}
                this.setState({
                    listAnswer: [...this.state.listAnswer, answer]
                })
            }
            else {
                this.props.showMessage({ message: "Chỉ tạo tối đa 4 đáp án cho câu hỏi" })
            }

        }
    }
    onChangeAnswer = (indexAnswered) => () => {
        var indexQuestion = this.props.index
        this.props.onChangeAnswer && this.props.onChangeAnswer(indexAnswered, indexQuestion)
        this.setState({
            indexAnswered: indexAnswered
        })
    }
    onChangeTextAnswer = (index, string) => {
        if (this.props.onChangeTextAnswer) {
            var indexQuestion = this.props.index
            this.props.onChangeTextAnswer(index, string, indexQuestion)
        }
    }
}
const mapStateToProps = (state) => {
    console.log("state")
    console.log(state)
    return {
        school: state.auth.login.user.school,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: Actions.showMessage,
    },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCreateQuestion)