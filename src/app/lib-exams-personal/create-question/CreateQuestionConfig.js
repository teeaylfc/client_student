import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateQuestionConfig = {
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
            path     : '/createQuestion',
            component: FuseLoadable({
                loader: () => import('./CreateQuestion')
            })
        }
    ]
};