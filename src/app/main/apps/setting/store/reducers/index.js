import {combineReducers} from 'redux';
import accessControl from './accessControl.reducers';
import userReducer from './users.reducer';
import classReducer from '../../../structure-school/store/reducers/classes.reducer'
import schoolReducer from '../../../structure-school/store/reducers/school.reducer'
import loginReducer from "../../../../../auth/store/reducers/login.reducer";
import configConfirmReducer from './configConfirm.reducer';

const reducer = combineReducers({
  role: accessControl,
  users: userReducer,
  classes: classReducer,
  login: loginReducer,
  schools : schoolReducer,
  configConfirm: configConfirmReducer
});

export default reducer;
