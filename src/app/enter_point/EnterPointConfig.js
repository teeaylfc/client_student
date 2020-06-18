import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const EnterPointConfig = {
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
            path     : '/enterPoint',
            component: FuseLoadable({
                loader: () => import('./EnterPoint')
            })
        }
    ]
};