import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ClassDetailConfig = {
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
            path     : '/classDetail',
            component: FuseLoadable({
                loader: () => import('./ClassDetail')
            })
        }
    ]
};