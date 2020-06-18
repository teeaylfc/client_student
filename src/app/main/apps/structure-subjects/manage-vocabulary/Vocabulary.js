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
import ImageUpload from "../../../../../common/ImageUpload";

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

class Vocabulary extends Component {

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
                name : "",
                topic : "",
                typeWord : "",
                schoolId : "",
                pronunciationUK : "",
                pronunciationUS : "",
                engSub : "",
                engExample : "",
                vietSub : "",
                vietExample : "",
                image : "",
                imagePreviewUrl : "",
                userId : "",
            },
            mandatoryFields: {
                name : false,
                topic : false,
                typeWord : false,
                pronunciationUK : false,
                pronunciationUS : false,
                engSub : false,
                engExample : false,
            },
            schoolYearListing : years,
            topicData : [],
            nameTeacherData : [],
            nameClassList : [],
            typeWordList : Constants.TYPE_WORD_EN,
            degreeClass1: Constants.DEGREE_CLASS_1,
            degreeClass2: Constants.DEGREE_CLASS_2,
            degreeClass3: Constants.DEGREE_CLASS_3,
            degreeClasses: Constants.DEGREE_CLASS,
            typeTimeExam : Constants.TYPE_TIME_EXAM,
            subjectListing: [],
            semesterListing: Constants.SEMESTER_DATA,
        };
    }



    componentDidMount()
    {
        this.updateProductState();
        console.log('schoolId', this.props.user.schools[0].id);
        this.props.getTopicsBySubjectAndDegree("","",this.props.user.schools[0].id);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateProductState();
        }
        if (
            (this.props.vocabulary._id && !this.state.form._id) ||
            (this.props.vocabulary._id && this.state.form._id && this.props.vocabulary._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps.user.schools.length !== 0) {
            this.setState({form: {
                    ...this.state.form,
                    schoolId: nextProps.user.schools[0].id,
                    userId : nextProps.user.user.userId,
                }});
        }
        if(nextProps.topics.topicsData.length !==0) {
            let result = nextProps.topics.topicsData.map(topicsData => ({ value: topicsData.topicId, label: topicsData.topicName }));
            result = [{value: "", label: "--Chọn--"}, ...result];
            this.setState({topicData : result})
        } else {
            let result = [{value: "", label: "--Chọn--"}];
            this.setState({topicData : result})
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.vocabulary})
    };

    updateProductState = () => {
        const params = this.props.match.params;
        const {id} = params;

        if ( id === 'new' )
        {
            this.props.newVocabulary();
        }
        else
        {
            this.props.getVocabulary(id);

        }
    };

    saveTopic = ()=> {
        if (this.state.form._id) {
            this.props.updateVocabulary(this.state.form, this.props.history);
        } else {
            this.props.addVocabulary(this.state.form, this.props.history);
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

    _handleImageChange = (file) => {
        this.setState({form: {
                ...this.state.form,
                image : file
            }})
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
                                        Danh sách từ vựng
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
                                                {form.nameSubject ? form.nameSubject : 'Thêm mới từ vựng'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Chi tiết từ vựng</Typography>
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
                                        <TextField
                                            className="mt-16 mb-16 mr-8"
                                            error={mandatoryFields.name}
                                            required
                                            label="Từ vựng"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-100"
                                            value={this.state.topicData.filter(topic => topic.value === form.topic)}
                                            onChange={(value) => this.handleChipChange(value, 'topic')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Chuyên đề',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'standard'
                                            }}
                                            options={this.state.topicData}
                                            isMulti={false}
                                        />
                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-100"
                                            value={
                                                this.state.typeWordList.filter(typeWord => typeWord.value === form.typeWord)
                                            }
                                            onChange={(value) => this.handleChipChange(value, 'typeWord')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Loại từ',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'outlined'
                                            }}
                                            options={this.state.typeWordList}
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-8"
                                            error={mandatoryFields.pronunciationUK}
                                            required
                                            label="Phiên âm UK"
                                            id="pronunciationUK"
                                            name="pronunciationUK"
                                            value={form.pronunciationUK}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-8"
                                            error={mandatoryFields.pronunciationUS}
                                            required
                                            label="Phiên âm US"
                                            id="pronunciationUS"
                                            name="pronunciationUS"
                                            value={form.pronunciationUS}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            label="Example"
                                            id="engSub"
                                            name="engSub"
                                            value={form.engSub}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            label="Example"
                                            id="engExample"
                                            name="engExample"
                                            value={form.engExample}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.vietSub}
                                            required
                                            label="Viet"
                                            id="vietSub"
                                            name="vietSub"
                                            value={form.vietSub}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-16 mb-16 mr-8 w-1/2"
                                            error={mandatoryFields.vietExample}
                                            required
                                            label="Eng"
                                            id="vietExample"
                                            name="vietExample"
                                            value={form.vietExample}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="flex mt-8 mb-16">
                                        <p className="textLabel mt-8 mb-5 mr-16">Image</p>
                                        <ImageUpload file={form.image}
                                                     imagePreviewUrl={form.imagePreviewUrl}
                                                     uploadImage={this._handleImageChange}
                                        />
                                    </div>

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
        getVocabulary : Actions.getVocabulary,
        newVocabulary : Actions.newVocabulary,
        updateVocabulary: Actions.updateVocabulary,
        addVocabulary: Actions.addVocabulary,
        getTopicsBySubjectAndDegree : Actions.getTopicsBySubjectAndDegree
    }, dispatch);
}

function mapStateToProps({vocabularyApp, auth})
{
    console.log('props', vocabularyApp);
    return {
        vocabulary: vocabularyApp.vocabularies.vocabulary,
        user : auth.login.user,
        topics: vocabularyApp.topics,
    }
}

export default withReducer('vocabularyApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Vocabulary))));
