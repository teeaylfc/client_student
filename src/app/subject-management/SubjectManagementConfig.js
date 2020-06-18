import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const SubjectManagementConfig = {
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
            path     : '/subjectManagement',
            component: FuseLoadable({
                loader: () => import('./SubjectManagement')
            })
        }
    ]
};