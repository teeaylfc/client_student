import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateExamConfig = {
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
            path     : '/createExams',
            component: FuseLoadable({
                loader: () => import('./CreateExamPage')
            })
        }
    ]
};