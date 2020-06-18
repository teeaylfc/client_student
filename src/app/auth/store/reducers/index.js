import {combineReducers} from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import register from './register.reducer';
import forgotPassword from './forgotPassword.reducer';
import school from '../../../main/apps/structure-school/store/reducers/school.reducer'

const authReducers = combineReducers({
    user,
    login,
    register,
    school,
    forgotPassword
});

export default authReducers;