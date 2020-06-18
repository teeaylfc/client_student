import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const TeacherManagementConfig = {
    settings: {
        layout: {
            config: {
                footer: {
                    display: false
                },
                leftSidePanel: {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/teacherManagement',
            component: FuseLoadable({
                loader: () => import('./TeacherManagement')
            })
        }
    ]
};