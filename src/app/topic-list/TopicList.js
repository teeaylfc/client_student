import React, { Component } from 'react'
import { Button, Icon, Checkbox, IconButton } from '@material-ui/core'
import HeaderButton from '../../common/HeaderButton'
import InputDropDown from '../../common/InputDropDown'

import InputBase from '@material-ui/core/InputBase';
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import dataService from '../services/dataService';
import { connect } from 'react-redux'
const listBlock = [
    "10",
    "11",
    "12"
]

const column = [
    {
        Header: '',
        accessor: "checkbox",
        maxWidth: 50
    },
    {
        Header: 'Môn học',
        maxWidth: 150,
        accessor: "subjectName"
    },
    {
        Header: 'Khối học',
        maxWidth: 150,
        accessor: "degreeNumber"
    },
    {
        Header: 'Tên chuyên đề',
        accessor: "topicName"
    },
    {
        Header: 'Loại chuyên đề',
        accessor: "supperTopicName"
    },
    {
        Header: 'Người tạo',
        accessor: "userCreate"
    },
    {
        Header: 'Ngày tạo',
        accessor: "createDate"
    },
    {
        Header: 'Action',
        accessor: "action",
        maxWidth: 200,
    },
]

class TopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [

            ]
        }
    }
    componentDidMount() {
        dataService.getTopicListBySchoolId(this.props.schools.id, this.props.user.userId)
            .then(res => {
                let list = []
                list = res
                for (let i in list) {
                    let item = list[i]
                    item.stt = i + 1
                    item.checkbox = <Checkbox
                        checked={false}
                        onChange={this.onChange(i)}
                        value="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    item.action = <div style={{width:"60%"}} className="flex flex-row justify-between">
                        <IconButton className="bg-white shadow">
                            <img src="assets/images/icons/ic_pen.png" width="15px" className="object-contain" />
                        </IconButton>
                        <IconButton className="bg-white shadow">
                            <img src="assets/images/icons/ic_bin.png" width="15px" className="object-contain" />
                        </IconButton>
                    </div>
                }
                this.setState({
                    data: res,
                })
            })
            .catch(err => {
                console.log(err)
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

    render() {
        const { data } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-16">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Chuyên đề
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton exportbutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-col ">
                        <div className="flex flex-row justify-between items-center mb-12">
                            <div className="mr-16 inline-block">
                                <InputDropDown
                                    widthDrop={"100px"}
                                    list={listBlock}
                                    chooseAction={this.chooseBlockScholl}
                                    title="Chọn bộ lọc" />
                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-row items-center color_grey bg-white px-12 py-2 rounded-lg shadow-sm mr-16">
                                    <Icon>search</Icon>
                                    <InputBase
                                        className="color_grey ml-12 text-xs"
                                        placeholder="Tìm kiếm đề thi"
                                    />
                                </div>
                                <Button className="btn_add mr-0">
                                    <img src="assets/images/icons/ic_add.png" className="icon_add" />
                                </Button>
                            </div>
                        </div>
                        <div className="mr-16 inline-flex">
                            <InputDropDown
                                widthDrop={"100px"}
                                list={listBlock}
                                chooseAction={this.chooseBlockScholl}
                                title="Hiển thị" />
                        </div>
                    </div>

                </FuseAnimate>
                {data.length > 0 &&
                    <ReactTable
                        data={data}
                        columns={column}
                        defaultPageSize={5}
                        // TdComponent ={this.customTdComponent}
                        // SubComponent={row => {
                        //     return (
                        //       <div>
                        //         You can put any component you want here, even another React Table! You
                        //         even have access to the row-level data if you need! Spark-charts,
                        //         drill-throughs, infographics... the possibilities are endless!
                        //       </div>
                        //     )
                        //   }}
                        className="-striped -highlight mt-20"
                    />
                }

            </div>
        )
    }

    // customTdComponent = (props) => {
    //     console.log("props table")
    //     console.log(props)
    //     return <Button
    //         // onClick={this.clickItem(props)}
    //         className='rt-tr-group p-0 text_button_base'
    //         style={{ fontWeight: "unset" }}>
    //         {props.children}
    //     </Button>;
    // }
    chooseBlockScholl = (item) => () => {

    }
    chooseClass = (item) => () => {

    }
    chooseSubject = (item) => () => {

    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.login.user.user,
        schools: state.auth.login.user.schools[0],
    }
}
export default connect(mapStateToProps, null)(TopicList)