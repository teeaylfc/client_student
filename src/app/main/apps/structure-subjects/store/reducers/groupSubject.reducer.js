import {ADD_GROUP_SUBJECT, GROUP_SUBJECT_LOADING, GET_ALL_GROUP_SUBJECT, GET_GROUP_SUBJECT, NEW_GROUP_SUBJECT,DELETE_GROUP_SUBJECT, SET_GROUP_SUBJECT_SEARCH_TEXT, SET_GROUP_SUBJECT_FIELD} from "../actions/groupSubject.actions";

const initialState = {
    groupSubjectsData: [],
    groupSubject: {},
    loading: false,
    isRedirect: '',
    searchText: ''
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case GROUP_SUBJECT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_GROUP_SUBJECT:
            return {
                ...state,
                groupSubjectsData: action.payload,
                loading: false
            };
        case GET_GROUP_SUBJECT:
            return {
                ...state,
                groupSubject: action.payload,
                loading: false
            };
        case ADD_GROUP_SUBJECT:
            return {
                ...state,
                groupSubject: action.payload
            };
        case NEW_GROUP_SUBJECT:
            return {
                ...state,
                groupSubject: {}
            };
        case DELETE_GROUP_SUBJECT:
            return {
                ...state,
                groupSubjectsData: action.payload,
            };
        case SET_GROUP_SUBJECT_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_GROUP_SUBJECT_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default ClassReducer;
