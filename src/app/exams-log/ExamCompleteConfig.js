import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ExamCompleteConfig = {
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
            path     : '/examComplete',
            component: FuseLoadable({
                loader: () => import('./ExamComplete')
            })
        }
    ]
};