import {ADD_ROLE, ROLES_LOADING, GET_ALL_ROLES, GET_ROLE, NEW_ROLE} from "../actions/accessControl.actions";

const initialState = {
  roleData: [],
  role: {},
  loading: false,
  isRedirect: '',
  searchText: ''
};

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_ROLES:
      console.log('GET_ALL_ROLES', action);
      return {
        ...state,
        roleData: action.payload,
        loading: false
      };
    case GET_ROLE:
      console.log('GET_ROLE', action);
      return {
        ...state,
        role: action.payload,
        loading: false
      };
    case ADD_ROLE:
      return {
        ...state,
        role: action.payload
      };
    case NEW_ROLE:
      return {
        ...state,
        role: {}
      };
    default:
      return state;
  }
};

export default RoleReducer;
