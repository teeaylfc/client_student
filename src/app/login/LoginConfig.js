import TeacherLogin from './teacher/TeacherLogin';
import AdminLogin from './admin/AdminLogin';
import HomeLogin from './home-login/homeLogin';
import {authRoles} from 'app/auth';

export const LoginConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
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
            path     : '/home-login',
            component: HomeLogin
        },
 
        {
            path     : '/giaovien',
            component: TeacherLogin
        },
        {
            path     : '/admin',
            component: AdminLogin
        }
    ]
};

