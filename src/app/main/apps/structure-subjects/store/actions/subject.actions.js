import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_SUBJECT = 'GET_ALL_SUBJECT';
export const SUBJECT_LOADING = 'SUBJECT_LOADING';
export const ADD_SUBJECT = 'ADD_SUBJECT';
export const UPDATE_SUBJECT = 'UPDATE_SUBJECT';
export const NEW_SUBJECT = 'NEW_SUBJECT';
export const GET_SUBJECT = 'GET_SUBJECT';
export const DELETE_SUBJECT = 'DELETE_SUBJECT';
export const SET_SUBJECT_SEARCH_TEXT = 'SET_SUBJECT_SEARCH_TEXT';
export const SET_SUBJECT_FIELD = 'SET_SUBJECT_FIELD';
export const SET_GROUP_SUBJECT_FIELD_FILTER = 'SET_GROUP_SUBJECT_FIELD_FILTER';

// Export Actions
export function setSubjectSearchText(event)
{
    return {
        type      : SET_SUBJECT_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setSubjectField(event)
{
    return {
        type      : SET_SUBJECT_FIELD,
        field: event.target.value
    }
}

export function setGroupSubjectField(event)
{
    return {
        type      : SET_GROUP_SUBJECT_FIELD_FILTER,
        field: event.target.value
    }
}

// get all school
export const getAllSubject = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/subject')
        .then(res => {
            dispatch({
                type: GET_ALL_SUBJECT,
                payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_SUBJECT,
                payload: []
            })
        );
};

// get all school
export const getAllSubjectBySchool = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/subject/getBySchool/${id}`)
        .then(res => {
                dispatch({
                    type: GET_ALL_SUBJECT,
                    payload: (res.data === null ? new [] : res.data),

                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_SUBJECT,
                payload: []
            })
        );
};

// get school by id
export const getSubject = id => dispatch => {
    if (id) {
        console.log('topicId', id);
        dispatch(setPostLoading());
        axios
            .get(`/api/subject/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_SUBJECT,
                        payload: res.data
                    })
            }

            )
            .catch(err =>
                dispatch({
                    type: GET_SUBJECT,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_SUBJECT,
            payload: {}
        })
    }

};

// add new school
export const addSubject = (topicData, history) => dispatch => {
    console.log('dataAdd', topicData);
    axios
        .post('/api/subject/addSubject', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'subject Saved'}));
                dispatch({
                    type: ADD_SUBJECT,
                    payload: res.data
                });
                history.push("/manageSubject");
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
export const updateSubject = (topicData, history) => dispatch => {
    console.log('dataUpdate', topicData);
    axios
        .put('/api/subject/updateSubject', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'Subject Updated'}));
                dispatch({
                    type: UPDATE_SUBJECT,
                    payload: res.data
                });
                history.push("/manageSubject");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const deleteSubject = (id, schoolId, history) => dispatch => {
    axios
        .get(`/api/subject/delete/${id}`)
        .then((res) => {
            console.log('deleteSubject', res);
            if (res.data.error) {
                dispatch(showMessage({message: res.data.error.errorMessage}));
            } else {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios
                    .get(`/api/subject/getBySchool/${schoolId}`)
                    .then(res => {
                            dispatch({
                                type: GET_ALL_SUBJECT,
                                payload: (res.data === null ? new [] : res.data),

                            })
                        }
                    )
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// Set loading state
export const newSubject = () => {
    return {
        type: NEW_SUBJECT
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: SUBJECT_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
