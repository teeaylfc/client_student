import React, {Component} from 'react';
import {Icon, Typography, withStyles} from '@material-ui/core';
import {FuseAnimate, FuseChipSelect, FusePageCarded} from '@fuse/index';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import "easymde/dist/easymde.min.css";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import reorder, {reorderQuoteMap} from '../store/actions/reorder';
import QuestionAddCard from "./QuestionAddCard";
import QuestionCard from "./QuestionCard";
import classNames from 'classnames';


const styles = theme => ({});

class Question extends Component {

  state = {
    tabValue: 0,
    form: {
      subject: "",
      classRoom: "",
      questionType: "SINGLE_CHOICE",
      topic: "",
      questionsPack: "",
      questionLevel: "",
      schoolId: "",
      questionNew: {
        questionString: "",
        answerList: [],
        descriptionAnswer: "",
        questionType: ""
      }
    },
    questionList: [],
    classRoomListing: [],
    subjectListing: [],

    questionTypeListing: [
      {
        value: "SINGLE_CHOICE",
        label: "Trắc nghiệm 1 đáp án"
      },
      /*{
        value: "Điền từ vào chỗ trống",
        label: "Điền từ vào chỗ trống"
      },*/
      {
        value: "MATCHING_IMAGE",
        label: "Nối từ với hình ảnh"
      },
      {
        value: "MATCHING",
        label: "Nối câu"
      },
      {
        value: "MULTI_CHOICE",
        label: "Trắc nghiệm nhiều đáp án"
      },
    ],

    topicListing: [
      {
        value: "",
        label: "--Chọn--"
      },
      {
        value: "Ancol",
        label: "Ancol"
      },
      {
        value: "Ancol-Phenol",
        label: "Ancol-Phenol"
      },
    ],

    questionsPackListing: [
      {
        value: "",
        label: "--Chọn--"
      },
      {
        value: "Câu hỏi 15 phút",
        label: "Câu hỏi 15 phút"
      },
      {
        value: "Câu hỏi 1 tiết",
        label: "Câu hỏi 1 tiết"
      },
    ],

    questionLevelListing: [
      {
        value: "",
        label: "--Chọn--"
      },
      {
        value: "Dễ",
        label: "Dễ"
      },
      {
        value: "Trung bình",
        label: "Trung bình"
      },
      {
        value: "Khó",
        label: "Khó"
      },
    ],
    degreeClass: [
      {
        value: "",
        label: "--Chọn--"
      },
      {
        value: "1",
        label: "1"
      },
      {
        value: "2",
        label: "2"
      },
      {
        value: "3",
        label: "3"
      },
      {
        value: "4",
        label: "4"
      },
      {
        value: "5",
        label: "5"
      },
      {
        value: "6",
        label: "6"
      },
      {
        value: "7",
        label: "7"
      },
      {
        value: "8",
        label: "8"
      },
      {
        value: "9",
        label: "9"
      },
      {
        value: "10",
        label: "10"
      },
      {
        value: "11",
        label: "11"
      },
      {
        value: "12",
        label: "12"
      }
    ],
    degreeClass1: [
      {
        value: "",
        label: "--Chọn--"
      },
      {
        value: "1",
        label: "1"
      },
      {
        value: "2",
        label: "2"
      },
      {
        value: "3",
        label: "3"
      },
      {
        value: "4",
        label: "4"
      },
      {
        value: "5",
        label: "5"
      }
    ],
    degreeClass2: [
      {
        value: "",
        label: "--Chọn--"
      },
      {
        value: "6",
        label: "6"
      },
      {
        value: "7",
        label: "7"
      },
      {
        value: "8",
        label: "8"
      },
      {
        value: "9",
        label: "9"
      }
    ],
    degreeClass3: [
      {
        value: "",
        label: "--Chọn--"
      },
      {
        value: "10",
        label: "10"
      },
      {
        value: "11",
        label: "11"
      },
      {
        value: "12",
        label: "12"
      }
    ],
  };

  componentDidMount() {
    this.updateSchoolState();
    this.props.getQuestionsPackBySchoolId(this.props.user.schools[0].id);
    this.props.getAllTopic();
    this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (this.props.question && this.state.form && this.props.question._id !== this.state.form._id)
    ) {
      this.updateFormState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user !== null) {
      if(nextProps.user.user.userId =='ssAdmin' || nextProps.user.schools[0].schoolId === 'SS001') {
        this.setState({classRoomListing : this.state.degreeClass})
      } else if('1' === nextProps.user.schools[0].degreeNumber) {
        this.setState({classRoomListing : this.state.degreeClass1})
      } else if(nextProps.user.schools[0].degreeNumber === '2') {
        this.setState({classRoomListing : this.state.degreeClass2})
      } else {
        this.setState({classRoomListing : this.state.degreeClass3})
      }
    }
    if(nextProps.subjects.subjectsData.length != 0) {
      let subjects = nextProps.subjects.subjectsData.map(subjectData => ({ value: subjectData.subjectId, label: subjectData.subjectName }))
      subjects = [{value: "", label: "--Chọn--"}, ...subjects];
      this.setState({subjectListing: subjects})
    }
    this.updateFormState();
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  updateFormState = () => {
    if  (this.props.question) {
      if (this.props.match.params.id !== 'new') {
        let questionList = [];
        questionList.push(this.props.question);
        this.setState({questionList: questionList});
      }
    }
    this.setState({form: this.props.question});
  };

  updateSchoolState = () => {
    if (this.props.match.params.id === 'new') {
      this.props.newQuestion();
    } else {
      this.props.getQuestion(this.props.match.params.id);
    }
  };

  handleChangeTab = (event, tabValue) => {
    this.setState({tabValue});
  };

  handleChange = (event) => {
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
  };

  handleChipChange = (value, name) => {
     this.setState({form: _.set({...this.state.form}, name, value.value)});
  };

  addNewQuestion = (question) => {
    if (this.state.form.subject.length === 0) {
      alert("Trường môn học bắt buộc nhập");
      return;
    } else if (this.state.form.classRoom.length === 0) {
      alert("Trường Khối lớp bắt buộc nhập");
      return;
    } else if (this.state.form.topic.length === 0) {
      alert("Trường chuyên đề bắt buộc nhập");
      return;
    } else if (this.state.form.questionsPack.length === 0) {
      alert("Trường gói câu hỏi bắt buộc nhập");
      return;
    } else if (this.state.form.questionLevel.length === 0) {
      alert("Trường Mức độ khó bắt buộc nhập");
      return;
    }
    let newQuestion = {
      ...question,
      subject: this.state.form.subject,
      classRoom: this.state.form.classRoom,
      questionType: this.state.form.questionType,
      topic: this.state.form.topic,
      questionsPack: this.state.form.questionsPack,
      questionLevel: this.state.form.questionLevel,
      schoolId: this.props.user.schools[0].id,
    };
    newQuestion = _.omit(newQuestion, "_id");
    this.props.addQuestion(newQuestion, this.props.history);
    const questionList = this.state.questionList.concat(newQuestion);
    this.setState({questionList: questionList});
  };

  changeQuestion = (question) => {
    console.log(question);
    let questionList = this.state.questionList;
    questionList = questionList.map((_question) => _question.id === question.id ? question : _question);
    this.setState({questionList: questionList});
  };

  updateQuestionCard = (question) => {
    console.log(this.state.form);
    if (this.state.form._id) {
      this.state.form.questionString = question.questionString;
      this.state.form.answerList = question.answerList;
      this.state.form.answerMatchList = question.answerMatchList;
      this.props.updateQuestion(this.state.form, this.props.history);
    }
  };

  canBeSubmitted() {
    const {id} = this.state.form;
    return (
      id.length > 0 &&
      !_.isEqual(this.props.question, this.state.form)
    );
  }

  saveAction = () => {
    if (this.state.form._id) {
      this.props.updateQuestion(this.state.form, this.props.history);
    } else {
      this.props.push("/manageQuestion");
      //this.props.addQuestion(this.state.form, this.props.history);
    }
  };

  onDragEnd = (result) => {
    const {source, destination} = result;
    // dropped nowhere
    if (!destination) {
      return;
    }
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    // reordering list
    let answerList = this.state.form.answerList;
    if (result.type === 'list') {
      const ordered = reorder(
        answerList,
        result.source.index,
        result.destination.index
      );
      this.setState({form: _.set({...this.state.form}, 'answerList', ordered)});
    }
    // reordering card
    if (result.type === 'card') {
      const ordered = reorderQuoteMap(
        answerList,
        result.source,
        result.destination
      );
      console.log(ordered);
      this.setState({form: _.set({...this.state.form}, 'answerList', ordered)});
    }
  };

  render() {
    const {topics, questionsPacks} = this.props;
    const {form, questionList} = this.state;
    let questionsPackOption = this.state.questionsPackListing, topicNameOption = this.state.topicListing;
    if (questionsPacks.length > 0) {
      const resultFilter = questionsPacks.filter(questionsPack => form.subject === "" ? questionsPack : questionsPack.subject === form.subject ? questionsPack : null);
      const result = resultFilter.map(questionsPack => ({
        value: questionsPack._id,
        label: questionsPack.name
      }));
      questionsPackOption = result;
    }

    if (topics.length > 0) {
      const resultFilter = topics.filter(topic => form.subject === "" ? topic : topic.subjectName === form.subject ? topic : null);
      const result = resultFilter.map(topic => ({value: topic.topicName, label: topic.topicName}));
      topicNameOption = result;
    }

    return (
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-96 h-96 sm:h-96 sm:min-h-96"
        }}
        header={
          form && (
            <div className="flex flex-1 w-full items-center justify-between">

              <div className="flex flex-col items-start max-w-full">

                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button"
                              to="/manageQuestion">
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Danh sách câu hỏi
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <FuseAnimate animation="transition.expandIn" delay={300}>
                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" />
                  </FuseAnimate>
                  <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="text-16 sm:text-20 truncate">
                            {form.nameClass ? form.nameClass : 'Thêm mới câu hỏi'}
                        </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="caption">Chi tiết câu hỏi</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        content={
          form && (
            <div className="p-16 sm:p-24 max-w-2xl">
              <div>
                <div className="flex">
                  <FuseChipSelect
                    className="mt-8 mb-16 mr-20 w-1/2"
                    value={this.state.subjectListing.filter(subject => subject.value === form.subject)}
                    onChange={(value) => this.handleChipChange(value, 'subject')}
                    placeholder="--Chọn--"
                    textFieldProps={{
                      label: 'Môn học',
                      InputLabelProps: {
                        shrink: true
                      },
                      variant: 'standard'
                    }}
                    options={this.state.subjectListing}
                    isMulti={false}
                  />
                  <FuseChipSelect
                    className="mt-8 mb-16 mr-20 w-1/2"
                    value={this.state.classRoomListing.filter(classRoom => classRoom.value === form.classRoom)}
                    onChange={(value) => this.handleChipChange(value, 'classRoom')}
                    placeholder="--Chọn--"
                    textFieldProps={{
                      label: 'Khối lớp',
                      InputLabelProps: {
                        shrink: true
                      },
                      variant: 'standard'
                    }}
                    options={this.state.classRoomListing}
                    isMulti={false}
                  />
                </div>

                <div className="flex">
                  <FuseChipSelect
                    className="mt-8 mb-16 mr-20 w-1/2"
                    value={this.state.questionTypeListing.filter(subject => subject.value === form.questionType)}
                    onChange={(value) => this.handleChipChange(value, 'questionType')}
                    placeholder="--Chọn--"
                    textFieldProps={{
                      label: 'Dạng câu hỏi',
                      InputLabelProps: {
                        shrink: true
                      },
                      variant: 'standard',
                    }}
                    options={this.state.questionTypeListing}
                    isMulti={false}
                    disabled={this.state.form._id}
                  />
                  <FuseChipSelect
                    className="mt-8 mb-16 mr-20 w-1/2"
                    value={topicNameOption.filter(classRoom => classRoom.value === form.topic)}
                    onChange={(value) => this.handleChipChange(value, 'topic')}
                    placeholder="--Chọn--"
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
                </div>
                <div className="flex">
                  <FuseChipSelect
                    className="mt-8 mb-16 mr-20 w-1/2"
                    value={questionsPackOption.filter(subject => subject.value === form.questionsPack)}
                    onChange={(value) => this.handleChipChange(value, 'questionsPack')}
                    placeholder="--Chọn--"
                    textFieldProps={{
                      label: 'Gói câu hỏi',
                      InputLabelProps: {
                        shrink: true
                      },
                      variant: 'standard'
                    }}
                    options={questionsPackOption}
                    isMulti={false}
                  />
                  <FuseChipSelect
                    className="mt-8 mb-16 mr-20 w-1/2"
                    value={this.state.questionLevelListing.filter(classRoom => classRoom.value === form.questionLevel)}
                    onChange={(value) => this.handleChipChange(value, 'questionLevel')}
                    placeholder="--Chọn--"
                    textFieldProps={{
                      label: 'Mức độ kiến thức',
                      InputLabelProps: {
                        shrink: true
                      },
                      variant: 'standard'
                    }}
                    options={this.state.questionLevelListing}
                    isMulti={false}
                  />
                </div>
              </div>
              <div className={classNames("flex flex-1 overflow-x-auto overflow-y-hidden")}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable
                    droppableId={((new Date()).getTime()).toString()}
                    type="list"
                    direction="vertical"
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} className="flex flex-col container w-full mb-16">
                        {questionList.map((question, index) => (
                          <QuestionCard
                            key={question._id}
                            question={question}
                            index={index}
                            changeQuestion={this.changeQuestion}
                            updateQuestionCard={this.updateQuestionCard}
                          />
                        ))}
                        {provided.placeholder}
                        <QuestionAddCard addNewQuestion={this.addNewQuestion} questionType={form.questionType}/>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          )
        }
        innerScroll
      />
    )
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuestion: Actions.getQuestion,
    newQuestion: Actions.newQuestion,
    updateQuestion: Actions.updateQuestion,
    addQuestion: Actions.addQuestion,
    getQuestionsPackBySchoolId: Actions.getQuestionsPackBySchoolId,
    getAllTopic: Actions.getAllTopic,
    getAllSubjectBySchool: Actions.getAllSubjectBySchool,
  }, dispatch);
}

function mapStateToProps({questionApp, auth}) {
  return {
    question: questionApp.question.question,
    questionsPacks: questionApp.questionsPack.questionsPacks,
    topics: questionApp.topics.topicsData,
    subjects: questionApp.subjects,
    user : auth.login.user
  }
}

export default withReducer('questionApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Question))));
