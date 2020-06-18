import {FuseLoadable} from '@fuse';

export const SettingsConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/manageRoles',
      component: FuseLoadable({
        loader: () => import('../setting/access-control/Roles')
      })
    },
    {
      path: '/role/:id',
      component: FuseLoadable({
        loader: () => import('../setting/access-control/Role')
      })
    },
    {
      path     : '/user/:idUser',
      component: FuseLoadable({
        loader: () => import('../setting/manage-user/User')
      })
    },
    {
      path     : '/manageUser',
      component: FuseLoadable({
        loader: () => import('../setting/manage-user/Users')
      })
    },
    {
      path     : '/configConfirm/:id',
      component: FuseLoadable({
        loader: () => import('../setting/manage-user/User')
      })
    },
    {
      path     : '/manageConfigConfirm',
      component: FuseLoadable({
        loader: () => import('../setting/config-confirm/ConfigConfirm')
      })
    },
  ]
};
