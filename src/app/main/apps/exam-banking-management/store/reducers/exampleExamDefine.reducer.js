import {GET_ALL_EXAMPLE_EXAM_DEFINE, EXAMPLE_EXAM_DEFINE_LOADING, ADD_EXAMPLE_EXAM_DEFINE, GET_EXAMPLE_EXAM_DEFINE, NEW_EXAMPLE_EXAM_DEFINE} from "../actions/exampleExamDefine.actions";

const initialState = {
    examDefineData: [],
    examDefine: {},
    loading: false,
    isRedirect: '',
    searchText: ''
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAMPLE_EXAM_DEFINE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_EXAMPLE_EXAM_DEFINE:
            return {
                ...state,
                examDefineData: action.payload,
                loading: false
            };
        case GET_EXAMPLE_EXAM_DEFINE:
            return {
                ...state,
                examDefine: action.payload,
                loading: false
            };
        case ADD_EXAMPLE_EXAM_DEFINE:
            return {
                ...state,
                examDefine: action.payload
            };
        case NEW_EXAMPLE_EXAM_DEFINE:
            return {
                ...state,
                examDefine: {}
            };
        default:
            return state;
    }
};

export default ClassReducer;
