import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_QUESTIONS_PACK = 'GET_ALL_QUESTIONS_PACK';
export const QUESTIONS_PACK_LOADING = 'QUESTIONS_PACK_LOADING';
export const ADD_QUESTIONS_PACK = 'ADD_QUESTIONS_PACK';
export const UPDATE_QUESTIONS_PACK = 'UPDATE_QUESTIONS_PACK';
export const NEW_QUESTIONS_PACK = 'NEW_QUESTIONS_PACK';
export const GET_QUESTIONS_PACK = 'GET_QUESTIONS_PACK';
export const SET_QUESTIONS_PACK_SEARCH_TEXT = 'SET_QUESTIONS_PACK_SEARCH_TEXT';
export const SET_QUESTIONS_PACK_FIELD = 'SET_QUESTIONS_PACK_FIELD';

// Export Actions
export function setQuestionsPackSearchText(event)
{
    return {
        type      : SET_QUESTIONS_PACK_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setQuestionsPackField(event)
{
    return {
        type      : SET_QUESTIONS_PACK_FIELD,
        field: event.target.value
    }
}

// get all school
export const getAllQuestionsPack = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/questionsPack')
        .then(res => {
            dispatch({
                type: GET_ALL_QUESTIONS_PACK,
                payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_QUESTIONS_PACK,
                payload: []
            })
        );
};

// get by school id
export const getQuestionsPackBySchoolId = (id) => dispatch => {
    if (id) {
        dispatch(setPostLoading());
        axios
            .get(`/api/questionsPack/school/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_ALL_QUESTIONS_PACK,
                        payload: (res.data === null ? new [] : res.data),

                    })
                }

            )
            .catch(err =>
                dispatch({
                    type: GET_ALL_QUESTIONS_PACK,
                    payload: new []
                })
            );
    } else {
        dispatch({
            type: GET_ALL_QUESTIONS_PACK,
            payload: {}
        })
    }

};


// get school by id
export const getQuestionsPack = id => async dispatch => {
    await dispatch({
        type: GET_QUESTIONS_PACK,
        payload: {}
    });
    if (id) {
        console.log('QuestionsPackId', id);
        await dispatch(setPostLoading());
        await axios
            .get(`/api/questionsPack/${id}`)
            .then(async res => {
                    await dispatch({
                        type: GET_QUESTIONS_PACK,
                        payload: res.data
                    })
                }
            )
            .catch(err =>
                dispatch({
                    type: GET_QUESTIONS_PACK,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_QUESTIONS_PACK,
            payload: {}
        })
    }

};

// add new school
export const addQuestionsPack = (questionsPackData, history) => dispatch => {
    console.log('dataAdd', questionsPackData);
    axios
        .post('/api/questionsPack/saveQuestionsPack', questionsPackData)
        .then((res) => {
            dispatch(showMessage({message: 'Questions Pack Saved'}));
                dispatch({
                    type: ADD_QUESTIONS_PACK,
                    payload: res.data
                });
          history.push("/manageQuestionsPack");
            }
        )
        .catch(err => {
          if  (err.response.data.message)
            dispatch(showMessage({message: err.response.data.message}));
          else
            dispatch(showMessage({message: 'Vui lòng nhập các trường bắt buộc'}));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
};

// update school
export const updateQuestionsPack = (questionsPackData, history) => dispatch => {
    console.log('dataUpdate', questionsPackData);
    axios
        .put('/api/questionsPack/saveQuestionsPack', questionsPackData)
        .then((res) => {
            dispatch(showMessage({message: 'Questions Pack Updated'}));
                dispatch({
                    type: UPDATE_QUESTIONS_PACK,
                    payload: res.data
                });
                history.push("/manageQuestionsPack");
            }
        )
        .catch(err => {
            if  (err.response.data.message)
                dispatch(showMessage({message: err.response.data.message}));
            else
                dispatch(showMessage({message: 'Vui lòng nhập các trường bắt buộc'}));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
};

export const removeQuestionPack = (id, schoolId, history) => dispatch => {
    axios
        .get(`/api/questionsPack/delete/${id}`)
        .then((res) => {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios.get(`/api/questionsPack/school/${schoolId}`)
                    .then(res =>
                        dispatch({
                            type: GET_ALL_QUESTIONS_PACK,
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
export const newQuestionsPack = () => {
    return {
        type: NEW_QUESTIONS_PACK
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: QUESTIONS_PACK_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
