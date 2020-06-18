import React, {Component} from 'react';
import {Checkbox, Icon, Table, TableBody, TableCell, TablePagination, TableRow} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import ExamDefineListTableHead from "./ExamDefineListTableHead";
import {helpers, RIGHT_ID_EXAMINATION, RIGHT_ACT_DELETE, RIGHT_ACT_UPDATE} from "../../../../../common/Constants"

class ExamDefineListTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.examDefineData,
        total      : this.props.total,
        page       : 0,
        rowsPerPage: 10,
        subjectListing : [],
        isPrivateExamListing : [
            {
                value: "",
                label: "--Chọn--"
            },
            {
                value: false,
                label: "Công khai"
            },
            {
                value: true,
                label: "Riêng tư"
            },
        ]
    };

    componentDidMount()
    {
        console.log(this.props.user);
        if (this.props.user && this.props.user.schools && this.props.user.schools.length > 0) {
            this.props.getAllExamDefine(this.state.page, this.state.rowsPerPage, this.props.user.schools[0].id);
            this.props.getAllSubjectBySchool(this.props.user.schools[0].id);
            this.props.getQuestionsPackBySchoolId(this.props.user.schools[0].id);
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.examDefineData, prevProps.examDefineData) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
        (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field)))
        {
            const data = this.getFilteredArray(this.props.examDefineData, this.props.searchText, this.props.field);
            this.setState({data})
        }
        if ( this.props.total > 0 && !_.isEqual(this.props.total, prevProps.total) )
        {
            this.setState({ total: this.props.total})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.subjects.subjectsData.length != 0) {
            let subjects = nextProps.subjects.subjectsData.map(subjectData => ({ value: subjectData.subjectId, label: subjectData.subjectName }))
            subjects = [{value: "", label: "--Chọn--"}, ...subjects];
            this.setState({subjectListing: subjects})
        }

        if(nextProps.questionsPacks.length != 0) {
            let subjects = nextProps.questionsPacks.map(subjectData => ({ value: subjectData._id, label: subjectData.name }))
            subjects = [{value: "", label: "--Chọn--"}, ...subjects];
            this.setState({questionPackListing: subjects})
        }
    };

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
        this.props.history.push('/examDefine/' + item.idExamDefine);
    };

    deleteExamDefine = item => {
        const schoolId = this.props.user.schools[0].id;
        this.props.deleteExamDefine(item._id, schoolId, this.state.page, this.state.rowsPerPage, this.props.history);
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
        this.setState({page : page});
        this.props.getAllExamDefine(page, this.state.rowsPerPage, this.props.user.schools[0].id);
    };

    handleChangeRowsPerPage = event => {
        const rowsPerPage = event.target.value;
        this.setState({rowsPerPage: rowsPerPage});
        this.props.getAllExamDefine(this.state.page, rowsPerPage, this.props.user.schools[0].id);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getSubjectDescription = (subjectName) => {
        let subjectArray = this.state.subjectListing.find(item => item.value === subjectName);
        if (subjectArray) {
            return subjectArray.label;
        } else {
            return subjectArray;
        }
    }

    getQuestionPack = (questionPackId) => {
        let questionPack = this.state.questionPackListing.find(item => item.value === questionPackId);
        if  (questionPack) {
            return questionPack.label;
        } else {
            return questionPackId;
        }
    };

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data, total} = this.state;
        console.log(data);
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ExamDefineListTableHead
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
                                    switch ( orderBy )
                                    {
                                        case 'idExamDefine':
                                        {
                                            return o.idExamDefine[0];
                                        }
                                        default:
                                        {
                                            return o[orderBy];
                                        }
                                    }
                                }
                            ], [order])
                                .map(n => {
                                    const isSelected = this.isSelected(n.idExamDefine);
                                    return (
                                        <TableRow
                                            className="h-54 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.idExamDefine}
                                            selected={isSelected}
                                        >
                                            <TableCell className="w-30 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, n.idExamDefine)}
                                                />
                                            </TableCell>

                                            {/*<TableCell component="th" scope="row" padding="none" align="left" className="w-30">
                                                {n.images.length > 0 ? (
                                                    <img className="w-full block rounded" src={_.find(n.images, {id: n.featuredImageId}).url} alt={n.name}/>
                                                ) : (
                                                    <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={n.name}/>
                                                )}
                                                {n.index}
                                            </TableCell>*/}

                                            <TableCell component="th" scope="row">
                                                {n.idExamDefine}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.nameExam}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {this.getSubjectDescription(n.subject)}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.degreeNumber}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.nameClass}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.typeTime}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.isOnlineExam}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.isPrivateExam ? "Riêng tư" : "Công khai"}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.level}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_EXAMINATION, RIGHT_ACT_UPDATE)}} className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_EXAMINATION, RIGHT_ACT_DELETE)}} className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa đề thi')) this.deleteExamDefine(n)}}>remove_circle</Icon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

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

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAllExamDefine: Actions.getAllExamDefine,
        deleteExamDefine: Actions.deleteExamDefine,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool,
        getQuestionsPackBySchoolId: Actions.getQuestionsPackBySchoolId,
    }, dispatch);
}

function mapStateToProps({examDefineApp, auth})
{
    return {
        field  : examDefineApp.examDefines.field,
        examDefineData  : examDefineApp.examDefines.examDefineData,
        total  : examDefineApp.examDefines.total,
        searchText: examDefineApp.topics.searchText,
        subjects: examDefineApp.subjects,
        user : auth.login.user,
        questionsPacks: examDefineApp.questionsPack.questionsPacks,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExamDefineListTable));
