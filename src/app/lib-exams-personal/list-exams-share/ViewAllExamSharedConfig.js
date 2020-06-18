import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ViewAllExamSharedConfig = {
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
            path     : '/viewAllExamShared',
            component: FuseLoadable({
                loader: () => import('./ViewAllExamShared')
            })
        }
    ]
};