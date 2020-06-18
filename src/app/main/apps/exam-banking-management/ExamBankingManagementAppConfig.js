import {FuseLoadable} from '@fuse';

export const ExamBankingManagementAppConfig = {
  settings: {
    layout: {}
  },
  routes  : [
    {
      path     : '/manageQuestionsPack',
      component: FuseLoadable({
        loader: () => import('./questions-pack/QuestionsPacks')
      })
    },
    {
      path     : '/questionsPack/:id',
      component: FuseLoadable({
        loader: () => import('./questions-pack/QuestionsPack')
      })
    },
    {
      path     : '/topic/:topicId',
      component: FuseLoadable({
        loader: () => import('./manage-topic/Topic')
      })
    },
    {
      path     : '/manageTopic',
      component: FuseLoadable({
        loader: () => import('./manage-topic/Topics')
      })
    },
    {
      path     : '/managerExamDefine',
      component: FuseLoadable({
        loader: () => import('./manage-examination/ExamDefineList')
      })
    },
    {
      path     : '/examDefine/:id',
      component: FuseLoadable({
        loader: () => import('./manage-examination/ExamDefine')
      })
    },
    {
      path     : '/exampleExamDefine',
      component: FuseLoadable({
        loader: () => import('./manage-example-examination/ExampleExamDefineList')
      })
    },
    {
      path     : '/exampleExamDefine/:id',
      component: FuseLoadable({
        loader: () => import('./manage-example-examination/ExampleExamDefine')
      })
    },

    {
      path     : '/manageQuestion',
      component: FuseLoadable({
        loader: () => import('./question/Questions')
      })
    },
    {
      path     : '/question/:id',
      component: FuseLoadable({
        loader: () => import('./question/Question')
      })
    }

  ]
};
