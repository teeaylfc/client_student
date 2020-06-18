import {FuseLoadable} from '@fuse';

export const StructureSubjectAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/groupSubject/:idGroup',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-groupSubject/GroupSubject')
            })
        },
        {
            path     : '/manageGroupSubject',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-groupSubject/GroupSubjects')
            })
        },
        {
            path     : '/subject/:idGroup',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-subject/Subject')
            })
        },
        {
            path     : '/manageSubject',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-subject/Subjects')
            })
        },
        {
            path     : '/manageEnterPoint',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-enter-point/EnterPoints')
            })
        },
        {
            path     : '/enterPoint/:studentId/:id/',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-enter-point/EnterPoint')
            })
        },
        {
            path     : '/vocabulary/:id',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-vocabulary/Vocabulary')
            })
        },
        {
            path     : '/manageVocabulary',
            component: FuseLoadable({
                loader: () => import('../structure-subjects/manage-vocabulary/Vocabularies')
            })
        },
    ]
};
