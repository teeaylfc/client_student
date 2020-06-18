import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ExamCreatedConfig = {
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
            path     : '/examCreated',
            component: FuseLoadable({
                loader: () => import('./ExamCreated')
            })
        }
    ]
};