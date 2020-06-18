import * as Actions from '../actions';

const initialState = {
    success: false,
    error  : {
        email: null,
    }
};

const forgotPassword = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.EMAIL_RESETPASSWORD_ERROR:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.EMAIL_RESETPASSWORD_SUCCESS:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default forgotPassword;