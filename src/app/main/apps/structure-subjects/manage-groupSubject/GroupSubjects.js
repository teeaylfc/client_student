import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import GroupSubjectsTable from './GroupSubjectsTable';
import GroupSubjectsHeader from './GroupSubjectsHeader';
import reducer from '../store/reducers';

const GroupSubjects = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <GroupSubjectsHeader/>
            }
            content={
                <GroupSubjectsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('groupSubjectApp', reducer)(GroupSubjects);
