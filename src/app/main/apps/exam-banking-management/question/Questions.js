import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import QuestionsTable from './QuestionsTable';
import QuestionsHeader from './QuestionsHeader';
import reducer from '../store/reducers';

const Questions = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <QuestionsHeader/>
            }
            content={
                <QuestionsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('questionApp', reducer)(Questions);
