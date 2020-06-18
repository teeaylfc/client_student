import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ExamSharedFromUserConfig = {
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
            path     : '/examSharedFromUser',
            component: FuseLoadable({
                loader: () => import('./ExamSharedFromUser')
            })
        }
    ]
};