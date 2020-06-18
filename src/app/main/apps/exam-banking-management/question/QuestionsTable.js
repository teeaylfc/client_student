import React, { Component } from 'react';
import { Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import ProductsTableHead from './QuestionsTableHead';
import * as Actions from '../store/actions';
import { helpers, RIGHT_ID_QUESTION, RIGHT_ACT_DELETE, RIGHT_ACT_UPDATE } from "../../../../../common/Constants"

class QuestionsTable extends Component {

    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.questions,
        total: this.props.total,
        page: 0,
        rowsPerPage: 10,
        questionTypeListing: [
            {
                value: "SINGLE_CHOICE",
                label: "Trắc nghiệm 1 đáp án"
            },
            {
                value: "MATCHING_IMAGE",
                label: "Nối từ với hình ảnh"
            },
            {
                value: "MATCHING",
                label: "Nối câu"
            },
            {
                value: "MULTI_CHOICE",
                label: "Trắc nghiệm nhiều đáp án"
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
        questionPackListing: [
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
        ]
    };

    componentDidMount() {
        this.props.getAllQuestion(this.state.page, this.state.rowsPerPage, this.props.user._id);
        this.props.getAllSubjectBySchool(this.props.user._id);
        // this.props.getQuestionsPackBySchoolId(this.props.user._id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.questions, prevProps.questions) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
            (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field))) {
            const data = this.getFilteredArray(this.props.questions, this.props.searchText, this.props.field);
            this.setState({ data })
        }
        if (!_.isEqual(this.props.total, prevProps.total)) {
            this.setState({ total: this.props.total })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subjects.subjectsData.length != 0) {
            let subjects = nextProps.subjects.subjectsData.map(subjectData => ({ value: subjectData.subjectId, label: subjectData.subjectName }))
            subjects = [{ value: "", label: "--Chọn--" }, ...subjects];
            this.setState({ subjectListing: subjects })
        }
        if (nextProps.questionPack && nextProps.questionsPacks.length != 0) {
            let subjects = nextProps.questionsPacks.map(subjectData => ({ value: subjectData._id, label: subjectData.name }))
            subjects = [{ value: "", label: "--Chọn--" }, ...subjects];
            this.setState({ questionPackListing: subjects })
        }

    }

    getFilteredArray = (data, searchText, field) => {
        if (searchText.length === 0 || field.length === 0) {
            return data;
        }
        return _.filter(data, item => {
            let s = item[field]
            if (field === "subject") {
                s = this.getSubjectDescription(item.subject)
            } else if (field === "questionType") {
                s = this.getQuestionDescription(item.questionType)
            } else if (field === "questionsPack") {
                s = this.getQuestionPack(item.questionsPack)
            }
            return s.toLowerCase().includes(searchText.toLowerCase())
        });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (item) => {
        this.props.history.push('/question/' + item._id);
    };

    deleteQuestion = item => {
        this.props.deleteQuestion(item._id, this.props.history);
    };

    handleCheck = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
        this.props.getAllQuestion(page, this.state.rowsPerPage, this.props.user._id);
    };

    handleChangeRowsPerPage = event => {
        const rowsPerPage = event.target.value;
        this.setState({ rowsPerPage: rowsPerPage });
        this.props.getAllQuestion(this.state.page, rowsPerPage, this.props.user._id);
    };

    getQuestionDescription = (questionType) => {
        let questionArray = this.state.questionTypeListing.find(item => item.value === questionType);
        if (questionArray) {
            return questionArray.label;
        } else {
            return questionType;
        }
    };

    getSubjectDescription = (subjectName) => {
        let subjectArray = this.state.subjectListing.find(item => item.value === subjectName);
        if (subjectArray) {
            return subjectArray.label;
        } else {
            return subjectName;
        }
    };

    getQuestionPack = (questionPackId) => {
        let questionPack = this.state.questionPackListing.find(item => item.value === questionPackId);
        if (questionPack) {
            return questionPack.label;
        } else {
            return questionPackId;
        }
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { order, orderBy, selected, rowsPerPage, page, data, total } = this.state;
        console.log(data);
        console.log(total);
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ProductsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={total}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch (orderBy) {
                                        case 'categories':
                                            {
                                                return o.categories[0];
                                            }
                                        default:
                                            {
                                                return o[orderBy];
                                            }
                                    }
                                }
                            ], [order])
                                .map(n => {
                                    const isSelected = this.isSelected(n._id);
                                    return (
                                        <TableRow
                                            className="h-54 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n._id}
                                            selected={isSelected}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, n._id)}
                                                />
                                            </TableCell>

                                            <TableCell className="w-52" component="th" scope="row" padding="none">
                                                {this.getSubjectDescription(n.subject)}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.classRoom}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {this.getQuestionDescription(n.questionType)}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.topic}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {this.getQuestionPack(n.questionsPack)}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.questionString}
                                            </TableCell>

                                            {/* <TableCell component="th" scope="row" align="right">
                                                {n.answerList}
                                            </TableCell> */}

                                            <TableCell component="th" scope="row" align="right">
                                                <Icon style={{ display: helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_QUESTION, RIGHT_ACT_UPDATE) }} className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon style={{ display: helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_QUESTION, RIGHT_ACT_DELETE) }} className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa câu hỏi')) this.deleteQuestion(n) }}>remove_circle</Icon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars> /}

                <TablePagination
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllQuestion: Actions.getAllQuestion,
        deleteQuestion: Actions.deleteQuestion,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool,
        getQuestionsPackBySchoolId: Actions.getQuestionsPackBySchoolId,
    }, dispatch);
}

function mapStateToProps({ questionApp, auth }) {
    return {
        field: questionApp.question.field,
        questions: questionApp.question.questions,
        total: questionApp.question.total,
        searchText: questionApp.question.searchText,
        subjects: questionApp.subjects,
        user: auth.login.user,
        questionsPacks: questionApp.questionsPack.questionsPacks,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionsTable));
