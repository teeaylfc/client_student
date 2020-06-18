import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table"
const EnterPointModalResult = ({showModal,handleClose, data}) => {

    return (
        <></>
        // <Modal size="lg" show={showModal} onHide={handleClose}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Kết quả import lớp học</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <div className='w-full overflow-auto'>
        //             <Table striped bordered hover>
        //                 <thead>
        //                 <tr>
        //                     <th>#</th>
        //                     <th>Mã trường học</th>
        //                     <th>Tên trường học </th>
        //                     <th>Mã lớp học</th>
        //                     <th>Tên lớp học</th>
        //                     <th>Niên khóa</th>
        //                     <th>Khối lớp</th>
        //                     <th>Ban học</th>
        //                     <th>Giáo viên chủ nhiệm</th>
        //                     <th>Lớp chuyên</th>
        //                     <th>Sĩ số</th>
        //                 </tr>
        //                 </thead>
        //                 <tbody>
        //                 {data.result ? data.result.map((item, index) => {
        //                     return (
        //                         <tr key={index}>
        //                             <td>{index}</td>
        //                             <td>{item.idSchool}</td>
        //                             <td>{item.nameSchool}</td>
        //                             <td>{item.idClass}</td>
        //                             <td>{item.nameClass}</td>
        //                             <td>{item.schoolYear}</td>
        //                             <td>{item.groupOfClass}</td>
        //                             <td>{item.typeClass}</td>
        //                             <td>{item.teacherManage}</td>
        //                             <td>{item.professionalClass}</td>
        //                             <td>{item.totalStudent}</td>
        //                             <td>{item.errorMessage ? item.errorMessage : ''}</td>
        //                         </tr>
        //                     );
        //                 }) : null}
        //                 </tbody>
        //             </Table>
        //         </div>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <p>Tổng: {data.result ? data.result.length : 0}</p>
        //         <p>Thành công: {data.success}</p>
        //         <p>Lỗi: {data.error}</p>
        //     </Modal.Footer>
        // </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnterPointModalResult);
