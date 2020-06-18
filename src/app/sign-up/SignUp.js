import React, { Component } from 'react'
import { Avatar, Card, InputBase, Button, Menu, MenuItem, Icon, Checkbox, InputAdornment, RadioGroup, FormControlLabel } from '@material-ui/core'
import { TextFieldFormsy } from '@fuse';
import classNames from 'classnames';
import DropMenu from './DropMenu';
import dataService from 'app/services/dataService';
import DateFnsUtils from "@date-io/date-fns";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'app/store/actions';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
    DatePicker
} from "material-ui-pickers";
import { actions } from 'react-table';
import constants from '../../config/utils';
import TextInputBase from '../../common/TextInputBase';

const InputCommon = (props) => <div className="flex flex-1 flex-col mb-24">
    {props.title && <h4 style={{ color: "#707070" }}>
        {props.title}
        <span className="color_red">{props.require ? " *" : ""}</span>
    </h4>}
    <TextInputBase
        value={props.value && props.value}
        error={props.error && props.error}
        placeholder={props.hint ? props.hint : ""}
        type={props.type ? props.type : "text"}
        onChange={props.onChange}
        className="color_blue w-full input_base mt-12"
    />

</div>
const options = [
    'Show some love to Material-UI',
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
];
const fakeSchool = [
    {
        id: "01",
        name: "THPT Lương Thế Vinh"
    },
    {
        id: "02",
        name: "THPT Nguyễn Tất Thành"
    },
    {
        id: "03",
        name: "THPT Lomonosov"
    },
]
const fakeClass = [
    {
        id: "01",
        name: "10"
    },
    {
        id: "02",
        name: "11"
    },
    {
        id: "03",
        name: "12"
    },
]

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: constants.userType.STUDENT,
            value: true,
            name: "",
            userId: "",
            email: "",
            pass: "",
            confirmPass: "",
            phone: "",
            address: "",
            chooseClass: "",
            listProvince: [

            ],
            listDistrict: [],
            listSchool: [],
            listGrade: [],
            itemProvince: null,
            itemDistrict: null,
            itemSchool: null,
            itemGrade: null,
            birthday: null,
            gender: null
        }
    }
    componentDidMount() {
        dataService.getListProvince()
            .then(res => {
                console.log(res)
                this.setState({
                    listProvince: res
                })
            })
    }
    chooseProvince = (item) => {
        this.setState({
            itemProvince: item,
            itemDistrict: null,
            itemSchool: null,
            itemGrade: null
        })
        dataService.getListDistrict(item.id)
            .then(res => {
                this.setState({
                    listDistrict: res
                })
            })

    }
    chooseDistrict = (item) => {
        this.setState({
            itemDistrict: item,
            itemSchool: null,
            itemGrade: null,
        })
        dataService.getListSchool(this.state.itemProvince.id, item.id)
            .then(res => {
                console.log(res)
                this.setState({
                    listSchool: res
                })
            })
            .catch(err => {
                console.log("111111111111")
                console.log(err)
            })
    }
    chooseSchool = (item) => {
        var newlistGrade = []
        switch (item.schoolType) {
            case constants.schoolType.TYPE_PRIMARY_SCHOOL:
                newlistGrade = [1, 2, 3, 4, 5]
                break;

            case constants.schoolType.TYPE_SECONDARY_SCHOOL:
                newlistGrade = [6, 7, 8, 9]
                break;

            case constants.schoolType.TYPE_HIGH_SCHOOL:
                newlistGrade = [10, 11, 12]
                break;
            default:
                newlistGrade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                break;
        }
        this.setState({
            itemSchool: item,
            itemGrade: null,
            listGrade: newlistGrade
        })
    }
    chooseGrade = (item) => {
        this.setState({
            itemGrade: item,
        })
    }
    render() {
        const {
            pass,
            type,
            listSchool,
            listDistrict,
            value,
            gender,
            listProvince,
            itemProvince,
            itemDistrict,
            birthday,
            listGrade,
            itemSchool,
            confirmPass } = this.state
        return (
            <div className="image-background-signUp"
                style={{ backgroundImage: "url(assets/images/backgrounds/background.png)" }}>
                <div className="flex flex-row w-full py-56">
                    <div className="sign-up-left">
                        <div className="header-sign-up">
                            <img className="logo-sign-up" src="assets/images/logos/logo_ss_white.png" />
                        </div>
                        <img className="image-sign-up" src="assets/images/icons/image_signup.png" />
                        <div className="div-descrip">
                            <div className="flex flex-row items-center justify-center mb-24">
                                <div className="div-icon-tutorial mr-24">
                                    <img width="25px" className="object-contain" src="assets/images/icons/ic_documents.png" />
                                </div>
                                <h2 className="text-white font-bold">HƯỚNG DẪN</h2>
                            </div>
                            <h5 className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h5>
                        </div>
                    </div>

                    <div className="sign-up-right">
                        <Card className="form-sign-up">
                            <div className="flex w-full justify-center mb-40">
                                <h2 className="font-bold">Đăng kí tài khoản mới</h2>
                            </div>
                            <InputCommon
                                onChange={this.handleTextChange("name")}
                                title="Họ và tên"
                                require />
                            <InputCommon type="email" onChange={this.handleTextChange("email")} title="Tài khoản (email)" require />
                            <InputCommon onChange={this.handleTextChange("userId")} title="Tên đăng nhập" require />
                            <div className="w-full flex flex-row justify-between">
                                <InputCommon
                                    value={pass}
                                    type="password"
                                    error={pass.length < 6 && "Mật khẩu phải có ít nhất 6 ký tự bao gồm chữ cái hoặc số và các ký tự đặc biệt"}
                                    onChange={this.handleTextChange("pass")}
                                    title="Mật khẩu"
                                />
                                <div style={{ width: "40px" }} />
                                <InputCommon
                                    value={confirmPass}
                                    type="password"
                                    error={confirmPass != pass && "Mật khẩu không trùng khớp"}
                                    onChange={this.handleTextChange("confirmPass")}
                                    title="Nhập lại mật khẩu"
                                />
                            </div>
                            {/* <h6 className="mb-24" style={{ color: "#999999" }}>Mật khẩu phải có ít nhất 6 ký tự bao gồm chữ cái hoặc số và các ký tự đặc biệt</h6> */}
                            <InputCommon type="number" onChange={this.handleTextChange("phone")} title="Điện thoại di động" require />
                            <h4 style={{ color: "#707070" }}>
                                Chọn đối tượng
    </h4>
                            <div className="flex flex-row mt-12 mb-24">
                                <Button
                                    onClick={this.chooseType(constants.userType.STUDENT)}
                                    variant="contained"
                                    className={classNames("pt-12 pb-12 pl-24 pr-24  items-center justify-center text-white mr-24", type == constants.userType.STUDENT ? "gradient_blue" : "bg-white")}>
                                    <h2 className={classNames("text_button_base", type == constants.userType.STUDENT ? "text-white" : "color_blue")}>Học sinh</h2>
                                </Button>
                                <Button
                                    onClick={this.chooseType(constants.userType.TEACHER)}
                                    variant="contained"
                                    className={classNames("pt-12 pb-12 pl-24 pr-24  items-center justify-center text-white mr-24", type == constants.userType.TEACHER ? "gradient_blue" : "bg-white")}>
                                    <h2 className={classNames("text_button_base", type == constants.userType.TEACHER ? "text-white" : "color_blue")}>Giáo viên</h2>
                                </Button>
                            </div>
                            <InputCommon onChange={this.handleTextChange("address")} title="Địa chỉ" />
                            <div className="flex flex-row mb-24">
                                <DropMenu
                                    width="45%"
                                    list={listProvince.length > 0 ? listProvince : []}
                                    chooseItem={this.chooseProvince}
                                    name
                                    hint="Tỉnh/TP"
                                />
                                <div style={{ width: "10%" }} />
                                <DropMenu
                                    width="45%"
                                    list={listDistrict.length > 0 ? listDistrict : []}
                                    hint="Quận/Huyện"
                                    chooseItem={this.chooseDistrict}
                                    name
                                    idParent={itemProvince ? itemProvince.id : null}
                                    disabled={!itemProvince ? true : false}
                                />
                            </div>
                            <h4 className="mb-12" style={{ color: "#707070" }}>
                                Trường
                            <span className="color_red"> *</span>
                            </h4>
                            <DropMenu
                                width="45%"
                                list={listSchool.length > 0 ? listSchool : []}
                                chooseItem={this.chooseSchool}
                                name
                                idParent={itemDistrict ? itemDistrict.id : null}
                                hint="Chọn trường"
                                disabled={!itemDistrict ? true : false}
                            />
                            <h4 className="mb-12 mt-24" style={{ color: "#707070" }}>
                                Chọn khối
                            <span className="color_red"> *</span>
                            </h4>
                            <div className="flex flex-row mb-24">
                                <DropMenu
                                    width={"45%"}
                                    list={listGrade}
                                    chooseItem={this.chooseGrade}
                                    idParent={itemSchool ? itemSchool.id : null}
                                    hint="Chọn khối"
                                    disabled={!itemSchool ? true : false}
                                />
                                <div style={{ width: "10%" }} />
                                <div style={{ width: "45%" }} className="input_base">
                                    <InputBase
                                        placeholder={"Chọn lớp"}
                                        onChange={this.handleTextChange("chooseClass")}
                                        className="color_blue w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-1 flex-col mb-24">
                                    <h4 style={{ color: "#707070" }}>
                                        Ngày sinh
                                        <span className="color_red">{" *"}</span>
                                    </h4>
                                    <div className="input_base flex flex-row mt-12 items-center">
                                        <MuiPickersUtilsProvider className="color_blue" utils={DateFnsUtils}>
                                            <DatePicker
                                                className="color_blue"
                                                maxDate={Date.now()}
                                                value={birthday}
                                                format="dd/MM/yyyy"
                                                animateYearScrolling={true}
                                                id="startTime" name="startTime"
                                                onChange={this.handleDateChange("birthday")}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <Icon className="color_grey text-xs">
                                            calendar_today
        </Icon>
                                    </div>
                                </div>
                                <div style={{ width: "10%" }} />
                                <div className="flex-1"></div>
                            </div>

                            <h4 style={{ color: "#707070" }}>
                                Giới tính
                            <span className="color_red"> *</span>
                            </h4>
                            <RadioGroup onChange={this.changeGender} row aria-label="position" name="position" defaultValue="top">
                                <FormControlLabel
                                    value={constants.Gender.MALE}
                                    className="mr-32"
                                    control={<Checkbox type='checkbox' />}
                                    label="Nam"
                                />
                                <FormControlLabel
                                    value={constants.Gender.FEMALE}
                                    control={<Checkbox type='checkbox' />}
                                    label="Nữ"
                                />
                            </RadioGroup>
                            <h4 className="mb-12" style={{ color: "#707070" }}>
                                Quy định của Smart School
                        </h4>
                            <div className="regulations mt-12">
                                <h5 style={{ color: "#707070" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br /> <br /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </h5>
                            </div>
                            <div className="flex flex-row mt-12 items-center">
                                <Checkbox
                                    className="mr-12"
                                    type='checkbox'
                                    checked={value}
                                    onChange={this.changeValue}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <h5 style={{ color: "#707070" }}>Tôi đồng ý với các quy định của Smart School</h5>
                            </div>
                            <div className="flex flex-row mt-12 items-center justify-between w-full">
                                <Button
                                    onClick={this.goBack}
                                    variant="contained"
                                    className="pt-12 pb-12 pl-24 pr-24 gradient_red  items-center justify-center  text-white mr-24">
                                    <h2 className="text_button_base">Hủy</h2>
                                </Button>
                                <Button
                                    disabled={this.disabledSubmit()}
                                    onClick={this.register}
                                    variant="contained"
                                    className={`pt-12 pb-12 pl-24 pr-24  items-center justify-center ${!this.disabledSubmit() && "gradient_blue"} text-white`}>
                                    <h2 className="text_button_base">Đăng ký</h2>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
    goBack = () =>{
        this.props.history.goBack()
    }
    handleDateChange = (key) => (value) => {
        this.setState({
            [key]: value
        });
    };
    handleTextChange = (key) => (event) => {
        this.setState({
            [key]: event.target.value
        })
    }
    disabledSubmit = () => {
        const { value, userId, name, email, pass, confirmPass, itemProvince, itemDistrict, itemSchool, itemGrade, phone, birthday, chooseClass, gender } = this.state
        if (name == "") return true
        if (email == "") return true
        if (userId == "") return true
        if (pass == "") return true
        if (pass.length < 6) return true
        if (confirmPass != pass) return true
        if (phone == "") return true
        if (itemProvince == null) return true
        if (itemDistrict == null) return true
        if (itemSchool == null) return true
        if (itemGrade == null) return true
        if (chooseClass == "") return true
        if (birthday == null) return true
        if (gender == null) return true      
        return false
    }
    changeValue = (event) => {
        this.setState({
            value: event.target.checked
        })
        console.log(this.state.value)
    }
    changeGender = (event) => {
        this.setState({
            gender: event.target.value
        })
    }
    chooseType = (type) => () => {
        console.log(type)
        this.setState({
            type: type
        })
    }
    register = () => {
        const { name, email, userId, pass, confirmPass, phone, birthday, itemProvince, itemSchool, itemGrade, itemDistrict, address, type, chooseClass, gender } = this.state
        var date = birthday.getUTCDate();
        var month = birthday.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
        if (month < 10) month = "0" + month
        if (date < 10) date = "0" + date
        var year = birthday.getUTCFullYear();
        var dateStr = year + "-" + month + "-" + date;
        var params = { 
            name: name,
            userId: userId,
            email: email,
            province: itemProvince.id,
            district: itemDistrict.id,
            school: itemSchool.id,
            password: pass,
            password2: confirmPass,
            phone: phone,
            address: address,
            birthday: dateStr,
            userType: type,
            classId: chooseClass,
            gender: gender,
            degree: itemGrade.toString()
        }
        console.log("-------------")
        console.log(params)
        dataService.signUp(params)
            .then(res => {
                console.log("res")
                console.log(res)
                this.props.showMessage({ message: "Đăng ký thành công" })
                this.props.history.push('/signIn')
            })
            .catch(err => {
                console.log("err")
                console.log(err.response.data)
                this.props.showMessage({ message: err.response.data.message })
            })
    }

}

function  mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: Actions.showMessage,
    },
        dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp)