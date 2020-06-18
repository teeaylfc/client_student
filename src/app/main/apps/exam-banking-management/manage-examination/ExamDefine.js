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
import ExamDefineCard from "./ExamDefineCard";
import ExamDefineAddCard from "./ExamDefineAddCard";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import reorder, {reorderQuoteMap} from "../store/actions/reorder";
import QuestionAnswerList from "./QuestionAnswerList";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from "material-ui-pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({});

const initialState = {
    tabValue: 0,
    isUpdate: false,
    form    : {
        idExamDefine: "",
        degreeNumber: "",
        nameClass: "",
        subject: "",
        nameExam: "",
        typeTime: "",
        isOnlineExam: true,
        isPrivateExam: true,
        startTime: new Date(),
        totalTime: 0,
        effectStartTime: new Date(),
        effectExpiredTime: new Date(),
        isRandomQuestion: false,
        isRandomResult: false,
        examDefineList: [],
        userCreate: "",
        schoolId: "",
        example: false,
        level: "",
        draft: true,
        questionList: [],
        isUpdateExamDefine: false,
    },
    enableExpiredTime: false,
    open: false,
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
    levelListing: [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: "Dễ",
            label: "Dễ"
        },
        {
            value: "Trung bình",
            label: "Trung bình"
        },
        {
            value: "Khó",
            label: "Khó"
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
            value: "15",
            label: "15 phút"
        },
        {
            value: "45",
            label: "Một tiết (45 phút)"
        },
        {
            value: "SEMESTER",
            label: "Học kỳ"
        },
        {
            value: "OTHER",
            label: "Khác"
        },
    ],
    isOnlineExamListing : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: true,
            label: "Trực tuyến"
        },
        {
            value: false,
            label: "Thi trên giấy"
        },
    ],
    isPrivateExamListing : [
        {
            value: "",
            label: "--Chọn--"
        },
        {
            value: false,
            label: "Công khai"
        },
        {
            value: true,
            label: "Riêng tư"
        },
    ],
    degreeClassDefault: [
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
    nameClassList : [],
};

class ExamDefine extends Component {

    state = initialState;

    componentDidMount()
    {
        this.updateProductState();
        this.props.getAllTopic();
        if (this.props.user && this.props.user.schools && this.props.user.schools.length > 0) {
            this.props.getQuestionsPackBySchoolId(this.props.user.schools[0].id);
            this.props.getClassBySchoolId(this.props.user.schools[0].id);
            this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props);
        console.log(prevProps.examDefine);
        if (this.props.examDefine && this.state.form && this.props.examDefine._id !== this.state.form._id) {
            this.updateFormState();
        }
    }


    componentWillReceiveProps(nextProps) {
        // if ((!this.props.topics || !this.props.topics.topic.length >0 ) && nextProps.topics.topic && nextProps.topics.topic.idTopic) {
        //     console.log("componentWillReceiveProps");
        //     this.setState({ form: Object.assign({}, nextProps.topics.topic) });
        // }
        if(nextProps.user && nextProps.user.schools && nextProps.user.schools.length !== 0) {
            if (nextProps.user.user.userId === 'ssAdmin' || nextProps.user.schools[0].id === 'SS001') {
                this.setState({classRoomListing : this.state.degreeClassDefault})
            } else if(nextProps.user.schools[0].degreeNumber === '1') {
                this.setState({classRoomListing : this.state.degreeClass1})
            } else if(nextProps.user.schools[0].degreeNumber === '2') {
                this.setState({classRoomListing : this.state.degreeClass2})
            } else {
                this.setState({classRoomListing : this.state.degreeClass3})
            }
        } else {
            this.setState({classRoomListing : this.state.degreeClass1})
        }
        if (!!!_.isEmpty(nextProps.examDefine) && nextProps.examDefine && nextProps.examDefine !== this.props.examDefine) {
            this.setState({form: nextProps.examDefine})
        }

        if(nextProps.classes.classData.length !==0) {
            let result = nextProps.classes.classData.map(classData => ({ value: classData.idClass, label: classData.nameClass }));
            //result = [{value: "", label: "--Chọn--"}, ...result];
            this.setState({nameClassList: result})
        } else {
            this.setState({nameClassList: []})
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
            this.setState({isUpdate: true});
        }
    };

    saveExamDefine = (draft)=> {
        this.state.form.draft = draft;
        if (!!!draft) {
            if (this.state.form.examDefineList.length === 0) {
                alert("Chưa có câu hỏi nào được định nghĩa. Vui lòng tạo lại");
                return;
            }
        }
        if (this.state.form._id) {
            this.props.updateExamDefine(this.state.form, this.props.history);
        } else {
            this.state.form.userCreate = this.props.user.user.userId;
            this.state.form.schoolId = this.props.user.schools[0].id;
            this.props.addExamDefine(this.state.form, this.props.history);
        }
    };

    getQuestionListExamDefine = () => {
        this.setState({form: _.set({...this.state.form}, "isUpdateExamDefine", true)});
        this.props.previewExamDefine(this.state.form, this.props.history);
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    handleGroupClassChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
        this.props.getClassByGroupClass(this.props.user.schools[0].id, value.value)
    };

    handleDateChange = (date, name) => {
        let examDefine = this.state.form;

        this.setState({form: _.set({...this.state.form}, name, date)});
        if (name === 'startTime' && (this.state.form.typeTime !== 'OTHER' || this.state.form.typeTime !== 'SEMESTER' )) {
            let expiredDate = new Date(date.getTime() + parseInt(this.state.form.typeTime) * 60000);
            examDefine.startTime = date;
            examDefine.expiredTime = expiredDate;
            this.setState({form: examDefine});
        }
    };

    handleChipChangeTimeType = (value, name) => {
        let checkExist = this.state.typeTimeListing.filter(typeTime => typeTime.value === value.value);
        if  (checkExist === undefined || checkExist.length === 0) {
            this.state.typeTimeListing.push(value);
        }
        if  (value.value === 'OTHER' || value.value === 'SEMESTER') {
            this.state.enableExpiredTime = true;
        } else {
            this.state.enableExpiredTime = false;
        }

        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    handleNameClassChange = (value) => {
        const data = value.map(item => item.value);
        //this.setState({form: _.set({...this.state.form}, 'nameSubject', value)});

        this.setState({form: {
                ...this.state.form,
                nameClass : data,
            }});
    };

    canBeSubmitted()
    {
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
        const { open } = this.state;
        let questionsPackOption = this.state.questionsPackListing, topicNameOption = this.state.topicListing;
        if (questionsPacks && questionsPacks.length > 0) {
            const resultFilter = questionsPacks.filter(questionsPack => form.subject === "" ? questionsPack : questionsPack.subject === form.subject ? questionsPack : null);
            questionsPackOption = resultFilter.map(questionsPack => ({
                value: questionsPack._id,
                label: questionsPack.name
            }));
        }

        if (topics && topics.length > 0) {
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
                                <div>
                                    {!!form.draft && <Button
                                        className="whit espace-no-wrap"
                                        style={{margin: '7px'}}
                                        variant="contained"
                                        //disabled={!this.canBeSubmitted()}
                                        onClick={() => this.saveExamDefine(true)}
                                    >
                                        Lưu Nháp
                                    </Button> }
                                    <Button
                                        className="whitespace-no-wrap"
                                        style={{margin: '7px'}}
                                        variant="contained"
                                        //disabled={!this.canBeSubmitted()}
                                        onClick={() => this.getQuestionListExamDefine()}
                                    >
                                        Tham khảo
                                    </Button>
                                    <Button
                                        className="whitespace-no-wrap"
                                        style={{margin: '7px'}}
                                        variant="contained"
                                        //disabled={!this.canBeSubmitted()}
                                        onClick={() => this.saveExamDefine(false)}
                                    >
                                        Lưu
                                    </Button>
                                </div>
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
                                          onChange={(value) => this.handleGroupClassChange(value, 'degreeNumber')}
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

                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-8 w-1/2"
                                            value={
                                                this.state.nameClassList.filter(nameClass => form.nameClass ? form.nameClass.includes(nameClass.value) : "")
                                            }
                                            onChange={(value) => this.handleNameClassChange(value)}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label          : 'Lớp học',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant        : 'outlined'
                                            }}
                                            options={this.state.nameClassList}
                                            isMulti
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
                                          value={this.state.isPrivateExamListing.filter(classRoom => classRoom.value === form.isPrivateExam)}
                                          onChange={(value) => this.handleChipChange(value, 'isPrivateExam')}
                                          placeholder="--Chọn--"
                                          textFieldProps={{
                                              label: 'Chia sẻ',
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
                                        {
                                            this.state.form.isPrivateExam && (
                                              <div className="mt-8 mb-16 mr-20 w-1/2">
                                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                      <div className="pickers">
                                                          <DateTimePicker value={form.startTime}
                                                                          label="Thời gian bắt đầu thi"
                                                                          format="dd/MM/yyyy HH:mm"
                                                                          id="startTime" name="startTime"
                                                                          onChange={(value) => this.handleDateChange(value, 'startTime')}
                                                          />
                                                      </div>
                                                  </MuiPickersUtilsProvider>
                                              </div>
                                            )
                                        }
                                        {
                                            !!!this.state.form.isPrivateExam && (
                                              <TextField
                                                className="mt-8 mb-16 mr-20 w-1/2"
                                                label="Thời gian làm bài"
                                                //autoFocus
                                                id="totalTime"
                                                name="totalTime"
                                                value={form.totalTime ? form.totalTime : 0}
                                                onChange={this.handleChange}
                                                variant="outlined"
                                                fullWidth
                                              />
                                            )
                                        }
                                    </div>
                                    {
                                        this.state.form.isPrivateExam && (
                                          <div className="flex">
                                              <FuseChipSelect
                                                className="mt-8 mb-16 mr-20 w-1/2"
                                                value={this.state.typeTimeListing.filter(classRoom => classRoom.value === form.typeTime)}
                                                onChange={(value) => this.handleChipChangeTimeType(value, 'typeTime')}
                                                placeholder="--Chọn--"
                                                textFieldProps={{
                                                    label: 'Loại đề thi',
                                                    InputLabelProps: {
                                                        shrink: true
                                                    },
                                                    variant: 'standard',
                                                }}
                                                options={this.state.typeTimeListing}
                                                isMulti={false}
                                              />

                                              <TextField
                                                disabled={!this.state.enableExpiredTime}
                                                className="mt-8 mb-16 mr-20 w-1/2"
                                                label="Thời gian làm bài"
                                                //autoFocus
                                                id="totalTime"
                                                name="totalTime"
                                                value={form.totalTime ? form.totalTime : 0}
                                                onChange={this.handleChange}
                                                variant="outlined"
                                                fullWidth
                                              />
                                          </div>
                                        )
                                    }
                                    {
                                        !!!this.state.form.isPrivateExam && (
                                          <div className="flex">
                                              <div className="mt-8 mb-16 mr-20 w-1/2">
                                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                      <div className="pickers">
                                                          <DateTimePicker value={form.effectStartTime}
                                                                          label="Thời gian hiệu lực bắt đầu"
                                                                          format="dd/MM/yyyy HH:mm"
                                                                          id="effectStartTime" name="effectStartTime"
                                                                          onChange={(value) => this.handleDateChange(value, 'effectStartTime')}
                                                          />
                                                      </div>
                                                  </MuiPickersUtilsProvider>
                                              </div>


                                              <div className="mt-8 mb-16 mr-20 w-1/2">
                                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                      <div className="pickers">
                                                          <DateTimePicker value={form.effectExpiredTime}
                                                                          label="Thời gian kết thúc"
                                                                          format="dd/MM/yyyy HH:mm"
                                                                          id="effectExpiredTime" name="effectExpiredTime"
                                                                          onChange={(value) => this.handleDateChange(value, 'effectExpiredTime')} />
                                                      </div>
                                                  </MuiPickersUtilsProvider>
                                              </div>
                                          </div>
                                        )
                                    }

                                    <div  className={'flex'}>
                                        <FuseChipSelect
                                            className="mt-8 mb-16 mr-20 w-1/2"
                                            value={this.state.levelListing.filter(level => level.value === form.level)}
                                            onChange={(value) => this.handleChipChange(value, 'level')}
                                            placeholder="--Chọn--"
                                            textFieldProps={{
                                                label: 'Mức độ khó',
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                variant: 'standard'
                                            }}
                                            options={this.state.levelListing}
                                            isMulti={false}
                                        />
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

                                                  {form.examDefineList && form.examDefineList.map((examDefine, index) => (
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
                            {/*{tabValue === 1 && (
                                <div>
                                    <QuestionAnswerList/>
                                </div>
                            )}*/}
                            {/*<Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={open}
                                onClose={this.handleClose}
                            >
                                <div>
                                    <QuestionAnswerList/>
                                </div>
                            </Modal>*/}
                            <Dialog
                                fullWidth={true}
                                maxWidth={"md"}
                                open={open}
                                onClose={this.handleClose}
                                aria-labelledby="max-width-dialog-title"
                            >
                                <DialogTitle id="max-width-dialog-title">Question List</DialogTitle>
                                <DialogContent>
                                    <div>
                                        <QuestionAnswerList/>
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
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
        previewExamDefine: Actions.previewExamDefine,
        updateExamDefine: Actions.updateExamDefine,
        addExamDefine: Actions.addExamDefine,
        getQuestionsPackBySchoolId: Actions.getQuestionsPackBySchoolId,
        getAllTopic: Actions.getAllTopic,
        getClassBySchoolId : Actions.getClassByIdSchool,
        getClassByGroupClass: Actions.getClassByGroupClass,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool,
    }, dispatch);
}

function mapStateToProps({examDefineApp, auth})
{
    return {
        examDefine: examDefineApp.examDefines.examDefine,
        questionsPacks: examDefineApp.questionsPack.questionsPacks,
        classes : examDefineApp.classes,
        topics: examDefineApp.topics.topicsData,
        subjects: examDefineApp.subjects,
        user : auth.login.user
    }
}

export default withReducer('examDefineApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ExamDefine))));
