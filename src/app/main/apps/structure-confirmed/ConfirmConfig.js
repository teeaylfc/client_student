import {FuseLoadable} from '@fuse';

export const ConfirmConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/teacherConfirm/:idTeacher',
      component: FuseLoadable({
        loader: () => import('./teacher-confirmed/TeacherConfirm')
      })
    },
    {
      path: '/manageTeacherConfirm',
      component: FuseLoadable({
        loader: () => import('./teacher-confirmed/TeacherConfirms')
      })
    },
  ]
};
