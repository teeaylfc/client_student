import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Icon, InputAdornment} from "@material-ui/core";
import {FuseScrollbars} from '@fuse/index';
import _ from '@lodash';
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import SelectFormsy from "../../../@fuse/components/formsy/SelectFormsy";
import {TextFieldFormsy} from '@fuse';
import SchoolInfoModel from "../model/SchoolInfoModel";
import Formsy from 'formsy-react';

const initialState = {
  formOpen: false,
  canSubmit: false,
  form : {
    citySchool: '',
    districtSchool:'',
    degreeNo:'',
    idSchool:'',
    degreeNumber: '',
    addressSchool:'',
  },
  cities: [],
  districts: [],
  districtsDisplay:[],
  schoolData:[]
};



class SchoolInfoAddCard extends Component {
  state = initialState;
  handleOpenForm = () => {
    this.setState({formOpen: true})
  };

  handleCloseForm = () => {
    this.setState({...initialState})
  };

  handleChange = (event) => {
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value)});
  };

  handleChipChange = async (value, name) => {
    await this.setState({form: _.set({...this.state.form}, name, value.target.value)});
    await this.filterSchool(this.state.form);
  };

  filterSchool = (form) => {
    this.props.filterSchool(form)
  }

  onSubmit = (ev) => {
    const {citySchool, districtSchool, degreeNo, idSchool, degreeNumber, addressSchool } = this.state.form;
    this.props.addNewSchoolInfo(new SchoolInfoModel({citySchool, districtSchool, degreeNo, idSchool, degreeNumber, addressSchool}));
    this.handleCloseForm();
  };

  handleCardAdded = (topic) => {
    let topicPointList = [...this.state.form.topicPointList, topic];
    this.setState({form: _.set({...this.state.form}, 'topicPointList', topicPointList)});
    this.contentScrollEl.scrollTop = this.contentScrollEl.scrollHeight;
  };

  cityOnchange =(value) =>{
    const cityName = value.target.value;
    const city = this.props.cities.filter(function(city){
      return city.cityId === cityName
    });
    const districtsDisplay = this.props.districts.filter(function(district){
      if(city[0] && district.cityId === city[0].cityId){
        return district;
      }
      //return
    });

    let districts = districtsDisplay.map(district => ({ value: district.districtId, label: district.name }))
    this.setState({districtsDisplay : districts});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
     //this.setState({canBeSubmit : this.canBeSubmitted()});
  }

  disableButton = () => {
    this.setState({canSubmit: false});
  };

  enableButton = () => {
    this.setState({canSubmit: true});
  };

  canBeSubmitted()
  {
    const {form} = this.state;
    return (
      form.citySchool.length > 0 && form.districtSchool.length > 0
      && form.degreeNo.length > 0 && form.idSchool.length > 0 && form.degreeNumber.length >0 && form.addressSchool.length>0
    );
  }

  render() {
    const {schoolData, cities, districts} = this.props;
    const {formOpen, form, districtsDisplay,canSubmit} = this.state;

    return (
        <div className="w-full mb-16 border-t-1">
          {formOpen ? (
              <Formsy
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                  ref={(form) => this.form = form}
                  className="flex flex-col justify-center w-full"
              >
            <Card className="w-full mb-16">
              <CardContent className="flex">
                <FuseScrollbars className="flex-grow overflow-x-auto">

                  <div className="flex">
                    <SelectFormsy
                      className=" mt-8 mb-16 w-1/2 mr-16"
                      name="citySchool"
                      label="Tỉnh/Thành phố"
                      value={form.citySchool}
                      validations="isAlpha"
                      validationError="Must not be None"
                      onChange = {(value) => {
                        this.cityOnchange(value, 'citySchool');
                        this.handleChipChange(value, 'citySchool')
                      }}
                    >
                      <MenuItem value="1">
                        <em>None</em>
                      </MenuItem>
                      {cities.map((city) => {
                        return <MenuItem value={city.cityId}>{city.name}</MenuItem>
                      })}
                    </SelectFormsy>

                    <SelectFormsy
                      className="mt-8 mb-16 w-1/2"
                      name="districtSchool"
                      label="Quận/Huyện"
                      value={form.districtSchool}
                      validations="isAlpha"
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
                      value={form.degreeNo}
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
                      value={form.idSchool}
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
                      value={form.degreeNumber}
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


                    <TextFieldFormsy
                      className="mb-16 w-1/2"
                      type="text"
                      name="addressSchool"
                      label="Địa chỉ"
                      value={form.addressSchool}
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
              <CardActions>
                {/*<Button variant="contained" color="primary" disabled={!this.canSubmit} onClick={this.onSubmit}>
                  Thêm mới thông tin
                </Button>*/}

                <Button

                    variant="contained"
                    color="primary"
                    disabled={!canSubmit}
                    onClick ={this.onSubmit}
                >
                  Thêm mới thông tin
                </Button>
              </CardActions>
            </Card>
              </Formsy>
            ): (
            <Button
              onClick={this.handleOpenForm}
              classes={{
                root: "normal-case font-600 w-full rounded-none h-48",
                label: "justify-start"
              }}
            >
              <Icon className="text-20 mr-8">add</Icon>
              Thêm thông tin trường học
            </Button>
            )
          }
        </div>
    );
  }
}

function mapStateToProps(examDefineApp) {
  return {

  };
}

export default connect(mapStateToProps,)(SchoolInfoAddCard);
