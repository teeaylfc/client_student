import React from 'react';
import {Icon, IconButton, TextField, withStyles} from '@material-ui/core';
import {Draggable} from 'react-beautiful-dnd';
import _ from '@lodash';

const styles = theme => ({
  card: {
    transitionProperty      : 'box-shadow',
    transitionDuration      : theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  }
});

const AnswerConnectPhaseCard = ({classes, index, answer, onListItemChange, onListItemRemove}) => {
  function handleChange(event)
  {
    onListItemChange(_.setIn(answer, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
  }

  return (
    <Draggable draggableId={answer.idAnswer} index={index} type="card">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex">
            <TextField
              className="mt-8 mb-16 mr-20"
              required
              fullWidth
              //autoFocus
              label="Câu trả lời"
              name="answerValue"
              id="answerValue"
              value={answer.answerValue}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              className="mt-8 mb-16 mr-20"
              fullWidth
              //autoFocus
              label="Câu trả lời"
              name="answerValueMatch"
              id="answerValueMatch"
              value={answer.answerValueMatch}
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

export default withStyles(styles, {withTheme: true})(AnswerConnectPhaseCard);
