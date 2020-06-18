import * as Actions from '../actions';

const initialState = {
    user:{},
    school:{},
    success: false,
    error  : {
        username: null,
        password: null
    }
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_SUCCESS:
        {
            console.log("action.payload")
            console.log(action.payload)
            return {
                ...state,
                success: true,
                user : action.payload,
            };
        }
        case Actions.LOGIN_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        case Actions.LOGOUT:
        {
            return{
                user: {},
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;