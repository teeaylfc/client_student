import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const QuestionPackDetailConfig = {
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
            path     : '/questionsPackDetail',
            component: FuseLoadable({
                loader: () => import('./QuestionsPackDetail')
            })
        }
    ]
};