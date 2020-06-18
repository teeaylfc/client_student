import React, {Component} from 'react';
import {Button, Icon, TextField, Typography, withStyles} from '@material-ui/core';
import {FuseAnimate, FuseChipSelect, FusePageCarded} from '@fuse/index';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const styles = theme => ({

});

class QuestionsPack extends Component {
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
                questionsPackId: "",
                schoolYear: "",
                classRoom: "",
                subject: "",
                section: "",
                name: "",
                description: "",
                schoolId : "",
                userId : "",
                packId: "",
                _id: ""
            },

            schoolYearListing : years,

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
            subjectListing : [],

            sectionListing : [
                {
                    value: "",
                    label: "--Chọn--"
                },
                {
                    value: "ADVANCED",
                    label: "Nâng cao"
                },
                {
                    value: "BASIC",
                    label: "Không phân ban"
                }
            ],
            mandatoryFields: {
                name: false,
                description: false
            },

        };
    }



    componentDidMount()
    {
        this.updateSchoolState();
        this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateSchoolState();
        }

        if (
          (this.props.questionsPack.name && !this.state.form.name) ||
          (this.props.questionsPack.name && this.state.form.name && this.props.questionsPack.name !== this.state.form.name)
        )
        {
            this.updateFormState();
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.questionsPack})
    };

    updateSchoolState = () => {
        if ( this.props.match.params.id === 'new' )
        {
            this.props.newQuestionsPack();
        }
        else
        {
            this.props.getQuestionsPack(this.props.match.params.id);
        }
    };


    componentWillReceiveProps(nextProps) {
        if(nextProps.user.schools.length !== 0) {
            this.setState({form: {
                    ...this.state.form,
                    schoolId: nextProps.user.schools[0].id,
                    userId : nextProps.user.user.userId
                }})
            if (nextProps.user.user.userId === 'ssAdmin' || nextProps.user.schools[0].id === 'SS001') {
                    //this.setState({classRoomListing : this.state.classRoomListing})
            } else if(nextProps.user.schools[0].degreeNumber === '1') {
                this.setState({classRoomListing : this.state.degreeClass1})
            } else if(nextProps.user.schools[0].degreeNumber === '2') {
                this.setState({classRoomListing : this.state.degreeClass2})
            } else {
                this.setState({classRoomListing : this.state.degreeClass3})
            }
        }

        if(this.props.questionsPack.length === 0 && nextProps.questionsPack.length !== 0) {
            this.setState({form: nextProps.questionsPack})
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

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    canBeSubmitted()
    {
        const {id} = this.state.form;
        return (
          id.length > 0 &&
          !_.isEqual(this.props.school, this.state.form)
        );
    }

    saveAction = ()=> {
        if (this.state.form._id) {
            this.props.updateQuestionsPack(this.state.form, this.props.history);
        } else {
            this.props.addQuestionsPack(this.state.form, this.props.history);
        }
    }


    handleBlur= (event) => {
        if(event.target.value ==="") {
            this.setState({
                mandatoryFields : { ...this.state.mandatoryFields, [event.target.name]: true }
            });
        }

    }

    render()
    {
        const {form, mandatoryFields} = this.state;

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
                              <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/manageQuestionsPack">
                                  <Icon className="mr-4 text-20">arrow_back</Icon>
                                  Danh sách gói câu hỏi
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
                                      <Typography variant="h6">
                                          {form.name ? form.name : 'Thêm mới gói câu hỏi'}
                                      </Typography>
                                  </FuseAnimate>
                                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography variant="caption">Chi tiết gói câu hỏi</Typography>
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
                  <div className="p-16 sm:p-24 max-w-2xl">
                      {
                        <div>

                            <TextField
                              className="mt-8 mb-16"
                              error={mandatoryFields.questionsPackId === ""}
                              required
                              autoFocus
                              label="Mã gói câu hỏi"
                              id="questionsPackId"
                              name="questionsPackId"
                              disabled={form._id}
                              value={form.questionsPackId}
                              onBlur={this.handleBlur}
                              onChange={this.handleChange}
                              variant="outlined"
                              fullWidth
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
                              options={this.state.schoolYearListing}
                              isMulti={false}
                            />

                            <FuseChipSelect
                              className="mt-8 mb-16"
                              value={this.state.classRoomListing.filter(classRoom => classRoom.value === form.classRoom)}
                              onChange={(value) => this.handleChipChange(value, 'classRoom')}
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
                              className="mt-8 mb-16"
                              value={this.state.subjectListing.filter(subject => subject.value === form.subject)}
                              onChange={(value) => this.handleChipChange(value, 'subject')}
                              placeholder="--Chọn--"
                              textFieldProps={{
                                  label          : 'Môn học',
                                  InputLabelProps: {
                                      shrink: true
                                  },
                                  variant        : 'standard'
                              }}
                              options={this.state.subjectListing}
                              isMulti={false}
                            />

                            <FuseChipSelect
                              className="mt-8 mb-16"
                              value={this.state.sectionListing.filter(section => section.value === form.section)}
                              onChange={(value) => this.handleChipChange(value, 'section')}
                              placeholder="--Chọn--"
                              textFieldProps={{
                                  label          : 'Ban học',
                                  InputLabelProps: {
                                      shrink: true
                                  },
                                  variant        : 'standard'
                              }}
                              options={this.state.sectionListing}
                              isMulti={false}
                            />

                            <TextField
                                className="mt-8 mb-16"
                                error={mandatoryFields.name === ""}
                                required
                                autoFocus
                                label="Tên gói câu hỏi"
                                id="name"
                                name="name"
                                value={form.name}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth
                            />

                            <TextField
                              className="mt-8 mb-16"
                              error={mandatoryFields.description === ""}
                              required
                              label="Diễn giải"
                              id="description"
                              name="description"
                              value={form.description}
                              onBlur={this.handleBlur}
                              onChange={this.handleChange}
                              variant="outlined"
                              fullWidth
                            />
                        </div>
                      }
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
        getQuestionsPack : Actions.getQuestionsPack,
        newQuestionsPack : Actions.newQuestionsPack,
        updateQuestionsPack : Actions.updateQuestionsPack,
        addQuestionsPack: Actions.addQuestionsPack,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool
    }, dispatch);
}

function mapStateToProps({questionsPackApp, auth})
{
    return {
        questionsPack: questionsPackApp.questionsPack.questionsPack,
        subjects: questionsPackApp.subjects,
        user : auth.login.user
    }
}

export default withReducer('questionsPackApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionsPack))));
