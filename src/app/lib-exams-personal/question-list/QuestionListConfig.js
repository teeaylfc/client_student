import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const QuestionListConfig = {
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
            path     : '/questionList',
            component: FuseLoadable({
                loader: () => import('./QuestionList')
            })
        }
    ]
};