import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const SignUpConfig = {
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
            path     : '/signUp',
            component:  FuseLoadable({
                loader: () => import('./SignUp')
            })
        },
        
    ]
};

