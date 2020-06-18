import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const EditExamConfig = {
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
            path     : '/editExam',
            component: FuseLoadable({
                loader: () => import('./EditExam')
            })
        }
    ]
};