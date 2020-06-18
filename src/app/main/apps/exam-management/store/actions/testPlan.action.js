import { CLEAR_ERRORS } from "../../../../../utils/types";
import testPlanService from 'app/services/testPlanService';
export const GET_TEST_PLAN_PAGE = 'GET_TEST_PLAN_PAGE';
export const GET_TEST_PLAN_DETAIL = 'GET_TEST_PLAN_DETAIL';
export const GET_TEST_PLAN_STUDENTS = 'GET_TEST_PLAN_STUDENTS';
export const SELECT_TEST_PLAN = 'SELECT_TEST_PLAN';
export const CHECK_TEST_PLAN_STUDENTS = 'CHECK_TEST_PLAN_STUDENTS';
export const TEST_PLAN_LOADING = 'TEST_PLAN_LOADING';
export const getTestPlanPage = (criteria, page) => dispatch => {
  dispatch(setTestPlanLoading());

  testPlanService.getTestPlans(criteria, page)
    .then(testPage => {
      dispatch({
        type: GET_TEST_PLAN_PAGE,
        payload: testPage
      })
    }).catch(err => {
      console.log('Failed to get test plan page', err);
      dispatch({
        type: GET_TEST_PLAN_PAGE,
        payload: null
      })
    })
}

// export const getTestPlan = id => dispatch => {
//   console.log('Get test plan by id');
//   dispatch(setTestPlanLoading());
//   axios.get(`/api/examDefine/${id}`)
//     .then(res => dispatch({
//       type: GET_TEST_PLAN_DETAIL,
//       payload: res.data
//     }))
//     .catch(err => dispatch({
//       type: GET_TEST_PLAN_DETAIL,
//       payload: null
//     }))
// }

export const selectTestPlan = selectedIndex => dispatch => {
  dispatch({
    type: SELECT_TEST_PLAN,
    payload: { selectedIndex }
  })
}

export const getTestStatuses = (id, page) => dispatch => {
  dispatch(setTestPlanLoading());

  testPlanService.getTestStatuses(id, page)
    .then(examStatusPage => dispatch({
      type: GET_TEST_PLAN_STUDENTS,
      payload: examStatusPage
    }))
    .catch(err => dispatch({
      type: GET_TEST_PLAN_STUDENTS,
      payload: []
    }))
}

export const checkStudents = students => dispatch => {
  dispatch({
    type: CHECK_TEST_PLAN_STUDENTS,
    payload: students
  })
}

export const setTestPlanLoading = () => {
  return {
    type: TEST_PLAN_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
