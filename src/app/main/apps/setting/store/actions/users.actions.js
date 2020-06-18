// Export Constants
import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const USERS_LOADING = 'USERS_LOADING';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const NEW_USER = 'NEW_USER';
export const GET_USER = 'GET_USER';
export const SET_USER_SEARCH_TEXT = 'SET_USER_SEARCH_TEXT';
export const SET_USER_FIELD = 'SET_USER_FIELD';
export const CLEAR_USER = 'CLEAR_USER';

// Export Actions
export function setUsersSearchText(event)
{
    return {
        type      : SET_USER_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setUserField(event)
{
    return {
        type      : SET_USER_FIELD,
        field: event.target.value
    }
}

// get all school
export const getAllUser = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/users')
        .then(res => {
            console.log('getAllUser data', res );
            dispatch({
                 type: GET_ALL_USERS,
                 payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_USERS,
                payload:[]
            })
        );
};

// get all user by schoolID
export const getUserBySchool = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/users/getBySchool/${id}`)
        .then(res => {
                console.log('getAllUser data', res );
                dispatch({
                    type: GET_ALL_USERS,
                    payload: (res.data === null ? new [] : res.data),

                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_USERS,
                payload:[]
            })
        );
};



// get school by id
export const getUser = id => dispatch => {
    dispatch({
        type: GET_USER,
        payload: {}
    })
    if (id) {
        dispatch(setPostLoading());
        axios
            .get(`/api/users/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_USER,
                        payload: res.data
                    })
            })
            .catch(err =>
                dispatch({
                    type: GET_USER,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_USER,
            payload: {}
        })
    }

};

// add new school
export const addUser = (userData, history) => dispatch => {
    console.log('dataAdd', userData);
    axios
        .post('/api/users', userData)
        .then((res) => {
            dispatch(showMessage({message: 'User Saved'}));
                dispatch({
                    type: ADD_USER,
                    payload: res.data
                });
                history.push("/manageUser/new");
            }
        )
        .catch(err => {
                dispatch(showMessage({message: Object.values(err.response.data)}));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                })
        });
};

// update school
export const updateUser = (userData, history) => dispatch => {
    console.log('dataUpdate', userData);
    axios
        .put('/api/users', userData)
        .then((res) => {
            dispatch(showMessage({message: 'User Updated'}));
                dispatch({
                    type: UPDATE_USER,
                    payload: res.data
                });
                history.push("/manageUser/new");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const removeUser = (id, history) => dispatch => {
    axios
        .delete(`/api/users/${id}`)
        .then((res) => {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios.get('/api/users')
                    .then(res =>
                        dispatch({
                            type: GET_ALL_USERS,
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
export const newUser = () => {
    return {
        type: NEW_USER
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: USERS_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const clearUser = () => {
    return {
        type: CLEAR_USER
    };
};
