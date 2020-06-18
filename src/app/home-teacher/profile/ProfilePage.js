import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Link, withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { useDispatch, connect } from 'react-redux';
import constants from '../../../config/utils';
import dataService from '../../services/dataService';

const HeaderContainer = (props) =>
    <div className="w-full flex flex-row justify-between items-center mb-20">
        <h4 className="text_title ">
            {props.title}
        </h4>
        <Link to="/pages/auth/forgot-password">
            <h4 className="text_link ">
                {props.textbtn}
            </h4>
        </Link>

    </div>
const ItemInfo = (props) =>
    <div className={props.last ? "w-full flex flex-row justify-between items-center" : "w-full flex flex-row justify-between items-center mb-12"} >
        <h4 className="text_info ">
            {props.title}
        </h4>
        <h4 className="text_value ">
            {props.value}
        </h4>
    </div>


class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {

            }
        }
    }
    componentDidMount() {
        dataService.getInfoTeacher(this.props.user.userId)
            .then(res => {
                console.log("55555555555555")
                console.log(res)
                this.setState({
                    profile: res
                })
            })
            .catch(err => {

            })
    }

    render() {
        const { profile } = this.state
        return (
            <div className="p-24 content_container w-full h-full pr-32">
                <div className="w-full flex items-center flex-row justify-between mb-32">
                    <h3 className="header_text ">
                        Thông tin cá nhân
                        </h3>
                    {/* <div className="flex-row justify-between div_button">
                        <Fab className="button_circle mr-24" aria-label="add">
                            <img className="icon_button" src="assets/images/profile/btn_pen.png" />
                        </Fab>
                        <Fab className="button_circle" aria-label="add">
                            <img className="icon_button" src="assets/images/profile/btn_bin.png" />
                        </Fab>
                    </div> */}
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row">
                        <Card className="card_user">
                            <div className="card_user_top">
                                <img src="assets/images/avatars/andrew.jpg" className="w-full object-fill rounded-lg" />
                                <h4 className="text_name color_blue">
                                    {profile.teacherName ? profile.teacherName : ''}
                                </h4>
                                <div className="backgroundColor_yellow container_name">
                                    {/* <div className="container_gender_birthday">
                                        <img className="icon_gender" src="assets/images/icons/ic_male.png" />
                                        <h5 className="text_gender ">
                                            {profile.genderTeacher === constants.Gender.MALE ? "Nam" : "Nữ"}
                                        </h5>
                                    </div>
                                    <div className="container_gender_birthday">
                                        <h5 className="text_gender ">
                                            {profile.birthday ? profile.birthday : ''}
                                        </h5>
                                    </div> */}
                                    <img className="icon_gender" src="assets/images/icons/ic_crown.png" />
                                    <h5 className="text-white font-bold">Nâng cấp lên tài khoản VIP</h5>
                                </div>
                            </div>
                            <div className="card_user_bot flex flex-row justify-center m-4">
                                <h5 className="text_gender mr-2 ">
                                    {profile.genderTeacher === constants.Gender.MALE ? "Nam" : "Nữ"}
                                </h5>
                                <h5 className="text_gender">|</h5>
                                <h5 className="text_gender ">
                                    {profile.birthday ? profile.birthday : ''}
                                </h5>
                            </div>
                            <div className="card_user_bot mb-5">
                                <h5 className="code_student flex flex-col mb-1">
                                    <h5 >Mã giáo viên: </h5> 
                                    <span className="font-bold m-3">{profile.teacherId ? profile.teacherId : ""}</span>
                                </h5>
                                <div>
                                    <Link className="code_student flex justify-center underline">
                                        Thay đổi mật khẩu
                                </Link>
                                </div>


                            </div>
                        </Card>
                        <div className="container_infoUser">
                            <div className="container_info_common  mb-20">
                                <HeaderContainer title="Thông tin chung" />
                                <ItemInfo title="Họ và tên" value={profile.teacherName ? profile.teacherName : ''} />
                                <ItemInfo title="Giới tính" value={profile.genderTeacher === constants.Gender.MALE ? "Nam" : "Nữ"} />
                                <ItemInfo title="Ngày sinh" value={profile.birthday ? profile.birthday : ''} />
                                <ItemInfo title="CMTND" last value={profile.passport ? profile.passport : ''} />
                                {/* <ItemInfo title="Ngày cấp /Nơi cấp" value={`${''} - ${''}`} last /> */}
                            </div>
                            <div className="container_info_common">
                                <HeaderContainer title="Thông tin liên hệ" />
                                <ItemInfo title="Địa chỉ:" value={profile.address ? profile.address : ""} />
                                <ItemInfo title="Số điện thoại:" value={profile.phone ? profile.phone : ""} />
                                <ItemInfo title="Email" value={profile.email ? profile.email : ""} last />
                            </div>
                        </div>
                        <div className="container_result">
                            <div className="container_info_ribbon relative mb-20">
                                <div className="ribbon">
                                    <div className="backgroundColor_blue ribbon_header">
                                        <h4 className="font-bold text-white">Thông tin công tác</h4>
                                    </div>
                                    <div className="triangle-down" />
                                </div>
                                <ItemInfo title="Trường học" value={profile.schoolId ? profile.schoolId : ''} />
                                <ItemInfo title="Vị trí công tác" value={profile.address ? profile.address : ""} />
                                <ItemInfo title="Tổ môn" value={profile.birthday ? profile.birthday : ''} />
                                <ItemInfo title="Môn phụ trách" value={profile.passport ? profile.passport : ''} />
                                <ItemInfo title="Bằng cấp" last value={profile.degree ? profile.degree : ''} />
                            </div>
                            <div className="container_info_ribbon relative">
                                <div className="ribbon">
                                    <div className="backgroundColor_blue ribbon_header">
                                        <h4 className="font-bold text-white">Nội dung cá nhân</h4>
                                    </div>
                                    <div className="triangle-down" />
                                </div>
                                <ItemInfo title="Giáo án các môn đang sử dụng" value={12} />
                                <ItemInfo title="Số lượng lớp học" value={3} />
                                <ItemInfo title="Dung lượng sử dụng" value={"0MB/ 500MB"} />
                                <ItemInfo title="SS Point" value={500} last />
                            </div>
                        </div>
                    </div>
                </FuseAnimate>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        // profile: state.profileReducer.profile
        user: state.auth.login.user.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(mapStateToProps, null)(ProfilePage);

