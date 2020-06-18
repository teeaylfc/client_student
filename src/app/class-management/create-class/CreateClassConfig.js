import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateClassConfig = {
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
            path     : '/createClass',
            component: FuseLoadable({
                loader: () => import('./CreateClass')
            })
        }
    ]
};