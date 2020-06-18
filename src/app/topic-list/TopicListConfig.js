import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const TopicListConfig = {
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
            path     : '/topicList',
            component: FuseLoadable({
                loader: () => import('./TopicList')
            })
        }
    ]
};