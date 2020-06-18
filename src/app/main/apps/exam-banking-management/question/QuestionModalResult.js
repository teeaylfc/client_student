import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table"
const QuestionModalResult = ({showModal,handleClose, data}) => {
    console.log('data',data);

    return (
        <Modal size="lg" show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kết quả import lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='w-full overflow-auto'>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã trường học</th>
                            <th>Mã môn học </th>
                            <th>Khối lớp</th>
                            <th>Mã chuyên đề</th>
                            <th>Mã gói câu hỏi</th>
                            <th>Mức độ câu hỏi  </th>
                            <th>Dạng câu hỏi</th>
                            <th>Câu hỏi</th>
                        </tr>
                        </thead>
                        <tbody>
                        { data && data.result ? data.result.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.idSchool}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.classRoom}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.questionsPack}</td>
                                    <td>{item.questionLevel}</td>
                                    <td>{item.questionType}</td>
                                    <td>{item.questionString}</td>
                                    <td>{item.errorMessage ? item.errorMessage : ''}</td>
                                </tr>
                            );
                        }) : null}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <p>Tổng: {data.result ? data.result.length : 0}</p>
                <p>Thành công: {data.success}</p>
                <p>Lỗi: {data.error}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionModalResult);
