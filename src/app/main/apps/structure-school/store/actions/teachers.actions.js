import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_TEACHERS = 'GET_ALL_TEACHERS';
export const GET_PENDING_TEACHERS = 'GET_PENDING_TEACHERS';
export const TEACHERS_LOADING = 'TEACHERS_LOADING';
export const ADD_TEACHER = 'ADD_TEACHER';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';
export const NEW_TEACHER = 'NEW_TEACHER';
export const GET_TEACHER = 'GET_TEACHER';
export const SET_TEACHER_SEARCH_TEXT = 'SET_TEACHER_SEARCH_TEXT';
export const SET_TEACHER_FIELD = 'SET_TEACHER_FIELD';
export const UPLOAD_FILE = 'UPLOAD_FILE';

// Export Actions
export function setTeachersSearchText(event)
{
    return {
        type      : SET_TEACHER_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setTeacherField(event)
{
    return {
        type      : SET_TEACHER_FIELD,
        field: event.target.value
    }
}

// get all school
export const getAllTeacher = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/teacher')
        .then(res => {
            console.log('getAllTeacher data', res );
            dispatch({
                 type: GET_ALL_TEACHERS,
                 payload: (res.data === null ? new [] : res.data),

            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_TEACHERS,
                payload:[]
            })
        );
};

// get all school
export const getTeacherBySchoolId = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/teacher/getBySchoolId/${id}`)
    .then(res => {
        console.log('getAllTeacher data', res );
        dispatch({
          type: GET_ALL_TEACHERS,
          payload: (res.data === null ? new [] : res.data),

        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_TEACHERS,
        payload:[]
      })
    );
};

// get school by id
export const getTeacher = id => async dispatch => {
    await dispatch({
        type: GET_TEACHER,
        payload: {}
    })
    if (id) {
        await dispatch(setPostLoading());
        await axios
            .get(`/api/teacher/${id}`)
            .then(res =>{
                    dispatch({
                        type: GET_TEACHER,
                        payload: res.data
                    })
            }

            )
            .catch(err =>
                dispatch({
                    type: GET_TEACHER,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_TEACHER,
            payload: {}
        })
    }

};

// get pending teacher
export const getPendingTeacher = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/teacher/getPendingTeacher/${id}`)
        .then(res => {
                console.log('getAllTeacher data', res );
                dispatch({
                    type: GET_PENDING_TEACHERS,
                    payload: (res.data === null ? new [] : res.data),

                })
            }
        )
        .catch(err =>
            dispatch({
                type: GET_PENDING_TEACHERS,
                payload:[]
            })
        );
};

// add new school
export const addTeacher = (teacher, history) => dispatch => {
    console.log('dataAdd', teacher);
    axios
        .post('/api/teacher', teacher)
        .then((res) => {
            dispatch(showMessage({message: 'Teacher Saved'}));
                dispatch({
                    type: ADD_TEACHER,
                    payload: res.data
                });
                history.push("/manageTeacher/new");
            }
        )
        .catch(err => {
            const message = err.response.data.message;
            dispatch(showMessage({message: message}));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        });
};

// update school
export const updateTeacher = (teacher, history) => dispatch => {
    console.log('dataUpdate', teacher);
    axios
        .put('/api/teacher', teacher)
        .then((res) => {
            dispatch(showMessage({message: 'Teacher Updated'}));
                dispatch({
                    type: UPDATE_TEACHER,
                    payload: res.data
                });
            history.push("/manageTeacher");
                /*if(teacher.idSchool) {
                    history.push("/manageTeacher/new");
                } else {
                    history.push("/manageTeacher/" + classData.idSchool);
                }*/
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
export const activeTeacher = (id, history) => dispatch => {
    axios
        .put(`/api/teacher/activeTeacher/${id}`, id)
        .then((res) => {
                dispatch(showMessage({message: 'Duyệt thành công'}));
                dispatch({
                    type: UPDATE_TEACHER,
                    payload: res.data
                });
                history.push("/manageTeacherConfirm");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};


export const removeTeacher = (id, schoolId, history) => dispatch => {
    axios
        .delete(`/api/teacher/${id}`)
        .then((res) => {
                dispatch(showMessage({message: 'Xóa thành công'}));
                axios.get(`/api/teacher/getBySchoolId/${schoolId}`)
                    .then(res =>
                        dispatch({
                            type: GET_ALL_TEACHERS,
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

export const rejectTeacher = (id, history) => dispatch => {
    axios
        .get(`/api/teacher/rejectTeacher/${id}`)
        .then((res) => {
                dispatch(showMessage({message: 'Từ chối thành công'}));
                dispatch({
                    type: UPDATE_TEACHER,
                    payload: res.data
                });
                history.push("/manageTeacherConfirm");
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
export const uploadTeacher = (uploadFile, callback) => dispatch => {
    let data = new FormData();
    data.append('uploadFile', uploadFile);
    axios
        .post('/api/teacher/upload', data)
        .then((res) => {
                dispatch(showMessage({message: 'Teacher Uploaded'}));
                dispatch({
                    type: UPLOAD_FILE,
                    payload: res.data
                });
                callback();
            }
        )
        .catch(err => {
            console.log('uploadTeacher err', err);
            dispatch({
                    type: GET_ERRORS,
                    payload: err,
                })
        });
};

// Set loading state
export const newTeacher = () => {
    return {
        type: NEW_TEACHER
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: TEACHERS_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
