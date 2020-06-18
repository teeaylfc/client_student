import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Constants from 'common/Constants.js';

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

class Subject extends Component {

    constructor(props) {
        super(props);
        const date = new Date,
            years = [],
            year = date.getFullYear();

        for (let i = year; i < year + 10; i++) {
            const schoolYearStr = i + ' - ' + (i + 1);
            const schoolYear = {
                value: schoolYearStr,
                label: schoolYearStr
            };
            years.push(schoolYear);
        }

        this.state = {
            tabValue: 0,
            form    : {
                _id :"",
                _idSchool: "",
                schoolId: "",
                degree: "",
                nameSubject: "",
                subjectId: "",
                noOfLessonRequired: "",
                pointTypeX1: [],
                pointTypeX2 : [],
                pointTypeX3 : [],
                semester : ""
            },
            mandatoryFields: {
                subjectId : false,
                nameClass : false,
                nameSubject : false,
            },
            schoolYearListing : years,
            nameTeacherData : [],
            nameClassList : [],
            degreeClass1: Constants.DEGREE_CLASS_1,
            degreeClass2: Constants.DEGREE_CLASS_2,
            degreeClass3: Constants.DEGREE_CLASS_3,
            degreeClasses: Constants.DEGREE_CLASS,
            typeTimeExam : Constants.TYPE_TIME_EXAM,
            typeTimeExamOpt : Constants.TYPE_TIME_EXAM,
            subjectListing: [],
            semesterListing: [
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
                }
            ]
        };
    }



    componentDidMount()
    {
        this.updateProductState();
        this.props.getAllSchool();
        this.props.getAllClass();
        this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }
        console.log("this.props.subjects", this.props.subjects.subject);

        if (
            (this.props.subjects.subject._id && !this.state.form._id) ||
            (this.props.subjects.subject._id && this.state.form._id && this.props.subjects.subject._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps.user.schools.length !== 0) {
            if(nextProps.user.user.userId =='ssAdmin' || nextProps.user.schools[0].schoolId === 'SS001') {
                this.setState({degreeClasses : this.state.degreeClasses})
            } else if(nextProps.user.schools[0].degreeNumber === '1') {
                this.setState({degreeClasses : this.state.degreeClass1})
            } else if(nextProps.user.schools[0].degreeNumber === '2') {
                this.setState({degreeClasses : this.state.degreeClass2})
            } else {
                this.setState({degreeClasses : this.state.degreeClass3})
            }
            this.setState({form: {
                    ...this.state.form,
                    nameSchool: nextProps.user.schools[0].name,
                    schoolId: nextProps.user.schools[0].id,
                    _idSchool: nextProps.user.schools[0]._id,
                    userId : nextProps.user.user.userId,
                }});
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.subjects.subject})
    };

    updateProductState = () => {
        const params = this.props.match.params;
        const {idGroup} = params;

        if ( idGroup === 'new' )
        {
            this.props.newSubject();
        }
        else
        {
            this.props.getSubject(idGroup);

        }
    };

    saveTopic = ()=> {
        if (this.state.form._id) {
            this.props.updateSubject(this.state.form, this.props.history);
        } else {
            this.props.addSubject(this.state.form, this.props.history);
        }
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

    setFeaturedImage = (id) => {
        this.setState({form: _.set({...this.state.form}, 'featuredImageId', id)});
    };

    canBeSubmitted()
    {
        console.log('formTopic', this.state.form);
        const {name} = this.state.form;
        return (
            name && name.length > 0 &&
            !_.isEqual(this.props.topics.topic, this.state.form)
        );
    }

    handleBlur= (event) => {
        if(event.target.value ==='') {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: true }
            });
        } else {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: false }
            });
        }

    }

    handleTypeExamChange = (value, name) => {
        const data = value.map(item => item.value);
        console.log('data', data);
        //this.setState({form: _.set({...this.state.form}, 'nameSubject', value)});

        /*this.setState({form: {
                ...this.state.form,
                nameSubject : data,
            }});*/

        this.setState({form: _.set({...this.state.form}, name, data)});
        var ch = []
        if (name === "pointTypeX1") {
            ch = ch.concat(data, this.state.form.pointTypeX2, this.state.form.pointTypeX3)
        } else if (name === "pointTypeX2") {
            ch = ch.concat(data, this.state.form.pointTypeX1, this.state.form.pointTypeX3)
        } else if (name === "pointTypeX3") {
            ch = ch.concat(data, this.state.form.pointTypeX1, this.state.form.pointTypeX2)
        }
        const opt = _.reject(Constants.TYPE_TIME_EXAM, function(el) { return ch.includes(el.value)});
        this.setState({typeTimeExamOpt: opt});
    };

    render()
    {
        console.log('subject state', this.state);
        const {tabValue, form, mandatoryFields} = this.state;

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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageSubject">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách môn học
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
                                                {form.nameSubject ? form.nameSubject : 'Thêm mới môn học'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết môn học</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    //disabled={!this.canBeSubmitted()}
                                    onClick={() => this.saveTopic(form)}
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
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Thông tin"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <div>
                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={this.state.semesterListing.filter(type => type.value === form.semester)}
                                            onChange={(value) => this.handleChipChange(value, 'semester')}
                                            required
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Học kì',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.semesterListing}
                                            isMulti={false}
                                        />
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-16  w-1/2"
                                            value={this.state.degreeClasses.filter(type => type.value === form.degree)}
                                            onChange={(value) => this.handleChipChange(value, 'degree')}
                                            required
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Khối',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.degreeClasses}
                                            isMulti={false}
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.subjectId}
                                            required
                                            label="Mã môn học"
                                            id="subjectId"
                                            name="subjectId"
                                            value={form.subjectId}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                            disabled={form._id ? true : false}
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.nameSubject}
                                            required
                                            label="Môn học"
                                            id="nameSubject"
                                            name="nameSubject"
                                            value={form.nameSubject}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.noOfLessonRequired}
                                            required
                                            label="Số tiết học yêu cầu trong tuần"
                                            id="noOfLessonRequired"
                                            name="noOfLessonRequired"
                                            value={form.noOfLessonRequired}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 lg:min-w-1/3"
                                            value={
                                                this.state.typeTimeExam.filter(subject => form.pointTypeX1.includes(subject.value))
                                            }
                                            onChange={(value) => this.handleTypeExamChange(value, 'pointTypeX1')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Điểm hệ số 1',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'outlined'
                                            }}
                                            options={this.state.typeTimeExamOpt}
                                            isMulti
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            value={
                                                this.state.typeTimeExam.filter(subject => form.pointTypeX2.includes(subject.value))
                                            }
                                            onChange={(value) => this.handleTypeExamChange(value, 'pointTypeX2')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Điểm hệ số 2',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'outlined'
                                            }}
                                            options={this.state.typeTimeExamOpt}
                                            isMulti
                                        />

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            value={
                                                this.state.typeTimeExam.filter(subject => form.pointTypeX3.includes(subject.value))
                                            }
                                            onChange={(value) => this.handleTypeExamChange(value, 'pointTypeX3')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Điểm hệ số 3',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'outlined'
                                            }}
                                            options={this.state.typeTimeExamOpt}
                                            isMulti
                                        />
                                    </div>

                                    {/*<h3 className="text-blue-light">Điểm hệ số 2</h3>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            label="Kiểm tra miệng"
                                            id="pointQuizX2"
                                            name="pointQuizX2"
                                            value={form.pointQuizX2}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            label="Kiểm tra viết"
                                            id="pointWritingX2"
                                            name="pointWritingX2"
                                            value={form.pointWritingX2}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-8 w-1/3"
                                            label="Kiểm tra thực hành"
                                            id="pointPracticeX2"
                                            name="pointPracticeX2"
                                            value={form.pointPracticeX2}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>*/}
                                </div>
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
        getSubject : Actions.getSubject,
        newSubject : Actions.newSubject,
        updateSubject: Actions.updateSubject,
        addSubject: Actions.addSubject,
        getAllSubject: Actions.getAllSubject,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool,
        getAllSchool: Actions.getAllSchool,
        getAllClass : Actions.getAllClass,
        getSchoolByUser: Actions.getSchoolByUser,
    }, dispatch);
}

function mapStateToProps({subjectApp, auth})
{
    console.log('Topic Detail', subjectApp);
    return {
        subjects: subjectApp.subjects,
        schools: subjectApp.schools,
        classes : subjectApp.classes,
        user : auth.login.user


    }
}

export default withReducer('subjectApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Subject))));
