import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import ProductsTableHead from './QuestionsPacksTableHead';
import * as Actions from '../store/actions';
import {helpers, RIGHT_ID_QUESTIONPACK, RIGHT_ACT_DELETE, RIGHT_ACT_UPDATE} from "../../../../../common/Constants"

class QuestionsPacksTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.questionsPacks,
        page       : 0,
        rowsPerPage: 10,
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
    };

    componentDidMount()
    {
        const schoolId = this.props.user._id;
        const userId = this.props.user.user.userId;
        this.props.getQuestionsPackBySchoolId(schoolId, userId);
        this.props.getAllSubjectBySchool(schoolId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.subjects.subjectsData.length !== 0) {
            let subjects = nextProps.subjects.subjectsData.map(subjectData => ({
                value: subjectData.subjectId,
                label: subjectData.subjectName
            }));
            subjects = [{value: "", label: "--Chọn--"}, ...subjects];
            this.setState({subjectListing: subjects})
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.questionsPacks, prevProps.questionsPacks) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
        (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field)))
        {
            const data = this.getFilteredArray(this.props.questionsPacks, this.props.searchText, this.props.field);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText, field) => {
        if ( searchText.length === 0 || field.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => {
            let s = item[field]
            if (field === "subject") {
                s = this.getSubjectDescription(item.subject)
            }
            return s.toLowerCase().includes(searchText.toLowerCase())
        });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push('/questionsPack/' + item._id);
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    deleteQuestionPack = event => {
        const schoolId = this.props.user._id;
        this.props.removeQuestionPack(event.name, schoolId, this.props.history);
    }

    getSubjectDescription = (subjectName) => {
        let subjectArray = this.state.subjectListing.find(item => item.value === subjectName);
        if  (subjectArray) {
            return subjectArray.label;
        } else {
            return subjectName;
        }
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

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
                            rowCount={data.length}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
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
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                {n.questionsPackId}
                                            </TableCell>

                                            <TableCell className="w-52" component="th" scope="row" padding="none">
                                                {n.schoolYear}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.classRoom}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {this.getSubjectDescription(n.subject)}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.section}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.name}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.description}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_QUESTIONPACK, RIGHT_ACT_UPDATE)}}  className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_QUESTIONPACK, RIGHT_ACT_DELETE)}} className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn muốn xóa gói câu hỏi?')) this.deleteQuestionPack(n)}}>remove_circle</Icon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.length}
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

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAllQuestionsPack: Actions.getAllQuestionsPack,
        removeQuestionPack : Actions.removeQuestionPack,
        getQuestionsPackBySchoolId : Actions.getQuestionsPackBySchoolId,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool,
    }, dispatch);
}

function mapStateToProps({questionsPackApp, auth})
{
    return {
        field  : questionsPackApp.questionsPack.field,
        questionsPacks  : questionsPackApp.questionsPack.questionsPacks,
        searchText: questionsPackApp.questionsPack.searchText,
        subjects: questionsPackApp.subjects,
        user : auth.login.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionsPacksTable));
