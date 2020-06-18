import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_GROUP_SUBJECT = 'GET_ALL_GROUP_SUBJECT';
export const GROUP_SUBJECT_LOADING = 'GROUP_SUBJECT_LOADING';
export const ADD_GROUP_SUBJECT = 'ADD_GROUP_SUBJECT';
export const UPDATE_GROUP_SUBJECT = 'UPDATE_GROUP_SUBJECT';
export const NEW_GROUP_SUBJECT = 'NEW_GROUP_SUBJECT';
export const GET_GROUP_SUBJECT = 'GET_GROUP_SUBJECT';
export const DELETE_GROUP_SUBJECT = 'DELETE_GROUP_SUBJECT';
export const SET_GROUP_SUBJECT_SEARCH_TEXT = 'SET_GROUP_SUBJECT_SEARCH_TEXT';
export const SET_GROUP_SUBJECT_FIELD = 'SET_GROUP_SUBJECT_FIELD';

// Export Actions
export function setgroupSubjectSearchText(event)
{
    return {
        type      : SET_GROUP_SUBJECT_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setGroupSubjectField(event)
{
    return {
        type      : SET_GROUP_SUBJECT_FIELD,
        field: event.target.value
    }
}

// get all school
export const getAllGroupSubject = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/groupSubject')
        .then(res => {
            dispatch({
                type: GET_ALL_GROUP_SUBJECT,
                payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_GROUP_SUBJECT,
                payload: new []
            })
        );
};
// get all group by school id
export const getGroupBySchoolId = (id) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/groupSubject/getGroupBySchoolId/${id}`)
    .then(res => {
        dispatch({
          type: GET_ALL_GROUP_SUBJECT,
          payload: (res.data === null ? new [] : res.data),

        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_GROUP_SUBJECT,
        payload: []
      })
    );
};


// get school by id
export const getGroupSubject = id => dispatch => {
    if (id) {
        console.log('topicId', id);
        dispatch(setPostLoading());
        axios
            .get(`/api/groupSubject/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_GROUP_SUBJECT,
                        payload: res.data
                    })
            }

            )
            .catch(err =>
                dispatch({
                    type: GET_GROUP_SUBJECT,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_GROUP_SUBJECT,
            payload: {}
        })
    }

};

// add new school
export const addGroupSubject = (topicData, history) => dispatch => {
    console.log('dataAdd', topicData);
    axios
        .post('/api/groupSubject/addGroupSubject', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'groupSubject Saved'}));
                dispatch({
                    type: ADD_GROUP_SUBJECT,
                    payload: res.data
                });
                history.push("/manageGroupSubject");
            }
        )
        .catch(err =>{
            dispatch(showMessage({message: Object.values(err.response.data)}));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
};

// update school
export const updateGroupSubject = (topicData, history) => dispatch => {
    console.log('dataUpdate', topicData);
    axios
        .put('/api/groupSubject/updateGroupSubject', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'GroupSubject Updated'}));
                dispatch({
                    type: UPDATE_GROUP_SUBJECT,
                    payload: res.data
                });
                history.push("/manageGroupSubject");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const deleteGroupSubject = (id, schoolId, history) => dispatch => {
    axios
        .get(`/api/groupSubject/delete/${id}`)
        .then((res) => {
            console.log('deleteGroupSubject', res);
            if (res.data.error) {
                dispatch(showMessage({message: res.data.error.errorMessage}));
            } else {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios
                    .get(`/api/groupSubject/getGroupBySchoolId/${schoolId}`)
                    .then(res => {
                            dispatch({
                                type: GET_ALL_GROUP_SUBJECT,
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
export const newGroupSubject = () => {
    return {
        type: NEW_GROUP_SUBJECT
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: GROUP_SUBJECT_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
