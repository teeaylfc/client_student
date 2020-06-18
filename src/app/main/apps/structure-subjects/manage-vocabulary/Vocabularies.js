import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import VocabulariesTable from './VocabulariesTable';
import VocabulariesHeader from './VocabulariesHeader';
import reducer from '../store/reducers';

const Vocabularies = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-72 sm:min-h-72 header-right-top"
            }}
            header={
                <VocabulariesHeader/>
            }
            content={
                <VocabulariesTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('vocabularyApp', reducer)(Vocabularies);
