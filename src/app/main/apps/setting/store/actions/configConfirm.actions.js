// Export Constants
import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_CONFIG_CONFIRM = 'GET_ALL_CONFIG_CONFIRM';
export const CONFIG_CONFIRM_LOADING = 'CONFIG_CONFIRM_LOADING';
export const ADD_CONFIG_CONFIRM = 'ADD_CONFIG_CONFIRM';
export const UPDATE_CONFIG_CONFIRM = 'UPDATE_CONFIG_CONFIRM';
export const NEW_CONFIG_CONFIRM = 'NEW_CONFIG_CONFIRM';
export const GET_CONFIG_CONFIRM = 'GET_CONFIG_CONFIRM';
export const SET_PRODUCTS_SEARCH_TEXT = 'SET_PRODUCTS_SEARCH_TEXT';
export const CLEAR_CONFIG_CONFIRM = 'CLEAR_CONFIG_CONFIRM';

// Export Actions
export function setConfigConfirmsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

// get all school
export const getAllConfigConfirm = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/configConfirm')
        .then(res => {
            console.log('getAllConfigConfirm data', res );
            dispatch({
                 type: GET_ALL_CONFIG_CONFIRM,
                 payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_CONFIG_CONFIRM,
                payload:[]
            })
        );
};

// get all user by schoolID
export const getConfigConfirmBySchool = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/configConfirm/getBySchool/${id}`)
        .then(res => {
                console.log('getAllConfigConfirm data', res );
                dispatch({
                    type: GET_ALL_CONFIG_CONFIRM,
                    payload: (res.data === null ? new [] : res.data),

                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_CONFIG_CONFIRM,
                payload:[]
            })
        );
};



// get school by id
export const getConfigConfirm = id => dispatch => {
    dispatch({
        type: GET_CONFIG_CONFIRM,
        payload: {}
    })
    if (id) {
        dispatch(setPostLoading());
        axios
            .get(`/api/configConfirm/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_CONFIG_CONFIRM,
                        payload: res.data
                    })
            })
            .catch(err =>
                dispatch({
                    type: GET_CONFIG_CONFIRM,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_CONFIG_CONFIRM,
            payload: {}
        })
    }

};

// add new school
export const addConfigConfirm = (userData, history) => dispatch => {
    console.log('dataAdd', userData);
    axios
        .post('/api/configConfirm', userData)
        .then((res) => {
            dispatch(showMessage({message: 'ConfigConfirm Saved'}));
                dispatch({
                    type: ADD_CONFIG_CONFIRM,
                    payload: res.data
                });
                history.push("/manageConfigConfirm/new");
            }
        )
        .catch(err => {
                dispatch(showMessage({message: 'Vui lòng nhập các trường bắt buộc'}));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                })
        });
};

// update school
export const updateConfigConfirm = (userData, history) => dispatch => {
    console.log('dataUpdate', userData);
    axios
        .put('/api/configConfirm', userData)
        .then((res) => {
            dispatch(showMessage({message: 'ConfigConfirm Updated'}));
                dispatch({
                    type: UPDATE_CONFIG_CONFIRM,
                    payload: res.data
                });
                history.push("/manageConfigConfirm/new");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const removeConfigConfirm = (id, history) => dispatch => {
    axios
        .get(`/api/configConfirm/${id}`)
        .then((res) => {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios.get('/api/configConfirm')
                    .then(res =>
                        dispatch({
                            type: GET_ALL_CONFIG_CONFIRM,
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
export const newConfigConfirm = () => {
    return {
        type: NEW_CONFIG_CONFIRM
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: CONFIG_CONFIRM_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const clearConfigConfirm = () => {
    return {
        type: CLEAR_CONFIG_CONFIRM
    };
};
