import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateTimeTableConfig = {
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
            path     : '/createTimeTable',
            component: FuseLoadable({
                loader: () => import('./CreateTimeTablePage')
            })
        }
    ]
};