import {
  GET_TEST_PLAN_PAGE,
  GET_TEST_PLAN_STUDENTS,
  TEST_PLAN_LOADING,
  SELECT_TEST_PLAN,
  CHECK_TEST_PLAN_STUDENTS
} from '../actions/testPlan.action';

const initialState = {
  testPlans: [],
  total: 0,
  testPlan: null,
  testStatuses: [],
  checkedStudents: [],
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TEST_PLAN_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_TEST_PLAN_PAGE:
      return {
        ...state,
        testPlans: action.payload ? action.payload.data : [],
        total: action.payload ? action.payload.total : 0,
        loading: false
      }

    // case GET_TEST_PLAN_DETAIL:
    //   return {
    //     ...state,
    //     testPlan: action.payload
    //   };

    case GET_TEST_PLAN_STUDENTS:
      return {
        ...state,
        loading: false,
        testStatuses: action.payload ? action.payload.data : []
      }

    case SELECT_TEST_PLAN:
      let selectedIndex = action.payload.selectedIndex;
      let testPlan = selectedIndex > -1 && selectedIndex < state.testPlans.length
        ? state.testPlans[selectedIndex] : null;
      return {
        ...state,
        testPlan
      }

    case CHECK_TEST_PLAN_STUDENTS:
      return {
        ...state,
        checkedStudents: action.payload
      }

    default:
      return state;
  }
}