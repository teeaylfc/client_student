import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ListExamsConfig = {
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
            path     : '/listExams',
            component: FuseLoadable({
                loader: () => import('./ListExams')
            })
        }
    ]
};