import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateExamStepConfig = {
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
            path     : '/createExamStep',
            component: FuseLoadable({
                loader: () => import('./CreateExamStepPage')
            })
        }
    ]
};