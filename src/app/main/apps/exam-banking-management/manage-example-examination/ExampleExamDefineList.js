import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ExampleExamDefineListTable from './ExampleExamDefineListTable';
import ExampleExamDefineListHeader from './ExampleExamDefineListHeader';
import reducer from '../store/reducers';

const ExampleExamDefineList = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <ExampleExamDefineListHeader/>
            }
            content={
                <ExampleExamDefineListTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('examDefineApp', reducer)(ExampleExamDefineList);
