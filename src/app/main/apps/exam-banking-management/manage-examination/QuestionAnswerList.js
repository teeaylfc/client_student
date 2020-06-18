import React from 'react';
import {withRouter} from "react-router-dom";
import connect from 'react-redux/es/connect/connect';
import {Typography} from '@material-ui/core';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
import QuestionAnswerListItem from "./QuestionAnswerListItem";

const QuestionAnswerList = ({examDefine}) => {
    console.log(examDefine.questionList);
    if (examDefine.questionList === undefined || examDefine.questionList.length === 0) {
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
                <div>
                    <div className={'flex'}>
                        <Typography variant="body1" className="mt-8 mb-16 mr-20 w-1/2" >
                            Trường: <span>{examDefine.schoolId}</span>
                        </Typography>
                        <Typography variant="body1" className="mt-8 mb-16 mr-20 w-1/2" >
                            Môn học: <span>{examDefine.subject}</span>
                        </Typography>
                    </div>
                    <div className={'flex'}>
                        <Typography variant="body1" className="mt-8 mb-16 mr-20 w-1/2" >
                            Khối: <span>{examDefine.degreeNumber}</span>
                        </Typography>
                        <Typography variant="body1" className="mt-8 mb-16 mr-20 w-1/2" >
                            Lớp: <span>{examDefine.nameClass}</span>
                        </Typography>
                    </div>
                    <div className={'flex'}>
                        <Typography variant="body1" className="mt-8 mb-16 mr-20 w-1/2" >
                            Tên kỳ thi: <span>{examDefine.nameExam}</span>
                        </Typography>
                        <Typography variant="body1" className="mt-8 mb-16 mr-20 w-1/2" >
                            Loại hình thời gian: <span>{examDefine.typeTime}</span>
                        </Typography>
                    </div>
                    <div className={'flex'}>
                        <Typography variant="body1" className="mt-8 mb-16 mr-20 w-1/2" >
                            Thời gian bắt đầu: <span>{examDefine.startTime}</span>
                        </Typography>
                    </div>

                    <div className={'flex-row'}>
                        {
                            examDefine.questionList.map((questionPoint, index) => (
                                    <QuestionAnswerListItem questionPoint={questionPoint} index={index + 1} key={questionPoint.question._id}/>
                                )
                            )
                        }
                    </div>
                </div>
            }
        </FuseAnimateGroup>
    )
};

function mapStateToProps({examDefineApp})
{
    return {
        examDefine : examDefineApp.examDefines.examDefine
    }
}

export default withRouter(connect(mapStateToProps)(QuestionAnswerList));