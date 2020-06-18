import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ViewExamConfig = {
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
            path     : '/viewExam',
            component: FuseLoadable({
                loader: () => import('./ViewExam')
            })
        }
    ]
};