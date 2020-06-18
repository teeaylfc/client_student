import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import StudentsTableHead from './StudentsTableHead';
import * as Actions from '../store/actions/students.actions';
import {helpers, RIGHT_ID_STUDENT, RIGHT_ACT_DELETE, RIGHT_ACT_UPDATE} from "../../../../../common/Constants"

class StudentsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.students,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        const idSchool = this.props.user._id;
        console.log('idSchool', idSchool);
        if(idSchool != null) {
            this.props.getStudentBySchoolId(idSchool);
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.students, prevProps.students) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
        (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field)))
        {
            const data = this.getFilteredArray(this.props.students, this.props.searchText, this.props.field);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText, field) => {
        if ( searchText.length === 0 || field.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => item[field].toLowerCase().includes(searchText.toLowerCase()));
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
        this.props.history.push('/students/'+ item._id);
    };

    deleteStudent = event => {
        console.log("event", event);
        const idSchool = this.props.user._id
        this.props.removeStudent(event._id, idSchool, this.props.history);
    }

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

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <StudentsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data ? data.length : 0}
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
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, n.id)}
                                                />
                                            </TableCell>

                                            <TableCell className="w-52" component="th" scope="row" >
                                                {n.id}
                                            </TableCell>

                                            <TableCell className="w-52" component="th" scope="row" >
                                                {n.userName}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>

                                            <TableCell className="th" component="th" scope="row">
                                                {n.birthday}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.gender}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.mobile}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_STUDENT, RIGHT_ACT_UPDATE)}} className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_STUDENT, RIGHT_ACT_DELETE)}} className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa học sinh')) this.deleteStudent(n)}}>remove_circle</Icon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data ? data.length : 0}
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
        getStudents: Actions.getAllStudent,
        getStudentBySchoolId: Actions.getStudentBySchoolId,
        removeStudent : Actions.removeStudent,
    }, dispatch);
}

function mapStateToProps({studentsApp, auth})
{
    return {
        field  : studentsApp.student.field,
        students  : studentsApp.student.students,
        searchText: studentsApp.student.searchText,
        user : auth.login.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentsTable));
