import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import TestPlanListTable from './TestPlanListTable';
import TestPlanListHeader from './TestPlanListHeader';
import reducer from '../store/reducers';

const TestPlanList = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <TestPlanListHeader/>
            }
            content={
                <TestPlanListTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('testPlanApp', reducer)(TestPlanList);
