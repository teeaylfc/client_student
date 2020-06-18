import React, { Component } from 'react'
import { Button, Icon, InputBase, Checkbox, Link } from '@material-ui/core'
import HeaderButton from '../../../common/HeaderButton'
import InputDropDown from '../../../common/InputDropDown'
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import dataService from '../../services/dataService';
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie';
import getListGrade from '../../utils/getListGrade';
const column = [
    {
        Header: '',
        maxWidth: 50,
        accessor: "checkbox"
    },
    {
        Header: 'STT',
        maxWidth: 50,
        accessor: "stt"
    },
    {
        Header: 'Tên khối',
        accessor: "groupClass"
    },
    {
        Header: 'Mã lớp',
        accessor: "classId"
    },
    {
        Header: 'Tên lớp',
        accessor: "className"
    },
    {
        Header: 'Sĩ số',
        accessor: "totalStudent"
    },

    {
        Header: 'Lớp chuyên',
        accessor: "typeClass"
    },
    {
        Header: '',
        accessor: "info_class"
    },
]


class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            open: false,
            tab: 0,
            classCode: "",
            total: "",
            schoolYear: "",
            className: "",
            listGrade: getListGrade(this.props.school),
            listSubject: []
        }
        this.chooseSubject = null
        this.chooseGrade = null
    }
    _navigateDetail = (item) => () => {
        this.props.history.push({
            pathname: '/classDetail',
            state: { _id: item._id, schoolId: item.schoolId, classId: item.classId },
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
    _getData() {
        var teacherID = this.props.user.userId
        var schoolID = this.props.user.school ? this.props.user.school : this.props.user.userRole.schoolId
        dataService.getClassesByTeacherIdSchoolID(teacherID, schoolID)
            .then(res => {
                console.log("-----------------")
                console.log(res)
                var list = res
                list.map((item, index) => {
                    item.checkbox = <Checkbox
                        checked={false}
                        onChange={this.onChange(index)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    item.stt = index + 1
                    item.info_class = <Link onClick={this._navigateDetail(item)} className="color_blue">
                        <h5 className="info-class">Xem thông tin lớp học</h5>
                    </Link>
                })
                this.setState({
                    data: list,
                    loading: false
                })
            })
    }
    componentDidMount() {
        console.log("this.props.cookies")
        console.log(this.props.cookies)
        this._getData()
        this.getListSubject()
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
    render() {
        const { loading, data, listGrade, listSubject } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Danh sách lớp học
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton exportbutton menubutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row mb-16 w-full justify-between">
                        <div className="flex flex-row">
                            <InputDropDown
                                widthDrop={"120px"}
                                list={listGrade}
                                chooseAction={this.chooseItem("chooseGrade")}
                                title="Khối lớp" />
                            <div style={{ width: "50px" }} />
                            <InputDropDown
                                value={"subjectName"}
                                widthDrop={"120px"}
                                list={listSubject}
                                chooseAction={this.chooseItem("chooseSubject")}
                                title="Môn học" />
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
                {loading ? null :
                    <ReactTable
                        data={data}
                        columns={column}
                        defaultPageSize={data.length < 5 ? data.length : 5}
                        className="-striped -highlight mt-20"
                    // TrGroupComponent={this.customTrGroupComponent}
                    />
                }
            </div >
        )
    }
    chooseItem = (key) => (item) => {
        this[key] = item
        // this._getData()
        // this.getData(params)
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
    chooseBlockScholl = (item) => () => {

    }
    chooseClass = (item) => () => {

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

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ClassList))