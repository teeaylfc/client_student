import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const SignInConfig = {
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
            path     : '/signIn',
            component:  FuseLoadable({
                loader: () => import('./SignIn')
            })
        },
        
    ]
};

