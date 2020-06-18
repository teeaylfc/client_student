// Import Actions
import {ADD_STUDENT, GET_ALL_STUDENT, GET_STUDENT, NEW_STUDENT, STUDENT_LOADING, UPLOAD_FILE, GET_ALL_NATION, GET_ALL_WARD, GET_STATISTIC_POINT, GET_SEMESTER_SCHOOL_ID, SET_STUDENTS_SEARCH_TEXT, SET_STUDENTS_FIELD} from '../actions/students.actions';

// Initial State
const initialState = {
    students: [],
    student: {},
    loading: false,
    isRedirect: '',
    searchText: '',
    success : false,
    uploadResult :{},
    nations: [],
    wards : [],
    statisticPoint: [],
    filter : []
};

const SchoolReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_STUDENT:
            return {
                ...state,
                students: action.payload,
                loading: false
            };
        case GET_STUDENT:
            return {
                ...state,
                student: action.payload,
                loading: false
            };
        case ADD_STUDENT:
            return {
                ...state,
                student: action.payload
            };
        case NEW_STUDENT:
            return {
                ...state,
                student: {}
            };
        case UPLOAD_FILE: {
            return {
                ...state,
                uploadResult: action.payload,
                loading: false,
                success: true
            };
        }
        case GET_ALL_NATION: {
            return {
                ...state,
                nations: action.payload
            };
        }
        case GET_ALL_WARD: {
            return {
                ...state,
                wards: action.payload
            };
        }
        case GET_STATISTIC_POINT: {
            return {
                ...state,
                statisticPoint: action.payload
            };
        }
        case GET_SEMESTER_SCHOOL_ID: {
            return {
                ...state,
                filter : action.payload
            };
        }
        case SET_STUDENTS_SEARCH_TEXT: {
            return {
                ...state,
                searchText : action.searchText
            };
        }
        case SET_STUDENTS_FIELD: {
            return {
                ...state,
                field : action.field
            };
        }
        default:
            return state;
    }
};

export default SchoolReducer;
