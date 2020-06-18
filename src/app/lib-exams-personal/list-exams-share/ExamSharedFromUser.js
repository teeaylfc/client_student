import React, { Component } from 'react'
import { Button, Icon, InputBase, Checkbox, Link, Fab } from '@material-ui/core'
import HeaderButton from '../../../common/HeaderButton'
import InputDropDown from '../../../common/InputDropDown'
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import dataService from '../../services/dataService';
import { connect } from 'react-redux'
import { formatDate } from '../../utils/datetime';
import constants from '../../../config/utils';
import getListGrade from '../../utils/getListGrade';
import DialogBase from '../../../common/DialogBase';
import { showMessage } from '../../store/actions/fuse';
import { el } from 'date-fns/locale';
var moment = require('moment');
const column = [
    {
        Header: 'Tên bộ đề',
        accessor: "nameExam"
    },
    {
        Header: 'Khối học',
        accessor: "degreeNumber"
    },
    {
        Header: 'Môn học',
        accessor: "subject"
    },

    {
        Header: 'Loại đề thi',
        accessor: "level"
    },
    {
        Header: 'Thời gian',
        accessor: "typeTime"
    },
    {
        Header: 'Ngày tạo',
        accessor: "createDate"
    },
    {
        Header: '',
        accessor: "action"
    },
]


class ExamSharedFromUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
            listSubject: [],
            typeTime: [],
            listGrade: getListGrade(this.props.school),
            loading: true,
            open: false,
            openDialog: false,
            tab: 0,
            classCode: "",
            total: "",
            schoolYear: "",
            className: "",

        }
        this.chooseSubject = null
        this.chooseGrade = null
        this.chooseTypeTime = null
        this.deleteIdPack = ""

    }

    _navigateDetail = (id) => () => {
        this.props.history.push({
            pathname: '/viewExam',
            state: { id: id },
        })
    }

    componentDidMount() {
        this._getData()
        this.getListSubject()
    }
    getListSubject() {
        dataService.getListAllSubjects()
            .then(res => {
                this.setState({
                    listSubject: res.data
                })
            })
    }
    handleCloseDialog = (key) => () => {
        this.setState({
            [key]: false
        })
    }
    openDialogDelete = (id) => () => {
        this.deleteIdPack = id
        this.setState({
            openDialog: true
        })
    }
    _getData() {
        var userID = this.props.user.userId
        // var params = {
        //     userCreate: teacherID,
        //     subject: this.chooseSubject && this.chooseSubject.subjectId,
        //     classRoom: this.chooseGrade && this.chooseGrade.toString(),
        //     typeTime: this.chooseTypeTime && this.chooseTypeTime.value,
        // }
        dataService.examSharedFromUser(userID)
            .then(res => {
                console.log(res)
                var list = [...res.data]
                list.forEach((item, index) => {
                    if (item.examDefine != null) {
                        item.createDate = formatDate(item.examDefine.createDate);
                        item.nameExam = item.examDefine.nameExam
                        item.degreeNumber = item.examDefine.degreeNumber
                        item.subject = item.examDefine.subject
                        item.level = item.examDefine.level
                        item.typeTime = `${item.examDefine.typeTime} phút `
                        item.action = <div className="flex flex-row w-full px-12 justify-center">
                            <Button className="btn_delete mr-28" onClick={this._navigateDetail(item.examDefine._id)} ><img className=" color_blue" src="assets/images/icons/ic_view.png" /></Button>
                            <Button className="btn_delete" ><img className="color_blue" src="assets/images/icons/download_blue.png" /></Button>
                        </div>

                    }
                    return item

                })

                // console.log(list)
                this.setState({
                    data: list,
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }
    _navigateDetail = (id) => () => {
        this.props.history.push({
            pathname: '/viewExam',
            state: {
                id: id
            }
        })
    }
    chooseItem = (key) => (item) => {
        this[key] = item
        this._getData()
        // this.getData(params)
    }
    render() {
        const { loading, data, listGrade, listSubject, typeTime, openDialog } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-32">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Danh sách bộ đề được chia sẻ
                </h2>
                    </FuseAnimate>

                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row mb-16 w-full justify-between">
                        <div className="flex flex-row">
                            {listSubject.length > 0 &&
                                <InputDropDown
                                    value={"subjectName"}
                                    widthDrop={"130px"}
                                    color={"#296BFF"}
                                    list={listSubject}
                                    chooseAction={this.chooseItem("chooseSubject")}
                                    title="Môn học" />
                            }

                            <InputDropDown
                                widthDrop={"120px"}
                                value={"label"}
                                className="ml-24"
                                list={typeTime}
                                chooseAction={this.chooseItem("chooseTypeTime")}
                                title="Loại đề" />
                            <InputDropDown
                                widthDrop={"100px"}
                                list={listGrade}
                                className="ml-32"
                                chooseAction={this.chooseItem("chooseGrade")}
                                title="Khối lớp" />

                        </div>
                        <div className="flex flex-row items-center color_grey bg-white px-12 py-2 rounded-lg shadow-common">
                            <Icon>search</Icon>
                            <InputBase
                                className="color_grey ml-12 text-xs"
                                placeholder="Tìm kiếm"
                            />
                        </div>
                    </div>

                </FuseAnimate>
                {data.length > 0 ?
                    <ReactTable
                        data={data}
                        columns={column}
                        defaultPageSize={data.length > 5 ? 5 : data.length}
                        className="-striped -highlight mt-32"
                    // TrGroupComponent={this.customTrGroupComponent}
                    />
                    :
                    <h3 className="text-center mt-40">Không có bộ câu hỏi nào</h3>
                }

                <DialogBase
                    title="Xóa bộ câu hỏi"
                    content={`Bạn có chắc chắn muốn xóa bộ câu hỏi này`}
                    maxWidth="sm"
                    action={this.deleteQuestionPack}
                    openDialog={openDialog}
                    handleCloseDialog={this.handleCloseDialog("openDialog")}
                />
            </div >
        )
    }
    propsTab = (index) => {
        const { tab } = this.state
        return {
            className: tab == index ? "rounded-t gradient_blue text_button_base text-white" : "text_button_base",
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    customTrGroupComponent = (props) => {
        return <Button
            onClick={this.clickItem(props)}
            className='rt-tr-group p-0 text_button_base'
            style={{ fontWeight: "unset" }}>
            {props.children}
        </Button>;
    }
    handleChangeTab = (event, newValue) => {
        this.setState({
            tab: newValue
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    clickItem = (props) => () => {
        this.setState({
            open: true
        })
    }


    handleDateChange = (key) => (date) => {
        this.setState({
            [key]: date
        });
    };
    onChangeText = (key) => (event) => {
        console.log(key)
        this.setState({ [key]: event.target.value })
    }


}
const mapStateToProps = (state) => {
    return {
        school: state.auth.login.user.school,
        user: state.auth.login.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showMessage: (mess) => dispatch(showMessage(mess)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamSharedFromUser)