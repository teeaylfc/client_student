// Export Constants
import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_ENTER_POINT = 'GET_ALL_ENTER_POINT';
export const ENTER_POINT_LOADING = 'ENTER_POINT_LOADING';
export const ADD_ENTER_POINT = 'ADD_ENTER_POINT';
export const UPDATE_ENTER_POINT = 'UPDATE_ENTER_POINT';
export const NEW_ENTER_POINT = 'NEW_ENTER_POINT';
export const GET_ENTER_POINT = 'GET_ENTER_POINT';
export const DELETE_ENTER_POINT = 'DELETE_ENTER_POINT';
export const SET_ENTER_POINT_SEARCH_TEXT = 'SET_ENTER_POINT_SEARCH_TEXT';

// Export Actions
export function setSubjectSearchText(event)
{
    return {
        type      : SET_ENTER_POINT_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export const getAllEnterPoint = (schoolId, userId, page, pageSize) => dispatch => {
    let criteria = {
        schoolId: schoolId,
        userId: userId
    };
    let params= {
        page : page,
        pageSize: pageSize,
        criteria: criteria
    };
    dispatch(setPostLoading());
    axios
        .get('/api/enterPoint', {
            params: params
        })
        .then(res => {
            dispatch({
                type: GET_ALL_ENTER_POINT,
                payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_ENTER_POINT,
                payload: []
            })
        );
};


// get school by id
export const getEnterPointForStudent = id => dispatch => {
    dispatch({
        type: NEW_ENTER_POINT
    })
    if (id) {
        dispatch(setPostLoading());
        axios
            .get(`/api/enterPoint/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_ENTER_POINT,
                        payload: res.data
                    })
                }

            )
            .catch(err =>
                dispatch({
                    type: GET_ENTER_POINT,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_ENTER_POINT,
            payload: {}
        })
    }

};

// add new school
export const addEnterPoint = (topicData, history) => dispatch => {
    console.log('dataAdd', topicData);
    axios
        .post('/api/subject/addEnterPoint', topicData)
        .then((res) => {
                dispatch(showMessage({message: 'subject Saved'}));
                dispatch({
                    type: ADD_ENTER_POINT,
                    payload: res.data
                });
                history.push("/manageEnterPoint");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// update enterPointData
export const updateEnterPoint = (enterPointData, history) => dispatch => {
    console.log('enterPointData', enterPointData);
    axios
        .put('/api/enterPoint/', enterPointData)
        .then((res) => {
                dispatch(showMessage({message: 'EnterPoint Updated'}));
                dispatch({
                    type: UPDATE_ENTER_POINT,
                    payload: res.data
                });
                history.push("/manageEnterPoint");
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

export const deleteEnterPoint = (id, schoolId, history) => dispatch => {
    axios
        .get(`/api/subject/delete/${id}`)
        .then((res) => {
            console.log('deleteEnterPoint', res);
            if (res.data.error) {
                dispatch(showMessage({message: res.data.error.errorMessage}));
            } else {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios
                    .get(`/api/subject/getBySchool/${schoolId}`)
                    .then(res => {
                            dispatch({
                                type: GET_ALL_ENTER_POINT,
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
export const newEnterPoint = () => {
    return {
        type: NEW_ENTER_POINT
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: ENTER_POINT_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
