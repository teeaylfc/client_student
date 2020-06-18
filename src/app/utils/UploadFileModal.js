import React from 'react';
import { Button } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";

const UploadFileModal = ({showModal,handleClose, onChangeHandler, handleUploadFile}) => {

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" name="uploadFile" onChange={onChangeHandler}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" onClick={handleUploadFile}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({
    //setSearchText: Actions.setStudentsSearchText
  }, dispatch);
}

function mapStateToProps({studentsApp, fuse})
{
  return {
    //searchText: studentsApp.student.searchText,
    mainTheme : fuse.settings.mainTheme
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileModal);
