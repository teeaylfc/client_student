import React from 'react';
import {Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";
import {FuseChipSelect, FuseScrollbars} from '@fuse/index';
import _ from '@lodash';
import {connect} from "react-redux";
import ExamDefineAddTopicCardDetail from "./ExamDefineAddTopicCardDetail";
import ExamDefineTopicCardDetailNew from "./ExamDefineTopicCardDetailNew";

const questionTypeListing = [
  {
    value: "SINGLE_CHOICE",
    label: "Trắc nghiệm 1 đáp án"
  },
  {
    value: "Điền từ vào chỗ trống",
    label: "Điền từ vào chỗ trống"
  },
  {
    value: "MATCHING_IMAGE",
    label: "Nối từ với hình ảnh"
  },
  {
    value: "MATCHING",
    label: "Nối câu"
  },
  {
    value: "MULTI_CHOICE",
    label: "Trắc nghiệm nhiều đáp án"
  },
];

const ExamDefineCard = ({questionsPackOption, topicNameOption, examDefine, index, changeExamDefine}) => {

  function handleChange (event) {
    changeExamDefine(_.setIn(examDefine, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value));
  }

  function handleChipChange (value, name) {
    changeExamDefine(_.setIn(examDefine, name, value.value));
  }

  function handleCardAdded (topic) {
    let topicPointList = [...examDefine.topicPointList, topic];
    changeExamDefine(_.setIn(examDefine, 'topicPointList', topicPointList));
    //contentScrollEl.scrollTop = contentScrollEl.scrollHeight;
  }


  function changeExamDefineTopic (topic) {
    let topicPointList = examDefine.topicPointList;
    topicPointList = topicPointList.map((_topic) => _topic.id === topic.id ? topic : _topic);
    console.log(topicPointList);
    changeExamDefine(_.setIn(examDefine, 'topicPointList', topicPointList));
  }

  function removeExamDefineTopic (id) {
    console.log('removeExamDefineTopic');
    let topicPointList = examDefine.topicPointList;
    topicPointList = topicPointList.filter((_topic) => _topic.id !== id);
    changeExamDefine(_.setIn(examDefine, 'topicPointList', topicPointList));
  }

  const examTitle = 'Phần thi ' + (index + 1);

  return (
    <div>
      <div className="w-full mb-16 border-t-1">
        <Card className="w-full mb-16">
          <CardHeader title={examTitle}/>
          <CardContent className="flex">
            <FuseScrollbars className="flex-grow overflow-x-auto">
              <div className="flex">
                <TextField
                  className="mt-8 mb-16 mr-8 w-1/2"
                  label="Điểm cho phần thi"
                  autoFocus
                  id="point"
                  name="point"
                  required
                  value={examDefine.point}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex">
                <FuseChipSelect
                  className="mt-8 mb-16 mr-20 w-1/2"
                  value={questionTypeListing.filter(subject => subject.value === examDefine.questionType)}
                  onChange={(value) => handleChipChange(value, 'questionType')}
                  placeholder="Lựa chọn dạng câu hỏi"
                  textFieldProps={{
                    label: 'Dạng câu hỏi',
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: 'standard'
                  }}
                  options={questionTypeListing}
                  isMulti={false}
                />
                <FuseChipSelect
                  className="mt-8 mb-16 mr-20 w-1/2"
                  value={questionsPackOption.filter(subject => subject.value === examDefine.questionsPack)}
                  onChange={(value) => handleChipChange(value, 'questionsPack')}
                  placeholder="Lựa chọn gói câu hỏi"
                  textFieldProps={{
                    label: 'Gói câu hỏi',
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: 'standard'
                  }}
                  options={questionsPackOption}
                  isMulti={false}
                />
              </div>
              <div className="flex">
                <Card square={true} className="w-full mb-16">
                  <CardContent
                    //ref={ref => this.contentScrollEl = ref}
                    className="flex flex-col overflow-auto"
                  >
                    {examDefine.topicPointList.map((topic, index) => (
                      <ExamDefineTopicCardDetailNew key={topic.id}
                        topic={topic} topicNameOption={topicNameOption} index={index} removeExamDefineTopic={removeExamDefineTopic} changeExamDefineTopic={changeExamDefineTopic}
                      />
                    ))}

                  </CardContent>

                  <CardActions>
                    <ExamDefineAddTopicCardDetail topicNameOption={topicNameOption} onCardAdded={handleCardAdded}/>
                  </CardActions>
                </Card>
              </div>
            </FuseScrollbars>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function mapStateToProps(questionApp) {
  return {
  };
}

export default connect(mapStateToProps,)(ExamDefineCard);
