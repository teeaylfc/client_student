import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardActions, CardContent, Icon, withStyles} from "@material-ui/core";
import _ from '@lodash';
import {withRouter} from "react-router-dom";
import QuestionCardModel from "./model/QuestionCardModel";
import QuestionCardOneChoice from "./answer/QuestionCardOneChoice";
import QuestionCardMultiChoice from "./answer/QuestionCardMultiChoice";
import QuestionCardImageChoice from "./answer/QuestionCardImageChoice";
import QuestionCardConnectPharse from "./answer/QuestionCardConnectPhase";

const initialState = {
  formOpen: false,
  form : {
    questionString: "",
    descriptionAnswer: '',
    answerList: [],
    file: '',
    image: '',
  }
};

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

class QuestionAddCard extends Component {
  state = initialState;

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.questionType, prevProps.questionType)) {
      this.setState({...initialState, formOpen: true});
    }
  }

  handleOpenForm = () => {
    this.setState({formOpen: true})
  };

  handleCloseForm = () => {
    this.setState({...initialState})
  };

  handleChange = (event) => {
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
  };

  handleChangeQuestion = (data) => {
    this.setState({form:_.set({...this.state.form}, 'questionString', data)});
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const {questionString, descriptionAnswer, answerList, image} = {...this.state.form};
    if (answerList.length > 0) {
      if (this.props.questionType !== 'MATCHING')  {
        let questionAnswerRight = answerList.filter(answer => answer.checked === true);
        if (questionAnswerRight.length === 0) {
          alert("Phải chọn ít nhất 1 câu trả lời đúng");
          return;
        }
      }
    } else {
      alert("Phải nhập ít nhất 1 câu trả lời");
      return;
    }
    this.props.addNewQuestion(new QuestionCardModel({questionString, descriptionAnswer, answerList, image}));
    this.handleCloseForm();
  };

  handleCardAdded = (answer) => {
    if (this.props.questionType === 'SINGLE_CHOICE' && answer.checked) {
      let answers = this.state.form.answerList;
      answers = answers.filter((_answer) => _answer.checked);
      if (answers.length > 0) {
        return alert("Đã có phương án đúng cho câu hỏi 1 đáp án");
      }
    }
    let answers = this.state.form.answerList;
    answers = answers.filter((_answer) => _answer.answerValue && _answer.answerValue === answer.answerValue);
    if (answers.length > 0) {
      return alert("Đã có câu trả lời trùng");
    }
    let answerList = [...this.state.form.answerList, answer];
    this.setState({form: _.set({...this.state.form}, 'answerList', answerList)});
    //this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
  };

  handleAnswerChange = (answer) => {
    let answers = this.state.form.answerList;
    answers = answers.filter((_answer) => _answer.answerValue === answer.answerValue && _answer.idAnswer !== answer.idAnswer);
    if (answers.length > 0) {
      return alert("Đã có câu trả lời trùng");
    }
    let answerList = this.state.form.answerList;
    if (this.props.questionType === 'SINGLE_CHOICE' && answer.checked) {
      answerList = answerList.map((_answer) => _answer.idAnswer === answer.idAnswer ? answer : _.set({..._answer}, 'checked', false));
    } else {
      answerList = answerList.map((_answer) => _answer.idAnswer === answer.idAnswer ? answer : _answer);
    }
    this.setState({form: _.set({...this.state.form}, 'answerList', answerList)});
    //this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
  };

  handleAnswerRemove = (id) => {
    let answerList = this.state.form.answerList;
    answerList = answerList.filter((_answer) => _answer.idAnswer !== id);
    this.setState({form: _.set({...this.state.form}, 'answerList', answerList)});
    //this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
  };

  handleImageChange = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.readAsBinaryString(file);
    reader.onload = () => {
      this.setState({
        form: _.set({...this.state.form}, 'image', `data:${file.type};base64,${btoa(reader.result)}`)
      });
    };

    reader.onerror = function () {
      console.log("error on load image");
    };
  };

  render() {
    const {questionType} = this.props;
    const {formOpen, form} = this.state;

    let answerAddCard;
    if (questionType === 'SINGLE_CHOICE') {
      answerAddCard = <QuestionCardOneChoice question={form} handleAnswerRemove={this.handleAnswerRemove} handleCardAdded={this.handleCardAdded}
                                             handleAnswerChange={this.handleAnswerChange} handleChange={this.handleChange} handleChangeQuestion={this.handleChangeQuestion}/>
    } else if (questionType === 'MATCHING_IMAGE') {
      answerAddCard = <QuestionCardImageChoice question={form} handleAnswerRemove={this.handleAnswerRemove} handleCardAdded={this.handleCardAdded}
                                               handleAnswerChange={this.handleAnswerChange} handleChange={this.handleChange}
                                               handleImageChange={this.handleImageChange} handleChangeQuestion={this.handleChangeQuestion}/>
    } else if (questionType === 'MATCHING') {
      answerAddCard = <QuestionCardConnectPharse question={form} handleAnswerRemove={this.handleAnswerRemove} handleCardAdded={this.handleCardAdded}
                                               handleAnswerChange={this.handleAnswerChange} handleChange={this.handleChange}
                                               handleImageChange={this.handleImageChange} handleChangeQuestion={this.handleChangeQuestion}/>
    } else if (questionType === 'MULTI_CHOICE') {
      answerAddCard = <QuestionCardMultiChoice question={form} handleAnswerRemove={this.handleAnswerRemove} handleCardAdded={this.handleCardAdded}
                                               handleAnswerChange={this.handleAnswerChange} handleChange={this.handleChange} handleChangeQuestion={this.handleChangeQuestion}/>
    }

    return (
      <div className="w-full mb-16 border-t-1">
        {formOpen ? (
          <Card className="w-full mb-16">
            <CardContent className="flex flex-col overflow-auto">
              {answerAddCard}
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={this.onSubmit}>
                Create Question
              </Button>
            </CardActions>
          </Card>
        ) : (
          <Button
            onClick={this.handleOpenForm}
            classes={{
              root: "normal-case font-600 w-full rounded-none h-48",
              label: "justify-start"
            }}
          >
            <Icon className="text-20 mr-8">add</Icon>
            Add a Question
          </Button>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default ((withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(QuestionAddCard)))));
