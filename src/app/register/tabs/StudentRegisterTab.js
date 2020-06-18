import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from '../../auth/store/actions/register.actions';
import * as schoolActions from '../../../app/main/apps/structure-school/store/actions/school.actions';
import DatePickers from "../../../../src/common/DatePickers";
import SelectFormsy from "../../../@fuse/components/formsy/SelectFormsy";
import MenuItem from "@material-ui/core/MenuItem";

class StudentRegisterTab extends Component {

    state = {
        canSubmit: false,
        cities: [
            {
                value: "HN",
                label: "Hà Nội",
                cityId : "1"
            },
            {
                value: "ND",
                label: "Nam Định",
                cityId : "2"
            }
        ],
        districts: [
            {
                value:"Quận Ba Đình",
                label:"Quận Ba Đình",
                cityId: "1"
            },
            {
                value:"Quận Hoàn Kiếm",
                label:"Quận Hoàn Kiếm",
                cityId:"1"
            },
            {
                value:"Quận Hai Bà Trưng",
                label:"Quận Hai Bà Trưng",
                cityId:"1"
            },
            {
                value:"Quận Đống Đa",
                label:"Quận Đống Đa",
                cityId:"1"
            },
            {
                value:"Quận Tây Hồ",
                label:"Quận Tây Hồ",
                cityId:"1"
            },
            {
                value:"Quận Cầu Giấy",
                label:"Quận Cầu Giấy",
                cityId:"1"
            },
            {
                value:"Quận Thanh Xuân",
                label:"Quận Thanh Xuân",
                cityId:"1"
            },
            {
                value:"Quận Thanh Xuân",
                label:"Quận Thanh Xuân",
                cityId:"1"
            },
            {
                value:"Quận Hoàng Mai",
                label:"Quận Hoàng Mai",
                cityId:"1"
            },
            {
                value:"Quận Long Biên",
                label:"Quận Long Biên",
                cityId:"1"
            },
            {
                value:"Thành phố Nam Định‎",
                label:"Thành phố Nam Định‎",
                cityId:"2"
            },
            {
                value:"Huyện Giao Thủy‎",
                label:"Huyện Giao Thủy‎‎",
                cityId:"2"
            },
            {
                value:"Huyện Hải Hậu‎",
                label:"Huyện Hải Hậu‎",
                cityId:"2"
            },
            {
                value:"Huyện Mỹ Lộc‎",
                label:"Huyện Mỹ Lộc‎‎",
                cityId:"2"
            },
            {
                value:"Huyện Nam Trực‎",
                label:"Huyện Nam Trực‎",
                cityId:"2"
            },
            {
                value:"Huyện Nghĩa Hưng",
                label:"Huyện Nghĩa Hưng‎",
                cityId:"2"
            },
            {
                value:"Huyện Vụ Bản‎",
                label:"Huyện Vụ Bản‎",
                cityId:"2"
            },
            {
                value:"Huyện Xuân Trường‎‎",
                label:"Huyện Xuân Trường‎‎",
                cityId:"2"
            },
            {
                value:"Huyện Ý Yên‎",
                label:"Huyện Ý Yên‎",
                cityId:"2"
            },
        ],
        districtsDisplay:[],
        schoolData:[]

    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.props.submitRegister(model);
    };

    cityOnchange =(value) =>{
        const cityName = value.target.value;
        const city = this.state.cities.filter(function(city){
            return city.value === cityName
        });
        const districtsDisplay = this.state.districts.filter(function(district){
            if(city[0] && district.cityId === city[0].cityId){
                return district;
            }
            //return
        });
        this.setState({districtsDisplay : districtsDisplay});
    }

    componentDidMount() {
        this.props.getAllSchool();
    }


    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.register.error && (this.props.register.error.username || this.props.register.error.password || this.props.register.error.email) )
        {
            this.form.updateInputsWithError({
                ...this.props.register.error
            });

            this.props.register.error = null;
            this.disableButton();
        }

        return null;
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.school.schools.length >0) {
          const schoolData = nextProps.school.schools.map(school => ({ value: school.id, label: school.name }))
          this.setState({schoolData : schoolData})
      }
    }

    render()
    {
        const {canSubmit} = this.state;
        const {cities, districtsDisplay, schoolData} = this.state;

        return (
            <div className="w-full">
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full"
                >
                    <div className="flex">
                        <TextFieldFormsy
                          className="mb-16 mr-16 w-1/2"
                          type="text"
                          name="studentId"
                          label="Tên đăng nhập"
                          validations={{
                              minLength: 4
                          }}
                          validationErrors={{
                              minLength: 'Min character length is 4'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />

                        <TextFieldFormsy
                          className="mb-16 w-1/2"
                          type="text"
                          name="nameStudent"
                          label="Họ và tên"
                          validations={{
                              minLength: 4
                          }}
                          validationErrors={{
                              minLength: 'Min character length is 4'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />
                    </div>

                    <div className="flex">
                        <div className="mb-16 w-1/2 mr-16">
                            <DatePickers
                              label="Ngày sinh"
                              id="birthday"
                              name="birthday"
                            />
                        </div>

                        <SelectFormsy
                          className=" mt-8 w-1/2"
                          name="gender"
                          label="Giới tính"
                          value="none"
                          validations="isAlpha"
                          validationError="Must not be None"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="male">Nam</MenuItem>
                            <MenuItem value="female">Nữ</MenuItem>
                        </SelectFormsy>

                    </div>

                    <div className="flex">
                        <TextFieldFormsy
                          className="mb-16 mr-16 w-1/2"
                          type="text"
                          name="phoneStudent"
                          label="Số điện thoại"
                          validations="isNumeric"
                          validationErrors={{
                              isNumeric: 'Please enter a valid phone'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">phone</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />

                        <TextFieldFormsy
                          className="mb-16 w-1/2"
                          type="text"
                          name="emailStudent"
                          label="Email"
                          validations="isEmail"
                          validationErrors={{
                              isEmail: 'Please enter a valid email'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />
                    </div>


                    <TextFieldFormsy
                      className="mb-16"
                      type="text"
                      name="addressStudent"
                      label="Địa chỉ"
                      validations={{
                          minLength: 4
                      }}
                      validationErrors={{
                          minLength: 'Min character length is 4'
                      }}
                      InputProps={{
                          endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">address</Icon></InputAdornment>
                      }}
                      variant="outlined"
                      required
                    />

                    <h3 className="text-blue-light">Thông tin trường học</h3>
                    <div className="flex">
                        <SelectFormsy
                          className=" mt-8 mb-16 w-1/2 mr-16"
                          name="citySchool"
                          label="Tỉnh/Thành phố"
                          value="none"
                          validations="isAlpha"
                          validationError="Must not be None"
                          onChange = {(value) => this.cityOnchange(value, 'city')}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {cities.map((city, index) => {
                                return <MenuItem value={city.value}>{city.label}</MenuItem>
                            })}
                        </SelectFormsy>

                        <SelectFormsy
                          className="mt-8 mb-16 w-1/2"
                          name="districtSchool"
                          label="Quận/Huyện"
                          value="none"
                          validations="isAlpha"
                          validationError="Must not be None"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            { districtsDisplay.length !== 0 ? districtsDisplay.map((item, index) => {
                                return <MenuItem value={item.value}>{item.label}</MenuItem>
                                }) : null
                            }
                        </SelectFormsy>

                    </div>

                    <div className="flex">
                        <SelectFormsy
                          className=" mt-8 mb-16 w-1/2 mr-16"
                          name="degreeNo"
                          label="Cấp học"
                          value=""
                          validations="isNumeric"
                          validationError="Must not be None"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                        </SelectFormsy>

                        <SelectFormsy
                          className="mt-8 mb-16 w-1/2"
                          name="idSchool"
                          label="Trường học"
                          value="none"
                          validations="isAlphanumeric"
                          validationError="Must not be None"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            { schoolData.length !== 0 ? schoolData.map((item) => {
                                return <MenuItem value={item.value}>{item.label}</MenuItem>
                            }) : null
                            }
                        </SelectFormsy>

                    </div>

                    <div className="flex">
                        <SelectFormsy
                          className=" mt-8 mb-16 w-1/2 mr-16"
                          name="degreeNumber"
                          label="Khối học"
                          value=""
                          validations="isNumeric"
                          validationError="Must be None"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                            <MenuItem value="9">9</MenuItem>
                            <MenuItem value="10">10</MenuItem>
                            <MenuItem value="11">11</MenuItem>
                            <MenuItem value="12">12</MenuItem>
                        </SelectFormsy>

                        {/*<SelectFormsy
                          className="mt-8 mb-16 w-1/2"
                          name="nameClass"
                          label="Tên lớp học"
                          value="none"
                          validations="equals:none"
                          validationError="Must be None"
                        >
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="male">Nam</MenuItem>
                            <MenuItem value="female">Nữ</MenuItem>
                        </SelectFormsy>*/}
                        <TextFieldFormsy
                          className="mb-16 w-1/2"
                          type="text"
                          name="addressSchool"
                          label="Địa chỉ"
                          validations={{
                              minLength: 4
                          }}
                          validationErrors={{
                              minLength: 'Min character length is 4'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">class</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />

                    </div>

                    {/*Thong tin phu huynh*/}

                    <h3 className="text-blue-light">Thông tin phụ huynh</h3>
                    &nbsp; <span className="text-grey-dark"> (Thông tin Phụ huynh được dùng để tạo tài khoản để Phụ huynh có thể theo dõi kết quả học tập của con trên hệ thống)</span>
                    <div className="flex">
                        <TextFieldFormsy
                          className="mt-16 mb-16 mr-16 w-1/2"
                          type="text"
                          name="parentId"
                          label="Tên đăng nhập"
                          validations={{
                              minLength: 4
                          }}
                          validationErrors={{
                              minLength: 'Min character length is 4'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />

                        <TextFieldFormsy
                          className="mt-16 mb-16 w-1/2"
                          type="text"
                          name="nameParent"
                          label="Họ và tên"
                          validations={{
                              minLength: 4
                          }}
                          validationErrors={{
                              minLength: 'Min character length is 4'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />
                    </div>

                    <div className="flex">
                        <div className="mb-16 w-1/2 mr-16">
                            <DatePickers
                              label="Ngày sinh"
                              id="birthdayParent"
                              name="birthdayParent"
                            />
                        </div>

                        <SelectFormsy
                          className=" mt-8 w-1/2"
                          name="genderParent"
                          label="Giới tính"
                          value="none"
                          validations="isAlpha"
                          validationError="Must not be None"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="male">Nam</MenuItem>
                            <MenuItem value="female">Nữ</MenuItem>
                        </SelectFormsy>
                    </div>

                    <div className="flex">
                        <TextFieldFormsy
                          className="mb-16 mr-16 w-1/2"
                          type="text"
                          name="phoneParent"
                          label="Số điện thoại"
                          validations="isNumeric"
                          validationErrors={{
                              isNumeric: 'Please enter a valid phone'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">phone</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />

                        <TextFieldFormsy
                          className="mb-16 w-1/2"
                          type="text"
                          name="emailParent"
                          label="Email"
                          validations="isEmail"
                          validationErrors={{
                              isEmail: 'Please enter a valid email'
                          }}
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                          }}
                          variant="outlined"
                          required
                        />
                    </div>




                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="Đăng ký học sinh"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        Register
                    </Button>

                </Formsy>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitRegister: authActions.submitRegister,
        getAllSchool : schoolActions.getAllSchool
    }, dispatch);
}

function mapStateToProps({auth})
{
    console.log(auth);
    return {
        register: auth.register,
        user    : auth.user,
        school: auth.school
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentRegisterTab));
