// Export Constants
import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_ROLES = 'GET_ALL_ROLES';
export const ROLES_LOADING = 'ROLES_LOADING';
export const ADD_ROLE = 'ADD_ROLE';
export const UPDATE_ROLE = 'UPDATE_ROLE';
export const NEW_ROLE = 'NEW_ROLE';
export const GET_ROLE = 'GET_ROLE';
export const SET_PRODUCTS_SEARCH_TEXT = 'SET_PRODUCTS_SEARCH_TEXT';

// Export Actions
export function setRolesSearchText(event)
{
  return {
    type      : SET_PRODUCTS_SEARCH_TEXT,
    searchText: event.target.value
  }
}

// get all school
export const getAllRole = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/roles')
    .then(res => {
        console.log('getAllRole data', res );
        dispatch({
          type: GET_ALL_ROLES,
          payload: (res.data === null ? new [] : res.data),

        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_ROLES,
        payload:[]
      })
    );
};

// get school by id
export const getRole = id => dispatch => {
  if (id) {
    dispatch(setPostLoading());
    axios
      .get(`/api/roles/${id}`)
      .then(res =>{
          dispatch({
            type: GET_ROLE,
            payload: res.data
          })
        }

      )
      .catch(err =>
        dispatch({
          type: GET_ROLE,
          payload: null
        })
      );
  } else {
    dispatch({
      type: GET_ROLE,
      payload: {}
    })
  }

};

// add new school
export const addRole = (classData, history) => dispatch => {
  console.log('dataAdd', classData);
  axios
    .post('/api/roles/saveRole', classData)
    .then((res) => {
        dispatch(showMessage({message: 'Role Saved'}));
        dispatch({
          type: ADD_ROLE,
          payload: res.data
        });
        history.push("/manageRoles");
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// update school
export const updateRole = (classData, history) => dispatch => {
  console.log('dataUpdate', classData);
  axios
    .put('/api/roles/saveRole', classData)
    .then((res) => {
        dispatch(showMessage({message: 'Role Updated'}));
        dispatch({
          type: UPDATE_ROLE,
          payload: res.data
        });
        history.push("/manageRoles");
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
export const newRole = () => {
  return {
    type: NEW_ROLE
  };
};


// Set loading state
export const setPostLoading = () => {
  return {
    type: ROLES_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
