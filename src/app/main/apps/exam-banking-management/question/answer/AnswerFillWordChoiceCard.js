import React from 'react';
import {Icon, IconButton, TextField, withStyles} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import _ from '@lodash';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

const styles = theme => ({
  card: {
    transitionProperty      : 'box-shadow',
    transitionDuration      : theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  }
});

const AnswerFillWordChoiceCard = ({index, answer, onListItemChange, onListItemRemove}) => {
  function handleChange(event)
  {
    onListItemChange(_.setIn(answer, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
  }

  function handleChangeAnswer(data) {
    onListItemChange(_.setIn(answer, 'answerValue', data));
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
            <CKEditor
                editor={ ClassicEditor }
                data={answer.answerValue}
                id="answerValue"
                name="answerValue"
                onInit={ editor => {
                  // You can store the "editor" and use when it is needed.
                  const data = editor.getData();
                } }
                onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  handleChangeAnswer(data);
                } }
                onBlur={ editor => {
                  console.log( 'Blur.', editor );
                } }
                onFocus={ editor => {
                  console.log( 'Focus.', editor );
                } }
            />
            <TextField
              className="mt-8 mb-16 mr-20"
              required
              fullWidth
              autoFocus
              label="Card title"
              name="answerDescription"
              value={answer.answerDescription}
              onChange={handleChange}
              variant="outlined"
            />
            <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={() => onListItemRemove(answer.idAnswer)}>
              <Icon fontSize="small">delete</Icon>
            </IconButton>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default withStyles(styles, {withTheme: true})(AnswerFillWordChoiceCard);
