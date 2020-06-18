import React, {Component} from 'react';
import {Card, CardActions, CardContent} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import AnswerAddOneChoiceCard from "./AnswerAddOneChoiceCard";
import AnswerAddFillWordChoiceCard from "./AnswerAddFillWordChoiceCard";
import Input from "@material-ui/core/Input";
import AnswerAddMultiChoiceCard from "./AnswerAddMultiChoiceCard";
import AnswerOneChoiceCard from "./AnswerOneChoiceCard";
import AnswerFillWordChoiceCard from "./AnswerFillWordChoiceCard";
import AnswerMultiChoiceCard from "./AnswerMultiChoiceCard";

class AnswerConnectPhraseList extends Component {


  render() {
    const {questionType } = this.props;
    let answerAddCard;
    if (questionType === 'SINGLE_CHOICE') {
      answerAddCard = (
        <div>
          <AnswerAddOneChoiceCard onCardAdded={this.handleCardAdded}/>
        </div>
      );
    } else if (questionType === 'Điền từ vào chỗ trống') {
      answerAddCard = (
        <div>
          <AnswerAddFillWordChoiceCard onCardAdded={this.handleCardAdded}/>
        </div>
      );
    } else if (questionType === 'MATCHING_IMAGE') {
      answerAddCard = (
        <div>
          <AnswerAddMultiChoiceCard onCardAdded={this.handleCardAdded}/>
        </div>
      );
    } else if (questionType === 'MATCHING') {

    } else if (questionType === 'MULTI_CHOICE') {
      answerAddCard = (
        <div>
          <AnswerAddMultiChoiceCard onCardAdded={this.handleCardAdded}/>
        </div>
      );
    }

    let answerCard;
    if (form.answerList.length > 0) {
      if (questionType === 'SINGLE_CHOICE') {
        answerCard = form.answerList.map((answer, index) =>
          <AnswerOneChoiceCard answer={answer} index={index} onListItemChange={this.handleAnswerChange} onListItemRemove={this.handleAnswerRemove}/>
        );
      } else if (questionType === 'Điền từ vào chỗ trống') {
        answerCard = form.answerList.map((answer, index) =>
          <AnswerFillWordChoiceCard answer={answer} index={index} onListItemChange={this.handleAnswerChange} onListItemRemove={this.handleAnswerRemove}/>
        );
      } else if (questionType === 'MATCHING_IMAGE') {
        answerCard = form.answerList.map((answer, index) =>
          <AnswerMultiChoiceCard answer={answer} index={index} onListItemChange={this.handleAnswerChange} onListItemRemove={this.handleAnswerRemove}/>
        );
      } else if (questionType === 'MATCHING') {

      } else if (questionType === 'MULTI_CHOICE') {
        answerCard = form.answerList.map((answer, index) =>
          <AnswerMultiChoiceCard answer={answer} index={index} onListItemChange={this.handleAnswerChange} onListItemRemove={this.handleAnswerRemove}/>
        );
      }
    }

    return (
      <Card square={true}>
        <CardContent
          ref={ref => this.contentScrollEl = ref}
          className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto"
        >
          <Droppable
            droppableId={((new Date()).getTime()).toString()}
            type="list"
            direction="horizontal"
          >
            {(provided) => (
              <div ref={provided.innerRef} className="mt-8 mb-16 mr-20 w-1/2">
                {answerCard}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
        <CardActions className="p-0 flex-no-shrink">
          {answerAddCard}
        </CardActions>
      </Card>
    );
  }
}

export default AnswerConnectPhraseList;