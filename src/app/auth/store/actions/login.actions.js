import firebaseService from 'app/services/firebaseService';
import * as Actions from 'app/store/actions';
import axios from "axios";
import { showMessage } from 'app/store/actions/fuse';
import history from 'history.js';
import { getStoredState } from 'redux-persist';
import { persistConfig } from '../../../store';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

let instance;

getStoredState(persistConfig).then(store => {
  instance = axios.create({
    baseURL: "http://171.244.0.59:4000/",
    // timeout: constants.SERVER_TIMEOUT,
    headers: {
      // 'Authorization': "Bearer " + store.auth.login.user.access_token,
    }
  });
})


export function logout() {
  console.log('logout function')
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
    localStorage.clear();
  }
};

export function submitLogin({ email, password }) {
  let params = {
    email,
    password,
  }
  console.log("paramsss")
  console.log(params)
  return (dispatch) =>
  instance
      .post('/api/users/login', params)
      .then((res) => {
        console.log("login")
        console.log(res)
        dispatch(showMessage({ message: 'Login Success' }));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: (res.data === null ? new [] : res.data),
        });

      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status == 400) { { } }
        dispatch(showMessage({ message: 'Invalid email or password' }));
        // dispatch({
        //   type: LOGIN_ERROR
        // })
      }
      );
}

export function submitLoginWithFireBase({ username, password }) {
  return (dispatch) =>
    firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
      .then(() => {
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        const usernameErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];

        const response = {
          username: usernameErrorCodes.includes(error.code) ? error.message : null,
          password: passwordErrorCodes.includes(error.code) ? error.message : null
        };

        if (error.code === 'auth/invalid-api-key') {
          dispatch(Actions.showMessage({ message: error.message }));
        }

        return dispatch({
          type: LOGIN_ERROR,
          payload: response
        });
      });
}
