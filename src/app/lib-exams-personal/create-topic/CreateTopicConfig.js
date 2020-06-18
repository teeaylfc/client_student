import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const CreateTopicConfig = {
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
            path     : '/createTopic',
            component: FuseLoadable({
                loader: () => import('./CreateTopic')
            })
        }
    ]
};