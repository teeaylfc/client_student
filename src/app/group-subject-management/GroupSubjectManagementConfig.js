import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const GroupSubjectManagementConfig = {
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
            path     : '/groupSubjectManagement',
            component: FuseLoadable({
                loader: () => import('./GroupSubjectManagement')
            })
        }
    ]
};