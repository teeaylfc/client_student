import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ProfileConfig = {
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
            path     : '/profile',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        }
    ]
};