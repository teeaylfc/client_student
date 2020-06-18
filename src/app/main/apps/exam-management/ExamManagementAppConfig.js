import {FuseLoadable} from '@fuse';

export const ExamManagementAppConfig = {
  settings: {
    layout: {}
  },
  routes  : [
    {
      path     : '/manageTestPlan',
      component: FuseLoadable({
        loader: () => import('../exam-management/manage-test-plan/TestPlanList')
      })
    },
    {
      path     : '/testPlan/:id',
      component: FuseLoadable({
        loader: () => import('../exam-management/manage-test-plan/TestPlan')
      })
    }
  ]
};
