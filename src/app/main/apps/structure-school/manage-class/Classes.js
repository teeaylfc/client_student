import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ClassesTable from './ClassesTable';
import ClassesHeader from './ClassesHeader';
import reducer from '../store/reducers';

const Classes = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <ClassesHeader/>
            }
            content={
                <ClassesTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('classesApp', reducer)(Classes);
