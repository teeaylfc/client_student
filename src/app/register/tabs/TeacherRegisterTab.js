import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from '../../auth/store/actions/register.actions';
import DatePickers from "../../../../src/common/DatePickers";
import MenuItem from "@material-ui/core/MenuItem";
import SelectFormsy from "../../../@fuse/components/formsy/SelectFormsy";
import SchoolInfoCard from "./SchoolInfoCard";
import SchoolInfoAddCard from "./SchoolInfoAddCard";
import * as schoolActions from "../../main/apps/structure-school/store/actions/school.actions";

class TeacherRegisterTab extends Component {

    state = {
        canSubmit: false,
        schoolInfoList : [],
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
        model.schoolInfoList = this.state.schoolInfoList;
        this.props.submitRegister(model);

    };

    addNewSchoolInfo = (schoolInfo) => {
      let schoolInfoList = [...this.state.schoolInfoList, schoolInfo];
      this.setState({schoolInfoList: schoolInfoList});
    };

    changeNewSchoolInfo = (schoolInfo) => {
      let schoolInfoList = this.state.form.schoolInfoList.map((_schoolInfo) => _schoolInfo.id === schoolInfo.id ? schoolInfo : _schoolInfo);
      this.setState({schoolInfoList: schoolInfoList});
    };

    filterSchool =(schoolInfo) => {
        this.props.filterSchool(schoolInfo);
    }


    async componentDidMount() {
      await this.props.getAllSchool();
      await this.props.getAllCity();
      await this.props.getAllDistrict();
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
        if(nextProps.school.schools) {
            const schoolData = nextProps.school.schools.map(school => ({ value: school.id, label: school.name }))
            this.setState({schoolData : schoolData})
        }
    }

    render()
    {
        const {canSubmit, schoolInfoList} = this.state;

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
                          name="teacherId"
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
                          name="nameTeacher"
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
                              id="birthdayTeacher"
                              name="birthdayTeacher"
                            />
                        </div>

                        <SelectFormsy
                          className=" mt-8 w-1/2"
                          name="genderTeacher"
                          label="Giới tính"
                          value=""
                          validations={{
                              minLength: 1
                          }}
                          validationError="Must not be null"
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
                          className="mt-8 mb-16 mr-16 w-1/2"
                          type="text"
                          name="phoneTeacher"
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
                          className="mt-8 mb-16 w-1/2"
                          type="text"
                          name="emailTeacher"
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
                      name="addressTeacher"
                      label="Địa chỉ"
                      validations={{
                          minLength: 4
                      }}
                      validationErrors={{
                          minLength: 'Min character length is 4'
                      }}d
                      InputProps={{
                          endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">address</Icon></InputAdornment>
                      }}
                      variant="outlined"
                      required
                    />

                    {<div className="w-full mb-16 ">

                        {schoolInfoList.map((schoolInfo, index) => (
                          <SchoolInfoCard
                            schoolInfo={schoolInfo}
                            index = {index}
                            schoolData={this.state.schoolData}
                            cities ={this.props.cities}
                            districts = {this.props.districts}
                            changeNewSchoolInfo={this.changeNewSchoolInfo}
                          />
                        ))}
                        <SchoolInfoAddCard
                          addNewSchoolInfo={this.addNewSchoolInfo}
                          filterSchool = {this.filterSchool}
                          schoolData={this.state.schoolData}
                          cities ={this.props.cities}
                          districts = {this.props.districts}
                        />
                    </div>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER"
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
        submitRegister: authActions.submitTeacherRegister,
        getAllSchool : schoolActions.getAllSchool,
        getAllCity : schoolActions.getCities,
        getAllDistrict : schoolActions.getDistrict,
        filterSchool : schoolActions.filterSchoolByCondition
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        register: auth.register,
        user    : auth.user,
        school: auth.school,
        cities : auth.school.cities,
        districts : auth.school.districts
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherRegisterTab));
