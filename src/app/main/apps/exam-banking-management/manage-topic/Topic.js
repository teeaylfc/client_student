import React, {Component} from 'react';
import {Button, Icon, Tab, Tabs, TextField, Typography, withStyles} from '@material-ui/core';
import {FuseAnimate, FuseChipSelect, FusePageCarded} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

class Topic extends Component {

    constructor(props) {
        super(props);
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

        this.state = {
            tabValue: 0,
            form    : {
                schoolYear: "",
                degreeNumber: "",
                subjectName: "",
                supperTopic: "",
                supperTopicName : "",
                topicName: "",
                userCreate: "",
                dateCreate: "",
                description: "",
                topicId: "",
                schoolId: "",
            },
            schoolYearListing : years,
            supperTopicData : [],
            classRoomListing : Constants.DEGREE_CLASS,
            degreeClass1: Constants.DEGREE_CLASS_1,
            degreeClass2: Constants.DEGREE_CLASS_2,
            degreeClass3: Constants.DEGREE_CLASS_3,
            subjectListing: [],
            typeTopicList : Constants.TYPE_TOPIC_EN,
        };
    }



    componentDidMount() {
        this.updateProductState();
        this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (
            (this.props.topics.topic.topicId && !this.state.form.topicId) ||
            (this.props.topics.topic.topicId && this.state.form.topicId && this.props.topics.topic.topicId !== this.state.form.topicId)
        )
        {
            this.updateFormState();
        }
    };


    componentWillReceiveProps(nextProps) {

        if(this.state.form.schoolId == "" && nextProps.user.schools.length != 0) {
            this.setState({form: {
                    ...this.state.form,
                    schoolId: nextProps.user.schools[0].id,
                    userCreate: nextProps.user.user.userId,
                }})

            if (nextProps.user.user.userId === 'ssAdmin' || nextProps.user.schools[0].id === 'SS001') {
                this.setState({classRoomListing : this.state.degreeClassDefault})
            } else if (nextProps.user.schools[0].degreeNumber === '1') {
                this.setState({classRoomListing : this.state.degreeClass1})
            } else if(nextProps.user.schools[0].degreeNumber === '2') {
                this.setState({classRoomListing : this.state.degreeClass2})
            } else {
                this.setState({classRoomListing : this.state.degreeClass3})
            }
        }

        if(nextProps.topics.topicsData.length !==0) {
            let result = nextProps.topics.topicsData.map(topicsData => ({ value: topicsData.topicId, label: topicsData.topicName }));
            result = [{value: "", label: "--Chọn--"}, ...result];
            this.setState({supperTopicData : result})
        } else {
            let result = [{value: "", label: "--Chọn--"}];
            this.setState({supperTopicData : result})
        }

        if(nextProps.subjects.subjectsData.length != 0) {
            let subjects = nextProps.subjects.subjectsData.map(subjectData => ({ value: subjectData.subjectId, label: subjectData.subjectName }))
            subjects = [{value: "", label: "--Chọn--"}, ...subjects];
            this.setState({subjectListing: subjects})
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.topics.topic})
    };

    updateProductState = () => {
        const params = this.props.match.params;
        const {topicId} = params;

        if (topicId === 'new') {
            this.props.newTopic();
        } else {
            this.props.getTopic(topicId);
        }
    };

    saveTopic = ()=> {
        if (this.state.form._id) {
            this.props.updateTopic(this.state.form, this.props.history);
        } else {
            this.props.addTopic(this.state.form, this.props.history);
        }
    }


    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChangeDescription = (data) => {
        this.setState({form: _.set({...this.state.form}, 'description', data)});
    }

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
        if(name == "subjectName") {
            this.props.getTopicsBySubjectAndDegree(value.value, this.state.form.degreeNumber, this.state.form.schoolId);
        }
        if(name == "degreeNumber") {
            this.props.getTopicsBySubjectAndDegree(this.state.form.subjectName, value.value, this.state.form.schoolId);
        }
    };



    handleTopicChange = (value) => {
        console.log('value', value)
        this.setState({form: {
                ...this.state.form,
                supperTopic: value.value,
                supperTopicName: value.label,
            }})

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

    render()
    {
        const {tabValue, form} = this.state;
        console.log('form in render', form);
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageTopic">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách chuyên đề
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
                                                {form.topicName ? form.topicName : 'Thêm mới chuyên đề'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết chuyên đề</Typography>
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
                                      className="mt-8 mb-16 mr-8"
                                      label="Mã chuyên đề"
                                      id="topicId"
                                      name="topicId"
                                      value={form.topicId}
                                      onChange={this.handleChange}
                                      variant="outlined"
                                      fullWidth
                                      disabled={form._id}
                                    />
                                    <FuseChipSelect
                                        className="mt-8 mb-16"
                                        value={this.state.schoolYearListing.filter(schoolYear => schoolYear.value === form.schoolYear)}
                                        onChange={(value) => this.handleChipChange(value, 'schoolYear')}
                                        placeholder="--Chọn--"
                                        textFieldProps={{
                                            label          : 'Niên khóa',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'standard'
                                        }}
                                        autoFocus
                                        options={this.state.schoolYearListing}
                                        isMulti={false}
                                    />
                                    <FuseChipSelect
                                        className="mt-8 mb-16"
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
                                        className="mt-8 mb-16 mr-8"
                                        value={this.state.subjectListing.filter(subject => subject.value === form.subjectName)}
                                        onChange={(value) => this.handleChipChange(value, 'subjectName')}
                                        placeholder="--Chọn--"
                                        textFieldProps={{
                                            label: 'Môn học',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant: 'standard'
                                        }}
                                        options={this.state.subjectListing}
                                        isMulti={false}
                                    />

                                    { form.schoolId.toUpperCase() === 'SS001' ? <FuseChipSelect
                                        className="mt-8 mb-16 mr-8"
                                        value={this.state.typeTopicList.filter(subject => subject.value === form.typeTopic)}
                                        onChange={(value) => this.handleChipChange(value, 'typeTopic')}
                                        placeholder="--Chọn--"
                                        textFieldProps={{
                                            label: 'Loại chuyên đề',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant: 'standard'
                                        }}
                                        options={this.state.typeTopicList}
                                        isMulti={false}
                                    /> : null
                                    }



                                    <FuseChipSelect
                                        className="mt-8 mb-16"
                                        value={this.state.supperTopicData.filter(supperTopic => supperTopic.value === form.supperTopic)}
                                        onChange={(value) => this.handleTopicChange(value, 'supperTopic')}
                                        placeholder="--Chọn--"
                                        textFieldProps={{
                                            label          : 'Chuyên đề cha',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'standard'
                                        }}
                                        options={this.state.supperTopicData}
                                        isMulti={false}
                                    />

                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label="Tên chuyên đề"
                                        id="topicName"
                                        name="topicName"
                                        value={form.topicName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <h2 className="font-weight-light mb-8">Nội dung chuyên đề</h2>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={form.description}
                                        id="description"
                                        name="description"
                                        onInit={ editor => {
                                            // You can store the "editor" and use when it is needed.
                                            const data = editor.getData();
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            this.handleChangeDescription(data);
                                        } }
                                        onBlur={ editor => {
                                            console.log( 'Blur.', editor );
                                        } }
                                        onFocus={ editor => {
                                            console.log( 'Focus.', editor );
                                        } }
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
        getTopic : Actions.getTopic,
        newTopic : Actions.newTopic,
        updateTopic: Actions.updateTopic,
        addTopic: Actions.addTopic,
        getTopicsBySubjectAndDegree: Actions.getTopicsBySubjectAndDegree,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool
    }, dispatch);
}

function mapStateToProps({topicsApp, auth})
{
    return {
        topics: topicsApp.topics,
        subjects: topicsApp.subjects,
        user : auth.login.user
    }
}

export default withReducer('topicsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Topic))));
