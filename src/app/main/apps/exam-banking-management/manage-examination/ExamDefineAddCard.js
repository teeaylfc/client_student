import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Icon, TextField} from "@material-ui/core";
import {FuseChipSelect} from '@fuse/index';
import _ from '@lodash';
import {Droppable} from "react-beautiful-dnd";
import ExamDefineAddTopicCardDetail from "./ExamDefineAddTopicCardDetail";
import ExamDefineTopicCardDetailNew from "./ExamDefineTopicCardDetailNew";
import ExamDefineDetailModel from "./model/ExamDefineDetailModel";

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



class ExamDefineAddCard extends Component {
  state = initialState;
  handleOpenForm = () => {
    this.setState({formOpen: true})
  };

  handleCloseForm = () => {
    this.setState({...initialState})
  };

  handleChange = (event) => {
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value)});
  };

  handleChipChange = (value, name) => {
    this.setState({form: _.set({...this.state.form}, name, value.value)});
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const {point, title, questionType, questionsPack, topicPointList} = this.state.form;
    this.props.addNewExamDefine(new ExamDefineDetailModel({point, title, questionType, questionsPack, topicPointList}));
    this.handleCloseForm();
  };

  handleCardAdded = (topic) => {
    let topicPointList = [...this.state.form.topicPointList, topic];
    this.setState({form: _.set({...this.state.form}, 'topicPointList', topicPointList)});
    //this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
  };


  changeExamDefineTopic = (topic) => {
    let topicPointList = this.state.form.topicPointList;
    topicPointList = topicPointList.map((_topic) => _topic.id === topic.id ? topic : _topic);
    this.setState({form: _.set({...this.state.form}, 'topicPointList', topicPointList)});
    //this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
  };

  removeExamDefineTopic = (id) => {
    let topicPointList = this.state.form.topicPointList;
    topicPointList = topicPointList.filter((_topic) => _topic.id !== id);
    this.setState({form: _.set({...this.state.form}, 'topicPointList', topicPointList)});
    //this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
  };

  render() {
    const {questionsPackOption, topicNameOption} = this.props;
    const {formOpen, form} = this.state;

    return (
        <div className="w-full mb-16 border-t-1">
          {formOpen ? (
            <Card className="w-full mb-16">
              <CardContent className="flex flex-col overflow-auto">
                  <div className="flex">
                    <TextField
                      className="mt-8 mb-16 mr-8 w-1/2"
                      label="Điểm cho phần thi"
                      id="point"
                      //autoFocus
                      name="point"
                      required
                      value={form.point}
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
                    value={form.title}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                  <div className="flex">
                    <FuseChipSelect
                      className="mt-8 mb-16 mr-20 w-1/2"
                      value={this.state.questionTypeListing.filter(subject => subject.value === form.questionType)}
                      onChange={(value) => this.handleChipChange(value, 'questionType')}
                      placeholder="Lựa chọn dạng câu hỏi"
                      textFieldProps={{
                        label: 'Dạng câu hỏi',
                        InputLabelProps: {
                          shrink: true
                        },
                        variant: 'standard'
                      }}
                      options={this.state.questionTypeListing}
                      isMulti={false}
                    />
                    <FuseChipSelect
                      className="mt-8 mb-16 mr-20 w-1/2"
                      value={questionsPackOption.filter(subject => subject.value === form.questionsPack)}
                      onChange={(value) => this.handleChipChange(value, 'questionsPack')}
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
                  <Card square={true} className="w-full h-full mb-16 overflow-auto">
                    <CardContent
                      //ref={ref => this.contentScrollEl = ref}
                      className="flex flex-col overflow-auto"
                    >
                      <Droppable
                        droppableId={((new Date()).getTime()).toString()}
                        type="list"
                        direction="horizontal"
                      >
                        {(provided) => (
                          <div ref={provided.innerRef} className="flex flex-col w-full h-full p-16">
                            {form.topicPointList.map((topic, index) => (
                              <ExamDefineTopicCardDetailNew key={topic.id}
                                topic={topic} topicNameOption={topicNameOption} index={index} removeExamDefineTopic={this.removeExamDefineTopic} changeExamDefineTopic={this.changeExamDefineTopic}
                              />
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>

                    <CardActions>
                      <ExamDefineAddTopicCardDetail topicNameOption={topicNameOption} onCardAdded={this.handleCardAdded}/>
                    </CardActions>
                  </Card>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={this.onSubmit}>
                  Thêm mới phần thi
                </Button>
              </CardActions>
            </Card>
            ): (
            <Button
              onClick={this.handleOpenForm}
              classes={{
                root: "normal-case font-600 w-full rounded-none h-48",
                label: "justify-start"
              }}
            >
              <Icon className="text-20 mr-8">add</Icon>
              Thêm phần thi
            </Button>
            )
          }
        </div>
    );
  }
}

export default ExamDefineAddCard;
