import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_CLASSES = 'GET_ALL_CLASSES';
export const CLASSES_LOADING = 'CLASSES_LOADING';
export const ADD_CLASS = 'ADD_CLASS';
export const UPDATE_CLASS = 'UPDATE_CLASS';
export const NEW_CLASS = 'NEW_CLASS';
export const GET_CLASS = 'GET_CLASS';
export const SET_ClASS_SEARCH_TEXT = 'SET_ClASS_SEARCH_TEXT';
export const SET_CLASS_FIELD = 'SET_CLASS_FIELD';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const INIT_DATA = 'INIT_DATA';

// Export Actions
export function setClassesSearchText(event)
{
    return {
        type      : SET_ClASS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setClassField(event)
{
    return {
        type      : SET_CLASS_FIELD,
        field: event.target.value
    }
}

// get all school
export const getAllClass = (page, pageSize, schoolId) => dispatch => {

    console.log('getAllExamDefine data');
    let criteria = {
        school_id: schoolId
    }
    let sort = {
        create_date: -1
    }

    let params= {
        page : page,
        pageSize: pageSize,
        criteria: criteria,
        sort: sort
    }

    dispatch(setPostLoading());
    axios
        .get('/api/classes/info', {
            params: params
        })
        .then(res => {
                console.log('getAllExamDefine data', res);
                dispatch({
                    type: GET_ALL_CLASSES,
                    payload: (res.data === null ? new [] : res.data),
                })
            }
        )
        .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ALL_CLASSES,
                    payload: []
                })
            }
        );
};


export const getClassByIdSchoolAndDegree = (degreeNumber, schoolId) => dispatch => {
    let criteria = {
        school_id: schoolId
    }

    if(degreeNumber !== "") {
        criteria.group_class = degreeNumber;
    }
    let params= {
        pageSize: 100,
        criteria: criteria
    }

    dispatch(setPostLoading());
    axios
        .get(`/api/classes/info`, {
            params: params
        })
        .then(res =>
            dispatch({
                type: GET_ALL_CLASSES,
                payload: (res.data.data === null ? new [] : res.data.data),
            })
        )
        .catch(err => {
            const message = err.response.data.message;
            dispatch(showMessage({message: message}));
            dispatch({
            type: GET_ALL_CLASSES,
            payload:[]
            })
        });
};

export const getClassByIdSchool = idSchool => dispatch => {
    dispatch({
        type: INIT_DATA
    });

    if (idSchool) {
        dispatch(setPostLoading());
        axios
            .get(`/api/classes/school/${idSchool}`)
            .then(res =>{
                dispatch({
                    type: GET_ALL_CLASSES,
                    payload: (res.data === null ? new [] : res.data),

                })
                }

            )
            .catch(err => {
              const message = err.response.data.message;
              dispatch(showMessage({message: message}));
              dispatch({
                type: GET_ALL_CLASSES,
                payload:[]
              })
            });
    } else {
        dispatch({
            type: GET_CLASS,
            payload: {}
        })
    }
};

// get school by id
export const getClass = id => async dispatch => {
    await dispatch({
        type: NEW_CLASS
    })
    if (id) {
        await dispatch(setPostLoading());
        axios
            .get(`/api/classes/${id}`)
            .then(res => {
                    dispatch({
                        type: GET_CLASS,
                        payload: res.data
                    })
                }
            )
            .catch(err => {
                const message = err.response.data.message;
                dispatch(showMessage({message: message}));
                dispatch({
                    type: GET_CLASS,
                    payload: null
                })
            });
    } else {
        dispatch({
            type: GET_CLASS,
            payload: {}
        })
    }

};

// get school by id
export const getClassByGroupClass = (id, groupOfClass) => dispatch => {
    if (id) {
        dispatch(setPostLoading());
        axios
            .get(`/api/classes/${id}/${groupOfClass}`)
            .then(res =>{
                    dispatch({
                        type: GET_ALL_CLASSES,
                        payload: res.data
                    })
                }

            )
            .catch(err => {
                const message = err.response.data.message;
                dispatch(showMessage({message: message}));
                dispatch({
                    type: GET_ALL_CLASSES,
                    payload: []
                })
            });
    } else {
        dispatch({
            type: GET_CLASS,
            payload: {}
        })
    }

};

// add new school
export const addClass = (classData, history) => dispatch => {
    console.log('dataAdd', classData);
    axios
        .post('/api/classes', classData)
        .then((res) => {
            dispatch(showMessage({message: 'Class Saved'}));
                dispatch({
                    type: ADD_CLASS,
                    payload: res.data
                });
                history.push("/manageClass/new");
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
export const updateClass = (classData, history) => dispatch => {
    console.log('dataUpdate', classData);
    axios
        .put('/api/classes', classData)
        .then((res) => {
            dispatch(showMessage({message: 'Class Updated'}));
                dispatch({
                    type: UPDATE_CLASS,
                    payload: res.data
                });
                if(classData.idSchool) {
                    history.push("/manageClass/new");
                } else {
                    history.push("/manageClass/" + classData.idSchool);
                }
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

export const removeClass = (id, schoolId, page, pageSize, history) => async dispatch => {
    await axios
        .delete(`/api/classes/${id}`)
        .then(async (res) => {
            console.log('removeClass',res);
            await dispatch(showMessage({message: 'Xóa thành công'}));
            }
        )
        .catch(err => {
                console.log('removeClass', err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
        });
};

// Set loading state
export const newClass = () => {
    return {
        type: NEW_CLASS
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: CLASSES_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};


// update school
export const uploadClass = (uploadFile, idSchool, callback) => dispatch => {
    let data = new FormData();
    data.append('uploadFile', uploadFile);
    data.append('idSchool', idSchool)
    axios
        .post('/api/classes/upload', data)
        .then((res) => {
                dispatch(showMessage({message: 'Class Uploaded'}));
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
