// Import Actions

// Initial State
import {ADD_TOPIC, TOPICS_LOADING, GET_ALL_TOPICS, GET_TOPIC, NEW_TOPIC,DELETE_TOPIC, SET_TOPICS_SEARCH_TEXT, SET_TOPICS_FIELD} from "../actions/topics.actions";

const initialState = {
    topicsData: [],
    topic: {},
    loading: false,
    isRedirect: '',
    searchText: ''
};

const ClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOPICS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_TOPICS:
            return {
                ...state,
                topicsData: action.payload,
                loading: false
            };
        case GET_TOPIC:
            return {
                ...state,
                topic: action.payload,
                loading: false
            };
        case ADD_TOPIC:
            return {
                ...state,
                topic: action.payload
            };
        case NEW_TOPIC:
            return {
                ...state,
                topic: {}
            };
        case DELETE_TOPIC:
            return {
                ...state,
                topicsData: action.payload,
            };
        case SET_TOPICS_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText
            };
        case SET_TOPICS_FIELD:
            return {
                ...state,
                field: action.field
            };
        default:
            return state;
    }
};

export default ClassReducer;
