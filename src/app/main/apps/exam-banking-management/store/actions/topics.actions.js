// Export Constants
import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_TOPICS = 'GET_ALL_TOPICS';
export const TOPICS_LOADING = 'TOPICS_LOADING';
export const ADD_TOPIC = 'ADD_TOPIC';
export const UPDATE_TOPIC = 'UPDATE_TOPIC';
export const NEW_TOPIC = 'NEW_TOPIC';
export const GET_TOPIC = 'GET_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';
export const SET_TOPICS_SEARCH_TEXT = 'SET_TOPICS_SEARCH_TEXT';
export const SET_TOPICS_FIELD = 'SET_TOPICS_FIELD';

// Export Actions
export function setTopicsSearchText(event)
{
    return {
        type      : SET_TOPICS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setTopicField(event)
{
    return {
        type      : SET_TOPICS_FIELD,
        field: event.target.value
    }
}

// get all school
export const getAllTopic = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/topics')
        .then(res => {
            dispatch({
                type: GET_ALL_TOPICS,
                payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_TOPICS,
                payload: new []
            })
        );
};

// get topic by subject and degree
export const getTopicsBySubjectAndDegree = (subject, degreeNumber, schoolId) => dispatch => {

    console.log('getAllExamDefine data');
    let criteria = {
        schoolId: schoolId
    }

    if(subject !== "") {
        criteria.subjectName = subject;
    }

    if(degreeNumber !== "") {
        criteria.degreeNumber = degreeNumber;
    }
    let params= {
        pageSize: 100,
        criteria: criteria
    }

    dispatch(setPostLoading());
    axios
        .get('/api/topics/list/getAll', {
            params: params
        })
        .then(res => {
                console.log('getAllTopics data', res);
                dispatch({
                    type: GET_ALL_TOPICS,
                    payload: (res.data.data === null ? new [] : res.data.data),
                })
            }
        )
        .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ALL_TOPICS,
                    payload: []
                })
            }
        );
};

// get school by id
export const getTopicBySchoolId = (id, user) => async dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/topics/school/${id}/${user}`)
        .then(res => {
                dispatch({
                    type: GET_ALL_TOPICS,
                    payload: (res.data === null ? new [] : res.data),
                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_TOPICS,
                payload: new []
            })
        );

};


// get school by id
export const getTopic = id => async dispatch => {
    await dispatch({
        type: GET_TOPIC,
        payload: {}
    });
    if (id) {
        await dispatch(setPostLoading());
        axios
            .get(`/api/topics/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_TOPIC,
                        payload: res.data
                    })
            }

            )
            .catch(err =>
                dispatch({
                    type: GET_TOPIC,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_TOPIC,
            payload: {}
        })
    }

};

// add new school
export const addTopic = (topicData, history) => dispatch => {
    console.log('dataAdd', topicData);
    axios
        .post('/api/topics/addTopic', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'Topic Saved'}));
                dispatch({
                    type: ADD_TOPIC,
                    payload: res.data
                });
                history.push("/manageTopic");
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
          }
        );
};

// update school
export const updateTopic = (topicData, history) => dispatch => {
    console.log('dataUpdate', topicData);
    axios
        .put('/api/topics/updateTopic', topicData)
        .then((res) => {
            dispatch(showMessage({message: 'Topic Updated'}));
                dispatch({
                    type: UPDATE_TOPIC,
                    payload: res.data
                });
                history.push("/manageTopic");
            }
        )
        .catch(err =>
          {
            if (err.response.data.message)
              dispatch(showMessage({message: err.response.data.message}));
            else
              dispatch(showMessage({message: 'Vui lòng nhập các trường bắt buộc'}));
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data,
            })
          }
        );
};

export const deleteTopic = (id, schoolId, user) => dispatch => {
    axios
        .get(`/api/topics/delete/${id}`)
        .then((res) => {
            console.log('deleteTopic', res);
            if (res.data.error) {
                dispatch(showMessage({message: res.data.error.errorMessage}));
            } else {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios
                    .get(`/api/topics/school/${schoolId}/${user}`)
                    .then(res => {
                            dispatch({
                                type: GET_ALL_TOPICS,
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
export const newTopic = () => {
    return {
        type: NEW_TOPIC
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: TOPICS_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
