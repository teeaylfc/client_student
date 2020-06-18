import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ClassListConfig = {
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
            path     : '/classList',
            component: FuseLoadable({
                loader: () => import('./ClassList')
            })
        }
    ]
};