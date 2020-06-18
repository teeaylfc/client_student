import firebaseService from 'app/services/firebaseService';
import * as UserActions from './user.actions';
import * as Actions from 'app/store/actions';
import axios from "axios";
import {showMessage} from 'app/store/actions/fuse';
import history from 'history.js';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister(studentData)
{
  return (dispatch) =>
    axios
      .post('/api/student/registerStudent', studentData)
      .then((res) => {
          dispatch(showMessage({message: 'Register Success'}));
          dispatch({
            type: REGISTER_SUCCESS,
            payload: (res.data === null ? new [] : res.data),
          });

          history.push({
              pathname: '/login'
          });
        }
      )
      .catch(err =>
        dispatch({
          type: REGISTER_ERROR
        }),
      );
}

export function submitTeacherRegister(teacherData)
{
  return (dispatch) =>
    axios
      .post('/api/teacher/registerTeacher', teacherData)
      .then((res) => {
          dispatch(showMessage({message: 'Register Success'}));
          dispatch({
            type: REGISTER_SUCCESS,
            payload: (res.data === null ? new [] : res.data),
          });
          history.push({
              pathname: '/login'
          });
        }
      )
      .catch(err =>
        dispatch({
          type: REGISTER_ERROR
        }),
      );
}


export function registerWithFirebase(model)
{
    const {email, password, displayName} = model;
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.createUserWithEmailAndPassword(email, password)
            .then(response => {

                dispatch(UserActions.createUserSettingsFirebase({
                    ...response.user,
                    displayName,
                    email
                }));

                return dispatch({
                    type: REGISTER_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];

                const emailErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email'
                ];

                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    email      : emailErrorCodes.includes(error.code) ? error.message : null,
                    displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password   : passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: response
                });
            });
}
