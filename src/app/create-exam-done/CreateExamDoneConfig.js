import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateExamDoneConfig = {
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
            path     : '/createExamDone',
            component: FuseLoadable({
                loader: () => import('./CreateExamDone')
            })
        }
    ]
};