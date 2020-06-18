import React, { Component } from 'react'
import { Button, Icon } from '@material-ui/core'
import HeaderButton from '../../../common/HeaderButton'
import InputDropDown from '../../../common/InputDropDown'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import ReactTable from 'react-table';
import { FuseAnimate } from '@fuse';
import dataService from '../../services/dataService';

const listBlock = [
    "10",
    "11",
    "12"
]

const column = [
    {
        Header: '',
        accessor: "stt"
    },
    {
        Header: 'Môn học',
        accessor: "subject"
    },
    {
        Header: 'Khối học',
        accessor: "classRoom"
    },
    {
        Header: 'Dạng câu hỏi',
        accessor: "questionType"
    },
    {
        Header: 'Chuyên đề',
        accessor: "topic"
    },
    {
        Header: 'Gói câu hỏi',
        accessor: "questionsPack"
    },
    {
        Header: 'Câu hỏi',
        accessor: "questionString"
    },
    {
        Header: 'Các đáp án',
        accessor: "answer"
    },
    {
        Header: 'Đáp án đúng',
        accessor: "trueAnswer"
    },
    {
        Header: 'Trạng thái',
        accessor: "status"
    },
]

export default class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [

            ]
        }
    }
    componentDidMount() {
        dataService.getQuestionList()
            .then(res => {
                var list = res.data
                 list.forEach((item, i) => {
                    item.stt = i + 1
                    item.answerList.forEach((answer, k) => {
                        if (answer.checked) {
                            item.trueAnswer = answer.answerValue
                            item.trueIndex = k
                            return item
                        }
                    });
                    return item
                })
                this.setState({
                    data: list
                })

            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { data } = this.state
        return (
            <div className="div_container">
                <div className="flex flex-row w-full justify-between mb-12">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <h2 className="font-bold color_title">
                            Câu hỏi
                </h2>
                    </FuseAnimate>

                    <HeaderButton addbutton exportbutton />
                </div>
                <FuseAnimate animation="transition.expandIn" delay={300}>

                    <div className="mr-16 inline-block">
                        <InputDropDown
                            widthDrop={"100px"}
                            list={listBlock}
                            chooseAction={this.chooseBlockScholl}
                            title="Chọn bộ lọc" />
                    </div>

                </FuseAnimate>
                { data.length >0 && 
                    <ReactTable 
                        data={data}
                        columns={column}
                        defaultPageSize={5}
                        className="-striped -highlight mt-20"
                    />
                }

            </div>
        )
    }
    chooseBlockScholl = (item) => () => {

    }
    chooseClass = (item) => () => {

    }
    chooseSubject = (item) => () => {

    }
}
