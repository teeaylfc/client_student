import React, { Component } from 'react'
import { InputBase } from '@material-ui/core'
import constants from '../../../../config/utils'
import getImage from '../../../../common/getImageNetwork'

export default class ItemQuestion extends Component {
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
    render() {
        const { index, obj, disableNote } = this.props
        console.log("0000")
        console.log(obj)
        return (
            <div key={index} className="div_shadow content_exam flex w-full flex-col mb-32">
                <div className="w-full flex flex-row justify-between mb-24">
                    <div className="title_question">
                        <p className="color_blue font-bold">{`Câu hỏi ${index + 1}: `}</p>
                    </div>
                    {
                        obj.point &&
                        <div className="result_point">
                            <p className="text-white ">{`Điểm: ${obj.point}`}</p>
                        </div>
                    }
                </div>
                {
                    obj.type == constants.QuestionType.QUESTION_TYPE_MATCHING_IMAGE &&
                    <div className={`items-center justify-center self-center w-2/5 mb-32`}>
                        <img className="my-40" src={getImage(obj.image)} /> :
                    </div>
                }
                <p className="text_question font-bold mb-16">{obj.question ? obj.question.questionString : obj.questionString ? obj.questionString : ""}</p>

                {
                    obj.question ? obj.question.answerList.map((item, i) =>
                        <p key={i} className={`mb-8 ${item.checked ? "color_green" : ""}`}>
                            <span className="font-bold">{this.renderIndex(i)}</span> {item.answerValue}
                        </p>
                    ) :
                        obj.answerList.map((item, i) =>
                            <p key={i} className={`mb-8 ${item.checked ? "color_green" : ""}`}>
                                <span className="font-bold">{this.renderIndex(i)}</span> {item.answerValue}
                            </p>
                        )
                }

                {
                    disableNote == false ? <div className="container_note mt-12">
                        <InputBase
                            className="color_blue"
                            style={{ fontSize: "14px" }}
                            placeholder="Ghi chú"
                        />
                    </div> : null

                }

            </div>
        )
    }
}
