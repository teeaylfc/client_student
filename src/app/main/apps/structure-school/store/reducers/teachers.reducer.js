import {ADD_TEACHER, TEACHERS_LOADING, GET_ALL_TEACHERS, GET_TEACHER, NEW_TEACHER, SET_TEACHER_SEARCH_TEXT, SET_TEACHER_FIELD, GET_PENDING_TEACHERS, UPLOAD_FILE} from "../actions/teachers.actions";

const initialState = {
    teachers: [],
    teacher: {},
    loading: false,
    isRedirect: '',
    searchText: '',
    field: '',
    success : false,
    uploadResult :{}
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEACHERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_TEACHERS:
            return {
                ...state,
                teachers: action.payload,
                loading: false
            };
        case GET_PENDING_TEACHERS:
            return {
                ...state,
                teachers: action.payload,
                loading: false
            };
        case GET_TEACHER:
            return {
                ...state,
                teacher: action.payload,
                loading: false
            };
        case ADD_TEACHER:
            return {
                ...state,
                teacher: action.payload
            };
        case NEW_TEACHER:
            return {
                ...state,
                teacher: {}
            };
        case UPLOAD_FILE: {
            return {
                ...state,
                uploadResult: action.payload,
                loading: false,
                success: true
            };
        }
        case SET_TEACHER_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_TEACHER_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default ClassReducer;
