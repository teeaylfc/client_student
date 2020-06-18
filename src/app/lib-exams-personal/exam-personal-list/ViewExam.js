import React, { Component } from 'react'
import { Button, Icon, InputBase, Checkbox, Link, Fab } from '@material-ui/core'
import { FuseAnimate } from '@fuse';
import dataService from '../../services/dataService';
import { connect } from 'react-redux'
import ItemQuestion from '../../lib-exams-personal/create-exams/create-exam-step/ItemQuestion';
import { formatDate } from '../../utils/datetime';

const ItemInfo = (props) => <div className="flex flex-1 items-center flex-row">
    {props.title && <div className="item-dot-white" />}
    {props.title && <h5 className="font-bold text-white">{`${props.title} ${props.value}`}</h5>}
</div>

class ViewExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemPack : {} ,
            listQuestion: [],
            loading: true,
            open: false,
            tab: 0,
            classCode: "",
            total: "",
            schoolYear: "",
            className: "",
        }
    }
  
    componentDidMount() {
        // console.log("this.props.loadQuestionPackDetail")
        // console.log(this.props.loadQuestionPackDetail)
        this.getDetailQuestionPack()
    }
    getDetailQuestionPack() {
        var id = this.props.location.state.id
        console.log(id);
        dataService.getDetailExamDefine(id)
            .then(res => {
                console.log(res);
                this.setState({
                    itemPack : res,
                    listQuestion : res.questionList
                })
            })
    }

    render() {
        const {listQuestion, itemPack } = this.state
        console.log("item.name")
        return (
            <div className="div_container">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <div className="flex flex-row w-full justify-between mb-12">
                        <h2 className="font-bold color_title">
                            {itemPack.nameExam}
                        </h2>
                        {/* <div className="flex flex-row">
                            <Button onClick={this.onCreateQuestion} className="btn_add">
                                <img src="assets/images/icons/ic_add.png" className="icon_add" />
                            </Button>
                            <Button onClick={this.onCreate} className="btn_import_export">
                                <img src="assets/images/icons/ic_bin.png" className="icon_add" />
                            </Button>
                            <Button onClick={this.onCreate} className="btn_import_export">
                                <img src="assets/images/icons/ic_share.png" className="icon_add" />
                            </Button>
                            <Button onClick={this.onCreate} className="btn_import_export">
                                <img src="assets/images/icons/ic_print.png" className="icon_add" />
                            </Button>
                            <Button className="btn_menu">
                                <img src="assets/images/icons/ic_menu.png" className="icon_add" />
                            </Button>
                        </div> */}
                    </div>
                </FuseAnimate>

                <div className="header-blue mt-24 mb-24">
                    <div className="flex flex-row w-full mb-24">
                        <ItemInfo title="Tên bộ câu hỏi: " value={itemPack.nameExam} />
                        <ItemInfo title="Thời gian: " value={` ${itemPack.typeTime} phút `}/>
                        <ItemInfo title="Ngày khởi tạo: " value={formatDate(itemPack.createDate)} />
                    </div>
                    <div className="flex flex-row w-full">
                        <ItemInfo title="Môn: " value={itemPack.subjectName} />
                        <ItemInfo title="Số câu: " value={itemPack.countQuestion} />
                        <ItemInfo />
                    </div>
                </div>
                {listQuestion.length > 0 ? listQuestion.map((obj, index) =>
                    <ItemQuestion key={index} obj={obj} index={index} disableNote = {true}/>
                ) : <div className="flex-1 items-center flex justify-center">
                        <h3 >Không có câu hỏi nào</h3>
                    </div>}
            </div >
        )
    }
    onCreate = () => {
    }
    onCreateQuestion = () => {
        var item = this.props.location.state.item
        this.props.history.push({
            pathname: '/createQuestion',
            state: {
                item: item
            }
        })
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.login.user.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewExam)