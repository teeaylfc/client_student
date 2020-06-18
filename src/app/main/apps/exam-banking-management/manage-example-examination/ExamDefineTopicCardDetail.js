import React, {Component} from 'react';
import {TextField, IconButton, Icon} from "@material-ui/core";
import {FuseChipSelect} from '@fuse/index';
import {Draggable} from "react-beautiful-dnd";
import _ from '@lodash';

class ExamDefineTopicCardDetail extends Component {
  handleChange = (event) => {
    this.props.changeExamDefineTopic(_.setIn(this.props.topic, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
  };

  handleChipChange = (value, name) => {
    this.props.changeExamDefineTopic(_.setIn(this.props.topic, name, value.value));
  };

  render() {
    const {topic, topicNameOption, index} = this.props;
    return (
      <Draggable draggableId={((new Date()).getTime()).toString()} index={index} type="card">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex">
              <FuseChipSelect
                className="mt-8 mb-16 mr-20 w-1/4"
                value={topicNameOption.filter(classRoom => classRoom.value === topic.topicName)}
                onChange={(value) => this.handleChipChange(value, 'topicName')}
                placeholder="Chọn Chuyên đề"
                textFieldProps={{
                  label: 'Chuyên đề',
                  InputLabelProps: {
                    shrink: true
                  },
                  variant: 'standard'
                }}
                options={topicNameOption}
                isMulti={false}
              />
              <TextField
                className="mt-8 mb-16 mr-20 w-1/4"
                label="Số câu dễ"
                id="numberEasyQuestion"
                autoFocus
                name="numberEasyQuestion"
                value={topic.numberEasyQuestion}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                className="mt-8 mb-16 mr-20 w-1/4"
                label="Số câu trung bình"
                autoFocus
                id="numberMediumQuestion"
                name="numberMediumQuestion"
                value={topic.numberMediumQuestion}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                className="mt-8 mb-16 mr-20 w-1/4"
                label="Số câu khó"
                autoFocus
                id="numberHardQuestion"
                name="numberHardQuestion"
                value={topic.numberHardQuestion}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
              />
              <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={() => this.props.removeExamDefineTopic(topic.id)}>
                <Icon fontSize="small">delete</Icon>
              </IconButton>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default ExamDefineTopicCardDetail;
