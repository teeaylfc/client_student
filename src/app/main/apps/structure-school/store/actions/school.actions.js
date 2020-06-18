// Export Constants
import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_SCHOOL = 'GET_ALL_SCHOOL';
export const SCHOOL_LOADING = 'SCHOOL_LOADING';
export const ADD_SCHOOL = 'ADD_SCHOOL';
export const UPDATE_SCHOOL = 'UPDATE_SCHOOL';
export const DELETE_SCHOOL = 'DELETE_SCHOOL';
export const NEW_SCHOOL = 'NEW_SCHOOL';
export const GET_SCHOOL = 'GET_SCHOOL';
export const SET_SCHOOL_SEARCH_TEXT = 'SET_SCHOOL_SEARCH_TEXT';
export const SET_SCHOOL_FIELD = 'SET_SCHOOL_FIELD';
export const DATA_NOT_FOUND = 'DATA_NOT_FOUND';
export const GET_ALL_CITY = 'GET_ALL_CITY';
export const GET_DISTRICT = 'GET_DISTRICT';


// Export Actions

// get all school
export const getAllSchool = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/schools')
    .then(res => {
            dispatch({
                type: GET_ALL_SCHOOL,
                payload: res.data
            })
            console.log(res.data)
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_SCHOOL,
        payload: {}
      })
    );
};

// get all school
export const filterSchoolByCondition = (schoolData) => dispatch => {
    dispatch(setPostLoading());
    axios
        .post('/api/schools/filterSchool', schoolData)
        .then(res => {
            dispatch({
                type: GET_ALL_SCHOOL,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(err =>
            dispatch({
                type: GET_ALL_SCHOOL,
                payload: {}
            })
        );
};


// get school by account
export const getSchoolByUser = id => dispatch => {
    if (id) {
        dispatch(setPostLoading());
        axios
            .get(`/api/schools/getByUser/${id}`)
            .then(res =>
                dispatch({
                    type: GET_ALL_SCHOOL,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                })
            );
    } else {
        dispatch({
            type: GET_SCHOOL,
            payload: {}
        })
    }

};

// get school by account
export const getSchool = id => async dispatch => {
    await dispatch({
        type: NEW_SCHOOL
    });
    if (id) {
        await dispatch(setPostLoading());
        axios
            .get(`/api/schools/${id}`)
            .then(res => {
                console.log('schoolData', res.data)
                dispatch({
                    type: GET_SCHOOL,
                    payload: res.data
                })
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                })
            );
    } else {
        dispatch({
            type: GET_SCHOOL,
            payload: {}
        })
    }

};


// add new school
export const addSchool = (schoolData, history) => dispatch => {
    console.log('dataAdd', schoolData);
  axios
    .post('/api/schools', schoolData)
    .then((res) => {
        dispatch(showMessage({message: 'Lưu thành công'}));
        dispatch({
          type: ADD_SCHOOL,
          payload: res.data
        });
        history.push("/manageSchool");
      }
    )
    .catch(err => {
        dispatch(showMessage({message: 'Vui lòng nhập tất cả các trường bắt buộc'}));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
    });
};

// update school
export const updateSchool = (schoolData, history) => dispatch => {
  axios
    .put('/api/schools', schoolData)
    .then((res) => {
        dispatch(showMessage({message: 'Lưu thành công'}));
        dispatch({
          type: UPDATE_SCHOOL,
          payload: res.data
        });
        history.push("/manageSchool");
      }
    )
  .catch(err => {
      dispatch(showMessage({message: 'Vui lòng nhập tất cả các trường bắt buộc'}));
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
      })
  });
};


// update school
export const removeSchool = (id, history) => dispatch => {
    axios
        .delete(`/api/schools/${id}`)
        .then((res) => {
            dispatch(showMessage({message: 'Xóa thành công'}));
            axios.get('/api/schools')
                    .then(res =>
                        dispatch({
                            type: GET_ALL_SCHOOL,
                            payload: res.data
                        })
                    )
            }
        )
        .catch(err => {
          dispatch(showMessage(err.response.data));
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          })
        });
};


// Set loading state
export const newSchool = () => {

  return {
    type: NEW_SCHOOL
  };
};

export function setSchoolSearchText(event)
{
  return {
    type      : SET_SCHOOL_SEARCH_TEXT,
    searchText: event.target.value
  }
}
export function setSchoolField(event)
{
  return {
    type      : SET_SCHOOL_FIELD,
    field: event.target.value
  }
}

// Set loading state
export const setPostLoading = () => {
  return {
    type: SCHOOL_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};


// get all school
export const getCities = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/schools/getCity')
    .then(res => {
      dispatch({
        type: GET_ALL_CITY,
        payload: res.data
      })
      console.log(res.data)
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_CITY,
        payload: {}
      })
    );
};

// get school by account
export const getDistrict = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/schools/getDistrict`)
    .then(res =>
      dispatch({
        type: GET_DISTRICT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
      })
    );
};
