import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import QuestionsPacksTable from './QuestionsPacksTable';
import QuestionsPacksHeader from './QuestionsPacksHeader';
import reducer from '../store/reducers';

const QuestionsPacks = () => {
    return (
        <FusePageCarded
            classes={{
                header : "header-right-top flex-col header-right-top-custom"
            }}
            header={
                <QuestionsPacksHeader/>
            }
            content={
                <QuestionsPacksTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('questionsPackApp', reducer)(QuestionsPacks);
