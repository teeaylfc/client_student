import React, {Component} from 'react';
import {TextField, IconButton, Icon} from "@material-ui/core";
import {FuseChipSelect} from '@fuse/index';
import {Draggable} from "react-beautiful-dnd";
import _ from '@lodash';

//const ExamDefineTopicCardDetailNew = ({topic, topicNameOption, index, removeExamDefineTopic, changeExamDefineTopic}) => {
class ExamDefineTopicCardDetailNew extends Component {
  handleChange = (event) => {
    this.props.changeExamDefineTopic(_.setIn(this.props.topic, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
  };

  handleChipChange = (value, name) => {
    this.props.changeExamDefineTopic(_.setIn(this.props.topic, name, value.value));
  };

  render() {
    return (
        <Draggable draggableId={((new Date()).getTime()).toString()} index={this.props.index} type="card">
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
              >
                <div className="flex">
                  <FuseChipSelect
                      className="mt-8 mb-16 mr-20 w-1/4"
                      value={this.props.topicNameOption.filter(classRoom => classRoom.value === this.props.topic.topicName)}
                      onChange={(value) => this.handleChipChange(value, 'topicName')}
                      placeholder="Chọn Chuyên đề"
                      textFieldProps={{
                        label: 'Chuyên đề',
                        InputLabelProps: {
                          shrink: true
                        },
                        variant: 'standard'
                      }}
                      options={this.props.topicNameOption}
                      isMulti={false}
                  />
                  <TextField
                      className="mt-8 mb-16 mr-20 w-1/4"
                      label="Số câu dễ"
                      //autoFocus
                      id="numberEasyQuestion"
                      name="numberEasyQuestion"
                      value={this.props.topic.numberEasyQuestion}
                      onChange={this.handleChange}
                      variant="outlined"
                      fullWidth
                  />
                  <TextField
                      className="mt-8 mb-16 mr-20 w-1/4"
                      label="Số câu trung bình"
                      //autoFocus
                      id="numberMediumQuestion"
                      name="numberMediumQuestion"
                      value={this.props.topic.numberMediumQuestion}
                      onChange={this.handleChange}
                      variant="outlined"
                      fullWidth
                  />
                  <TextField
                      className="mt-8 mb-16 mr-20 w-1/4"
                      label="Số câu khó"
                      id="numberHardQuestion"
                      //autoFocus
                      name="numberHardQuestion"
                      value={this.props.topic.numberHardQuestion}
                      onChange={this.handleChange}
                      variant="outlined"
                      fullWidth
                  />
                  <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={() => this.props.removeExamDefineTopic(this.props.topic.id)}>
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                </div>
              </div>
          )}
        </Draggable>
    );
  }

}

export default ExamDefineTopicCardDetailNew;
