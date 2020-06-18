import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import TeachersTable from './TeachersTable';
import TeachersHeader from './TeachersHeader';
import reducer from '../store/reducers';

const Teachers = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <TeachersHeader/>
            }
            content={
                <TeachersTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('teacherApp', reducer)(Teachers);
