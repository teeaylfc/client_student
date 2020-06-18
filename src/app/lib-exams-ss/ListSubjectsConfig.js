import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ListSubjectsConfig = {
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
            path     : '/listSubject',
            component: FuseLoadable({
                loader: () => import('./ListSubject')
            })
        }
    ]
};