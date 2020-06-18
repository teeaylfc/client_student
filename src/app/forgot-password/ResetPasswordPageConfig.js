import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ResetPasswordPageConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
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
            path     : '/reset-password',
            component: FuseLoadable({
                loader: () => import('./ResetPasswordPage')
            })
        }
    ]
};