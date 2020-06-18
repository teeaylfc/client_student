import React, {Component} from 'react';
import {Table, TableBody, TableCell, TablePagination, TableRow} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import StudentPointTableHead from "./StudentPointTableHead";
import {FuseChipSelect} from '@fuse';

class StudentPointTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.statisticPoint,
        page       : 0,
        rowsPerPage: 10,
        filters : [],
        subjectListing : [],
        filterValue : this.props.statisticPoint &&  this.props.statisticPoint.length > 0 ? this.props.statisticPoint[0].semester + '|' + this.props.statisticPoint[0].schoolYear : ''
    };

    async componentDidMount() {
        const schoolId = this.props.schoolId;
        const studentId = this.props.studentId;
        await this.props.getFilter(studentId, schoolId);
        await this.props.getStudentPoint(this.state.page, this.state.rowsPerPage, studentId, schoolId, null, null);
        this.props.getAllSubjectBySchool(this.props.user._id);


    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.statisticPoint, prevProps.statisticPoint) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.statisticPoint, this.props.searchText);
            this.setState({data})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.statisticPoint && nextProps.statisticPoint && nextProps.statisticPoint.length > 0) {
            const filterV = nextProps.statisticPoint[0].semester + '|' + nextProps.statisticPoint[0].schoolYear;
            this.setState({filterValue: filterV})
        }

        if(nextProps.subjects.subjectsData.length != 0) {
            let subjects = nextProps.subjects.subjectsData.map(subjectData => ({ value: subjectData.subjectId, label: subjectData.subjectName }))
            subjects = [{value: "", label: "--Chọn--"}, ...subjects];
            this.setState({subjectListing: subjects})
        }

        if(nextProps.filter && nextProps.filter.length > 0) {
            let filters = nextProps.filter.map(data => ({ value: (data._id.semester + '|' + data._id.schoolYear), label: ('HK ' +data._id.semester + ' Năm học ' + data._id.schoolYear)}));
            this.setState({filters: filters})
        }

    }

    getSubjectDescription = (subjectName) => {
        let subjectArray = this.state.subjectListing.find(item => item.value === subjectName);
        if (subjectArray) {
            return subjectArray.label;
        } else {
            return subjectArray;
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => item.groupSubjectName.toLowerCase().includes(searchText.toLowerCase()));
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

    handleChipChange = (value, name) => {
        const schoolId = this.props.schoolId;
        const studentId = this.props.studentId;
        this.setState({filterValue: value.value});

        const filter = value.value.split("|");
        this.props.getStudentPoint(this.state.page, this.state.rowsPerPage, studentId, schoolId, filter[0], filter[1]);

    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data, filterValue} = this.state;

        return (
            <div className="w-full flex flex-col">

                 <div>
                        <FuseChipSelect
                            className="mt-8 mb-16 mr-8 w-1/2"
                            value={this.state.filters.filter(type => type.value === filterValue)}
                            onChange={(value) => this.handleChipChange(value, 'filterVale')}
                            placeholder="--Chọn--"
                            textFieldProps={{
                                label          : '',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant        : 'standard'
                            }}
                            options={this.state.filters}
                            isMulti={false}
                        />
                    </div>

                <FuseScrollbars className="flex-grow overflow-x-auto">
                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <StudentPointTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data? data.length : 0}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
                                        case 'id':
                                        {
                                            return o.id[0];
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
                                    const isSelected = this.isSelected(n.id);
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

                                            <TableCell className="w-52" component="th" scope="row" >
                                                {this.getSubjectDescription(n.subjectId)}
                                            </TableCell>

                                            <TableCell className="w-52" component="th" scope="row" >
                                                {n.pointQuiz}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.point15MinutesOnline}
                                            </TableCell>

                                            <TableCell className="th" component="th" scope="row">
                                                {n.point45MinutesOnline}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.pointSemesterOnline}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.point15Minutes}
                                            </TableCell>

                                            <TableCell className="th" component="th" scope="row">
                                                {n.point45Minutes}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.pointSemester}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.pointGPA}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.note}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data? data.length: 0}
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
        getSchemeAndSchoolYear :Actions.getSemesterAndSchoolYearForStudent,
        getStudentPoint : Actions.getAllPointForStudent,
        getFilter : Actions.getSemesterAndSchoolYearForStudent,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool,

    }, dispatch);
}

function mapStateToProps({studentsApp, auth})
{
    return {
        statisticPoint  : studentsApp.student.statisticPoint.data,
        filter: studentsApp.student.filter.data,
        searchText: studentsApp.student.searchText,
        subjects: studentsApp.subjects,
        user : auth.login.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentPointTable));
