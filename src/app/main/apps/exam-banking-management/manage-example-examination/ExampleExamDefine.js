import React, {Component} from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Icon,
    Tab,
    Tabs,
    TextField,
    Typography,
    withStyles
} from '@material-ui/core';
import {FuseAnimate, FuseChipSelect, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import DatePickers from "../../../../../common/DatePickers";
import ExamDefineCard from "./ExamDefineCard";
import ExamDefineAddCard from "./ExamDefineAddCard";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import reorder, {reorderQuoteMap} from "../store/actions/reorder";
import QuestionAnswerList from "./QuestionAnswerList";

const styles = theme => ({

});

class ExampleExamDefine extends Component {

    state = {
        tabValue: 0,
        form    : {
            idExamDefine: "",
            degreeNumber: "",
            nameClass: "",
            subject: "",
            nameExam: "",
            typeTime: "",
            isOnlineExam: true,
            isPrivateExam: true,
            startTime: "",
            expiredTime: "",
            isRandomQuestion: false,
            isRandomResult: false,
            examDefineList: [],
            userCreate: "",
            example: true
        },
        supperTopicData : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "1",
                label: "Công lập"
            },
            {
                value: "2",
                label: "Bán công"
            },
            {
                value: "3",
                label: "Dân lập"
            }
        ],
        topicListing: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "Ancol",
                label: "Ancol"
            },
            {
                value: "Ancol-Phenol",
                label: "Ancol-Phenol"
            },
        ],

        questionsPackListing: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "Câu hỏi 15 phút",
                label: "Câu hỏi 15 phút"
            },
            {
                value: "Câu hỏi 1 tiết",
                label: "Câu hỏi 1 tiết"
            },
        ],

        subjectListing: [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "Toán",
                label: "Toán"
            },
            {
                value: "Văn",
                label: "Văn"
            },
            {
                value: "Hóa",
                label: "Hóa"
            },
            {
                value: "Lý",
                label: "Lý"
            },
            {
                value: "Ngoại Ngữ",
                label: "Ngoại Ngữ"
            },
            {
                value: "Sử",
                label: "Sử"
            },
            {
                value: "Địa",
                label: "Địa"
            },
            {
                value: "Sinh",
                label: "Sinh"
            },
            {
                value: "Thể dục",
                label: "Thể dục"
            },
            {
                value: "Giáo dục công dân",
                label: "Giáo dục công dân"
            }
        ],
        classRoomListing: [],
        typeTimeListing : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "15 phút",
                label: "15 phút"
            },
            {
                value: "45 phút",
                label: "45 phút"
            },
            {
                value: "Học kỳ",
                label: "Học kỳ"
            }
        ],
        isOnlineExamListing : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "Trực tuyến",
                label: "Trực tuyến"
            },
            {
                value: "Thi trên giấy",
                label: "Thi trên giấy"
            },
        ],
        isPrivateExamListing : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: "Công khai",
                label: "Công khai"
            },
            {
                value: "Riêng tư",
                label: "Riêng tư"
            },
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

    componentDidMount()
    {
        this.props.getAllQuestionsPack();
        this.props.getAllTopic();
        this.updateProductState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (
            (this.props.examDefine && this.state.form && this.props.examDefine._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        // if ((!this.props.topics || !this.props.topics.topic.length >0 ) && nextProps.topics.topic && nextProps.topics.topic.idTopic) {
        //     console.log("componentWillReceiveProps");
        //     this.setState({ form: Object.assign({}, nextProps.topics.topic) });
        // }
        if(nextProps.user && nextProps.user.schools && nextProps.user.schools.length !== 0) {
            if(nextProps.user.schools[0].degreeNumber === '1') {
                this.setState({classRoomListing : this.state.degreeClass1})
            } else if(nextProps.user.schools[0].degreeNumber === '2') {
                this.setState({classRoomListing : this.state.degreeClass2})
            } else {
                this.setState({classRoomListing : this.state.degreeClass3})
            }
        } else {
            this.setState({classRoomListing : this.state.degreeClass1})
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.examDefine})
    };

    updateProductState = () => {
        if ( this.props.match.params.id === 'new' )
        {
            this.props.newExamDefine();
        }
        else
        {
            this.props.getExamDefine(this.props.match.params.id);

        }
    };

    saveExamDefine = ()=> {
        if (this.state.form._id) {
            this.props.updateExamDefine(this.state.form, this.props.history);
        } else {
            this.state.form.userCreate = this.props.user.userId;
            this.props.addExamDefine(this.state.form, this.props.history);
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChangeDate = (event) => {
        //console.log('handleChangeDate', this.state.startDate.toLocaleDateString())
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

    onDragEnd = (result) => {
        const {source, destination} = result;
        // dropped nowhere
        if (!destination) {
            return;
        }
        // did not move anywhere - can bail early
        if (
          source.droppableId === destination.droppableId &&
          source.index === destination.index
        ) {
            return;
        }
        // reordering list
        let examDefineList = this.state.form.examDefineList;
        if (result.type === 'list') {
            const ordered = reorder(
              examDefineList,
              result.source.index,
              result.destination.index
            );
            this.setState({form: _.set({...this.state.form}, 'examDefineList', ordered)});
        }
        // reordering card
        if (result.type === 'card') {
            const ordered = reorderQuoteMap(
              examDefineList,
              result.source,
              result.destination
            );
            console.log(ordered);
            this.setState({form: _.set({...this.state.form}, 'examDefineList', ordered)});
        }
    };

    addNewExamDefine = (examDetail) => {
        let examDefineList = [...this.state.form.examDefineList, examDetail];
        this.setState({form: _.set({...this.state.form}, 'examDefineList', examDefineList)});
    };

    changeExamDefine = (examDefine) => {
        let examDefineList = this.state.form.examDefineList.map((_examDefine) => _examDefine.id === examDefine.id ? examDefine : _examDefine);
        this.setState({form: _.set({...this.state.form}, 'examDefineList', examDefineList)});
    };

    render()
    {
        const {topics, questionsPacks} = this.props;
        const {tabValue, form} = this.state;

        let questionsPackOption = this.state.questionsPackListing, topicNameOption = this.state.topicListing;
        if (questionsPacks.length > 0) {
            const resultFilter = questionsPacks.filter(questionsPack => form.subject === "" ? questionsPack : questionsPack.subject === form.subject ? questionsPack : null);
            questionsPackOption = resultFilter.map(questionsPack => ({
                value: questionsPack.name,
                label: questionsPack.name
            }));
        }

        if (topics.length > 0) {
            const resultFilter = topics.filter(topic => form.subject === "" ? topic : topic.subjectName === form.subject ? topic : null);
            topicNameOption = resultFilter.map(topic => ({value: topic.topicName, label: topic.topicName}));
        }

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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/managerExamDefine">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Danh sách Đề thi/Kiểm tra
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
                                                {form.topicName ? form.topicName : 'Đề thi/Kiểm tra'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Thông tin</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    //disabled={!this.canBeSubmitted()}
                                    onClick={() => this.saveExamDefine(form)}
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
                        <Tab className="h-64 normal-case" label="Đề thi"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <div>
                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-20 w-1/2"
                                            label="Mã đề thi"
                                            autoFocus
                                            id="idExamDefine"
                                            name="idExamDefine"
                                            value={form.idExamDefine}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <FuseChipSelect
                                          className="mt-8 mb-16 mr-20 w-1/2"
                                          value={this.state.subjectListing.filter(subject => subject.value === form.subject)}
                                          onChange={(value) => this.handleChipChange(value, 'subject')}
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

                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                          className="mt-8 mb-16 mr-20 w-1/2"
                                          value={this.state.classRoomListing.filter(classRoom => classRoom.value === form.degreeNumber)}
                                          onChange={(value) => this.handleChipChange(value, 'degreeNumber')}
                                          placeholder="--Chọn--"
                                          textFieldProps={{
                                              label: 'Khối lớp',
                                              InputLabelProps: {
                                                  shrink: true
                                              },
                                              variant: 'standard'
                                          }}
                                          options={this.state.classRoomListing}
                                          isMulti={false}
                                        />

                                        <TextField
                                            className="mt-8 mb-16 mr-20 w-1/2"
                                            label="Lớp"
                                            //autoFocus
                                            id="nameClass"
                                            name="nameClass"
                                            value={form.nameClass}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mt-8 mb-16 mr-20 w-1/2"
                                            label="Tên kỳ thi"
                                            //autoFocus
                                            id="nameExam"
                                            name="nameExam"
                                            value={form.nameExam}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <FuseChipSelect
                                          className="mt-8 mb-16 mr-20 w-1/2"
                                          value={this.state.typeTimeListing.filter(classRoom => classRoom.value === form.typeTime)}
                                          onChange={(value) => this.handleChipChange(value, 'typeTime')}
                                          placeholder="--Chọn--"
                                          textFieldProps={{
                                              label: 'Loại hình thời gian',
                                              InputLabelProps: {
                                                  shrink: true
                                              },
                                              variant: 'standard'
                                          }}
                                          options={this.state.typeTimeListing}
                                          isMulti={false}
                                        />

                                    </div>

                                    <div className="flex">
                                        <FuseChipSelect
                                          className="mt-8 mb-16 mr-20 w-1/2"
                                          value={this.state.isOnlineExamListing.filter(classRoom => classRoom.value === form.isOnlineExam)}
                                          onChange={(value) => this.handleChipChange(value, 'isOnlineExam')}
                                          placeholder="--Chọn--"
                                          textFieldProps={{
                                              label: 'Hình thức thi',
                                              InputLabelProps: {
                                                  shrink: true
                                              },
                                              variant: 'standard'
                                          }}
                                          options={this.state.isOnlineExamListing}
                                          isMulti={false}
                                        />

                                        <FuseChipSelect
                                          className="mt-8 mb-16 mr-20 w-1/2"
                                          value={this.state.isPrivateExamListing.filter(classRoom => classRoom.value === form.isPrivateExam)}
                                          onChange={(value) => this.handleChipChange(value, 'isPrivateExam')}
                                          placeholder="--Chọn--"
                                          textFieldProps={{
                                              label: 'Loại đề thi',
                                              InputLabelProps: {
                                                  shrink: true
                                              },
                                              variant: 'standard'
                                          }}
                                          options={this.state.isPrivateExamListing}
                                          isMulti={false}
                                        />

                                    </div>

                                    <div className="flex">
                                        <div className="mt-8 mb-16 mr-20 w-1/2">
                                            <DatePickers
                                              label="Thời gian bắt đầu"
                                              //autoFocus
                                              id="startTime"
                                              name="startTime"
                                              value={form.startTime}
                                              onChange={this.handleChangeDate}
                                              variant="outlined"
                                              fullWidth
                                            />
                                        </div>

                                        <div className="mt-8 mb-16 mr-20 w-1/2">
                                            <DatePickers
                                              label="Thời gian kết thúc"
                                              id="expiredTime"
                                              name="expiredTime"
                                              value={form.expiredTime}
                                              onChange={this.handleChangeDate}
                                              variant="outlined"
                                              fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className={'flex'}>
                                        <FormControlLabel
                                          control={
                                              <Checkbox
                                                checked={form.isRandomQuestion}
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                id="isRandomQuestion"
                                                name="isRandomQuestion"
                                              />
                                          } label={'Xáo trộn câu hỏi'} className="mt-8 mb-16 mr-20 w-1/2"/>

                                          <FormControlLabel
                                          control={
                                              <Checkbox
                                                checked={form.isRandomResult}
                                                variant="outlined"
                                                onChange={this.handleChange}
                                                id="isRandomResult"
                                                name="isRandomResult"
                                              />
                                          } label={'Xáo trộn kết quả'} className="mt-8 mb-16 mr-20 w-1/2"/>
                                    </div>

                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <Droppable
                                          droppableId={((new Date()).getTime()).toString()}
                                          type="list"
                                          direction="vertical"
                                        >
                                            {(provided) => (
                                              <div ref={provided.innerRef} className="flex flex-col container w-full mb-16 ">

                                                  {form.examDefineList.map((examDefine, index) => (
                                                    <ExamDefineCard
                                                      questionsPackOption={questionsPackOption}
                                                      topicNameOption={topicNameOption}
                                                      examDefine={examDefine}
                                                      index = {index}
                                                      key = {examDefine.id}
                                                      changeExamDefine={this.changeExamDefine}
                                                    />
                                                  ))}
                                                  {provided.placeholder}
                                                  <ExamDefineAddCard questionsPackOption={questionsPackOption} addNewExamDefine={this.addNewExamDefine}
                                                                     topicNameOption={topicNameOption}/>
                                              </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>

                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                    <QuestionAnswerList/>
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
        getExamDefine : Actions.getExamDefine,
        newExamDefine : Actions.newExamDefine,
        updateExamDefine: Actions.updateExamDefine,
        addExamDefine: Actions.addExamDefine,
        getAllQuestionsPack: Actions.getAllQuestionsPack,
        getAllTopic: Actions.getAllTopic
    }, dispatch);
}

function mapStateToProps({examDefineApp, auth})
{
    return {
        examDefine: examDefineApp.examDefines.examDefine,
        questionsPacks: examDefineApp.questionsPack.questionsPacks,
        topics: examDefineApp.topics.topicsData,
        user : auth.login.user
    }
}

export default withReducer('examDefineApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ExampleExamDefine))));
