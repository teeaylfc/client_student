import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const BackgroundCreateClassConfig = {
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
            path     : '/backgroundCreateClass',
            component: FuseLoadable({
                loader: () => import('./BackgroundCreateClass')
            })
        }
    ]
};