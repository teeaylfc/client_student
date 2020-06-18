import React, {Component} from 'react';
import {Card, CardActions, CardContent, CardHeader, TextField} from "@material-ui/core";
import {FuseChipSelect, FuseScrollbars} from '@fuse/index';
import _ from '@lodash';
import ExamDefineAddTopicCardDetail from "./ExamDefineAddTopicCardDetail";
import ExamDefineTopicCardDetailNew from "./ExamDefineTopicCardDetailNew";

const initialState = {
  formOpen: false,
  form : {
    point: "",
    title: '',
    questionType: '',
    questionsPack: '',
    topicPointList: []
  },
  questionTypeListing: [
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
  ],
};

/*const questionTypeListing = [
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
];*/

//const ExamDefineCard = ({questionsPackOption, topicNameOption, examDefine, index, changeExamDefine}) => {
class ExamDefineCard extends Component {
  state = initialState;
  handleChange = (event) => {
    this.props.changeExamDefine(_.setIn(this.props.examDefine, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value));
  };

  handleChipChange = (value, name) => {
    this.props.changeExamDefine(_.setIn(this.props.examDefine, name, value.value));
  };

  handleCardAdded = (topic) => {
    let topicPointList = [...this.props.examDefine.topicPointList, topic];
    this.props.changeExamDefine(_.setIn(this.props.examDefine, 'topicPointList', topicPointList));
    //contentScrollEl.scrollTop = contentScrollEl.scrollHeight;
  };


  changeExamDefineTopic = (topic) => {
    let topicPointList = this.props.examDefine.topicPointList;
    topicPointList = topicPointList.map((_topic) => _topic.id === topic.id ? topic : _topic);
    this.props.changeExamDefine(_.setIn(this.props.examDefine, 'topicPointList', topicPointList));
  };

  removeExamDefineTopic = (id) => {
    let topicPointList = this.props.examDefine.topicPointList;
    topicPointList = topicPointList.filter((_topic) => _topic.id !== id);
    this.props.changeExamDefine(_.setIn(this.props.examDefine, 'topicPointList', topicPointList));
  };



  render() {
    const examTitle = 'Phần thi ' + (this.props.index + 1);
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
                        //autoFocus
                        id="point"
                        name="point"
                        required
                        value={this.props.examDefine.point}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                    />
                  </div>
                  <div className="flex">
                    <TextField
                      className="mt-16 mb-16 mr-16 w"
                      label="Mô tả của phần thi"
                      id="title"
                      //autoFocus
                      name="title"
                      value={this.props.examDefine.title || ''}
                      onChange={this.handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div className="flex">
                    <FuseChipSelect
                        className="mt-8 mb-16 mr-20 w-1/2"
                        value={this.state.questionTypeListing.filter(subject => subject.value === this.props.examDefine.questionType)}
                        onChange={(value) => this.handleChipChange(value, 'questionType')}
                        placeholder="Lựa chọn dạng câu hỏi"
                        textFieldProps={{
                          label: 'Dạng câu hỏi',
                          InputLabelProps: {
                            shrink: true
                          },
                          variant: 'standard'
                        }}
                        options={this.questionTypeListing}
                        isMulti={false}
                    />
                    <FuseChipSelect
                        className="mt-8 mb-16 mr-20 w-1/2"
                        value={this.props.questionsPackOption.filter(subject => subject.value === this.props.examDefine.questionsPack)}
                        onChange={(value) => this.handleChipChange(value, 'questionsPack')}
                        placeholder="Lựa chọn gói câu hỏi"
                        textFieldProps={{
                          label: 'Gói câu hỏi',
                          InputLabelProps: {
                            shrink: true
                          },
                          variant: 'standard'
                        }}
                        options={this.props.questionsPackOption}
                        isMulti={false}
                    />
                  </div>
                  <div className="flex">
                    <Card square={true} className="w-full mb-16">
                      <CardContent
                          //ref={ref => this.contentScrollEl = ref}
                          className="flex flex-col overflow-auto"
                      >
                        {this.props.examDefine.topicPointList.map((topic, index) => (
                            <ExamDefineTopicCardDetailNew key={topic.id}
                                                          topic={topic}
                                                          topicNameOption={this.props.topicNameOption}
                                                          index={index}
                                                          removeExamDefineTopic={this.removeExamDefineTopic}
                                                          changeExamDefineTopic={this.changeExamDefineTopic}
                            />
                        ))}

                      </CardContent>

                      <CardActions>
                        <ExamDefineAddTopicCardDetail topicNameOption={this.props.topicNameOption} onCardAdded={this.handleCardAdded}/>
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
}

export default ExamDefineCard;
