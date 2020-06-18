import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import TopicsTable from './TopicsTable';
import TopicsHeader from './TopicsHeader';
import reducer from '../store/reducers';

const Topics = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <TopicsHeader/>
            }
            content={
                <TopicsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('topicsApp', reducer)(Topics);
