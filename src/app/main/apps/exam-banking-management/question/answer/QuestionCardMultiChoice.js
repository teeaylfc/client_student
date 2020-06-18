import React, {Component} from 'react';
import {Card, CardContent} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import AnswerAddMultiChoiceCard from "./AnswerAddMultiChoiceCard";
import AnswerMultiChoiceCard from "./AnswerMultiChoiceCard";
import * as PropTypes from "prop-types";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
class QuestionCardMultiChoice extends Component {
  render() {
    let {question, handleAnswerChange, handleAnswerRemove, handleCardAdded, handleChangeQuestion} = this.props;
    return (
      <Card square={true}>
        <CardContent
          ref={ref => this.contentScrollEl = ref}
          className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto"
        >
          <CKEditor
              editor={ ClassicEditor }
              data={question.questionString}
              id="questionString"
              name="questionString"
              onInit={ editor => {
                const data = editor.getData();
              } }
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                handleChangeQuestion(data);
              } }
          />
          <Droppable
            droppableId={((new Date()).getTime()).toString()}
            type="list"
            direction="horizontal"
          >
            {(provided) => (
              <div ref={provided.innerRef} className="flex flex-col">
                {question.answerList.map((answer, index) =>
                  <AnswerMultiChoiceCard answer={answer} key={answer._id ? answer._id : answer.idAnswer}  index={index} onListItemChange={handleAnswerChange}
                                         onListItemRemove={handleAnswerRemove}/>
                )}
                {provided.placeholder}
                <AnswerAddMultiChoiceCard onCardAdded={handleCardAdded}/>
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    );
  }
}

QuestionCardMultiChoice.propTypes = {
  question: PropTypes.object,
  handleAnswerChange: PropTypes.func,
  handleAnswerRemove: PropTypes.func,
  handleChange: PropTypes.func,
  handleCardAdded: PropTypes.func,
  handleChangeQuestion: PropTypes.func
};

export default QuestionCardMultiChoice;
