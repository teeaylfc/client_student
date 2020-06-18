import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Icon, InputAdornment} from "@material-ui/core";
import {FuseScrollbars} from '@fuse/index';
import _ from '@lodash';
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import SelectFormsy from "../../../@fuse/components/formsy/SelectFormsy";
import {TextFieldFormsy} from '@fuse';

const initialState = {
  canSubmit: false,
  form : {
    citySchool: '',
    districtSchool:'',
    degreeNo:'',
    idSchool:'',
    degreeNumber: '',
    addressSchool:'',
  },
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
      value:"Quan Ba Dinh",
      label:"Quận Ba Đình",
      cityId: "1"
    },
    {
      value:"Quan Hoan Kiem",
      label:"Quận Hoàn Kiếm",
      cityId:"1"
    },
    {
      value:"Quan Hai Ba Trung",
      label:"Quận Hai Bà Trưng",
      cityId:"1"
    },
    {
      value:"Quan Dong Da",
      label:"Quận Đống Đa",
      cityId:"1"
    },
    {
      value:"Quan Tay Ho",
      label:"Quận Tây Hồ",
      cityId:"1"
    },
    {
      value:"Quan Cau Giay",
      label:"Quận Cầu Giấy",
      cityId:"1"
    },
    {
      value:"Quan Thanh Xuan",
      label:"Quận Thanh Xuân",
      cityId:"1"
    },
    {
      value:"Quan Thanh Xuan",
      label:"Quận Thanh Xuân",
      cityId:"1"
    },
    {
      value:"Quan Hoang Mai",
      label:"Quận Hoàng Mai",
      cityId:"1"
    },
    {
      value:"Quan Long Bien",
      label:"Quận Long Biên",
      cityId:"1"
    },
    {
      value:"Thanh pho Nam Dinh‎",
      label:"Thành phố Nam Định‎",
      cityId:"2"
    },
    {
      value:"Huyen Giao Thuy‎",
      label:"Huyện Giao Thủy‎‎",
      cityId:"2"
    },
    {
      value:"Huyen Hai Hau‎",
      label:"Huyện Hải Hậu‎",
      cityId:"2"
    },
    {
      value:"Huyen My Loc‎",
      label:"Huyện Mỹ Lộc‎‎",
      cityId:"2"
    },
    {
      value:"Huyen Nam Truc‎",
      label:"Huyện Nam Trực‎",
      cityId:"2"
    },
    {
      value:"Huyen Nghia Hung",
      label:"Huyện Nghĩa Hưng‎",
      cityId:"2"
    },
    {
      value:"Huyen Vu Ban‎",
      label:"Huyện Vụ Bản‎",
      cityId:"2"
    },
    {
      value:"Huyen Xuan Truong‎‎",
      label:"Huyện Xuân Trường‎‎",
      cityId:"2"
    },
    {
      value:"Huyen Y Yen‎",
      label:"Huyện Ý Yên‎",
      cityId:"2"
    },
    ],
    districtsDisplay: [
    {
      value:"Quan Ba Dinh",
      label:"Quận Ba Đình",
      cityId: "1"
    },
    {
      value:"Quan Hoan Kiem",
      label:"Quận Hoàn Kiếm",
      cityId:"1"
    },
    {
      value:"Quan Hai Ba Trung",
      label:"Quận Hai Bà Trưng",
      cityId:"1"
    },
    {
      value:"Quan Dong Da",
      label:"Quận Đống Đa",
      cityId:"1"
    },
    {
      value:"Quan Tay Ho",
      label:"Quận Tây Hồ",
      cityId:"1"
    },
    {
      value:"Quan Cau Giay",
      label:"Quận Cầu Giấy",
      cityId:"1"
    },
    {
      value:"Quan Thanh Xuan",
      label:"Quận Thanh Xuân",
      cityId:"1"
    },
    {
      value:"Quan Thanh Xuan",
      label:"Quận Thanh Xuân",
      cityId:"1"
    },
    {
      value:"Quan Hoang Mai",
      label:"Quận Hoàng Mai",
      cityId:"1"
    },
    {
      value:"Quan Long Bien",
      label:"Quận Long Biên",
      cityId:"1"
    },
    {
      value:"Thanh pho Nam Dinh‎",
      label:"Thành phố Nam Định‎",
      cityId:"2"
    },
    {
      value:"Huyen Giao Thuy‎",
      label:"Huyện Giao Thủy‎‎",
      cityId:"2"
    },
    {
      value:"Huyen Hai Hau‎",
      label:"Huyện Hải Hậu‎",
      cityId:"2"
    },
    {
      value:"Huyen My Loc‎",
      label:"Huyện Mỹ Lộc‎‎",
      cityId:"2"
    },
    {
      value:"Huyen Nam Truc‎",
      label:"Huyện Nam Trực‎",
      cityId:"2"
    },
    {
      value:"Huyen Nghia Hung",
      label:"Huyện Nghĩa Hưng‎",
      cityId:"2"
    },
    {
      value:"Huyen Vu Ban‎",
      label:"Huyện Vụ Bản‎",
      cityId:"2"
    },
    {
      value:"Huyen Xuan Truong‎‎",
      label:"Huyện Xuân Trường‎‎",
      cityId:"2"
    },
    {
      value:"Huyen Y Yen‎",
      label:"Huyện Ý Yên‎",
      cityId:"2"
    },
  ],
  schoolData:[]
};



class SchoolInfoCard extends Component {

  state = initialState;

  handleChange = (event) => {
    this.props.changeNewSchoolInfo(_.setIn(this.props.schoolInfo, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value));
    //this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value)});
  };

  handleChipChange = (value, name) => {
    this.props.changeNewSchoolInfo(_.setIn(this.props.schoolInfo, name, value.value));
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

  componentDidUpdate(prevProps, prevState, snapshot) {
     //this.setState({canBeSubmit : this.canBeSubmitted()});
  }

  render() {
    const {schoolInfo, index, schoolData} = this.props;
    const schoolTitle = 'Thông tin trường ' + (index + 1);
    const {cities,districtsDisplay} = this.state;

    return (
        <div className="w-full mb-16 border-t-1">
          <Card className="w-full mb-16">
            <CardHeader title={schoolTitle}/>
            <CardContent className="flex">
              <FuseScrollbars className="flex-grow overflow-x-auto">

                <div className="flex">
                  <SelectFormsy
                      className=" mt-8 mb-16 w-1/2 mr-16"
                      name="citySchool"
                      label="Tỉnh/Thành phố"
                      value={schoolInfo.citySchool}
                      validations="isAlpha"
                      validationError="Must not be None"
                      onChange = {(value) => this.cityOnchange(value, 'city')}
                  >
                    <MenuItem value="1">
                      <em>None</em>
                    </MenuItem>
                    {cities.map((city) => {
                      return <MenuItem value={city.value}>{city.label}</MenuItem>
                    })}
                  </SelectFormsy>

                  <SelectFormsy
                      className="mt-8 mb-16 w-1/2"
                      name="districtSchool"
                      label="Quận/Huyện"
                      value={schoolInfo.districtSchool}
                      validations="isWords"
                      validationError="Must not be None"
                      onChange = {(value) => this.handleChipChange(value, 'districtSchool')}
                  >
                    {/*(students.map(v => {
                            return <MenuItem value={v.value}>{v.name}</MenuItem>
                        }))*/}
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
                      value={schoolInfo.degreeNo}
                      validations="isNumeric"
                      validationError="Must not be None"
                      onChange = {(value) => this.handleChipChange(value, 'degreeNo')}
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
                      value={schoolInfo.idSchool}
                      validations="isAlphanumeric"
                      validationError="Must not be None"
                      onChange = {(value) => this.handleChipChange(value, 'idSchool')}
                  >
                    <MenuItem value="1">
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
                      value={schoolInfo.degreeNumber}
                      validations="isNumeric"
                      validationError="Must not be None"
                      isRequired
                      onChange = {(value) => this.handleChipChange(value, 'degreeNumber')}
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
                      value={schoolInfo.addressSchool}
                      onChange = {(value) => this.handleChange(value, 'addressSchool')}
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

              </FuseScrollbars>
            </CardContent>
          </Card>
        </div>
    );
  }
}
function mapStateToProps(examDefineApp) {
  return {

  };
}

export default connect(mapStateToProps,)(SchoolInfoCard);
