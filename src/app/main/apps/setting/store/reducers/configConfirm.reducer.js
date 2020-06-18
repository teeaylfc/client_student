// Import Actions

// Initial State
import {
    ADD_CONFIG_CONFIRM,
    CONFIG_CONFIRM_LOADING,
    GET_ALL_CONFIG_CONFIRM,
    GET_CONFIG_CONFIRM,
    NEW_CONFIG_CONFIRM,
    CLEAR_CONFIG_CONFIRM
} from "../actions/configConfirm.actions";

const initialState = {
    configConfirmData: [],
    configConfirm: {},
    loading: false,
    isRedirect: '',
    searchText: ''
};

const ConfigConfirmReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONFIG_CONFIRM_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_CONFIG_CONFIRM:
            console.log('Classes action', action);
            return {
                ...state,
                configConfirmData: action.payload,
                loading: false
            };
        case GET_CONFIG_CONFIRM:
            return {
                ...state,
                configConfirm: action.payload,
                loading: false
            };
        case ADD_CONFIG_CONFIRM:
            return {
                ...state,
                configConfirm: action.payload
            };
        case NEW_CONFIG_CONFIRM:
            return {
                ...state,
                configConfirm: {}
            };
        case CLEAR_CONFIG_CONFIRM:
            return initialState;
        default:
            return state;
    }
};

export default ConfigConfirmReducer;
