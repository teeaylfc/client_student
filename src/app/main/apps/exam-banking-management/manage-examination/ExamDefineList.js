import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ExamDefineListTable from './ExamDefineListTable';
import ExamDefineListHeader from './ExamDefineListHeader';
import reducer from '../store/reducers';

const ExamDefineList = () => {
    return (
        <FusePageCarded
            classes={{
                header : "header-right-top flex-col header-right-top-custom"
            }}
            header={
                <ExamDefineListHeader/>
            }
            content={
                <ExamDefineListTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('examDefineApp', reducer)(ExamDefineList);
