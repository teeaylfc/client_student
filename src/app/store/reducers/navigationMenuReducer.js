import * as Actions from 'app/store/actions/fuse';
import { CHANGE_TAB } from '../actions/actionNavigationMenu';

const initialState = {
    idTab: ""
};

const navigationReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case CHANGE_TAB:
        {
            return {
                ...state,
                idTab: action.payload
            };
        }
      
        default:
        {
            return state;
        }
    }
};

export default navigationReducer;
