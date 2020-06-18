import {FuseLoadable} from '@fuse';

export const StructureSchoolAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/class/:idClass',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-class/Class')
            })
        },
        {
            path     : '/manageClass/:idSchool',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-class/Classes')
            })
        },
        {
            path     : '/manageSchool',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-schools/Schools')
            })
        },
        {
            path     : '/school/:id',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-schools/School')
            })
        },
        {
            path     : '/students/:id',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-student/Student')
            })
        },
        {
            path     : '/manageStudent',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-student/Students')
            })
        },
        {
            path     : '/teacher/:idTeacher',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-teacher/Teacher')
            })
        },
        {
            path     : '/manageTeacher',
            component: FuseLoadable({
                loader: () => import('../structure-school/manage-teacher/Teachers')
            })
        },

        {
            path     : '/topic/:topicId',
            component: FuseLoadable({
                loader: () => import('../exam-banking-management/manage-topic/Topic')
            })
        },
        {
            path     : '/manageTopic',
            component: FuseLoadable({
                loader: () => import('../exam-banking-management/manage-topic/Topics')
            })
        },
        {
            path     : '/home',
            component: FuseLoadable({
                loader: () => import('../../../home-teacher/home/Home')
            })
        },
        {
            path     : '/hometeacher',
            component: FuseLoadable({
                loader: () => import('../../../home-teacher/home/HomeTeacher')
            })
        }
    ]
};
