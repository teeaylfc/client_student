// Import Actions

// Initial State
import {
    ADD_USER,
    USERS_LOADING,
    GET_ALL_USERS,
    GET_USER,
    NEW_USER,
    SET_USER_SEARCH_TEXT,
    SET_USER_FIELD,
    CLEAR_USER
} from "../actions/users.actions";

const initialState = {
    userData: [],
    user: {},
    loading: false,
    isRedirect: '',
    searchText: ''
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_USERS:
            console.log('Classes action', action);
            return {
                ...state,
                userData: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case ADD_USER:
            return {
                ...state,
                user: action.payload
            };
        case NEW_USER:
            return {
                ...state,
                user: {}
            };
        case SET_USER_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_USER_FIELD:
            return {
                ...state,
                field: action.field
            };
        case CLEAR_USER:
            return initialState;
        default:
            return state;
    }
};

export default UserReducer;
