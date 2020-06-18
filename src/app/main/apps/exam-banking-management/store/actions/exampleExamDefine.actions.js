import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_EXAMPLE_EXAM_DEFINE = 'GET_ALL_EXAMPLE_EXAM_DEFINE';
export const EXAMPLE_EXAM_DEFINE_LOADING = 'EXAMPLE_EXAM_DEFINE_LOADING';
export const ADD_EXAMPLE_EXAM_DEFINE = 'ADD_EXAMPLE_EXAM_DEFINE';
export const UPDATE_EXAMPLE_EXAM_DEFINE = 'UPDATE_EXAMPLE_EXAM_DEFINE';
export const NEW_EXAMPLE_EXAM_DEFINE = 'NEW_EXAMPLE_EXAM_DEFINE';
export const GET_EXAMPLE_EXAM_DEFINE = 'GET_EXAMPLE_EXAM_DEFINE';
export const SET_EXAMPLE_EXAM_DEFINE_SEARCH_TEXT = 'SET_EXAMPLE_EXAM_DEFINE_SEARCH_TEXT';

// Export Actions
export function setExamDefineSearchText(event) {
  return {
    type: SET_EXAMPLE_EXAM_DEFINE_SEARCH_TEXT,
    searchText: event.target.value
  }
}

// get all exam define
export const getAllExamDefine = (userId) => dispatch => {
  console.log('getAllExamDefine data');
  dispatch(setPostLoading());
  axios
    .get('/api/examDefine', {
        params: {
            userCreate: userId
        }
    })
    .then(res => {
        console.log('getAllExamDefine data', res);
        dispatch({
          type: GET_ALL_EXAMPLE_EXAM_DEFINE,
          payload: (res.data === null ? new [] : res.data),
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_EXAMPLE_EXAM_DEFINE,
        payload: new []
      })
    );
};

// get school by id
export const getExamDefine = id => dispatch => {
  if (id) {
    console.log('topicId', id);
    dispatch(setPostLoading());
    axios
      .get(`/api/examDefine/${id}`)
      .then(res => {
          dispatch({
            type: GET_EXAMPLE_EXAM_DEFINE,
            payload: res.data
          })
        }
      )
      .catch(err =>
        dispatch({
          type: GET_EXAMPLE_EXAM_DEFINE,
          payload: null
        })
      );
  } else {
    dispatch({
      type: GET_EXAMPLE_EXAM_DEFINE,
      payload: {}
    })
  }

};

// add new school
export const addExamDefine = (topicData, history) => dispatch => {
  console.log('dataAdd', topicData);
  axios
    .post('/api/examDefine/addExamDefine', topicData)
    .then((res) => {
        dispatch(showMessage({message: 'ExamDefine Saved'}));
        dispatch({
          type: ADD_EXAMPLE_EXAM_DEFINE,
          payload: res.data
        });
        history.push("/exampleExamDefine");
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// update school
export const updateExamDefine = (topicData, history) => dispatch => {
  console.log('dataUpdate', topicData);
  axios
    .put('/api/examDefine/updateExamDefine', topicData)
    .then((res) => {
        dispatch(showMessage({message: 'ExamDefine Updated'}));
        dispatch({
          type: UPDATE_EXAMPLE_EXAM_DEFINE,
          payload: res.data
        });
        history.push("/exampleExamDefine");
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Set loading state
export const newExamDefine = () => {
  const data = {
    idExamDefine: "",
    degreeNumber: "",
    nameClass: "",
    subject: "",
    nameExam: "",
    typeTime: "",
    isOnlineExam: true,
    isPrivateExam: true,
    startTime: "",
    expiredTime: "",
    isRandomQuestion: "",
    isRandomResult: "",
    examDefineList: []
  };

  return {
    type: NEW_EXAMPLE_EXAM_DEFINE,
    payload: data
  };
};

export const deleteExamDefine = (id, history) => dispatch => {
  axios
    .delete(`/api/examDefine/${id}`)
    .then((res) => {
        dispatch(showMessage({message: 'Xóa thành công'}));
        axios.get('/api/examDefine')
          .then(res =>
            dispatch({
              type: GET_ALL_EXAMPLE_EXAM_DEFINE,
              payload: res.data
            })
          )
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: EXAMPLE_EXAM_DEFINE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
