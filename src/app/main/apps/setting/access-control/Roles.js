import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import RolesHeader from "./RolesHeader";
import RolesTable from "./RolesTable";

const Roles = () => {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
      }}
      header={
        <RolesHeader/>
      }
      content={
        <RolesTable/>
      }
      innerScroll
    />
  );
};

export default withReducer('roleApp', reducer)(Roles);
