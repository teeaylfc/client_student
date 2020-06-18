// Import Actions

// Initial State
import {ADD_VOCABULARY, VOCABULARY_LOADING, GET_ALL_VOCABULARY, GET_VOCABULARY, NEW_VOCABULARY,DELETE_VOCABULARY, SET_VOCABULARY_SEARCH_TEXT, SET_VOCABULARY_FIELD} from "../actions/vocabulary.actions";

const initialState = {
    vocabulariesData: [],
    vocabulary: {},
    loading: false,
    isRedirect: '',
    searchText: '',
    field: '',
    total : 0
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOCABULARY_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_VOCABULARY:
            return {
                ...state,
                vocabulariesData: action.payload.data,
                total : action.payload.total,
                loading: false
            };
        case GET_VOCABULARY:
            return {
                ...state,
                vocabulary: action.payload,
                loading: false
            };
        case ADD_VOCABULARY:
            return {
                ...state,
                vocabulary: action.payload
            };
        case NEW_VOCABULARY:
            return {
                ...state,
                vocabulary: {}
            };
        case DELETE_VOCABULARY:
            return {
                ...state,
                vocabulariesData: action.payload,
            };
        case SET_VOCABULARY_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText,
            };
        case SET_VOCABULARY_FIELD:
            return {
                ...state,
                field: action.field,
            };
        default:
            return state;
    }
};

export default ClassReducer;
