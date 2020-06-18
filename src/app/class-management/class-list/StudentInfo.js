import React, { Component } from 'react'
import { FuseAnimate } from '@fuse';
import ReactTable from 'react-table';
import { List, Button } from '@material-ui/core';
import ItemNotification from '../../../common/ItemNotification';
import { useHistory  } from "react-router-dom";
import dataService from '../../services/dataService';
import { formatDate } from '../../utils/datetime';
const column = [
    {
        Header: 'Bài thi',
        accessor: "name"
    },
    {
        Header: 'Điểm',
        accessor: "degreeNumber"
    },
    {
        Header: 'Thời gian hoàn thành',
        accessor: "typeTime"
    },
    {
        Header: 'Môn học',
        accessor: "subjectName"
    },
    {
        Header: 'Ngày hoàn thành',
        accessor: "endTime"
    },
]
export default class StudentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            diary: [
                {
                    body: "Nội dung nhật kí học sinh đã làm những bài kiểm tra",
                    // time: ""
                },
                {
                    body: "Nội dung nhật kí học sinh đã làm những bài kiểm tra",
                    // time: ""
                },
                {
                    body: "Nội dung nhật kí học sinh đã làm những bài kiểm tra",
                    // time: ""
                },
            ]
        }
    }
    componentDidMount(){
       this.getData()
    }
    getData (){
        dataService.getStudentPointLog(this.props.location.state.idStudent).then ( res => {
            console.log(res);
           var list = [...res.data]
           list.map((item,index) => {
               item.name = `Bài kiểm tra ${item.typeTime} phút`
               item.endTime = formatDate(item.endTime)
           })
           this.setState({
               history : list
           })
        }).catch(err => {
            console.log(err.response.data)
            this.props.showMessage({ message: err.response.data.message ? err.response.data.message : "Lỗi" })
        }) 
    }
    render() {
        const { history, diary } = this.state
        return (
            <div className="div_container">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <h2 className="font-bold color_title">
                        Thông tin học sinh
                </h2>
                </FuseAnimate>
                <ReactTable
                    data={history}
                    columns={column}
                    defaultPageSize={5}
                    className="-striped -highlight mt-20 mb-32"
                // TrGroupComponent={this.customTrGroupComponent}
                />
                <h4 className="font-bold mb-12">
                    Nhật ký học sinh
            </h4>
                <div className="bg-white w-full rounded mb-24">
                    <List className="list-noti" component="nav" aria-label="main mailbox folders">
                        {
                            diary.map((item, i) => <ItemNotification item={item} />)
                        }
                    </List>
                </div>
                <div className="flex flex-row w-full justify-between mt-24">
                    <Button
                        // onClick={this.enableDialog(false)}
                        variant="contained"
                        className="flex py-12 px-16 gradient_red items-center justify-center text-white mr-40">
                        <h2 className="text_button_base">Xóa</h2>
                    </Button>
                    <Button
                        // onClick={this.enableDialog(false)}
                        variant="contained"
                        className="flex  py-12 px-16 items-center justify-center gradient_blue text-white">
                        <h2 className="text_button_base">Cập nhật</h2>
                    </Button>
                </div>
            </div >
        )
    }
}
