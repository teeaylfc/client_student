import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import SubjectsTableHead from "./EnterPointsTableHead";

class EnterPointsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.enterPointData.data,
        total      : this.props.enterPointData.total,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        console.log('userId', this.props.user);

        this.props.getAllEnterPoint(this.props.user.schools[0].id, this.props.user.user.userId, this.state.page, this.state.rowsPerPage);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.enterPointData.data, prevProps.enterPointData.data) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.enterPointData.data, this.props.searchText);
            const total = this.props.enterPointData.total;
            this.setState({data: data, total : total})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => item.name.toLowerCase().includes(searchText.toLowerCase()));
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
        if(item.enterPointData[0]) {
            this.props.history.push('/enterPoint/' +item._id  + '/' + item.enterPointData[0]._id);
        } else {
            this.props.history.push('/enterPoint/' + item._id + '/new');
        }
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
        this.props.getAllEnterPoint(this.props.user.schools[0].id, this.props.user.user.userId, page, this.state.rowsPerPage);
    };

    handleChangeRowsPerPage = event => {
        const rowsPerPage = event.target.value;
        this.setState({rowsPerPage: rowsPerPage});
        this.props.getAllEnterPoint(this.props.user.schools[0].id, this.props.user.user.userId, this.state.page, rowsPerPage);
    };

    deleteSubject = event => {
        console.log("event", event);

        this.props.deleteSubject(event.idGroup, this.props.user.schools[0].id, this.props.history);
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data, total} = this.state;
        console.log('page index', page);
        console.log('page size', rowsPerPage);
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <SubjectsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={total ? total : 0}
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
                                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    const point = n.enterPointData[0];
                                    console.log("point", point);
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
                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>

                                            <TableCell className="th" component="th" scope="row">
                                                {n.birthday}
                                            </TableCell>
                                            <TableCell className="w-52" component="th" scope="row" >
                                                {point && point.pointQuiz ? point.pointQuiz : ""}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {point && point.point15MinutesOnline ? point.point15MinutesOnline : ""}
                                            </TableCell>

                                            <TableCell className="th" component="th" scope="row">
                                                {point && point.point45MinutesOnline ? point.point45MinutesOnline : ""}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {point && point.pointSemesterOnline ? point.pointSemesterOnline : ""}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {point && point.point15Minutes ? point.point15Minutes : ""}
                                            </TableCell>

                                            <TableCell className="th" component="th" scope="row">
                                                {point && point.point45Minutes ? point.point45Minutes : ""}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {point && point.pointSemester ? point.pointSemester : ""}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {point && point.pointGPA ? point.pointGPA : ""}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                <Icon className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa lớp học')) this.deleteSubject(n)}}>remove_circle</Icon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={total ? total : 0}
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
        deleteSubject : Actions.deleteSubject,
        getAllEnterPoint : Actions.getAllEnterPoint
    }, dispatch);
}

function mapStateToProps({enterPointApp, auth})
{
    return {
        enterPointData  : enterPointApp.enterPointReducer.enterPointData,
        searchText: enterPointApp.subjects.searchText,
        user : auth.login.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnterPointsTable));
