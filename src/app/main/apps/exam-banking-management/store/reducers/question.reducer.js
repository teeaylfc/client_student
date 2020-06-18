// Import Actions

// Initial State
import {
    ADD_QUESTION,
    GET_ALL_QUESTION,
    GET_QUESTION,
    NEW_QUESTION,
    QUESTION_LOADING,
    SET_QUESTION_SEARCH_TEXT,
    SET_QUESTION_FIELD
} from "../actions/question.actions";
import {UPLOAD_FILE} from "../../../structure-school/store/actions";

const initialState = {
    questions: [],
    question: {},
    loading: false,
    isRedirect: '',
    searchText: '',
    total : 0,
    success : false,
    uploadResult :{}
};

const QuestionReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUESTION_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_QUESTION:
            console.log('reducer total', action.payload);
            return {
                ...state,
                questions: action.payload.data,
                total : action.payload.total,
                loading: false
            };
        case GET_QUESTION:
            return {
                ...state,
                question: action.payload,
                loading: false
            };
        case ADD_QUESTION:
            return {
                ...state,
                question: action.payload
            };
        case UPLOAD_FILE:
            return {
                ...state,
                uploadResult: action.payload,
                loading: false,
                success: true
            };
        case NEW_QUESTION:
            return {
                ...state,
                question: action.payload
            };
        case SET_QUESTION_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_QUESTION_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default QuestionReducer;
