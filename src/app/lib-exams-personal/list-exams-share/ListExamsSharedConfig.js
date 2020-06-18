import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ListExamsSharedConfig = {
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
            path     : '/listExamsShared',
            component: FuseLoadable({
                loader: () => import('./ListExamsShared')
            })
        }
    ]
};