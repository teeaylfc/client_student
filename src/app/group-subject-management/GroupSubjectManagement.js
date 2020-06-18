import React, { Component } from 'react'
import { Button, Icon, InputBase, Checkbox } from '@material-ui/core'
import HeaderButton from '../../common/HeaderButton'
import InputDropDown from '../../common/InputDropDown'
import ReactTable from 'react-table';
// Or import the input component
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FuseAnimate } from '@fuse';
import DropDownItem from '../lib-exams-personal/create-exams/create-exam-step/DropDownItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
const column = [
    {
        Header: '',
        maxWidth: 50,
        accessor: "checkbox"
    },
    {
        Header: 'Mã tổ môn',
        accessor: "subject_code"
    },
    {
        Header: 'Tên tổ môn',
        accessor: "subject_name"
    },
    {
        Header: 'Tổ trưởng',
        accessor: "leader"
    },
]
const columnTab1 = [
    {
        Header: "Mã giáo viên",
        accessor: "teacher_code"
    },
    {
        Header: 'Tên giáo viên',
        accessor: "teacher_name"
    },
    {
        Header: 'Điện thoại',
        accessor: "phone_number"
    },
    {
        Header: 'Bộ môn',
        accessor: "group_subject"
    },
    {
        Header: 'Chủ nhiệm',
        accessor: "chairman"
    },
    {
        Header: 'Trạng thái',
        accessor: "status"
    },
]
const dataTab1 = [
    {
        teacher_code: "GV001",
        teacher_name: "Vũ Thị Mai Anh",
        phone_number: "0957294715",
        group_subject: "Toán Lý",
        chairman: "10A1",
        status: "Đang giảng dạy"
    },
    {
        teacher_code: "GV001",
        teacher_name: "Vũ Thị Mai Anh",
        phone_number: "0957294715",
        group_subject: "Toán Lý",
        chairman: "10A1",
        status: "Đang giảng dạy"
    },
    {
        teacher_code: "GV001",
        teacher_name: "Vũ Thị Mai Anh",
        phone_number: "0957294715",
        group_subject: "Toán Lý",
        chairman: "10A1",
        status: "Đang giảng dạy"
    },
    {
        teacher_code: "GV001",
        teacher_name: "Vũ Thị Mai Anh",
        phone_number: "0957294715",
        group_subject: "Toán Lý",
        chairman: "10A1",
        status: "Đang giảng dạy"
    },
    {
        teacher_code: "GV001",
        teacher_name: "Vũ Thị Mai Anh",
        phone_number: "0957294715",
        group_subject: "Toán Lý",
        chairman: "10A1",
        status: "Đang giảng dạy"
    },
]
const status = [
    "Đang giảng dạy", "Đã nghỉ dạy"
]
export default class GroupSubjectManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    subject_code: "M001",
                    subject_name: "Toán, Lý",
                    leader: "Vũ Thị Mai Anh"
                },
                {
                    subject_code: "M001",
                    subject_name: "Toán, Lý",
                    leader: "Vũ Thị Mai Anh"
                },
                {
                    subject_code: "M001",
                    subject_name: "Toán, Lý",
                    leader: "Vũ Thị Mai Anh"
                },
                {
                    subject_code: "M001",
                    subject_name: "Toán, Lý",
                    leader: "Vũ Thị Mai Anh"
                },
                {
                    subject_code: "M001",
                    subject_name: "Toán, Lý",
                    leader: "Vũ Thị Mai Anh"
                },
                {
                    subject_code: "M001",
                    subject_name: "Toán, Lý",
                    leader: "Vũ Thị Mai Anh"
                },
            ],
            loading: true,
            open: false,
            tab: 0
        }
    }
    componentDidMount() {
        var list = this.state.data
        list.map((item, index) => {
            item.checkbox = <Checkbox
                checked={false}
                onChange={this.onChange(index)}
                value="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        })
        console.log("list")
        this.setState({
            data: list,
            loading: false
        })
        console.log(this.state.data)
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
        const { open, loading, data, tab } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Quản lý tổ môn
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton exportbutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row mb-16">
                        <DropDownItem placeholder="Trạng thái" shadow list={status} placement="bottom-end" color={"#296BFF"} />

                    </div>
                </FuseAnimate>
                {loading ? null :
                    <ReactTable
                        data={data}
                        columns={column}
                        defaultPageSize={5}
                        className="-striped -highlight mt-20"
                        TrGroupComponent={this.customTrGroupComponent}
                    />
                }
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    maxWidth="md"
                    fullWidth={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent>
                        <Tabs indicatorColor="transparent" value={tab} onChange={this.handleChangeTab} aria-label="simple tabs example">
                            <Tab
                                label="Thông tin"
                                {...this.propsTab(0)}
                            />
                            <Tab
                                label="Giáo viên thuộc tổ môn"
                                {...this.propsTab(1)}
                            />
                        </Tabs>
                        <Divider style={{ height: "1.5px" }} className="backgroundColor_blue" />
                        {
                            tab == 0 ?
                                <ReactTable
                                    data={data}
                                    columns={column}
                                    defaultPageSize={5}
                                    className="-striped -highlight mt-20"
                                    TrGroupComponent={this.customTrGroupComponent}
                                />
                                :
                                <ReactTable
                                    data={dataTab1}
                                    columns={columnTab1}
                                    defaultPageSize={5}
                                    className="-striped -highlight mt-20"
                                />
                        }

                    </DialogContent>
                </Dialog>
            </div>
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
        console.log("123123123123")
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
    chooseSubject = (item) => () => {

    }
}
