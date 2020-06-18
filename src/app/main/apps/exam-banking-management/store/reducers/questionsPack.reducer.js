// Import Actions

// Initial State
import {ADD_QUESTIONS_PACK, QUESTIONS_PACK_LOADING, GET_ALL_QUESTIONS_PACK, GET_QUESTIONS_PACK, NEW_QUESTIONS_PACK, SET_QUESTIONS_PACK_SEARCH_TEXT, SET_QUESTIONS_PACK_FIELD} from "../actions/questionsPack.actions";

const initialState = {
    questionsPacks: [],
    questionsPack: {},
    loading: false,
    isRedirect: '',
    searchText: ''
};

const QuestionsPackReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUESTIONS_PACK_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_QUESTIONS_PACK:
            return {
                ...state,
                questionsPacks: action.payload,
                loading: false
            };
        case GET_QUESTIONS_PACK:
            return {
                ...state,
                questionsPack: action.payload,
                loading: false
            };
        case ADD_QUESTIONS_PACK:
            return {
                ...state,
                questionsPack: action.payload
            };
        case NEW_QUESTIONS_PACK:
            return {
                ...state,
                questionsPack: {}
            };
        case SET_QUESTIONS_PACK_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_QUESTIONS_PACK_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default QuestionsPackReducer;
