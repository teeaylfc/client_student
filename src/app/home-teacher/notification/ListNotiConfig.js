
import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ListNotiConfig = {
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
            path     : '/listNoti',
            component: FuseLoadable({
                loader: () => import('./ListNotiPage')
            })
        }
    ]
};