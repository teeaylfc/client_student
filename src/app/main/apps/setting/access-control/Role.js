import React, {Component} from "react";
import reducer from '../store/reducers';
import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Checkbox,
  withStyles, Tabs, Tab
} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import withReducer from 'app/store/withReducer';
import {Link, withRouter} from "react-router-dom";
import * as Actions from "../store/actions/accessControl.actions";
import {bindActionCreators} from "redux";
import _ from '@lodash';
import {FuseAnimate, FuseScrollbars, FusePageCarded, FusePageSimple} from '@fuse';
import TableHead from "@material-ui/core/TableHead";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";


const styles = theme => ({});

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      form: {
        roleId : '',
        name: '',
        typeUser: 'S',
        schoolId: '',
        rights: [
          {tabIndex: 0, id: 'manageSchool', name: 'Quản lý trường học', view: false, update: false, delete: false, create: false},
          {tabIndex: 1, id: 'manageCommon', name: 'Cài đặt chung', view: false, update: false, delete: false, create: false},
          {tabIndex: 1, id: 'manageRole', name: 'Quản lý quyền', view: false, update: false, delete: false, create: false},
          {tabIndex: 1, id: 'manageRoleUser', name: 'Người dùng', view: false, update: false, delete: false, create: false},
        ],
      },
      mandatoryFields: {
        roleId : false,
        name : false
      },
      allRights : [
        {tabIndex: 0, id: 'manageSchool', name: 'Quản lý trường học', view: false, update: false, delete: false, create: false},
        {tabIndex: 0, id: 'manageClass', name: 'Quản lý lớp học', view: false, update: false, delete: false, create: false},
        {tabIndex: 0, id: 'manageStudent', name: 'Quản lý học sinh', view: false, update: false, delete: false, create: false},
        {tabIndex: 0, id: 'manageTeacher', name: 'Quản lý giáo viên', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'manageGroupSubject', name: 'Quản lý tổ môn', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'manageSubject', name: 'Quản lý môn học', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'managePlanTeacher', name: 'Quản lý kế hoạch giáo viên', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'managePoint', name: 'Quản lý nhập điểm', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageQuestionPack', name: 'Quản lý gói câu hỏi', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageTopic', name: 'Quản lý chuyên đề', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageQuestion', name: 'Quản lý câu hỏi', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageExamination', name: 'Quản lý đề thi/kiểm tra', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageCheckExamination', name: 'Quản lý phúc khảo', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageCommon', name: 'Cài đặt chung', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRoleApprove', name: 'Phân quyền phê duyệt', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRolePhucKhao', name: 'Phân quyền xử lý phúc khảo', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRoleUser', name: 'Người dùng', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRole', name: 'Quyền hạn', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveChangePoint', name: 'Phê duyệt yêu cầu chuyển điểm', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveExam', name: 'Phê duyệt đề thi', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveQuestion', name: 'Phê duyệt câu hỏi', view: false, update: false, delete: false, create: false},
      ],

      rightsStaff : [
        {tabIndex: 0, id: 'manageSchool', name: 'Quản lý trường học', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'manageGroupSubject', name: 'Quản lý tổ môn', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageQuestionPack', name: 'Quản lý gói câu hỏi', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageTopic', name: 'Quản lý chuyên đề', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageQuestion', name: 'Quản lý câu hỏi', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageExamination', name: 'Quản lý đề thi/kiểm tra', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageCheckExamination', name: 'Quản lý phúc khảo', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageCommon', name: 'Cài đặt chung', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRole', name: 'Quản lý quyền', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRoleUser', name: 'Người dùng', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveChangePoint', name: 'Phê duyệt yêu cầu chuyển điểm', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveExam', name: 'Phê duyệt đề thi', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveQuestion', name: 'Phê duyệt câu hỏi', view: false, update: false, delete: false, create: false},
      ],
      rightsPartner : [
        {tabIndex: 0, id: 'manageSchool', name: 'Quản lý trường học', view: false, update: false, delete: false, create: false},
        {tabIndex: 0, id: 'manageClass', name: 'Quản lý lớp học', view: false, update: false, delete: false, create: false},
        {tabIndex: 0, id: 'manageStudent', name: 'Quản lý học sinh', view: false, update: false, delete: false, create: false},
        {tabIndex: 0, id: 'manageTeacher', name: 'Quản lý giáo viên', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'manageGroupSubject', name: 'Quản lý tổ môn', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'manageSubject', name: 'Quản lý môn học', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'managePlanTeacher', name: 'Quản lý kế hoạch giáo viên', view: false, update: false, delete: false, create: false},
        {tabIndex: 1, id: 'managePoint', name: 'Quản lý nhập điểm', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageQuestionPack', name: 'Quản lý gói câu hỏi', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageTopic', name: 'Quản lý chuyên đề', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageQuestion', name: 'Quản lý câu hỏi', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageExamination', name: 'Quản lý đề thi/kiểm tra', view: false, update: false, delete: false, create: false},
        {tabIndex: 2, id: 'manageCheckExamination', name: 'Quản lý phúc khảo', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageCommon', name: 'Cài đặt chung', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRoleApprove', name: 'Phân quyền phê duyệt', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRolePhucKhao', name: 'Phân quyền xử lý phúc khảo', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRoleUser', name: 'Người dùng', view: false, update: false, delete: false, create: false},
        {tabIndex: 3, id: 'manageRole', name: 'Quyền hạn', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveChangePoint', name: 'Phê duyệt yêu cầu chuyển điểm', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveExam', name: 'Phê duyệt đề thi', view: false, update: false, delete: false, create: false},
        {tabIndex: 4, id: 'manageApproveQuestion', name: 'Phê duyệt câu hỏi', view: false, update: false, delete: false, create: false},
      ],
    };
  }

  componentDidMount() {
    this.updateRoleState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data && !this.state.form || (this.props.data && this.state.form && this.props.data._id !== this.state.form._id)) {
      this.updateFormState();
    }

    if (this.props.errors) {
      console.log("errors", this.props.errors);
    }
  }

  componentWillMount() {
    const typeUser = this.props.user.role.type_user;
    const userId = this.props.user.user.userId;
    const {form} = this.state;
    if(typeUser ==="S" || userId === 'ssAdmin') {
      form.rights = this.state.rightsStaff;
      form.typeUser = "S";
    } else if(typeUser === 'P'){
      form.rights = this.state.rightsPartner;
      form.typeUser = "P";
    }
    this.setState({form:  form});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.schools.length !== 0) {
      this.setState({form: {
          ...this.state.form,
          schoolId: nextProps.user.schools[0].id
        }})
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  updateFormState = () => {
    this.setState({form: this.props.data})
  };

  updateRoleState = () => {
    if (this.props.match.params.id === 'new') {
      this.props.newRole();
    } else {
      this.props.getRole(this.props.match.params.id);
    }
  };

  saveAction = () => {
    if (this.state.form._id) {
      this.props.updateRole(this.state.form, this.props.history);
    } else {
      this.props.addRole(this.state.form, this.props.history);
    }
  };

  handleBlur= (event) => {
    if(event.target.value ==='') {
      this.setState({
        mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: true }
      });
    } else{
      this.setState({
        mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: false }
      });
    }
  }

  handleChange = (event) => {
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
  };

  typeUserHandleChange = (event) => {
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});

    const {form} = this.state;
    const typeUser = event.target.value;
    form.typeUser = typeUser;
    if(typeUser === 'S') {
      form.rights = this.state.rightsStaff;
    } else if(typeUser === 'P'){
      form.rights = this.state.rightsPartner;
    } else {
      form.rights = this.state.allRights;
    }
    this.setState({form:  form});
  };

  handleChangeTab = (event, tabValue) => {
    this.setState({tabValue});
  };

  handleCheck = (event, id, checkAll) => {
    const {form} = this.state;
    let checked = event.target.checked;
    const selectedIndex = form.rights.findIndex(right => right.id === id);
    if(checkAll) {
      form.rights[selectedIndex] = {...form.rights[selectedIndex], view : checked, update : checked, delete : checked, create : checked};
    } else {
      form.rights[selectedIndex] = _.set({...form.rights[selectedIndex]}, event.target.name, event.target.checked);
    }
    this.setState({form: form});
    console.log(this.state);
  };
  handleChipChange = (value, name) => {
    this.setState({form: _.set({...this.state.form}, name, value.value)});
  };

  /*handleChange = (event) => {
    //setValue(event.target.value);
  }*/

  render() {
    const {tabValue, form, mandatoryFields} = this.state;

    const {user} = this.props;
    console.log('user.role.type_user', user.role.type_user);
    console.log('user.userId', user.user.userId);

    // the checkboxes can be arbitrarily deep. They will always be fetched and
    // attached the `name` attribute correctly. `value` is optional
    return (
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-96 h-96 sm:h-96 sm:min-h-96"
        }}
        header={
          form && (
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex flex-col items-start max-w-full">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button"
                              to="/manageRoles">
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Danh sách quyền
                  </Typography>
                </FuseAnimate>
                <div className="flex items-center max-w-full">
                  <FuseAnimate animation="transition.expandIn" delay={300}>
                      {/*{form.images.length > 0 ? (
                          <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                      ) : (
                          <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                      )}*/}
                      <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" />
                  </FuseAnimate>
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">
                          {form.nameClass ? form.nameClass : 'Thêm mới quyền'}
                      </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="caption">Chi tiết quyền</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap"
                  variant="contained"
                  //disabled={!this.canBeSubmitted()}
                  onClick={() => this.saveAction()}
                >
                  Save
                </Button>
              </FuseAnimate>
            </div>
          )
        }
        content={
          form && (
            <div>
              <div className="flex">
                <TextField
                    className="ml-8 mt-8 mb-16 mr-20 w-1/2"
                    error={mandatoryFields.roleId}
                    required
                    label="Mã quyền"
                    autoFocus
                    id="roleId"
                    name="roleId"
                    value={form.roleId}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    //disabled={form.roleId ? true : false}
                />
                <TextField
                  className="ml-8 mt-8 mb-16 mr-20 w-1/2"
                  error={mandatoryFields.name}
                  required
                  label="Tên quyền"
                  id="name"
                  name="name"
                  value={form.name}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              { user.role.type_user ==='S' || user.user.userId === 'ssAdmin' ?
                <div className="flex mt-8 ml-8">
                  <FormControl component="fieldset" >
                    <FormLabel component="legend">Loại người dùng</FormLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="typeUser"
                      value={form.typeUser}
                      onChange={this.typeUserHandleChange}
                      row
                    >
                      <FormControlLabel value="S" control={<Radio />} label="Staff" />
                      <FormControlLabel value="P" control={<Radio />} label="Partner" />
                    </RadioGroup>
                  </FormControl>
                </div> : null}
              <FusePageSimple
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
                    <Tab className="h-64 normal-case" label="Cấu trúc trường học"/>
                    <Tab className="h-64 normal-case" label="Quản lý tổ môn"/>
                    <Tab className="h-64 normal-case" label="Quản lý kho đề thi"/>
                    <Tab className="h-64 normal-case" label="Cài đặt"/>
                    <Tab className="h-64 normal-case" label="Phê duyệt"/>
                  </Tabs>
                }
                content={
                  form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                      <div>
                        <div className="flex">
                          <FuseScrollbars className="flex-grow overflow-x-auto">
                            <Table className="min-w-xl" aria-labelledby="tableTitle">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Chức năng</TableCell>
                                  <TableCell align="center">Tất cả</TableCell>
                                  <TableCell align="center">Xem</TableCell>
                                  <TableCell align="center">Sửa</TableCell>
                                  <TableCell align="center">Xóa</TableCell>
                                  <TableCell align="center">Tạo mới</TableCell>
                                </TableRow>
                              </TableHead>
                              {tabValue === 0 &&
                              (
                                <TableBody>
                                  {form.rights.filter(x => x.tabIndex === tabValue).map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                            checked={row.view && row.update && row.delete && row.create}
                                            name='view'
                                            onClick={event => event.stopPropagation()}
                                            onChange={event => this.handleCheck(event, row.id, true)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                          checked={row.view}
                                          name='view'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                          checked={row.update}
                                          name='update'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                          checked={row.delete}
                                          name='delete'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                          checked={row.create}
                                          name='create'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              )
                              }
                              {tabValue === 1 &&
                              (
                                <TableBody>
                                  {form.rights.filter(x => x.tabIndex === tabValue).map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                            checked={row.view && row.update && row.delete && row.create}
                                            name='view'
                                            onClick={event => event.stopPropagation()}
                                            onChange={event => this.handleCheck(event, row.id, true)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.view}
                                          name='view'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.update}
                                          name='update'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.delete}
                                          name='delete'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.create}
                                          name='create'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              )
                              }
                              {tabValue === 2 &&
                              (
                                <TableBody>
                                  {form.rights.filter(x => x.tabIndex === tabValue).map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                            checked={row.view && row.update && row.delete && row.create}
                                            name='view'
                                            onClick={event => event.stopPropagation()}
                                            onChange={event => this.handleCheck(event, row.id, true)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.view}
                                          name='view'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.update}
                                          name='update'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.delete}
                                          name='delete'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.create}
                                          name='create'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              )
                              }
                              {tabValue === 3 &&
                              (
                                <TableBody>
                                  {form.rights.filter(x => x.tabIndex === tabValue).map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                            checked={row.view && row.update && row.delete && row.create}
                                            name='view'
                                            onClick={event => event.stopPropagation()}
                                            onChange={event => this.handleCheck(event, row.id, true)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.view}
                                          name='view'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.update}
                                          name='update'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.delete}
                                          name='delete'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.create}
                                          name='create'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              )
                              }
                              {tabValue === 4 &&
                              (
                                <TableBody>
                                  {form.rights.filter(x => x.tabIndex === tabValue).map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12">
                                        <Checkbox
                                            checked={row.view && row.update && row.delete && row.create}
                                            name='view'
                                            onClick={event => event.stopPropagation()}
                                            onChange={event => this.handleCheck(event, row.id, true)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.view}
                                          name='view'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.update}
                                          name='update'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.delete}
                                          name='delete'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                      <TableCell className="w-48 pl-4 sm:pl-12" padding="row">
                                        <Checkbox
                                          checked={row.create}
                                          name='create'
                                          onClick={event => event.stopPropagation()}
                                          onChange={event => this.handleCheck(event, row.id)}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              )
                              }
                            </Table>
                          </FuseScrollbars>
                        </div>
                      </div>

                    </div>
                  )
                }
              />
            </div>
          )
        }
        innerScroll
        onRef={instance => {
          this.pageLayout = instance;
        }}
      />


    );
  }

  manageSchoolChanged = (event) => {
    this.setState({form: _.set({...this.state.form}, "manageSchool", event)});
    console.log(this.state.form);
  }

  manageClassChanged = (event) => {

    this.setState({form: _.set({...this.state.form}, "manageClass", event)});
    console.log(this.state.form);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getRole: Actions.getRole,
    newRole: Actions.newRole,
    addRole: Actions.addRole,
    updateRole: Actions.updateRole
  }, dispatch);
}

function mapStateToProps({roleApp, auth}) {
  console.log('auth', auth);
  console.log('user', auth.login.user);
  return {
    data: roleApp.role.role,
    searchText: roleApp.role.searchText,
    user : auth.login.user
  }
}

export default withReducer('roleApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Role))));
