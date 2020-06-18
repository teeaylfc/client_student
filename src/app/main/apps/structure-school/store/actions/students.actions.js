import axios from 'axios';
import {CLEAR_ERRORS, GET_ERRORS} from "../../../../../utils/types";
import {showMessage} from 'app/store/actions/fuse';

export const GET_ALL_STUDENT = 'GET_ALL_STUDENT';
export const STUDENT_LOADING = 'STUDENT_LOADING';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const NEW_STUDENT = 'NEW_STUDENT';
export const GET_STUDENT = 'GET_STUDENT';
export const SET_STUDENTS_SEARCH_TEXT = 'SET_STUDENTS_SEARCH_TEXT';
export const SET_STUDENTS_FIELD = 'SET_STUDENTS_FIELD';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const GET_ALL_NATION = 'GET_ALL_NATION';
export const GET_ALL_WARD = 'GET_ALL_WARD';
export const GET_STATISTIC_POINT = 'GET_STATISTIC_POINT';
export const GET_SEMESTER_SCHOOL_ID = 'GET_SEMESTER_SCHOOL_ID';


// Export Actions
export function setStudentsSearchText(event)
{
    return {
        type      : SET_STUDENTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setStudentField(event)
{
    return {
        type      : SET_STUDENTS_FIELD,
        field: event.target.value
    }
}

// get all student
export const getAllStudent = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/student')
        .then(res =>
            dispatch({
                type: GET_ALL_STUDENT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ALL_STUDENT,
                payload: null
            })
        );
};


// get all student
export const getStudentBySchoolId = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/student/getStudentBySchool/${id}`)
    .then(res =>
      dispatch({
        type: GET_ALL_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_STUDENT,
        payload: null
      })
    );
};

// get student by id
export const getStudent = id => async dispatch => {
    await dispatch({
        type: NEW_STUDENT
    })
    if (id) {
        await dispatch(setPostLoading());
        axios
            .get(`/api/student/${id}`)
            .then(res =>
                dispatch({
                    type: GET_STUDENT,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_STUDENT,
                    payload: null
                })
            );
    } else {
        dispatch({
            type: GET_STUDENT,
            payload: {}
        })
    }

};

// add new student
export const createStudent = (studentData, history) => dispatch => {
    let data = new FormData();
    data.append('uploadFile', studentData.avatar);
    data.append('studentData', studentData)
    axios
        .post('/api/student', studentData)
        .then((res) => {
                dispatch(showMessage({message: 'Student Saved'}));
                dispatch({
                    type: ADD_STUDENT,
                    payload: res.data
                });
                history.push("/manageStudent");
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

// update student
export const updateStudent = (studentData, history) => dispatch => {
    axios
        .put('/api/student', studentData)
        .then((res) => {
            dispatch(showMessage({message: 'Student Updated'}));
                dispatch({
                    type: UPDATE_STUDENT,
                    payload: res.data
                });
                history.push("/manageStudent");
            }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const removeStudent = (id, idSchool, history) => dispatch => {
  axios
    .delete(`/api/student/${id}`)
    .then((res) => {
        dispatch(showMessage({message: 'Xóa thành công'}));
      axios
        .get(`/api/student/getStudentBySchool/${idSchool}`)
          .then(res =>
            dispatch({
              type: GET_ALL_STUDENT,
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
export const newStudent = () => {
    return {
        type: NEW_STUDENT
    };
};


// Set loading state
export const setPostLoading = () => {
    return {
        type: STUDENT_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};


// upload Student
export const uploadStudent = (uploadFile, callback) => dispatch => {
    let data = new FormData();
    data.append('uploadFile', uploadFile);
    axios
        .post('/api/student/upload', data)
        .then((res) => {
                dispatch(showMessage({message: 'Student Uploaded'}));
                dispatch({
                    type: UPLOAD_FILE,
                    payload: res.data
                });
                callback();
            }
        )
        .catch(err => {
            console.log('uploadStudent err', err);
            dispatch({
                type: GET_ERRORS,
                payload: err,
            })
        });
};

// get all school
export const getNations = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/student/nations')
        .then(res => {
            dispatch({
                type: GET_ALL_NATION,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(err =>
            dispatch({
                type: GET_ALL_NATION,
                payload: {}
            })
        );
};

export const getWards = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/student/wards')
        .then(res => {
            dispatch({
                type: GET_ALL_WARD,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(err =>
            dispatch({
                type: GET_ALL_WARD,
                payload: {}
            })
        );
};

// get all exam define
export const getAllPointForStudent = (page, pageSize, studentId, schoolId, semester, schoolYear) => dispatch => {
    console.log('getAllExamDefine data');
    let criteria = {
        studentId : studentId,
        schoolId: schoolId
    }
    if(semester) criteria.semester = semester;
    if(schoolYear) criteria.schoolYear = schoolYear;

    let params= {
        page : page,
        pageSize: pageSize,
        criteria: criteria
    }

    dispatch(setPostLoading());
    axios
        .get('/api/student/points', {
            params: params
        })
        .then(res => {
                console.log('getAllExamDefine data', res);
                dispatch({
                    type: GET_STATISTIC_POINT,
                    payload: res.data,
                })
            }
        )
        .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_STATISTIC_POINT,
                    payload: []
                })
            }
        );
};

// get all exam define
export const getSemesterAndSchoolYearForStudent = (studentId, schoolId) => dispatch => {
    console.log('getSemesterAndSchoolYearForStudent data');
    dispatch(setPostLoading());
    axios
        .get('/api/student/semester/schoolYear', {
            params: {
                studentId : studentId,
                schoolId : schoolId
            }
        })
        .then(res => {
                console.log('getSemesterAndSchoolYearForStudent data', res);
                dispatch({
                    type: GET_SEMESTER_SCHOOL_ID,
                    payload: res.data ? res.data : [],
                })
            }
        )
        .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_SEMESTER_SCHOOL_ID,
                    payload: []
                })
            }
        );
};

