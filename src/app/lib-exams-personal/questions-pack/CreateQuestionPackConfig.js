import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateQuestionPackConfig = {
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
            path     : '/createQuestionPack',
            component: FuseLoadable({
                loader: () => import('./CreateQuestionPack')
            })
        }
    ]
};