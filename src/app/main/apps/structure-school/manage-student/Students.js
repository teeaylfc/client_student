import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import StudentsTable from './StudentsTable';
import StudentsHeader from './StudentsHeader';
import reducer from '../store/reducers';

const Students = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <StudentsHeader/>
            }
            content={
                <StudentsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('studentsApp', reducer)(Students);
