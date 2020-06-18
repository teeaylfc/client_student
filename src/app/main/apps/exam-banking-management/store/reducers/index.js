import {combineReducers} from 'redux';
import questionsPackReducer from './questionsPack.reducer';
import questionReducer from './question.reducer';
import topics from "./topics.reducer";
import examDefines from "./examDefine.reducer";
import exampleExamDefines from "./exampleExamDefine.reducer";
import classReducer from '../../../structure-school/store/reducers/classes.reducer'
import subjectReducer from '../../../structure-subjects/store/reducers/subject.reducer'

const reducer = combineReducers({
  topics,
  examDefines,
  exampleExamDefines,
  questionsPack: questionsPackReducer,
  question: questionReducer,
  classes: classReducer,
  subjects: subjectReducer
});

export default reducer;
