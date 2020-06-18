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

class GroupSubject extends Component {

    constructor(props) {
        super(props);
        const date = new Date,
            years = [],
            year = date.getFullYear();

        for (let i = year ; i < year + 10; i++) {
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
                idSchool: "",
                nameSchool: "",
                idGroup: "",
                nameGroup: "",
                leader: "",
                nameSubject: []
            },
            mandatoryFields: {
                idGroup : false,
                nameGroup : false,
                leader : false,
                nameSubject : false,
            },
            schoolYearListing : years,
            nameTeacherData : [],
            classRoomListing : [
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
            subjectListing: []
        };
    }



    componentDidMount()
    {
        this.updateProductState();
        this.props.getAllSchool();
        const idSchool = this.props.user.schools[0].id;
        this.props.getTeacherBySchoolId(idSchool);
        this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }

        if (
            (this.props.groupSubjects.groupSubject.idGroup && !this.state.form.idGroup) ||
            (this.props.groupSubjects.groupSubject.idGroup && this.state.form.idGroup && this.props.groupSubjects.groupSubject.idGroup !== this.state.form.idGroup)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.user.schools.length !== 0) {
            this.setState({form: {
                    ...this.state.form,
                    idSchool: nextProps.user.schools[0].id,
                    nameSchool: nextProps.user.schools[0].name,
                }})
        }

        if(nextProps.teachers.teachers.length != 0) {
            let result = nextProps.teachers.teachers.map(teacherData => ({ value: teacherData.idTeacher, label: teacherData.nameTeacher }));
            result = [{value: "", label: "--Chọn--"}, ...result];
            this.setState({ nameTeacherData : result});
        }

        if(nextProps.subjects.subjectsData.length != 0) {
            let subjects = nextProps.subjects.subjectsData.map(subjectData => ({ value: subjectData.subjectId, label: subjectData.nameSubject }))
            subjects = [{value: "", label: "--Chọn--"}, ...subjects];
            this.setState({subjectListing: subjects})
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.groupSubjects.groupSubject})
    };

    updateProductState = () => {
        const params = this.props.match.params;
        const {idGroup} = params;

        if ( idGroup === 'new' )
        {
            this.props.newGroupSubject();
        }
        else
        {
            this.props.getGroupSubject(idGroup);

        }
    };

    saveTopic = ()=> {
        if (this.state.form._id) {
            this.props.updateGroupSubject(this.state.form, this.props.history);
        } else {
            this.props.addGroupSubject(this.state.form, this.props.history);
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

    handleSubjectChange = (value) => {
        const data = value.map(item => item.value);
        console.log('data', data);
        //this.setState({form: _.set({...this.state.form}, 'nameSubject', value)});

        this.setState({form: {
                ...this.state.form,
                nameSubject : data,
            }});
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

    render()
    {
        const {tabValue, form, mandatoryFields} = this.state;
        console.log('Form in render', form);
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageGroupSubject">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách tổ môn
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
                                                {form.nameGroup ? form.nameGroup : 'Thêm mới tổ môn'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết tổ môn</Typography>
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
                                    <TextField
                                        className="mt-8 mb-16 mr-8 w-1/2"
                                        required
                                        label="Tên trường học"
                                        id="nameSchool"
                                        name="nameSchool"
                                        value={form.nameSchool}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        disabled={true}
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16 mr-8 w-1/2"
                                        error={mandatoryFields.idGroup}
                                        required
                                        label="Mã tổ môn"
                                        id="idGroup"
                                        name="idGroup"
                                        value={form.idGroup}
                                        onBlur={this.handleBlur}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8 w-1/2"
                                        error={mandatoryFields.nameGroup}
                                        required
                                        label="Tên tổ môn"
                                        id="nameGroup"
                                        name="nameGroup"
                                        value={form.nameGroup}
                                        onBlur={this.handleBlur}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-16 mr-8 w-1/2"
                                        value={this.state.nameTeacherData.filter(subject => subject.value === form.leader)}
                                        onChange={(value) => this.handleChipChange(value, 'leader')}
                                        placeholder="--Chọn--"
                                        textFieldProps={{
                                            label: 'Tổ trưởng',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant: 'standard'
                                        }}
                                        options={this.state.nameTeacherData}
                                        isMulti={false}
                                    />


                                    <FuseChipSelect
                                        className="mt-8 mb-16 mr-8 w-1/2"
                                        value={
                                            this.state.subjectListing.filter(subject => form.nameSubject.includes(subject.value))
                                        }
                                        onChange={(value) => this.handleSubjectChange(value)}
                                        placeholder="--Chọn--"
                                        textFieldProps={{
                                            label          : 'Môn học',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        options={this.state.subjectListing}
                                        isMulti
                                    />
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
        getGroupSubject : Actions.getGroupSubject,
        newGroupSubject : Actions.newGroupSubject,
        updateGroupSubject: Actions.updateGroupSubject,
        addGroupSubject: Actions.addGroupSubject,
        getAllGroupSubject: Actions.getAllGroupSubject,
        getAllSchool: Actions.getAllSchool,
        getTeacherBySchoolId: Actions.getTeacherBySchoolId,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool
    }, dispatch);
}

function mapStateToProps({groupSubjectApp, auth})
{
    console.log('user', auth.login.user)
    return {
        groupSubjects: groupSubjectApp.groupSubjects,
        schools: groupSubjectApp.schools,
        teachers : groupSubjectApp.teachers,
        user : auth.login.user,
        subjects: groupSubjectApp.subjects,
    }
}

export default withReducer('groupSubjectApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupSubject))));
