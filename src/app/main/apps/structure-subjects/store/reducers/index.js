import {combineReducers} from 'redux';
import groupSubjects from "./groupSubject.reducer";
import subjects from "./subject.reducer";
import vocabularies from "./vocabulary.reducer";
import schoolReducer from '../../../structure-school/store/reducers/school.reducer'
import teacherReducer from '../../../structure-school/store/reducers/teachers.reducer'
import classesReducer from '../../../structure-school/store/reducers/classes.reducer'
import enterPointReducer from "./enterPoint.reducer"
import studentReducer from '../../../structure-school/store/reducers/students.reducer'
import topics from '../../../exam-banking-management/store/reducers/topics.reducer'

const reducer = combineReducers({
  groupSubjects,
  subjects,
  enterPointReducer,
  vocabularies,
  schools: schoolReducer,
  teachers: teacherReducer,
  classes : classesReducer,
  student : studentReducer,
  topics : topics
});

export default reducer;
