import {ADD_CLASS, CLASSES_LOADING, GET_ALL_CLASSES, GET_CLASS, NEW_CLASS, SET_ClASS_SEARCH_TEXT, SET_CLASS_FIELD, UPLOAD_FILE, INIT_DATA} from "../actions/classes.actions";

const initialState = {
    classData: [],
    classroom: {},
    loading: false,
    isRedirect: '',
    searchText: '',
    success : false,
    uploadResult :{}
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_DATA:
            return {
                ...initialState
            };
        case CLASSES_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_CLASSES:
            console.log('Classes action', action);
            return {
                ...state,
                classData: action.payload,
                loading: false
            };
        case GET_CLASS:
            return {
                ...state,
                classroom: action.payload,
                loading: false
            };
        case ADD_CLASS:
            return {
                ...state,
                classroom: action.payload
            };
        case NEW_CLASS:
            return {
                ...state,
                classroom: {}
            };
        case UPLOAD_FILE:
            return {
                ...state,
                uploadResult: action.payload,
                loading: false,
                success: true
            };
        case SET_ClASS_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_CLASS_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default ClassReducer;
