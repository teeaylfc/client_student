import React from 'react';
import {withRouter} from "react-router-dom";
import connect from 'react-redux/es/connect/connect';
import {Typography} from '@material-ui/core';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
import QuestionAnswerListItem from "./QuestionAnswerListItem";

const QuestionAnswerList = ({questionList}) => {
    if (questionList.length === 0) {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no questions!
                    </Typography>
                </div>
            </FuseAnimate>
        );
    }

    return (
        <FuseAnimateGroup
            enter={{
                animation: "transition.slideUpBigIn"
            }}
        >
            {
                questionList.map((questionPoint, index) => (
                        <QuestionAnswerListItem questionPoint={questionPoint} index={index + 1} key={questionPoint._id}/>
                    )
                )
            }
        </FuseAnimateGroup>
    )
};

function mapStateToProps({examDefineApp})
{
    return {
        questionList : examDefineApp.examDefines.examDefine.questionList
    }
}

export default withRouter(connect(mapStateToProps)(QuestionAnswerList));