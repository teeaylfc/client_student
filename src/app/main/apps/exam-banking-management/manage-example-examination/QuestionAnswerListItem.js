import React from 'react';
import {Card, Divider, Typography, CardHeader, CardContent, Checkbox} from '@material-ui/core';
import Radio from "@material-ui/core/Radio";

const QuestionAnswerListItem = ({questionPoint, index}) => {
    const title = 'Câu hỏi số ' + (index);
    let questionType = '';
    if (questionPoint.question.questionType === 'SINGLE_CHOICE') {
        questionType = <Radio
            className="p-0"
            tabIndex={-1}
            disableRipple
            name="checked"
            color="default"
        />;
    } else if (questionPoint.question.questionType === 'MATCHING_IMAGE') {
        questionType = <Radio
            className="p-0"
            tabIndex={-1}
            disableRipple
            name="checked"
            color="default"
        />;
    } else if (questionPoint.question.questionType === 'MATCHING') {

    } else if (questionPoint.question.questionType === 'MULTI_CHOICE') {
        questionType = <Checkbox
            className="p-0"
            tabIndex={-1}
            disableRipple
            name="checked"
            color="default"
        />;
    }

    return (
        <Card>
            <CardHeader title={title}/>
            <CardContent>
                <Typography className="text-18 font-600 cursor-pointer">{questionPoint.question.questionString}</Typography>
                <Divider/>
                {
                    questionPoint.question.answerList.map((answer, index) => {
                            return (
                                <div className="flex">
                                    {questionType}
                                    <Typography className="text-16 font-600 cursor-pointer">{answer.answerValue}</Typography>
                                </div>
                            );
                        }
                    )
                }
            </CardContent>
        </Card>
    )
};

export default QuestionAnswerListItem;