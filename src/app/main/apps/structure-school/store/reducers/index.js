import {combineReducers} from 'redux';
import school from './school.reducer';
import student from './students.reducer';
import classes from './classes.reducer';
import teachers from './teachers.reducer';
import accessControl from '../../../setting/store/reducers/accessControl.reducers';
import subjectReducer from '../../../structure-subjects/store/reducers/subject.reducer'
const reducer = combineReducers({
  school,
  student,
  classes,
  teachers,
  role: accessControl,
  subjects: subjectReducer
});

export default reducer;
