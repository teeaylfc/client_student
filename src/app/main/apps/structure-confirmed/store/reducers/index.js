import {combineReducers} from 'redux';
import accessControl from './accessControl.reducers';
import userReducer from './users.reducer';
import classReducer from '../../../structure-school/store/reducers/classes.reducer'
import loginReducer from "../../../../../auth/store/reducers/login.reducer";
import teacherReducer from "../../../structure-school/store/reducers/teachers.reducer"

const reducer = combineReducers({
  role: accessControl,
  users: userReducer,
  classes: classReducer,
  login: loginReducer,
  teachers: teacherReducer
});

export default reducer;
