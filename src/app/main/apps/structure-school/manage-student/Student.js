import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, Checkbox, FormControlLabel} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions/';
import reducer from '../store/reducers';
import DatePickers from "../../../../../common/DatePickers";
import ImageUpload from "../../../../../common/ImageUpload";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import StudentPointTable from "./StudentPointTable";
var randomize = require('randomatic');


const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class Student extends Component {

    constructor(props) {
        super(props);
        const date = new Date,
            years = [{value: "", label: "--Chọn--"}],
            year = date.getFullYear();

        for (let i = year; i >= year - 50; i--) {
            const schoolYearStr = i ;
            const schoolYear = {
                value: schoolYearStr,
                label: schoolYearStr
            };
            years.push(schoolYear);
        }
        this.state = {
            tabValue: 0,
            form    : {
                _id: "",
                id: "",
                userName: "",
                nameSchool: "",
                currentSchool: "",
                degreeNumber: "",
                className: "",
                avatar : "",
                imagePreviewUrl : "",
                name: "",
                gender: "",
                birthday: "",
                identityCard: "",
                dateOfIssue: "",
                placeOfIssue: "",
                mobile: "",
                email: "",
                address: "",
                birthPlace: "",
                studentStatus: "",
                matriculationType: "",
                studyType: "",
                admissionDate: "",
                foreignLanguage: "",
                beneficiary: "",
                youthUnionStatus: "false",
                youthUnionDate: "",
                pioneerStatus: "false",
                pioneerDate: "",
                studentRepeatStatus:"false",
                preClass:"",
                disabilityStatus:"",
                disabilityType:"",
                familyPoorStatus:"",
                familyPoorType:"",

                // student contact
                permanentAddress: '',
                actualAddress: '',
                fatherName: '',
                fatherIdType: '',
                fatherId: '',
                fatherEmail: '',
                fatherPhone: '',
                fatherBirthYear: '',
                fatherJob: '',
                fatherNote: '',
                motherName: '',
                motherIdType: '',
                motherId: '',
                motherEmail: '',
                motherPhone: '',
                motherBirthYear: '',
                motherJob: '',
                motherNote: '',
                guardianName: '',
                guardianIdType: '',
                guardianId: '',
                guardianEmail: '',
                guardianPhone: '',
                guardianBirthYear: '',
                guardianJob: '',
                guardianNote: ''

            },
            nations: [],
            cities: [],
            districts: [],
            wards: [],
            studentStatusList: [
                {
                    value: "DT",
                    label: "Đang học",
                },
                {
                    value: "TN",
                    label: "Tốt nghiệp",
                }
            ],
            matriculationTypeList: [
                {
                    value: "XT",
                    label: "Xét tuyển",
                },
                {
                    value: "TH",
                    label: "Thi",
                }
            ],
            studyTypeList: [
                {
                    value: "OUT",
                    label: "Ngoại trú",
                },
                {
                    value: "IN",
                    label: "Nội trú",
                }
            ],
            foreignLanguageList: [
                {
                    value: "EN",
                    label: "Tiếng Anh",
                },
                {
                    value: "FE",
                    label: "Tiếng Pháp",
                },
                {
                    value: "CN",
                    label: "Tiếng Trung",
                }
            ],
            beneficiaryList: [
                {
                    value: "TB",
                    label: "Con thương binh",
                },
                {
                    value: "02",
                    label: "Con sếp",
                }
            ],
            disabilityTypeList: [
                {
                    value: "KTTT",
                    label: "Khuyết tật thân thể",
                },
                {
                    value: "KTTL",
                    label: "Khuyết tật tâm lý",
                }
            ],

            familyPoorTypeList: [
                {
                    value: "HN",
                    label: "Hộ nghèo",
                },
                {
                    value: "CN",
                    label: "Cận nghèo",
                }
            ],
            typeIdList: [
                {
                    value: "NRIC",
                    label: "CMTND",
                },
                {
                    value: "Passport",
                    label: "Hộ chiếu",
                }
            ],
            birthYearList: years,
            classNameList : [],
            classRoomListing : [
                {
                    value: "",
                    label: "--Chọn--"
                },
                {
                    value: "1",
                    label: "1"
                },
                {
                    value: "2",
                    label: "2"
                },
                {
                    value: "3",
                    label: "3"
                },
                {
                    value: "4",
                    label: "4"
                },
                {
                    value: "5",
                    label: "5"
                },
                {
                    value: "6",
                    label: "6"
                },
                {
                    value: "7",
                    label: "7"
                },
                {
                    value: "8",
                    label: "8"
                },
                {
                    value: "9",
                    label: "9"
                },
                {
                    value: "10",
                    label: "10"
                },
                {
                    value: "11",
                    label: "11"
                },
                {
                    value: "12",
                    label: "12"
                }
            ],
            degreeClass1: [
                {
                    value: "",
                    label: "--Chọn--"
                },
                {
                    value: "1",
                    label: "1"
                },
                {
                    value: "2",
                    label: "2"
                },
                {
                    value: "3",
                    label: "3"
                },
                {
                    value: "4",
                    label: "4"
                },
                {
                    value: "5",
                    label: "5"
                }
            ],
            degreeClass2: [
                {
                    value: "",
                    label: "--Chọn--"
                },
                {
                    value: "6",
                    label: "6"
                },
                {
                    value: "7",
                    label: "7"
                },
                {
                    value: "8",
                    label: "8"
                },
                {
                    value: "9",
                    label: "9"
                }
            ],
            degreeClass3: [
                {
                    value: "",
                    label: "--Chọn--"
                },
                {
                    value: "10",
                    label: "10"
                },
                {
                    value: "11",
                    label: "11"
                },
                {
                    value: "12",
                    label: "12"
                }
            ],

        };
    }

    async componentDidMount() {
        this.updateProductState();
        this.props.getClassByIdSchool(this.props.user.user.userRole.idSchool);
        await this.props.getNations();
        await this.props.getCities();
        await this.props.getDistricts();
        await this.props.getWards();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }

        if (
            (this.props.students.student && this.props.students.student.id && !this.state.form.id) ||
            (this.props.students.student && this.props.students.student.id && this.state.form.id && this.props.students.student.id !== this.state.form.id)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        // if ((!this.props.students || !this.props.students.classroom.length >0 ) && nextProps.students.classroom && nextProps.students.classroom.idClass) {
        //     console.log("componentWillReceiveProps");
        //     this.setState({ form: Object.assign({}, nextProps.students.classroom) });
        // }
        if (this.state.form.currentSchool == "") {
            this.setState({form: {
                ...this.state.form,
                nameSchool: nextProps.user.name,
                currentSchool: nextProps.user._id,
            }})

            if(nextProps.user.degree === '1') {
                this.setState({classRoomListing : this.state.degreeClass1})
            } else if(nextProps.user.degree === '2') {
                this.setState({classRoomListing : this.state.degreeClass2})
            } else {
                this.setState({classRoomListing : this.state.degreeClass3})
            }
        }

        let result = [{value: "", label: "--Chọn--"}];
        if(nextProps.classes.classData.length !==0) {
            result = result.concat(nextProps.classes.classData.map(classData => ({ value: classData.idClass, label: classData.nameClass })));
        }
        this.setState({classNameList: result})

        let nations = nextProps.nations.map(nation => ({ value: nation.nationId, label: nation.name }))
        nations = [{value: "", label: "--Chọn--"}, ...nations];

        this.setState({nations: nations})

        this.setState({cities: nextProps.cities})



        this.setState({districts: nextProps.districts})
        this.setState({wards: nextProps.wards})

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    initDataCities = (nationName) => {
        const nation = this.state.nations.filter(function(nation){
            return nation.value === nationName
        });

        const citiesDisplay = this.state.cities.filter(function(city){
            if(nation[0] && city.nationId === nation[0].value){
                return city;
            }
        });

        let cities = citiesDisplay.map(city => ({ value: city.cityId, label: city.name }))
        cities = [{value: "", label: "--Chọn--"}, ...cities];
        return cities;
    }

    initDataDistricts = (cityName) => {
        const city = this.state.cities.filter(function(city){
            return city.cityId === cityName
        });

        const districtsDisplay = this.state.districts.filter(function(district){
            if(city[0] && district.cityId === city[0].cityId){
                return district;
            }
        });

        let districts = districtsDisplay.map(district => ({ value: district.districtId, label: district.name }))
        districts = [{value: "", label: "--Chọn--"}, ...districts];
        return districts;
    }

    initDataWards = (districtName) => {
        const district = this.state.districts.filter(function(district){
            return district.districtId === districtName
        });

        const wardsDisplay = this.state.wards.filter(function(ward){
            if(district[0] && ward.districtId === district[0].districtId){
                return ward;
            }
        });

        let wards = wardsDisplay.map(ward => ({ value: ward.wardId, label: ward.name }))
        wards = [{value: "", label: "--Chọn--"}, ...wards];
        return wards;

    }


    initDate =(date) =>{
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth()+1).toString();
        const dd  = date.getDate().toString();

        const mmChars = mm.split('');
        const ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    updateFormState = () => {
        this.setState({form: this.props.students.student})
    };

    updateProductState = () => {
        const params = this.props.match.params;
        const {id} = params;

        if ( {id} === 'new' )
        {
            this.props.newStudent();
        }
        else
        {
            this.props.getStudent(id);

        }
    };

    saveStudent = ()=> {
        if (this.state.form._id) {
            this.props.updateStudent(this.state.form, this.props.history);
        } else {
            this.props.addStudent(this.state.form, this.props.history);
        }
    }

    handleChangeDate = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === "checkbox" ? event.target.checked.toString() : event.target.value)});
        console.log("checkbox", this.state.form.youthUnionStatus);
    };

    handleCheckBoxChange = (event) => {

    }

    handleClickRandomValue = (event) => {
        const userName = this.state.form.currentSchool + '-HS-'+ randomize('Aa0', 4);

        console.log("userName", userName);
        this.setState({form: _.set({...this.state.form}, 'userName', userName)});
    }

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
        if (name === "degreeNumber") {
            if (value.value === "") {
                this.state.classNameList = [{value: "", label: "--Chọn--"}]
                return
            }
            this.props.getClasses(value.value, this.props.user.user.userRole.idSchool)
        }
    };

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        console.log('formClass', this.state.form);
        const {name} = this.state.form;
        return (
            name && name.length > 0 &&
            !_.isEqual(this.props.students.student, this.state.form)
        );
    }

    _handleImageChange = (file, name) => {
        this.setState({form: {
                ...this.state.form,
                avatar : file
            }})
    }


    render()
    {
        const {students} = this.props;
        console.log('students', students);
        console.log('class state', this.state);
        const {tabValue, form} = this.state;
        console.log('formData', form);

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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageStudent">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách học sinh
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
                                                {form.name ? form.name : 'Thêm mới học sinh'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết học sinh</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    //disabled={!this.canBeSubmitted()}
                                    onClick={() => this.saveStudent(form)}
                                >
                                    Lưu
                                </Button>
                            </FuseAnimate>
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
                        students={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Thông tin chung"/>
                        <Tab className="h-64 normal-case" label="Thông tin liên hệ"/>
                        <Tab className="h-64 normal-case" label="Kết quả học tập"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-16 w-1/2"
                                            label="Mã học sinh"
                                            autoFocus
                                            id="id"
                                            name="id"
                                            required
                                            value={form.id}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        {/*<TextField
                                            className="mt-8 mb-16 mr-8"
                                            label="Mã đăng nhập"
                                            id="userName"
                                            name="userName"
                                            required
                                            value={form.userName}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />*/}
                                        <FormControl className="flex mt-16 mb-16 mr-16 w-1/2 h-100">
                                            <InputLabel htmlFor="adornment-password">Mã đăng nhập</InputLabel>
                                            <Input
                                                id="userName"
                                                value={form.userName}
                                                onChange={this.handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password"
                                                            onClick={this.handleClickRandomValue}
                                                            //onMouseDown={handleMouseDownPassword}
                                                        >
                                                            <i className="far fa-plus-square"></i>
                                                        </IconButton>

                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.classRoomListing.filter(classRoom => classRoom.value === form.degreeNumber)}
                                            onChange={(value) => this.handleChipChange(value, 'degreeNumber')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Khối lớp',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.classRoomListing}
                                            isMulti={false}
                                        />


                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.classNameList.filter(type => type.value === form.className)}
                                            onChange={(value) => this.handleChipChange(value, 'className')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Lớp học',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.classNameList}
                                            isMulti={false}
                                        />
                                    </div>
                                    <div className="flex mt-8 mb-16">
                                        <p className="textLabel mt-8 mb-5 mr-16">Avatar</p>
                                        <ImageUpload file={form.avatar}
                                                     imagePreviewUrl={form.imagePreviewUrl}
                                                     name ={'avatar'}
                                                     uploadImage={this._handleImageChange}
                                        />
                                    </div>


                                    <h3 className="text-blue-light">Thông tin cá nhân</h3>

                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            label="Họ và tên"
                                            id="name"
                                            name="name"
                                            required
                                            value={form.name}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            label="Giới tính"
                                            id="gender"
                                            name="gender"
                                            required
                                            value={form.gender}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <div className="mt-8 mb-16 mr-8 w-1/3">
                                            <DatePickers
                                                label="Ngày sinh"
                                                id="birthday"
                                                name="birthday"
                                                onChange={this.handleChangeDate}
                                                value={form.birthday}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            label="CMTND"
                                            id="identityCard"
                                            name="identityCard"
                                            value={form.identityCard}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />

                                        <div className="mt-8 mb-16 mr-8 w-1/3">
                                            <DatePickers
                                                label="Ngày cấp"
                                                id="dateOfIssue"
                                                name="dateOfIssue"
                                                onChange={this.handleChangeDate}
                                                value={form.dateOfIssue}

                                            />
                                        </div>

                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            label="Nơi cấp"
                                            id="placeOfIssue"
                                            name="placeOfIssue"
                                            value={form.placeOfIssue}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            label="Email"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            label="Số điện thoại"
                                            id="mobile"
                                            name="mobile"
                                            value={form.mobile}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 w-1/2"
                                            label="Nơi sinh"

                                            id="birthPlace"
                                            name="birthPlace"
                                            value={form.birthPlace}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <h3 className="text-blue-light">Thông tin học tập hiện tại</h3>
                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/3"
                                            value={this.state.studentStatusList.filter(type => type.value === form.studentStatus)}
                                            onChange={(value) => this.handleChipChange(value, 'studentStatus')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'TT Học tập',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.studentStatusList}
                                            isMulti={false}
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/3"
                                            value={this.state.matriculationTypeList.filter(type => type.value === form.matriculationType)}
                                            onChange={(value) => this.handleChipChange(value, 'matriculationType')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'HT Trúng Tuyển',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.matriculationTypeList}
                                            isMulti={false}
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/3"
                                            value={this.state.studyTypeList.filter(type => type.value === form.studyType)}
                                            onChange={(value) => this.handleChipChange(value, 'studyType')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'HT Học tập',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.studyTypeList}
                                            isMulti={false}
                                        />
                                    </div>

                                    <div className="flex">
                                        <div className="mt-16 mb-16 mr-20 w-1/3">
                                            <DatePickers
                                                label="Ngày nhập học"
                                                id="admissionDate"
                                                name="admissionDate"
                                                onChange={this.handleChangeDate}
                                                value={form.admissionDate}

                                            />
                                        </div>

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/3"
                                            value={this.state.foreignLanguageList.filter(type => type.value === form.foreignLanguage)}
                                            onChange={(value) => this.handleChipChange(value, 'foreignLanguage')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Hệ ngoại ngữ',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.foreignLanguageList}
                                            isMulti={false}
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/3"
                                            value={this.state.beneficiaryList.filter(type => type.value === form.beneficiary)}
                                            onChange={(value) => this.handleChipChange(value, 'beneficiary')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'ĐT chính sách',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.beneficiaryList}
                                            isMulti={false}
                                        />
                                    </div>

                                    <div className="flex">

                                        <div className="w-1/3 mt-16 mb-16 mr-24 flex">
                                            <FormControlLabel
                                                className="w-1/3"
                                                control={
                                                    <Checkbox
                                                        id="youthUnionStatus"
                                                        name="youthUnionStatus"
                                                        onChange={this.handleChange}
                                                        value={form.youthUnionStatus}
                                                        checked={form.youthUnionStatus=="true"}
                                                    />
                                                }
                                                label="Đoàn viên"
                                            />
                                            <div className="w-2/3">
                                                <DatePickers
                                                    label="Ngày vào đoàn"
                                                    id="youthUnionDate"
                                                    name="youthUnionDate"
                                                    disabled={(form.youthUnionStatus === "false" || !form.youthUnionStatus) ? true : false}
                                                    onChange={this.handleChangeDate}
                                                    value={form.youthUnionDate}

                                                />
                                            </div>
                                        </div>

                                        <div className="w-1/3 mt-16 mb-16 mr-24 flex ">
                                            <FormControlLabel
                                                className="w-1/3"
                                                control={
                                                    <Checkbox
                                                        id="pioneerStatus"
                                                        name="pioneerStatus"
                                                        onChange={this.handleChange}
                                                        value={form.pioneerStatus}
                                                        checked={form.pioneerStatus=="true"}
                                                    />
                                                }
                                                label="Đội viên"
                                            />
                                            <div className="w-2/3">
                                                <DatePickers
                                                    label="Ngày vào đội"
                                                    id="pioneerDate"
                                                    name="pioneerDate"
                                                    disabled={(form.pioneerStatus === "false" || !form.pioneerStatus) ? true : false}
                                                    onChange={this.handleChangeDate}
                                                    value={form.pioneerDate}

                                                />
                                            </div>
                                        </div>


                                        <div className="w-1/3 mt-16 mb-16 flex ">
                                            <FormControlLabel
                                                className="w-1/3"
                                                control={
                                                    <Checkbox
                                                        id="studentRepeatStatus"
                                                        name="studentRepeatStatus"
                                                        onChange={this.handleChange}
                                                        value={form.studentRepeatStatus}
                                                        checked={form.studentRepeatStatus=="true"}
                                                    />
                                                }
                                                label="HS Lưu ban"
                                            />

                                            <FuseChipSelect
                                                className="w-2/3"
                                                value={this.state.beneficiaryList.filter(type => type.value === form.preClass)}
                                                onChange={(value) => this.handleChipChange(value, 'preClass')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label          : 'ĐT chính sách',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant        : 'standard'
                                                }}
                                                options={this.state.beneficiaryList}
                                                isMulti={false}
                                                isDisabled={(form.studentRepeatStatus === "false" || !form.studentRepeatStatus) ? true : false}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-1/3 mt-16 mb-16 mr-24 flex ">
                                            <FormControlLabel
                                            className="w-1/3"
                                            control={
                                                <Checkbox
                                                    id="disabilityStatus"
                                                    name="disabilityStatus"
                                                    onChange={this.handleChange}
                                                    value={form.disabilityStatus}
                                                    checked={form.disabilityStatus=="true"}
                                                />
                                            }
                                            label="Khuyết tật"
                                            />
                                            <FuseChipSelect
                                                className="w-2/3"
                                                value={this.state.disabilityTypeList.filter(type => type.value === form.disabilityType)}
                                                onChange={(value) => this.handleChipChange(value, 'disabilityType')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label          : 'Khuyết tật',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant        : 'standard'
                                                }}
                                                options={this.state.disabilityTypeList}
                                                isMulti={false}
                                                isDisabled={(form.disabilityStatus === "false" || !form.disabilityStatus) ? true : false}
                                            />
                                        </div>

                                        <div className="w-1/3 mt-16 mb-16 mr-20 flex ">
                                            <FormControlLabel
                                                className="w-1/3"
                                                control={
                                                    <Checkbox
                                                        id="familyPoorStatus"
                                                        name="familyPoorStatus"
                                                        onChange={this.handleChange}
                                                        value={form.familyPoorStatus}
                                                        checked={form.familyPoorStatus=="true"}
                                                    />
                                                }
                                                label="CD Nghèo"
                                            />
                                            <FuseChipSelect
                                                className="w-2/3"
                                                value={this.state.familyPoorTypeList.filter(type => type.value === form.familyPoorType)}
                                                onChange={(value) => this.handleChipChange(value, 'familyPoorType')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label          : 'Hộ nghèo',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant        : 'standard'
                                                }}
                                                options={this.state.familyPoorTypeList}
                                                isMulti={false}
                                                isDisabled={(form.familyPoorStatus === "false" || !form.familyPoorStatus) ? true : false}
                                            />
                                        </div>

                                        <div className="w-1/3 mt-16 mb-16 mr-20 flex "/>

                                    </div>


                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                    <h3 className="text-blue-light">Địa chỉ thường trú</h3>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 w-1/2"
                                            label="Số nhà"

                                            id="permanentAddress"
                                            name="permanentAddress"
                                            value={form.permanentAddress}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <h3 className="text-blue-light">Nơi ở hiện tại</h3>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 w-1/2"
                                            label="Số nhà"

                                            id="actualAddress"
                                            name="actualAddress"
                                            value={form.actualAddress}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <h3 className="text-blue-light">Thông tin người liên hệ</h3>
                                    <span/>
                                    <h5 className="text-black">Thông tin cha</h5>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Họ tên"
                                            id="fatherName"
                                            name="fatherName"
                                            value={form.fatherName}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/3"
                                            value={this.state.typeIdList.filter(type => type.value === form.fatherIdType)}
                                            onChange={(value) => this.handleChipChange(value, 'fatherIdType')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Loại giấy tờ',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.typeIdList}
                                            isMulti={false}
                                        />

                                        <TextField
                                            className="mt-16 mb-16 w-1/3"
                                            label="Số CMTND"
                                            id="fatherId"
                                            name="fatherId"
                                            value={form.fatherId}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Email"
                                            id="fatherEmail"
                                            name="fatherEmail"
                                            value={form.fatherEmail}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Số điện thoại"
                                            id="fatherPhone"
                                            name="fatherPhone"
                                            value={form.fatherPhone}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />


                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/3"
                                            value={this.state.birthYearList.filter(type => type.value === form.fatherBirthYear)}
                                            onChange={(value) => this.handleChipChange(value, 'fatherBirthYear')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Năm sinh',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.birthYearList}
                                            isMulti={false}
                                        />
                                    </div>

                                    <div className='flex'>
                                        <TextField
                                            className="mt-8 mb-16 mr-20"
                                            label="Việc làm"
                                            id="fatherJob"
                                            name="fatherJob"
                                            value={form.fatherJob}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16"
                                            label="Ghi chú"
                                            id="fatherNote"
                                            name="fatherNote"
                                            value={form.fatherNote}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>


                                    <h5 className="text-black">Thông tin mẹ</h5>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Họ tên"
                                            id="motherName"
                                            name="motherName"
                                            value={form.motherName}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/3"
                                            value={this.state.typeIdList.filter(type => type.value === form.motherIdType)}
                                            onChange={(value) => this.handleChipChange(value, 'motherIdType')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Loại giấy tờ',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.typeIdList}
                                            isMulti={false}
                                        />

                                        <TextField
                                            className="mt-16 mb-16 w-1/3"
                                            label="Số CMTND"
                                            id="motherId"
                                            name="motherId"
                                            value={form.motherId}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Email"
                                            id="motherEmail"
                                            name="motherEmail"
                                            value={form.motherEmail}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Số điện thoại"
                                            id="motherPhone"
                                            name="motherPhone"
                                            value={form.motherPhone}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />


                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/3"
                                            value={this.state.birthYearList.filter(type => type.value === form.motherBirthYear)}
                                            onChange={(value) => this.handleChipChange(value, 'motherBirthYear')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Năm sinh',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.birthYearList}
                                            isMulti={false}
                                        />
                                    </div>

                                    <div className='flex'>
                                        <TextField
                                            className="mt-8 mb-16 mr-20"
                                            label="Việc làm"
                                            id="motherJob"
                                            name="motherJob"
                                            value={form.motherJob}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16"
                                            label="Ghi chú"
                                            id="motherNote"
                                            name="motherNote"
                                            value={form.motherNote}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>


                                    <h5 className="text-black">Thông tin người giám hộ</h5>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Họ tên"
                                            id="guardianName"
                                            name="guardianName"
                                            value={form.guardianName}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/3"
                                            value={this.state.typeIdList.filter(type => type.value === form.guardianIdType)}
                                            onChange={(value) => this.handleChipChange(value, 'guardianIdType')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Loại giấy tờ',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.typeIdList}
                                            isMulti={false}
                                        />

                                        <TextField
                                            className="mt-16 mb-16 w-1/3"
                                            label="Số CMTND"
                                            id="guardianId"
                                            name="guardianId"
                                            value={form.guardianId}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Email"
                                            id="guardianEmail"
                                            name="guardianEmail"
                                            value={form.guardianEmail}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-16 mb-16 mr-20 w-1/3"
                                            label="Số điện thoại"
                                            id="guardianPhone"
                                            name="guardianPhone"
                                            value={form.guardianPhone}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />


                                        <FuseChipSelect
                                            className="mt-8 mb-16 w-1/3"
                                            value={this.state.birthYearList.filter(type => type.value === form.guardianBirthYear)}
                                            onChange={(value) => this.handleChipChange(value, 'guardianBirthYear')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Năm sinh',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.birthYearList}
                                            isMulti={false}
                                        />
                                    </div>

                                    <div className='flex'>
                                        <TextField
                                            className="mt-8 mb-16 mr-20"
                                            label="Việc làm"
                                            id="guardianJob"
                                            name="guardianJob"
                                            value={form.guardianJob}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16"
                                            label="Ghi chú"
                                            id="guardianNote"
                                            name="guardianNote"
                                            value={form.guardianNote}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>


                                </div>
                            )}
                            {tabValue === 2 && (
                                <StudentPointTable studentId={this.state.form._id} schoolId ={this.state.form.currentSchool}/>
                            )}
                        </div>
                    )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getStudent : Actions.getStudent,
        newStudent : Actions.newStudent,
        updateStudent: Actions.updateStudent,
        addStudent: Actions.createStudent,
        getClassByIdSchool: Actions.getClassByIdSchool,
        getNations : Actions.getNations,
        getCities : Actions.getCities,
        getDistricts : Actions.getDistrict,
        getWards : Actions.getWards,
        getClasses: Actions.getClassByIdSchoolAndDegree
    }, dispatch);
}

function mapStateToProps({studentsApp, auth})
{
    console.log('studentsApp Detail', studentsApp);
    return {
        students : studentsApp.student,
        classes : studentsApp.classes,
        school: studentsApp.schools,
        cities : studentsApp.school.cities,
        districts : studentsApp.school.districts,
        nations : studentsApp.student.nations,
        wards : studentsApp.student.wards,
        user : auth.login.user
    }
}

export default withReducer('studentsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Student))));
