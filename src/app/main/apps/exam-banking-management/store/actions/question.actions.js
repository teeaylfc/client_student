import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';
export const GET_ALL_QUESTION = 'GET_ALL_QUESTION';
export const QUESTION_LOADING = 'QUESTION_LOADING';
export const ADD_QUESTION = 'ADD_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const NEW_QUESTION = 'NEW_QUESTION';
export const GET_QUESTION = 'GET_QUESTION';
export const SET_QUESTION_SEARCH_TEXT = 'SET_QUESTION_SEARCH_TEXT';
export const SET_QUESTION_FIELD = 'SET_QUESTION_FIELD';
export const UPLOAD_FILE = 'UPLOAD_FILE';


// Export Actions
export function setQuestionSearchText(event) {
  return {
    type: SET_QUESTION_SEARCH_TEXT,
    searchText: event.target.value
  }
}
export function setQuestionField(event) {
  return {
    type: SET_QUESTION_FIELD,
    field: event.target.value
  }
}

// get all school
export const getAllQuestion = (page, pageSize, schoolId) => dispatch => {
  console.log('getAllQuestion data');
  let sort = {
    updatedDate: -1
  }
  dispatch(setPostLoading());
  axios
    .get('/api/question', {
        params: {
            page : page,
            pageSize: pageSize,
            schoolId: schoolId,
            sort : sort
        }
    })
    .then(res => {
        console.log('getAllQuestion data', res);
        dispatch({
          type: GET_ALL_QUESTION,
          payload: (res.data === null ? new [] : res.data)
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_QUESTION,
        payload: []
      })
    );
};

// get school by id
export const getQuestion = id => dispatch => {
  if (id) {
    console.log('QuestionId', id);
    dispatch(setPostLoading());
    axios
      .get(`/api/question/${id}`)
      .then(res => {
          if (res && res.data.questionType === 'MATCHING') {
              let questionData = res.data;
              console.log(questionData);
              let answerList = [];
              for (let i = 0; i < questionData.answerList.length; i++) {
                  for (let j = 0; j < questionData.answerMatchList.length; j++) {
                      if (questionData.answerList[i].idAnswer === questionData.answerMatchList[j].idAnswer) {
                          let answer = {
                              _id : questionData.answerList[i]._id,
                              idAnswer: questionData.answerList[i].idAnswer,
                              answerValue: questionData.answerList[i].answerValue,
                              answerValueMatch: questionData.answerMatchList[j].answerValue
                          }
                          answerList.push(answer);
                          break;
                      }
                  }
              }
              res.data.answerList = answerList;
              console.log(res.data);
          }

          dispatch({
            type: GET_QUESTION,
            payload: res.data
          })
        }
      )
      .catch(err =>
        dispatch({
          type: GET_QUESTION,
          payload: null
        })
      );
  } else {
    dispatch({
      type: GET_QUESTION,
      payload: {}
    })
  }

};

// add new school
export const addQuestion = (questionData, history) => dispatch => {
  console.log('dataAdd', questionData);
  if (questionData.questionType === 'MATCHING') {
      let answerList = [];
      let answerMatchList = [];
      for (let i = 0; i < questionData.answerList.length; i++) {
          let answer = {
              "idAnswer" : questionData.answerList[i].idAnswer,
              "answerValue" : questionData.answerList[i].answerValue
          };
          answerList.push(answer);
          let answerMatch = {
              "idAnswer" : questionData.answerList[i].idAnswer,
              "answerValue" : questionData.answerList[i].answerValueMatch
          };
          answerMatchList.push(answerMatch);
      }
      questionData.answerList = answerList;
      questionData.answerMatchList = answerMatchList;
  }

  axios
    .post('/api/question/saveQuestion', questionData)
    .then((res) => {
        dispatch(showMessage({message: 'Questions Pack Saved'}));
        dispatch({
          type: ADD_QUESTION,
          payload: res.data
        });
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
export const updateQuestion = (questionData, history) => dispatch => {
  console.log('dataUpdate', questionData);
    if (questionData.questionType === 'MATCHING') {
        let answerList = [];
        let answerMatchList = [];
        for (let i = 0; i < questionData.answerList.length; i++) {
            let answer = {
                "idAnswer" : questionData.answerList[i].idAnswer,
                "answerValue" : questionData.answerList[i].answerValue
            };
            answerList.push(answer);
            let answerMatch = {
                "idAnswer" : questionData.answerList[i].idAnswer,
                "answerValue" : questionData.answerList[i].answerValueMatch
            };
            answerMatchList.push(answerMatch);
        }
        questionData.answerList = answerList;
        questionData.answerMatchList = answerMatchList;
    }
  axios
    .put('/api/question/saveQuestion', questionData)
    .then((res) => {
        dispatch(showMessage({message: 'Questions Pack Updated'}));
        dispatch({
          type: UPDATE_QUESTION,
          payload: res.data
        });
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

export const deleteQuestion = (id, history) => dispatch => {
  axios
    .delete(`/api/question/${id}`)
    .then((res) => {
        dispatch(showMessage({message: 'Xóa thành công'}));
        axios.get('/api/question')
          .then(res =>
            dispatch({
              type: GET_ALL_QUESTION,
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

export const uploadQuestion = (uploadFile, idSchool, callback) => dispatch => {
    let data = new FormData();
    data.append('uploadFile', uploadFile);
    data.append('idSchool', idSchool)
    axios
        .post('/api/question/upload', data)
        .then((res) => {
                console.log('upload result:', res.data);
                dispatch(showMessage({message: 'Questions uploaded'}));
                dispatch({
                    type: UPLOAD_FILE,
                    payload: res.data
                });
                callback();
            }
        )
        .catch(err => {
            console.log('uploadQuestion err', err);
            dispatch({
                type: GET_ERRORS,
                payload: err,
            })
        });
};

// Set loading state
export const newQuestion = () => {
  const data = {
    _id: '',
    subject: '',
    classRoom: '',
    questionType: 'SINGLE_CHOICE',
    topic: '',
    questionsPack: '',
    questionLevel: '',
    questionString: '',
    answerList: [],
    questionList: [],
  };

  return {
    type: NEW_QUESTION,
    payload: data
  };
};


// Set loading state
export const setPostLoading = () => {
  return {
    type: QUESTION_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
