import React from 'react';
import {TextField, IconButton, Icon} from "@material-ui/core";
import {FuseChipSelect} from '@fuse/index';
import {Draggable} from "react-beautiful-dnd";
import _ from '@lodash';

const ExamDefineTopicCardDetailNew = ({topic, topicNameOption, index, removeExamDefineTopic, changeExamDefineTopic}) => {
  function handleChange (event) {
    changeExamDefineTopic(_.setIn(topic, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
  }

  function handleChipChange (value, name) {
    changeExamDefineTopic(_.setIn(topic, name, value.value));
  }

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
              onChange={(value) => handleChipChange(value, 'topicName')}
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
              autoFocus
              id="numberEasyQuestion"
              name="numberEasyQuestion"
              value={topic.numberEasyQuestion}
              onChange={handleChange}
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
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="mt-8 mb-16 mr-20 w-1/4"
              label="Số câu khó"
              id="numberHardQuestion"
              autoFocus
              name="numberHardQuestion"
              value={topic.numberHardQuestion}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={() => removeExamDefineTopic(topic.id)}>
              <Icon fontSize="small">delete</Icon>
            </IconButton>
          </div>
        </div>
      )}
    </Draggable>
  );

}

export default ExamDefineTopicCardDetailNew;
