// Import Actions

// Initial State
import {
    ADD_EXAM_DEFINE,
    EXAM_DEFINE_LOADING,
    GET_ALL_EXAM_DEFINE,
    GET_EXAM_DEFINE,
    NEW_EXAM_DEFINE,
    PREVIEW_EXAM_DEFINE,
    SET_EXAM_DEFINE_SEARCH_TEXT,
    SET_EXAM_DEFINE_FIELD
} from "../actions/examDefine.actions";

const initialState = {
    examDefineData: [],
    examDefine: {},
    loading: false,
    isRedirect: '',
    searchText: '',
    total : 0
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAM_DEFINE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_EXAM_DEFINE:
            console.log('reducer total', action.payload.total);
            return {
                ...state,
                examDefineData: action.payload.data,
                total : action.payload.total,
                loading: false
            };
        case GET_EXAM_DEFINE:
            return {
                ...state,
                examDefine: action.payload,
                loading: false
            };
        case PREVIEW_EXAM_DEFINE:
            return {
                ...state,
                examDefine: action.payload,
                loading: false
            };
        case ADD_EXAM_DEFINE:
            return {
                ...state,
                examDefine: action.payload
            };
        case NEW_EXAM_DEFINE:
            return {
                ...state,
                examDefine: action.payload
            };
        case SET_EXAM_DEFINE_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_EXAM_DEFINE_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default ClassReducer;
