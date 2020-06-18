import {ADD_ENTER_POINT, ENTER_POINT_LOADING, GET_ALL_ENTER_POINT, GET_ENTER_POINT, NEW_ENTER_POINT,DELETE_ENTER_POINT} from "../actions/enterPoint.actions";

const initialState = {
    enterPointData: {},
    enterPoint: {},
    loading: false,
    isRedirect: '',
    searchText: '',
    field: ''
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENTER_POINT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_ENTER_POINT:
            return {
                ...state,
                enterPointData: action.payload,
                loading: false
            };
        case GET_ENTER_POINT:
            return {
                ...state,
                enterPoint: action.payload,
                loading: false
            };
        case ADD_ENTER_POINT:
            return {
                ...state,
                enterPoint: action.payload
            };
        case NEW_ENTER_POINT:
            return {
                ...state,
                enterPoint: {}
            };
        case DELETE_ENTER_POINT:
            return {
                ...state,
                enterPointData: action.payload,
            };
        default:
            return state;
    }
};

export default ClassReducer;
