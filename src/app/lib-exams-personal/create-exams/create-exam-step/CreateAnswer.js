import React, { Component, PureComponent } from 'react'
import { Button, Typography, InputBase } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import constants from '../../../../config/utils';
class CreateAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stringAnswer: ""
        }
        this.listColor = [
            "rgba(242,76,85,02)",
            "rgba(52,191,163,02)",
            "#6090FF",
            "#eebf39",
            "rgba(242,76,85,02)",
            "rgba(52,191,163,02)",
            "#6090FF",
            "#eebf39",
        ]
    }
    renderIndex = (index) => {
        switch (index) {
            case 0:
                return "A: "
            case 1:
                return "B: "
            case 2:
                return "C: "
            case 3:
                return "D: "
            default: return ""
        }
    }
    renderIndexMatchingLeft = (index) => {
        switch (index) {
            case 0:
                return "1. "
            case 1:
                return "2. "
            case 2:
                return "3. "
            case 3:
                return "4. "
            default: return ""
        }
    }
    renderIndexMatchingRight = (index) => {
        switch (index) {
            case 0:
                return "a. "
            case 1:
                return "b. "
            case 2:
                return "c. "
            case 3:
                return "d. "
            default: return ""
        }
    }
    render() {
        const { type } = this.props
        switch (type) {
            // case constants.QuestionType.QUESTION_TYPE_MATCHING_IMAGE:
            //     return this.renderAnswerImage()

            case constants.QuestionType.QUESTION_TYPE_SINGLE_CHOICE:
                return this.renderAnswerSingle()

            // case constants.QuestionType.QUESTION_TYPE_MATCHING:
            //     return this.renderAnswerMatching()

            default:
                break;
        }
    }

    // renderAnswerImage() {
    //     const { item, index, check, onChange, type } = this.props
    //     return (
    //         <div className="question_divButtonAnswer">
    //             <div className="question_borderButton" style={{ borderColor: check === index ? "#6090FF" : "#DDDDDD" }}>
    //                 <Button onClick={onChange(index)} variant="contained" className="question_buttonAnswer">
    //                     <Typography className="question_textAnswer ">{item.answerValue}</Typography>
    //                 </Button>
    //             </div>
    //         </div>
    //     )
    // }
    renderAnswerSingle() {
        const { item, index, check, onChange, stringAnswer, disable } = this.props
        return (
            <div className="flex flex-row items-center">
                {disable == true ? null :
                    <Checkbox
                        checked={check}
                        onChange={onChange(index)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                }

                <h3 
                className={`${disable && check? "takeExams_gridItem_text_selected" : "takeExams_gridItem_text"} mr-8 font-bold`}
                >
                    {`${this.renderIndex(index)}`}
                    </h3>
                <InputBase
                    disabled={disable ? true : false}
                    style={{color: disable && check? "#34BFA3" : null}}
                    className={disable && check? "takeExams_gridItem_text_selected" : "takeExams_gridItem_text"}
                    placeholder={disable ? "" : "Nhập đáp án"}
                    value={item.answerValue? item.answerValue : stringAnswer}
                    onChange={this.onChangeText("stringAnswer", index)}
                />
            </div>
        )
    }
    onChangeText = (key, index) => (event) => {
        this.props.onChangeTextAnswer && this.props.onChangeTextAnswer(index, event.target.value)
        this.setState({ [key]: event.target.value })
    }
    // renderAnswerMatching() {
    //     const { item, index, onChange, answerMatching, listMatching, left } = this.props

    //     var borderColor = "#DDDDDD"
    //     var backgroundColor = null
    //     var textColor = null

    //     if (listMatching && listMatching.length > 0) {
    //         listMatching.forEach((value, index) => {
    //             if (value.x == item._id || value.y == item._id) {
    //                 backgroundColor = this.listColor[index]
    //                 textColor = "#FFF"
    //                 return false
    //             }
    //         })
    //     }

    //     if (answerMatching) {
    //         switch (item._id) {
    //             case answerMatching?.x:
    //                 borderColor = "#6090FF"
    //                 break;
    //             case answerMatching?.y:
    //                 borderColor = "#6090FF"
    //                 break;
    //             default:
    //                 borderColor = "#DDDDDD"
    //                 break;
    //         }
    //     }
    //     return (
    //         <div className="question_borderButton mb-24"
    //             style={{
    //                 borderColor: borderColor,
    //             }}
    //         >
    //             <Button
    //                 disabled={onChange ? false : true}
    //                 onClick={onChange}
    //                 variant="contained"
    //                 style={{
    //                     backgroundColor: backgroundColor
    //                 }}
    //                 className="question_buttonAnswer">

    //                 <Typography style={{
    //                     color: textColor
    //                 }}
    //                     className="question_textAnswer ">
    //                     {`${left? this.renderIndexMatchingLeft(index) : this.renderIndexMatchingRight(index)} ${item.answerValue}`}
    //                 </Typography>
    //             </Button>
    //         </div>
    //     )
    // }
}

export default CreateAnswer;