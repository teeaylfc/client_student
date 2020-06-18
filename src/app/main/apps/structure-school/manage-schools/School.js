import React, {Component} from 'react';
import {Button, Icon, Tab, Tabs, TextField, Typography, withStyles} from '@material-ui/core';
import {FuseAnimate, FuseChipSelect, FusePageCarded} from '@fuse/index';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ImageUpload from "../../../../../common/ImageUpload";

const styles = theme => ({

});

class School extends Component {

    getYear = () => {
        const date = new Date,
          years = [{value: "", label: "--Chọn--"}],
          year = date.getFullYear();

        for (let i = year; i < year + 10; i++) {
            const schoolYearStr = i + ' - ' + (i + 1);
            const schoolYear = {
                value: schoolYearStr,
                label: schoolYearStr
            };
            years.push(schoolYear);
        }
        return years;
    }


    state = {
        tabValue: 0,
        isUpdate: false,

        form    : {
            id: "",
            name: "",
            degreeName: "",
            degreeNumber: "",
            type: "",
            website: "",
            phone: "",
            fax: "",
            email: "",
            standardSchool: "",
            standardYear: "",
            city: "",
            district: "",
            address: "",
            contact: "",
            imagePreviewUrl : "",
            logo: "",
            background : "",
            domain: ""
        },
        mandatoryFields: {
            id: false,
            name: false,
            email: false,
            phone: false,
            degreeName: false,
            degreeNumber: false,
            type: false
        },
        degreeNameListing : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "1",
                label: "Tiểu học"
            },
            {
                value: "2",
                label: "Phổ thông cơ sở"
            },
            {
                value: "3",
                label: "Trung học phổ thông"
            }
        ],

        degreeNumberListing : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "1",
                label: "Cấp 1"
            },
            {
                value: "2",
                label: "Cấp 2"
            },
            {
                value: "3",
                label: "Cấp 3"
            }
        ],

        typeListing : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "Dân lập",
                label: "Dân lập"
            },
            {
                value: "Công lập",
                label: "Công lập"
            }
        ],
        standardSchoolList : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: true,
                label: "Có"
            },
            {
                value: false,
                label: "Không"
            }
        ],
        standardSchoolYearList: this.getYear(),
        cities: [],
        districts: [],
        showStandardSchoolYearList : false

    };

    async componentDidMount()
    {
        await this.updateSchoolState();
        await  this.props.getCity();
        await  this.props.getDistrict();

    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateSchoolState();
        }

        if (
          (this.props.school && !this.state.form) ||
          (this.props.school && this.state.form && this.props.school.id !== this.state.form.id)
        )
        {
            this.updateFormState();
            this.initDataDistricts();
        }

        if(this.props.errors) {
            console.log("errors", this.props.errors);
        }

    }

    componentWillReceiveProps(nextProps) {
        let cities = nextProps.cities.map(city => ({ value: city.cityId, label: city.name }))
        cities = [{value: "", label: "--Chọn--"}, ...cities];

        this.setState({cities: cities})



        this.setState({districts: nextProps.districts})

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    initDataDistricts = (cityName) => {
        const city = this.state.cities.filter(function(city){
            return city.value === cityName
        });

        const districtsDisplay = this.state.districts.filter(function(district){
            if(city[0] && district.cityId === city[0].value){
                return district;
            }
        });

        let districts = districtsDisplay.map(district => ({ value: district.districtId, label: district.name }))
        districts = [{value: "", label: "--Chọn--"}, ...districts];
        return districts;
    }

    updateFormState = () => {
        this.setState({form: this.props.school})
    };

    updateSchoolState = () => {
        if ( this.props.match.params.id === 'new' )
        {
            this.props.newSchool();
        }
        else
        {
            this.props.getSchool(this.props.match.params.id);
            console.log(this.props);
            this.setState({isUpdate: true})
        }
    };

    _handleImageChange = (file, name) => {
        this.setState({form: _.set({...this.state.form}, name, file)});
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    handleStandardSchoolChange = (value, name) => {
        this.setState({form: {
                ...this.state.form,
                standardSchool : value.value,
                standardYear : ""
            }, showStandardSchoolYearList : value.value});

    };

    handleCityChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    }

    handleBlur= (event) => {
        if(event.target.value ==="") {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: true }
            });
        } else{
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: false }
            });
        }

    }

    validateEmail = (event) => {
        const email = event.target.value;
        if(email ==="") {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: true }
            });
        } else {
            const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValid = regexp.test(email);
            console.log('isValid', isValid);
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: !isValid }
            });
        }


    }

    canBeSubmitted()
    {
        const {mandatoryFields} = this.state;
        if(mandatoryFields.email || mandatoryFields.phone
          || mandatoryFields.name || mandatoryFields.degreeName || mandatoryFields.id
          || mandatoryFields.degreeNumber || mandatoryFields.type) {
            return false;
        } else {
            return true;
        }

    }

    saveAction = ()=> {
        if (this.state.form._id) {
            this.props.updateSchool(this.state.form, this.props.history);
        } else {
            this.props.addSchool(this.state.form, this.props.history);
        }
    }

    getAllClassBySchoolId =(idSchool) => {
        this.props.history.push('/manageClass/' + idSchool);
    }

    render()
    {
        const {tabValue, form, mandatoryFields} = this.state;
        console.log('form render', form);
        return (
          <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-96 h-96 sm:h-96 sm:min-h-96"
            }}
            header={
                form && (
                  <div className="flex flex-1 w-full items-center justify-between">

                      <div className="flex flex-col items-start max-w-full">

                          <FuseAnimate animation="transition.slideRightIn" delay={300}>
                              <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageSchool">
                                  <Icon className="mr-4 text-20">arrow_back</Icon>
                                  Danh sách trường học
                              </Typography>
                          </FuseAnimate>

                          <div className="flex items-center max-w-full">
                              <FuseAnimate animation="transition.expandIn" delay={300}>
                                  <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" />
                              </FuseAnimate>
                              <div className="flex flex-col min-w-0">
                                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                      <Typography variant="h6">
                                          {form.name ? form.name : 'Thêm mới trường học'}
                                      </Typography>
                                  </FuseAnimate>
                                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                      <Typography variant="caption">Chi tiết trường học</Typography>
                                  </FuseAnimate>
                              </div>
                          </div>
                      </div>
                      <div className="flex">
                          <div>
                              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                  <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => this.saveAction()}
                                  >
                                      Lưu
                                  </Button>
                              </FuseAnimate>
                          </div>
                      </div>
                  </div>
                )
            }
            contentToolbar={
                <Tabs
                  value={tabValue}
                  onChange={this.handleChangeTab}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                  classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Thông tin"/>
                </Tabs>
            }
            content={
                form && (
                  <div className="p-16 sm:p-24 max-w-2xl">
                      {
                          tabValue === 0 && (
                            <div>
                                <div className="flex">
                                    <TextField
                                      className="mt-8 mb-16 mr-20 w-1/2"
                                      required
                                      error={mandatoryFields.id}
                                      label="Mã trường học"
                                      autoFocus
                                      id="id"
                                      name="id"
                                      value={form.id}
                                      onChange={this.handleChange}
                                      onBlur={this.handleBlur}
                                      variant="outlined"
                                      fullWidth
                                    />

                                    <FuseChipSelect
                                      className="mt-8 mb-16 w-1/2"
                                      value={this.state.degreeNumberListing.filter(type => type.value === form.degreeNumber)}
                                      onChange={(value) => this.handleChipChange(value, 'degreeNumber')}
                                      placeholder="--Chọn--"
                                      textFieldProps={{
                                          label          : 'Cấp học',
                                          InputLabelProps: {
                                              shrink: true
                                          },
                                          variant        : 'standard'
                                      }}
                                      options={this.state.degreeNumberListing}
                                      isMulti={false}
                                    />

                                </div>

                                <div className="flex">
                                    <TextField
                                      className="mt-8 mb-16"
                                      error={mandatoryFields.name}
                                      required
                                      id="name"
                                      name="name"
                                      onChange={this.handleChange}
                                      onBlur={this.handleBlur}
                                      label="Tên trường học"
                                      type="text"
                                      value={form.name}
                                      variant="outlined"
                                      fullWidth
                                    />

                                </div>

                                <div className="flex">
                                    <TextField
                                      className="mt-8 mb-16 mr-20 w-1/2"
                                      error={mandatoryFields.phone}
                                      required
                                      id="phone"
                                      name="phone"
                                      onChange={this.handleChange}
                                      onBlur={this.handleBlur}
                                      label="Số điện thoại"
                                      type="text"
                                      value={form.phone}
                                      variant="outlined"
                                      fullWidth
                                    />

                                    <FuseChipSelect
                                      className="mt-8 mb-16 w-1/2"
                                      value={this.state.typeListing.filter(type => type.value === form.type)}
                                      onChange={(value) => this.handleChipChange(value, 'type')}
                                      placeholder="--Chọn--"
                                      textFieldProps={{
                                          label          : 'Loại hình',
                                          InputLabelProps: {
                                              shrink: true
                                          },
                                          variant        : 'standard'
                                      }}
                                      options={this.state.typeListing}
                                      isMulti={false}
                                    />

                                </div>

                                <div className="flex">
                                    <TextField
                                      className="mt-8 mb-16 mr-20 w-1/2"
                                      id="fax"
                                      name="fax"
                                      onChange={this.handleChange}
                                      label="Fax"
                                      type="text"
                                      value={form.fax}
                                      variant="outlined"
                                      fullWidth
                                    />

                                    <TextField
                                      className="mt-8 mb-16 w-1/2"
                                      error={mandatoryFields.email}
                                      required
                                      id="email"
                                      name="email"
                                      onChange={this.handleChange}
                                      onBlur={this.validateEmail}
                                      label="Email"
                                      type="email"
                                      helperText={mandatoryFields.email ? 'Invalid email format!' : ' '}
                                      value={form.email}
                                      variant="outlined"
                                      fullWidth
                                    />

                                </div>

                                <div className="flex">
                                    <FuseChipSelect
                                      className="mt-8 mb-16 w-full"
                                      value={this.state.standardSchoolList.filter(type => type.value === form.standardSchool)}
                                      onChange={(value) => this.handleStandardSchoolChange(value, 'standardSchool')}
                                      placeholder="--Chọn--"
                                      textFieldProps={{
                                          label          : 'Trường chuẩn',
                                          InputLabelProps: {
                                              shrink: true
                                          },
                                          variant        : 'standard'
                                      }}
                                      options={this.state.standardSchoolList}
                                      isMulti={false}
                                    />
                                </div>
                                <div className="flex">
                                    {
                                        form.standardSchool === true ? <FuseChipSelect
                                          className="mt-8 mb-16 w-full"
                                          value={this.state.standardSchoolYearList.filter(type => type.value === form.standardYear)}
                                          onChange={(value) => this.handleChipChange(value, 'standardYear')}
                                          placeholder="--Chọn--"
                                          textFieldProps={{
                                              label          : 'Năm xét',
                                              InputLabelProps: {
                                                  shrink: true
                                              },
                                              variant        : 'standard'
                                          }}
                                          options={this.state.standardSchoolYearList}
                                          isMulti={false}
                                        /> : null
                                    }

                                </div>

                                <div className="flex">
                                    <FuseChipSelect
                                      className="mt-8 mb-16 mr-20 w-1/2"
                                      value={this.state.cities.filter(type => type.value === form.city)}
                                      onChange={(value) => this.handleCityChange(value, 'city')}
                                      placeholder="--Chọn--"
                                      textFieldProps={{
                                          label          : 'Tỉnh/Thành Phố',
                                          InputLabelProps: {
                                              shrink: true
                                          },
                                          variant        : 'standard'
                                      }}
                                      options={this.state.cities}
                                      isMulti={false}
                                    />

                                    <FuseChipSelect
                                      className="mt-8 mb-16 w-1/2"
                                      value={this.initDataDistricts(form.city).filter(type => type.value === form.district)}
                                      onChange={(value) => this.handleChipChange(value, 'district')}
                                      placeholder="--Chọn--"
                                      textFieldProps={{
                                          label          : 'Quận/Huyện',
                                          InputLabelProps: {
                                              shrink: true
                                          },
                                          variant        : 'standard'
                                      }}
                                      options={this.initDataDistricts(form.city)}
                                      isMulti={false}
                                    />

                                </div>
                                <TextField
                                  className="mt-8 mb-16 mr-16"
                                  error={mandatoryFields.address}
                                  required
                                  id="address"
                                  name="address"
                                  onChange={this.handleChange}
                                  onBlur={this.handleBlur}
                                  label="Địa chỉ"
                                  type="text"
                                  value={form.address}
                                  variant="outlined"
                                  fullWidth
                                />
                                <TextField
                                  className="mt-8 mb-16 mr-16"
                                  id="website"
                                  name="website"
                                  onChange={this.handleChange}
                                  label="Website"
                                  type="text"
                                  value={form.website}
                                  variant="outlined"
                                  fullWidth
                                />
                                <TextField
                                  className="mt-8 mb-16 mr-16"
                                  id="contact"
                                  name="contact"
                                  onChange={this.handleChange}
                                  label="Liên hệ"
                                  type="text"
                                  value={form.contact}
                                  variant="outlined"
                                  fullWidth
                                />
                                <div className="flex mt-8 mb-16">
                                    <p className="textLabel mt-8 mb-5 mr-16">Logo</p>
                                    <ImageUpload file={form.logo}
                                                 imagePreviewUrl={form.imagePreviewUrl}
                                                 name ={'logo'}
                                                 uploadImage={this._handleImageChange}
                                    />
                                </div>
                                <div className="flex mt-8 mb-16">
                                    <p className="textLabel mt-8 mb-5 mr-16">Background</p>
                                    <ImageUpload file={form.background}
                                                 imagePreviewUrl={form.imagePreviewUrl}
                                                 name ={'background'}
                                                 uploadImage={this._handleImageChange}
                                    />
                                </div>
                                <TextField
                                    className="mt-8 mb-16 mr-16"
                                    id="domain"
                                    name="domain"
                                    onChange={this.handleChange}
                                    label="Tên miền"
                                    type="text"
                                    value={form.domain}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                          )}
                      {/*{
                          tabValue === 0 && (
                              <ClassesTable {...this.props}/>
                          )
                      }*/}
                  </div>
                )
            }
            innerScroll
            onRef={instance => {
                this.pageLayout = instance;
            }}
          />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getSchool : Actions.getSchool,
        getSchoolByUser : Actions.getSchoolByUser,
        newSchool : Actions.newSchool,
        updateSchool : Actions.updateSchool,
        addSchool: Actions.addSchool,
        getCity : Actions.getCities,
        getDistrict: Actions.getDistrict
    }, dispatch);
}

function mapStateToProps({schoolApp})
{
    return {
        school: schoolApp.school.school,
        errors : schoolApp.school.errors,
        cities : schoolApp.school.cities,
        districts : schoolApp.school.districts
    }
}

export default withReducer('schoolApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(School))));
