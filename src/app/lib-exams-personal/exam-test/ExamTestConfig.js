import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ExamTestConfig = {
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
            path     : '/examTest',
            component: FuseLoadable({
                loader: () => import('./ExamTestPage')
            })
        }
    ]
};