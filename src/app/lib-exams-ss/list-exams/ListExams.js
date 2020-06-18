import React, { Component } from 'react'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import { Button, Icon, InputBase, Checkbox, Link, Fab, Popover, MenuItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core'
import HeaderButton from '../../../common/HeaderButton'
import InputDropDown from '../../../common/InputDropDown'
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import dataService from '../../services/dataService';
import { connect } from 'react-redux'
import { formatDate } from '../../utils/datetime';
import Star from './ItemStar'
import constants from '../../../config/utils'
var moment = require('moment');

const ItemExams = (props) =>
    <Button variant="contained" className="p-0 overflow-hidden" style={{ borderRadius: "8px" }}>
        <div className="item-lib-exams">
            <div className="circle-exam" />
            <div className="item-lib-exams-foot">
                <img className="item-lib-exams-foot-image" src="assets/images/logos/item-exam.png" />
                <div className="item-lib-exams-foot-text">
                    <h3 className="font-bold text-white text-left">{props.item.nameExam}</h3>
                    <h6 className="text-white mt-6 text-left">
                        {
                            `${props.item.subject} | ${props.item.questionList.length} câu hỏi | Cấp độ: ${props.item.level}`
                        }
                    </h6>
                </div>

            </div>
        </div>
    </Button>

class ListExams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listExams: [],
            listSubject: [],
            indexSubject: null,
            indexClass: null,
            loading: true,
            userMenu: null,
            childMenu: null,
            listGrade: [1,2,3,4,5,6,7,8,9,10,11,12],
        }
        this.chooseSubject = null
        this.chooseClass = null
    }

    getImageSubject = (item) => {
        switch (item.subjectId) {
            case "maths":

                break;

            default:
                break;
        }
    }

    componentDidMount() {
        var grade = this.props.location.state.item
        var subjectId = this.props.location.state.subject.subjectId
        var schoolID = this.props.school.id
        var params = {
            schoolId: "SS001",
            subjectId: subjectId,
            degreeNumber: grade
        }
        this.getData(params)
        this.getListSubject()
    }
    getListSubject() {
        dataService.getListAllSubjects()
            .then(res => {
                console.log(res)
                this.setState({
                    listSubject: res.data
                })
            })
    }
    getData(params) {
        dataService.filterListExams(params)
            .then(res => {
                console.log("--------list exam----")
                console.log(res)
                this.setState({
                    listExams: res.data
                })
            })
            .catch(err => {
                console.log("err")
                console.log(err.response)
            })

    }

    userMenuClick = event => {
        console.log("event")
        console.log(event.currentTarget)
        this.setState({ userMenu: event.currentTarget });
    };
    chooseSubjectMenu = (item, i) => (event) => {
        this.chooseSubject = item
       
        this.setState({ childMenu: event.currentTarget, listChild: item.child, indexSubject: i });
    }
    userMenuClose = () => {
        this.setState({ userMenu: null, });
    };
    childMenuClose = () => {
        this.setState({ childMenu: null });
    }
    chooseClassMenu = (item, i) => (event) => {
        this.chooseClass = item
        this.setState({ childMenu: null, userMenu: null, indexClass: i });
        var grade = this.chooseClass
        var subjectId = this.chooseSubject.subjectId
        var schoolID = this.props.school.id
        var params = {
            schoolId: "SS001",
            subjectId: subjectId,
            degreeNumber: grade
        }
        this.getData(params)
    }
    render() {
        const { item, subject } = this.props.location.state
        console.log("subject")
        console.log(subject)
        const { userMenu, childMenu, listGrade, listExams, listSubject, indexSubject, indexClass } = this.state;
        return (
            <div className="flex flex-col h-full overflow-y-scroll">
                <div className="flex w-full relative px-24 py-40 object-contain" style={{ backgroundImage: "url(assets/images/backgrounds/background.png)" }}>
                    <div className="flex w-full items-center justify-center">
                        <h2 className=" font-bold text-white">{`BỘ ĐỀ KIỂM TRA LỚP ${item}`}</h2>
                    </div>
                    <Button onClick={this.userMenuClick} className="min-w-0 absolute self-center">
                        <img style={{ objectFit: "contain", width: "30px" }} src="assets/images/logos/choose_subject.png" />
                    </Button>
                </div>
                <Popover
                    style={{ marginTop: "20px" }}
                    open={Boolean(userMenu)}
                    anchorEl={userMenu}
                    onClose={this.userMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    classes={{
                        paper: "py-0"
                    }}
                >
                    <React.Fragment>
                        {
                            listSubject.map((item, i) =>
                                <MenuItem key={i} onClick={this.chooseSubjectMenu(item, i)}>
                                    <ListItemIcon>
                                        <Icon style={{ fontSize: "20px" }} className={indexSubject == i ? "color_blue" : "color_text"}>book</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" >
                                        <h4 style={{ fontFamily: "Quicksand" }} className={indexSubject == i ? "color_blue" : "color_text"}>{item.subjectName}</h4>
                                    </ListItemText>
                                </MenuItem>
                            )
                        }
                    </React.Fragment>
                </Popover>

                <Popover
                    open={Boolean(childMenu)}
                    anchorEl={childMenu}
                    onClose={this.childMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    classes={{
                        paper: "py-0"
                    }}
                >
                    <React.Fragment>
                        {
                            listGrade.map((item, i) =>
                                <MenuItem key={i} onClick={this.chooseClassMenu(item,i)}>
                                    <ListItemText className="pl-0 " >
                                        <h4 style={{ fontFamily: "Quicksand" }} className={indexClass == i ? "color_blue" : "color_text"}>{`Khối: ${item}`}</h4>
                                    </ListItemText>
                                </MenuItem>
                            )
                        }
                    </React.Fragment>
                </Popover>

                <div className="container-list-exams">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <div className="flex flex-row w-full div_shadow mb-24">
                            <img width="25%" src="assets/images/logos/header-exam.png" />
                            <div className="flex flex-1 flex-col py-8 px-24">
                                <div className="flex flex-row justify-between ">
                                    <h3 className="font-bold">Forex Trading A-Z With LIVE Examples of Forex Trading</h3>
                                    <Icon style={{ color: "#CF3034" }} >favorite_border</Icon>
                                </div>
                                <h6 className="color_text mt-8">Cập nhật mới nhất vào ngày 29/04/2020</h6>
                                <div className="flex flex-row my-12 items-center">
                                    <div className="backgroundColor_yellow py-2 px-2 mr-12 rounded">
                                        <h6 className="text-white">MỚI</h6>
                                    </div>
                                    <h6>{subject.subjectName ? subject.subjectName : ""}</h6>
                                    <h6 className="mx-2">|</h6>
                                    <h6>45 câu hỏi</h6>
                                    <h6 className="mx-2">|</h6>
                                    <h6 className="mr-48">Cấp độ: Dễ</h6>
                                    <div className="flex flex-row items-center">
                                        <Rater total={5} rating={5} onRate={null} interactive={false} >
                                            <Star />
                                        </Rater>
                                        <h6 className="ml-6">5 (18 đánh giá) </h6>
                                    </div>

                                </div>
                                <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </h6>
                                <div className="mt-12">
                                    <Button
                                        style={{ boxShadow: "unset" }}
                                        // onClick={this.nextStep2}
                                        variant="contained"
                                        className="py-12 px-24 flex flex-row items-center justify-center gradient_turquoise text-white">
                                        <img src="assets/images/icons/download.png" />
                                        <h2 className="text_button_base ml-8">Tải bộ đề</h2>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </FuseAnimate>
                    {
                        listExams.length > 0 ?
                            <div className="exam_grid pb-32">
                                {
                                    listExams.map((item, i) => <ItemExams item={item} key={i} index={i} />)
                                }
                            </div>
                            :
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <h3 className="mt-56 text-center">Không có đề thi nào</h3>
                            </FuseAnimate>
                    }

                </div >
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    console.log("---------------------")
    console.log(state)
    return {
        user: state.auth.login.user.user,
        school: state.auth.login.user.school,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExams)