import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const QuestionsPackConfig = {
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
            path     : '/questionsPack',
            component: FuseLoadable({
                loader: () => import('./QuestionsPack')
            })
        }
    ]
};