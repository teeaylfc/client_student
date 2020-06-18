import {authRoles} from 'app/auth';
import {FuseLoadable} from '@fuse';

export const ExamPersonalListConfig = {
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
            path     : '/examPersonalList',
            component: FuseLoadable({
                loader: () => import('./ExamPersonalList')
            })
        }
    ]
};