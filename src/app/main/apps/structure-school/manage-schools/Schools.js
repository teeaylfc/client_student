import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import SchoolsTable from './SchoolsTable';
import SchoolsHeader from './SchoolsHeader';
import reducer from '../store/reducers';

const Schools = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <SchoolsHeader/>
            }
            content={
                <SchoolsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('schoolApp', reducer)(Schools);
