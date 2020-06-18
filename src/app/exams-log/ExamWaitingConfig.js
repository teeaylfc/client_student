import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ExamWaitingConfig = {
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
            path     : '/examWaiting',
            component: FuseLoadable({
                loader: () => import('./ExamWaiting')
            })
        }
    ]
};