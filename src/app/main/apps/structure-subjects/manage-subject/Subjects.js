import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import SubjectsTable from './SubjectsTable';
import SubjectsHeader from './SubjectsHeader';
import reducer from '../store/reducers';

const Subjects = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <SubjectsHeader/>
            }
            content={
                <SubjectsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('subjectApp', reducer)(Subjects);
