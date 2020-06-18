import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import TeacherConfirmTable from './TeacherConfirmTable';
import TeacherConfirmHeader from './TeacherConfirmHeader';
import reducer from '../store/reducers';

const TeacherConfirms = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <TeacherConfirmHeader/>
            }
            content={
                <TeacherConfirmTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('teacherConfirmApp', reducer)(TeacherConfirms);
