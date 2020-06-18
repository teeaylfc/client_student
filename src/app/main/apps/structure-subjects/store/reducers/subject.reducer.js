// Import Actions

// Initial State
import {ADD_SUBJECT, SUBJECT_LOADING, GET_ALL_SUBJECT, GET_SUBJECT, NEW_SUBJECT,DELETE_SUBJECT, 
    SET_SUBJECT_SEARCH_TEXT, SET_SUBJECT_FIELD, SET_GROUP_SUBJECT_FIELD_FILTER} from "../actions/subject.actions";

const initialState = {
    subjectsData: [],
    subject: {},
    loading: false,
    isRedirect: '',
    searchText: ''
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBJECT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_SUBJECT:
            return {
                ...state,
                subjectsData: action.payload,
                loading: false
            };
        case GET_SUBJECT:
            return {
                ...state,
                subject: action.payload,
                loading: false
            };
        case ADD_SUBJECT:
            return {
                ...state,
                subject: action.payload
            };
        case NEW_SUBJECT:
            return {
                ...state,
                subject: {}
            };
        case DELETE_SUBJECT:
            return {
                ...state,
                subjectsData: action.payload,
            };
        case SET_SUBJECT_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_SUBJECT_FIELD:
            return {
                ...state,
                field: action.field
            };
        case SET_GROUP_SUBJECT_FIELD_FILTER:
        return {
            ...state,
            field: action.field
        };
        default:
            return state;
    }
};

export default ClassReducer;
