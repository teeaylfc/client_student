 import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import ProductsTableHead from './SchoolsTableHead';
import * as Actions from '../store/actions';

class SchoolsTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.schools,
        userId     : this.props.user.userId,
        typeUser   : this.props.role.type_user,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        const userId = this.props.user.userId;
        const typeUser = this.props.role.type_user;
        if( userId === 'ssAdmin' || typeUser ==='S') {
            this.props.getAllSchool();
        } else {
            this.props.getSchoolByUser(this.props.user.email)
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.schools, prevProps.schools) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
        (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field)))
        {
            const data = this.getFilteredArray(this.props.schools, this.props.searchText, this.props.field);
            const user = this.props.user;
            this.setState({data :data, user : user});
        }
    }

    getFilteredArray = (data, searchText, field) => {
        console.log("data, searchText, field", data, searchText, field);
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
        this.props.history.push('/school/' + item.id);
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

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    deleteSchool = event => {
        console.log("event", event);
        this.props.removeSchool(event.id, this.props.history);
    }

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data, userId, typeUser} = this.state;
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

                                            <TableCell  component="th" scope="row" padding="none">
                                                <div className="school-logo">
                                                    <img className="logo"
                                                        src={n.logo ? n.logo : "assets/images/avatars/profile.jpg"}
                                                    />
                                                </div>
                                            </TableCell>

                                            <TableCell  component="th" scope="row" padding="none">
                                                {n.id}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="left">
                                                {n.degreeNumber}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="left">
                                                {n.type}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="left">
                                                {n.address && (
                                                    <p><span className="font-600">Địa chỉ:</span> {n.address}</p>
                                                )}
                                                {n.website && (
                                                    <p><span className="font-600">Website:</span> {n.website}</p>
                                                )}
                                                {n.phone && (
                                                    <p><span className="font-600">Phone:</span> {n.phone}</p>
                                                )}
                                                {n.fax && (
                                                    <p><span className="font-600">Fax:</span> {n.fax}</p>
                                                )}
                                                {n.email&& (
                                                    <p><span className="font-600">Email:</span> {n.email}</p>
                                                )}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="left">
                                                <div className="school-background-box">
                                                    <img className="background"
                                                        src={n.background ? n.background : "assets/images/avatars/profile.jpg"}
                                                    />
                                                </div>
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right" >
                                                <Icon className="text-green text-20" onClick={event => this.handleClick(n)} >check_circle</Icon>
                                                {userId === 'ssAdmin' || typeUser == 'S' ?
                                                    <div>
                                                        <Icon className="text-red text-20" onClick={() => {
                                                            if (window.confirm('Bạn có chắc chắn xóa trường học')) this.deleteSchool(n)
                                                        }}>
                                                            remove_circle
                                                        </Icon>
                                                    </div> : null}

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
        getAllSchool: Actions.getAllSchool,
        getSchoolByUser : Actions.getSchoolByUser,
        removeSchool: Actions.removeSchool
    }, dispatch);
}

function mapStateToProps({schoolApp, auth})
{
    return {
        field  : schoolApp.school.field,
        schools  : schoolApp.school.schools,
        searchText: schoolApp.school.searchText,
        user : auth.login.user.user,
        role : auth.login.user.role
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SchoolsTable));
