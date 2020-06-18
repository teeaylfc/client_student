import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import {Button, Card, CardActions, CardContent, CardHeader, withStyles} from "@material-ui/core";
import _ from '@lodash';
import QuestionCardMultiChoice from "./answer/QuestionCardMultiChoice";
import QuestionCardOneChoice from "./answer/QuestionCardOneChoice";
import QuestionCardImageChoice from "./answer/QuestionCardImageChoice";
import QuestionCardConnectPharse from "./answer/QuestionCardConnectPhase";

const styles = theme => ({
  imgPreview: {
    textAlign: 'center',
    margin: '15px 15px',
    height: '200px !important',
    width: '500px !important',
    borderLeft: '1px solid gray',
    borderRight: '1px solid gray',
    borderTop: '5px solid gray',
    borderBottom: '5px solid gray',
    img: {
      width: '50%',
      height: '50%'
    }
  }
});

const QuestionCard = ({classes, index, question, key, changeQuestion, updateQuestionCard}) => {

  function handleChange (event) {
    changeQuestion(_.setIn(question, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value));
  }

  function handleChangeQuestion (data) {
    changeQuestion(_.setIn(question, 'questionString', data));
  }

  function handleAnswerChange (answer) {
    let answerList = question.answerList;
    if (question.questionType !== 'MULTI_CHOICE')
      answerList = answerList.map((_answer) => _answer.idAnswer === answer.idAnswer ? answer : answer.checked ? _.set({..._answer}, 'checked', false) : _answer);
    else
      answerList = answerList.map((_answer) => _answer.idAnswer === answer.idAnswer ? answer : _answer);

    console.log(answerList);
    changeQuestion(_.setIn(question, 'answerList', answerList))
  }

  function handleAnswerRemove(id){
    let answerList = question.answerList;
    answerList = answerList.filter((_answer) => _answer.idAnswer !== id);
    changeQuestion(_.setIn(question, 'answerList', answerList))
  }

  function handleCardAdded(answer) {
    if (question.questionType === 'SINGLE_CHOICE' && answer.checked) {
      let answers = question.answerList;
      answers = answers.filter((_answer) => _answer.checked);
      if (answers.length > 0) {
        return alert("Đã có phương án đúng cho câu hỏi 1 đáp án");
      }
    }
    let answers = question.answerList;
    answers = answers.filter((_answer) => _answer.answerValue === answer.answerValue);
    if (answers.length > 0) {
      return alert("Đã có câu trả lời trùng");
    }
    let answerList = [...question.answerList, answer];
    changeQuestion(_.setIn(question, 'answerList', answerList));
  }

  function handleImageChange(event) {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.readAsBinaryString(file);
    reader.onload = () => {
      this.setState({
        form: _.set({...question}, 'image', `data:${file.type};base64,${btoa(reader.result)}`)
      });
    };

    reader.onerror = function () {
      console.log("error on load image");
    };
  };

  function onSubmitUpdate() {
    updateQuestionCard(question);
  }

  const questionName = 'Question ' + (index + 1);
  const draggableId = 'Question_' + key;
  console.log(question);

  let answerAddCard;
  if (question.questionType === 'SINGLE_CHOICE') {
    answerAddCard = <QuestionCardOneChoice key={question.idQuestion} question={question} handleAnswerRemove={handleAnswerRemove} handleCardAdded={handleCardAdded}
                                           handleAnswerChange={handleAnswerChange} handleChange={handleChange} handleChangeQuestion={handleChangeQuestion}/>
  } else if (question.questionType === 'MATCHING_IMAGE') {
    answerAddCard = <QuestionCardImageChoice key={question.idQuestion} question={question} handleAnswerRemove={handleAnswerRemove} handleCardAdded={handleCardAdded}
                                             handleAnswerChange={handleAnswerChange} handleChange={handleChange}
                                             handleImageChange={handleImageChange} handleChangeQuestion={handleChangeQuestion}/>
  } else if (question.questionType === 'MATCHING') {
    answerAddCard = <QuestionCardConnectPharse key={question.idQuestion} question={question} handleAnswerRemove={handleAnswerRemove} handleCardAdded={handleCardAdded}
                                             handleAnswerChange={handleAnswerChange} handleChange={handleChange}
                                             handleImageChange={handleImageChange} handleChangeQuestion={handleChangeQuestion}/>
  } else if (question.questionType === 'MULTI_CHOICE') {
    answerAddCard = <QuestionCardMultiChoice key={question.idQuestion} question={question} handleAnswerRemove={handleAnswerRemove} handleCardAdded={handleCardAdded}
                                             handleAnswerChange={handleAnswerChange} handleChange={handleChange} handleChangeQuestion={handleChangeQuestion}/>
  }

  return (
    <div>
      <Draggable draggableId={draggableId} index={index} type="list">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className="w-full mb-16">
              <CardHeader title={questionName}/>
              <CardContent className="flex flex-col overflow-auto">
                {answerAddCard}
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={onSubmitUpdate}>
                  Update Question
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default ((withStyles(styles, {withTheme: true})(QuestionCard)));
