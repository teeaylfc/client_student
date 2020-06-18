// Import Actions

// Initial State
import {UPLOAD_IMAGE} from "./common.action";

const initialState = {
    success : false,
    fileName : ''

};

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return {
                fileName : action.payload,
                success: true
            };
        default:
            return state;
    }
};

export default CommonReducer;
