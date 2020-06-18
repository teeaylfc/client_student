import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import EnterPointsTable from './EnterPointsTable';
import EnterPointsHeader from './EnterPointsHeader';
import reducer from '../store/reducers';

const EnterPoints = () => {
    return (
        <FusePageCarded
            classes={{
                header : "header-right-top flex-col header-right-top-custom"
            }}
            header={
                <EnterPointsHeader/>
            }
            content={
                <EnterPointsTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('enterPointApp', reducer)(EnterPoints);
