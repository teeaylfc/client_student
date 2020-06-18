import React from 'react';
import {Card, Divider, Typography, CardContent, Checkbox} from '@material-ui/core';
import Radio from "@material-ui/core/Radio";

const QuestionAnswerListItem = ({questionPoint, index}) => {
    const title = 'Câu hỏi số ' + (index) + ': '+ questionPoint.question.questionString + '(' + questionPoint.point + ')';
    const getQuestionType = (answer) => {
        let questionType = '';
        if (questionPoint.question.questionType === 'SINGLE_CHOICE') {
            questionType = <Radio
                className="p-0"
                tabIndex={-1}
                disableRipple
                name="checked"
                color="default"
                checked={answer.checked}
            />;
        } else if (questionPoint.question.questionType === 'MATCHING_IMAGE') {
            questionType = <Radio
                className="p-0"
                tabIndex={-1}
                disableRipple
                name="checked"
                color="default"
                checked={answer.checked}
            />;
        } else if (questionPoint.question.questionType === 'MATCHING') {

        } else if (questionPoint.question.questionType === 'MULTI_CHOICE') {
            questionType = <Checkbox
                className="p-0"
                tabIndex={-1}
                disableRipple
                name="checked"
                color="default"
                checked={answer.checked}
            />;
        }
        return questionType;
    };

    return (
        <Card>
            <CardContent>
                <div className={'flex-row'}>
                    <div>
                        <Typography className="text-18 font-600 cursor-pointer" dangerouslySetInnerHTML={{ __html: `${title}` }}/>
                    </div>
                    <div className={'flex'}>
                        <Typography className="text-18 font-600 cursor-pointer" style={({ margin: '10px' })}>Điểm cho phần thi: {questionPoint.point}</Typography>
                        <Typography className="text-18 font-600 cursor-pointer" style={({ margin: '10px' })}>Gói câu hỏi: {questionPoint.question.questionsPack}</Typography>
                        <Typography className="text-18 font-600 cursor-pointer" style={({ margin: '10px' })}>Chuyên đề: {questionPoint.question.topic}</Typography>
                    </div>
                    <Divider/>
                    <div>
                        {
                            questionPoint.question.answerList.map((answer, index) => {
                                    return (
                                        <div className="flex" key={answer.idAnswer}>
                                            {getQuestionType(answer)}
                                            <Typography className="text-16 font-600 cursor-pointer" dangerouslySetInnerHTML={{__html: `${answer.answerValue}`}} />
                                        </div>
                                    );
                                }
                            )
                        }
                    </div>
                </div>

            </CardContent>
        </Card>
    )
};

export default QuestionAnswerListItem;