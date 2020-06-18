import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table"
const TeacherModalResult = ({showModal,handleClose, data}) => {
    console.log('data',data);

    return (
        <Modal size="lg" show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kết quả import giáo viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='w-full overflow-auto'>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Trường học</th>
                            <th>Mã giáo viên</th>
                            <th>Tên giáo viên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Môn phụ trách</th>
                            <th>Địa chỉ</th>
                            <th>Lớp chủ nhiệm</th>
                            <th>CMTND</th>
                            <th>Bằng cấp</th>
                            <th>Vị trí công tác</th>
                            <th>Error Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.result ? data.result.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.idSchool}</td>
                                    <td>{item.teacherId}</td>
                                    <td>{item.nameTeacher}</td>
                                    <td>{item.birthdayTeacher}</td>
                                    <td>{item.genderTeacher}</td>
                                    <td>{item.phoneTeacher}</td>
                                    <td>{item.emailTeacher}</td>
                                    <td>{item.subjectName}</td>
                                    <td>{item.addressTeacher}</td>
                                    <td>{item.nameClass}</td>
                                    <td>{item.passport}</td>
                                    <td>{item.degreeTeacher}</td>
                                    <td>{item.typeJob}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherModalResult);
