import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import UsersTable from './UsersTable';
import UsersHeader from './UsersHeader';
import reducer from '../store/reducers';

const Users = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <UsersHeader/>
            }
            content={
                <UsersTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('userApp', reducer)(Users);
