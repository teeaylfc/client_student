import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const GroupSubjectInformationConfig = {
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
            path     : '/groupSubjectInformation',
            component: FuseLoadable({
                loader: () => import('./GroupSubjectInformation')
            })
        }
    ]
};