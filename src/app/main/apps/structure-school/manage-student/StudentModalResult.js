import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table"
const StudentModalResult = ({showModal,handleClose, data}) => {
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
                            <th>Mã học sinh</th>
                            <th>Tên học sinh </th>
                            <th>Giới tính</th>
                            <th>Ngày sinh học sinh</th>
                            <th>SĐT học sinh</th>
                            <th>Email học sinh</th>
                            <th>Địa chỉ học sinh</th>
                            <th>Mã trường học</th>
                            <th>Khối học</th>
                            <th>Mã lớp học</th>
                            <th>Niên khóa</th>
                            <th>Trạng thái học sinh</th>
                            <th>Mã phụ huynh</th>
                            <th>Tên phụ huynh</th>
                            <th>SĐT phụ huynh</th>
                            <th>Email phụ huynh</th>
                            <th>Quan hệ của phụ huynh</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && data.result ? data.result.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.studentId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.birthday}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.schoolId}</td>
                                    <td>{item.degreeNumber}</td>
                                    <td>{item.classId}</td>
                                    <td>{item.schoolYear}</td>
                                    <td>{item.studentStatus}</td>
                                    <td>{item.parentId}</td>
                                    <td>{item.parentName}</td>
                                    <td>{item.parentPhone}</td>
                                    <td>{item.parentEmail}</td>
                                    <td>{item.relationship}</td>
                                    <td>{item.errorMessage ? item.errorMessage : ''}</td>
                                </tr>
                            );
                        }) : null}
                        </tbody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <p>Tổng: {data && data.result ? data.result.length : 0}</p>
                <p>Thành công: {data && data.success ? data.success : 0}</p>
                <p>Lỗi: {data && data.error ? data.error : 0}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentModalResult);
