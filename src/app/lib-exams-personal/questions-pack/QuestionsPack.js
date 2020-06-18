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
var moment = require('moment');
const column = [
    {
        Header: 'STT',
        maxWidth: 100,
        accessor: "stt"
    },
    {
        Header: 'Tên bộ câu hỏi',
        accessor: "name"
    },
    {
        Header: 'Thời gian',
        accessor: "typeTime"
    },
    {
        Header: 'Môn',
        accessor: "subject"
    },
    {
        Header: 'Ngày khởi tạo',
        accessor: "createDate"
    },

    {
        Header: '',
        accessor: "detail"
    },
    {
        Header: '',
        maxWidth: 100,
        accessor: "delete"
    },
]


class SetOfQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    setQuestions: "Bộ câu hỏi 1",
                    time: "45 phút",
                    subject: "Toán",
                    createdDate: "12/08/2019"
                },
                {
                    setQuestions: "Bộ câu hỏi 1",
                    time: "45 phút",
                    subject: "Toán",
                    createdDate: "12/08/2019"
                },
                {
                    setQuestions: "Bộ câu hỏi 1",
                    time: "45 phút",
                    subject: "Toán",
                    createdDate: "12/08/2019"
                },
                {
                    setQuestions: "Bộ câu hỏi 1",
                    time: "45 phút",
                    subject: "Toán",
                    createdDate: "12/08/2019"
                },
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

    _navigateDetail = (obj) => () => {
        this.props.history.push({
            pathname: '/questionsPackDetail',
            state: { item: obj },
        })
    }

    componentDidMount() {
        this._getData()
        this.getListSubject()
        this.getConstant()
    }
    getConstant() {
        dataService.getConstants()
            .then(res => {
                this.setState({
                    typeTime: res.typeTime,
                })
            })
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
        var teacherID = this.props.user.userId
        console.log(this.props.user)
        var params = {
            userCreate: teacherID,
            subject: this.chooseSubject && this.chooseSubject.subjectId,
            classRoom: this.chooseGrade && this.chooseGrade.toString(),
            typeTime: this.chooseTypeTime && this.chooseTypeTime.value,
        }
        console.log("params")
        console.log(params)
        dataService.filterQuestionPack(params)
            .then(res => {
                var list = [...res.data]
                console.log("list")
                console.log(list)
                list.forEach((item, index) => {
                    var object = { ...item }
                    item.checkbox = <Checkbox
                        checked={false}
                        onChange={this.onChange(index)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    item.createDate = formatDate(item.createDate);
                    item.stt = index + 1
                    item.delete = <Button className="btn_delete" onClick={this.openDialogDelete(object._id)} ><Icon className="color_blue" fontSize="small">delete</Icon></Button>
                    item.detail = <Link onClick={this._navigateDetail(object)} className="color_blue">
                        <h5 className="info-class">Xem bộ câu hỏi</h5>
                    </Link>
                    return item
                })
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

    deleteQuestionPack = () => {
        dataService.deleteQuestionPack(this.deleteIdPack)
            .then(res => {
                this._getData()
                this.setState({
                    openDialog: false
                })
                this.props.showMessage({ message: "Xóa bộ câu hỏi thành công?" })

            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }
    createQuestionPack = () => {
        this.props.history.push({
            pathname: '/createQuestionPack',
            state: {
                listGrade: this.state.listGrade,
                typeTime: this.state.typeTime,
                listSubject: this.state.listSubject
            },
        })
    }
    onChange = (index) => () => {
        var list = [...this.state.data]
        var obj = this.state.data[index]
        obj.checkbox = <Checkbox
            checked={obj.check ? false : true}
            onChange={this.onChange(index)}
            value="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        obj.check = obj.check ? false : true
        list[index] = obj
        this.setState({
            data: list,
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
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Danh sách các bộ câu hỏi
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton={this.createQuestionPack} exportbutton menubutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row mb-16 w-full justify-between">
                        <div className="flex flex-row">

                            <InputDropDown
                                widthDrop={"100px"}
                                list={listGrade}
                                className="mr-32"
                                chooseAction={this.chooseItem("chooseGrade")}
                                title="Khối lớp" />
                            {listSubject.length > 0 &&
                                <InputDropDown
                                    value={"subjectName"}
                                    widthDrop={"130px"}
                                    color={"#296BFF"}
                                    list={listSubject}
                                    className="mr-24"
                                    chooseAction={this.chooseItem("chooseSubject")}
                                    title="Môn học" />
                            }
                            <InputDropDown
                                widthDrop={"120px"}
                                value={"label"}
                                list={typeTime}
                                chooseAction={this.chooseItem("chooseTypeTime")}
                                title="Thời gian" />
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
        console.log("propspropsprops")
        console.log(props)
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
    console.log("---------------------")
    console.log(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(SetOfQuestions)