import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const StudentInfoConfig = {
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
            path     : '/studentInfo',
            component: FuseLoadable({
                loader: () => import('./StudentInfo')
            })
        }
    ]
};