import React, {Component} from 'react';
import {Card, CardContent, withStyles} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import * as PropTypes from "prop-types";
import AnswerOneChoiceCard from "./AnswerOneChoiceCard";
import AnswerAddOneChoiceCard from "./AnswerAddOneChoiceCard";
import Input from "@material-ui/core/Input";
import classNames from 'classnames';

const styles = theme => ({
  imgPreview: {
    textAlign: 'center',
    margin: '15px 15px',
    height: '200px',
    width: '500px',
    borderLeft: '1px solid gray',
    borderRight: '1px solid gray',
    borderTop: '5px solid gray',
    borderBottom: '5px solid gray',
    img: {
      width: '500px',
      height: '200px'
    }
  }
});

class QuestionCardOneChoice extends Component {
  render() {
    let {classes, question, handleAnswerChange, handleAnswerRemove, handleCardAdded, handleImageChange} = this.props;
    return (
      <Card square={true}>
        <CardContent
          ref={ref => this.contentScrollEl = ref}
          className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto"
        >
          <div>
            <Input type={"file"} onChange={(e)=> handleImageChange(e)} />
            <div className={classNames(classes.imgPreview)}>
              <img style={{ width: '500px', height: '200px'}}
                   src={question.image ? question.image : 'https://www.churchtimes.co.uk/media/5604506/out-of-the-question.jpg?anchor=center&mode=crop&width=605&height=292&rnd=131457274530000000'}  alt={'#'}/>
            </div>
          </div>
          <Droppable
            droppableId={((new Date()).getTime()).toString()}
            type="list"
            direction="horizontal"
          >
            {(provided) => (
              <div ref={provided.innerRef} className="flex flex-col">
                {question.answerList.map((answer, index) =>
                  <AnswerOneChoiceCard key={answer.idAnswer} answer={answer} index={index} onListItemChange={handleAnswerChange}
                                         onListItemRemove={handleAnswerRemove}/>
                )}
                {provided.placeholder}
                <AnswerAddOneChoiceCard onCardAdded={handleCardAdded}/>
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    );
  }
}

QuestionCardOneChoice.propTypes = {
  question: PropTypes.object,
  handleAnswerChange: PropTypes.func,
  handleAnswerRemove: PropTypes.func,
  handleChange: PropTypes.func,
  handleCardAdded: PropTypes.func,
  handleImageChange: PropTypes.func
};

export default (withStyles(styles, {withTheme: true}) (QuestionCardOneChoice));
