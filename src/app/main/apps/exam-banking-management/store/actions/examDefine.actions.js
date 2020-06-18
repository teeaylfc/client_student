// Export Constants
import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_EXAM_DEFINE = 'GET_ALL_EXAM_DEFINE';
export const EXAM_DEFINE_LOADING = 'EXAM_DEFINE_LOADING';
export const ADD_EXAM_DEFINE = 'ADD_EXAM_DEFINE';
export const PREVIEW_EXAM_DEFINE = 'PREVIEW_EXAM_DEFINE';
export const UPDATE_EXAM_DEFINE = 'UPDATE_EXAM_DEFINE';
export const NEW_EXAM_DEFINE = 'NEW_EXAM_DEFINE';
export const GET_EXAM_DEFINE = 'GET_EXAM_DEFINE';
export const SET_EXAM_DEFINE_SEARCH_TEXT = 'SET_EXAM_DEFINE_SEARCH_TEXT';
export const SET_EXAM_DEFINE_FIELD = 'SET_EXAM_DEFINE_FIELD';

// Export Actions
export function setExamDefineSearchText(event) {
    return {
        type: SET_EXAM_DEFINE_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setExamDefineField(event) {
    return {
        type: SET_EXAM_DEFINE_FIELD,
        field: event.target.value
    }
}

// get all exam define
export const getAllExamDefine = (page, pageSize, schoolId) => dispatch => {
    console.log('getAllExamDefine data');
    dispatch(setPostLoading());
    axios
        .get('/api/examDefine', {
            params: {
                page : page,
                pageSize: pageSize,
                schoolId: schoolId
            }
        })
        .then(res => {
                console.log('getAllExamDefine data', res);
                dispatch({
                    type: GET_ALL_EXAM_DEFINE,
                    payload: res.data,
                })
            }
        )
        .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ALL_EXAM_DEFINE,
                    payload: []
                })
            }
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
                        type: GET_EXAM_DEFINE,
                        payload: res.data
                    })
                }
            )
            .catch(err =>
                dispatch({
                    type: GET_EXAM_DEFINE,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_EXAM_DEFINE,
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
                    type: ADD_EXAM_DEFINE,
                    payload: res.data
                });
                history.push("/managerExamDefine");
            }
        )
        .catch(err =>
            {
                if (err.response.data.message)
                    dispatch( showMessage({
                        message: err.response.data.message,
                        variant: 'error'
                    }));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                })
            }
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
                    type: UPDATE_EXAM_DEFINE,
                    payload: res.data
                });
                history.push("/managerExamDefine");
            }
        )
        .catch(err =>
            {
                console.log(err.response.data);
                if (err.response.data.message)
                    dispatch( showMessage({
                        message: err.response.data.message,
                        variant: 'error'
                    }));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                })
            }
        );
};

// Set loading state
export const newExamDefine = () => {
    const data = {
        dExamDefine: "",
        degreeNumber: "",
        nameClass: "",
        subject: "",
        nameExam: "",
        typeTime: "",
        isOnlineExam: true,
        isPrivateExam: true,
        startTime: new Date(),
        totalTime: 0,
        effectStartTime: new Date(),
        effectExpiredTime: new Date(),
        isRandomQuestion: false,
        isRandomResult: false,
        examDefineList: [],
        userCreate: "",
        schoolId: "",
        example: false,
        level: "",
        draft: true,
        questionList: [],
    };

    return {
        type: NEW_EXAM_DEFINE,
        payload: data
    };
};

export const deleteExamDefine = (id, schoolId, page, pageSize, history) => dispatch => {
    axios
        .delete(`/api/examDefine/${id}`)
        .then((res) => {
            dispatch(showMessage({message: 'Xóa thành công'}));
            axios.get('/api/examDefine', {
              params: {
                page: page,
                pageSize: pageSize,
                schoolId: schoolId
              }
            })
              .then(res => {
                  console.log(res.data);
                  if (res.data && res.data.data.length > 0) {
                    console.log("Get data");
                    dispatch({
                      type: GET_ALL_EXAM_DEFINE,
                      payload: res.data
                    })
                  } else if (page > 1) {
                    axios.get('/api/examDefine', {
                      params: {
                        page: page - 1,
                        pageSize: pageSize,
                        schoolId: schoolId
                      }
                    }).then(
                      dispatch({
                        type: GET_ALL_EXAM_DEFINE,
                        payload: res.data
                      })
                    )
                  } else {
                    dispatch({
                      type: GET_ALL_EXAM_DEFINE,
                      payload: res.data
                    })
                  }
                }
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

export const previewExamDefine = (examDefine, history) => dispatch => {
    dispatch(setPostLoading());
    console.log('preview exam define', examDefine);
    axios
        .post('/api/examDefine/question', examDefine)
        .then((res) => {
                dispatch({
                    type: PREVIEW_EXAM_DEFINE,
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
// Set loading state
export const setPostLoading = () => {
    return {
        type: EXAM_DEFINE_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
