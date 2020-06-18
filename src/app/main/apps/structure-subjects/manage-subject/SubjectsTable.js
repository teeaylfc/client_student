import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import SubjectsTableHead from "./SubjectsTableHead";
import {helpers, RIGHT_ID_SUBJECT, RIGHT_ACT_DELETE, RIGHT_ACT_UPDATE} from "../../../../../common/Constants"

class SubjectsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.groupSubjectsData,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        console.log('data Classes', this.props.user);
        this.props.getAllSubjectBySchool(this.props.user._id);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.groupSubjectsData, prevProps.groupSubjectsData) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
        (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field)))
        {
            const data = this.getFilteredArray(this.props.groupSubjectsData, this.props.searchText, this.props.field);
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
        this.props.history.push('/subject/' + item._id);
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

    deleteSubject = event => {
        console.log("event", event);

        this.props.deleteSubject(event._id, this.props.user.schools[0].id, this.props.history);
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

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
                            rowCount={data.length}
                        />

                        <TableBody>
                            {_.orderBy(data, [
                                (o) => {
                                    switch ( orderBy )
                                    {
                                        case 'idGroup':
                                        {
                                            return o.idGroup[0];
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
                                    const isSelected = this.isSelected(n.nameSubject);
                                    return (
                                        <TableRow
                                            className="h-54 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.nameSubject}
                                            selected={isSelected}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, n.nameSubject)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.nameSubject}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.noOfLessonRequired}
                                            </TableCell>
                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.semester}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_SUBJECT, RIGHT_ACT_UPDATE)}} className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_SUBJECT, RIGHT_ACT_DELETE)}} className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa môn học')) this.deleteSubject(n)}}>remove_circle</Icon>
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
        getAllSubject: Actions.getAllSubject,
        deleteSubject : Actions.deleteSubject,
        getAllSubjectBySchool: Actions.getAllSubjectBySchool
    }, dispatch);
}

function mapStateToProps({subjectApp, auth})
{
    return {
        field  : subjectApp.subjects.field,
        groupSubjectsData  : subjectApp.subjects.subjectsData,
        searchText: subjectApp.subjects.searchText,
        user : auth.login.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubjectsTable));
