import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';
export const GET_ALL_VOCABULARY = 'GET_ALL_VOCABULARY';
export const VOCABULARY_LOADING = 'VOCABULARY_LOADING';
export const ADD_VOCABULARY = 'ADD_VOCABULARY';
export const UPDATE_VOCABULARY = 'UPDATE_VOCABULARY';
export const NEW_VOCABULARY = 'NEW_VOCABULARY';
export const GET_VOCABULARY = 'GET_VOCABULARY';
export const DELETE_VOCABULARY = 'DELETE_VOCABULARY';
export const SET_VOCABULARY_SEARCH_TEXT = 'SET_VOCABULARY_SEARCH_TEXT';
export const SET_VOCABULARY_FIELD = 'SET_VOCABULARY_FIELD';

// Export Actions
export function setVocabularySearchText(event)
{
    return {
        type      : SET_VOCABULARY_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setVocabularyField(event)
{
    return {
        type      : SET_VOCABULARY_FIELD,
        field: event.target.value
    }
}

// get all school
export const getAllVocabulary = (page, pageSize, schoolId) => dispatch => {
    let criteria = {
        schoolId: schoolId
    }
    let sort = {
        createDate: -1
    }
    let params= {
        page : page,
        pageSize: pageSize,
        criteria: criteria,
        sort : sort
    }
    dispatch(setPostLoading());
    axios
        .get('/api/vocabulary/list/getAll', {
            params: params
        })
        .then(res => {
            dispatch({
                type: GET_ALL_VOCABULARY,
                payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_VOCABULARY,
                payload: []
            })
        );
};

// get all school
export const getAllVocabularyBySchool = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/subject/getBySchool/${id}`)
        .then(res => {
                dispatch({
                    type: GET_ALL_VOCABULARY,
                    payload: (res.data === null ? new [] : res.data),

                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_VOCABULARY,
                payload: []
            })
        );
};

// get school by id
export const getVocabulary = id => async dispatch => {
    await dispatch({
        type: NEW_VOCABULARY
    })

    if (id) {
        await dispatch(setPostLoading());
        axios
            .get(`/api/vocabulary/${id}`)
            .then(res => {
                    dispatch({
                        type: GET_VOCABULARY,
                        payload: res.data
                    })
                }
            )
            .catch(err =>
                dispatch({
                    type: GET_VOCABULARY,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_VOCABULARY,
            payload: {}
        })
    }

};

// add new school
export const addVocabulary = (topicData, history) => dispatch => {
    console.log('dataAdd', topicData);
    axios
        .post('/api/vocabulary/addVocabulary', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'subject Saved'}));
                dispatch({
                    type: ADD_VOCABULARY,
                    payload: res.data
                });
                history.push("/manageVocabulary");
            }
        )
        .catch(err => {
            if (err.response.data.message)
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
export const updateVocabulary = (topicData, history) => dispatch => {
    console.log('dataUpdate', topicData);
    axios
        .put('/api/vocabulary/updateVocabulary', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'Vocabulary Updated'}));
                dispatch({
                    type: UPDATE_VOCABULARY,
                    payload: res.data
                });
                history.push("/manageVocabulary");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const deleteVocabulary = (id, schoolId, history) => dispatch => {
    axios
        .get(`/api/vocabulary/delete/${id}`)
        .then((res) => {
            console.log('deleteVocabulary', res);
            dispatch(showMessage({message: 'Xóa thành công'}));
        })
        .catch(err => {
            const message = err.response.data.message;
            dispatch(showMessage({message: message}));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
};

// Set loading state
export const newVocabulary = () => {
    return {
        type: NEW_VOCABULARY
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: VOCABULARY_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
