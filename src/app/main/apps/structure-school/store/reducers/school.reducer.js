// Import Actions
import {ADD_SCHOOL, GET_ALL_SCHOOL, GET_SCHOOL, NEW_SCHOOL,DELETE_SCHOOL ,SCHOOL_LOADING, GET_ALL_CITY, GET_DISTRICT} from "../actions";
import {SET_SCHOOL_SEARCH_TEXT, SET_SCHOOL_FIELD} from "../actions";
import {GET_ERRORS} from "../../../../../utils/types";

// Initial State
const initialState = {
    schools: [],
    school: {},
    loading: false,
    cities : [],
    districts : [],
    isRedirect: '',
    searchText: '',
    errors : {}
};

const SchoolReducer = (state = initialState, action) => {
    switch (action.type) {
        case SCHOOL_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_SCHOOL:
            return {
                ...state,
                schools: action.payload,
                loading: false
            };
        case GET_SCHOOL:
            return {
                ...state,
                school: action.payload,
                loading: false
            };
        case ADD_SCHOOL:
            return {
                ...state,
                school: action.payload
            };
        case NEW_SCHOOL:
            return {
                ...state,
                school: action.payload
            };
        case DELETE_SCHOOL:
            return {
                ...state,
                schools: action.payload,
                loading: false
            };
        case SET_SCHOOL_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            };
        case GET_ALL_CITY:
            return {
                ...state,
                cities: action.payload,
                loading: false
            };
        case GET_DISTRICT:
            return {
                ...state,
                districts: action.payload,
                loading: false
            };
        case SET_SCHOOL_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default SchoolReducer;
