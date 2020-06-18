import axios from "axios";
import { showMessage } from 'app/store/actions/fuse';

export const EMAIL_RESETPASSWORD_ERROR = 'EMAIL_ERROR';
export const EMAIL_RESETPASSWORD_SUCCESS = 'EMAIL_SUCCESS';

export function submitResetPassword({ email }) {
  return (dispatch) =>
    axios
      .put('/api/users/recoverPassword', { email })
      .then((res) => {
        dispatch(showMessage({ message: 'Send Email done!' }));
        dispatch({
          type: EMAIL_RESETPASSWORD_SUCCESS,
          payload: (res.data === null ? new [] : res.data),
        });
      })
      .catch(err => {
        if (err.response.status == 400) { { } }
        dispatch(showMessage({ message: 'Invalid email' }));
        dispatch({
          type: EMAIL_RESETPASSWORD_ERROR
        })
      }
      );
}