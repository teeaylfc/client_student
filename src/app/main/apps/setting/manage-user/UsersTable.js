import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions/users.actions';
import ClassesTableHead from "./UsersTableHead";
import {helpers, RIGHT_ID_ROLEUSER, RIGHT_ACT_DELETE, RIGHT_ACT_UPDATE} from "../../../../../common/Constants"

class UsersTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.userData,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        const userId = this.props.user.user.userId;
        const typeUser = this.props.role.type_user;
        if( userId === 'ssAdmin' || typeUser ==='S') {
            this.props.getAllUser();
        } else {
            const idSchool = this.props.user._id;
            if(idSchool != null) {
                this.props.getUserBySchool(idSchool);
            }
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.userData, prevProps.userData) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
        (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field)))
        {
            const data = this.getFilteredArray(this.props.userData, this.props.searchText, this.props.field);
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
        this.props.history.push('/user/' + item.userId);
    };

    deleteClass = event => {
        console.log("event", event);
        this.props.removeUser(event.userId, this.props.history);
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

                        <ClassesTableHead
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
                                        case 'idClass':
                                        {
                                            return o.idClass[0];
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

                                            <TableCell component="th" scope="row" padding="none" align="left">
                                                {/*{n.images.length > 0 ? (
                                                    <img className="w-full block rounded" src={_.find(n.images, {id: n.featuredImageId}).url} alt={n.name}/>
                                                ) : (
                                                    <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={n.name}/>
                                                )}*/}
                                                {n.userId}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.phone}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.email}
                                                <i className={classNames("inline-block w-8 h-8 rounded ml-8", n.totalStudent <= 5 && "bg-red", n.totalStudent > 5 && n.totalStudent <= 25 && "bg-orange", n.totalStudent > 25 && "bg-green")}/>
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.typeUser}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_ROLEUSER, RIGHT_ACT_UPDATE)}} className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon style={{display:helpers.getDisplay(this.props.user.role.rights, RIGHT_ID_ROLEUSER, RIGHT_ACT_DELETE)}} className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa người dùng')) this.deleteClass(n)}}>remove_circle</Icon>
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
        getAllUser: Actions.getAllUser,
        updateUser: Actions.updateUser,
        removeUser: Actions.removeUser,
        getUserBySchool : Actions.getUserBySchool
    }, dispatch);
}

function mapStateToProps({userApp, auth})
{
    console.log('user auth', auth);
    return {
        field  : userApp.users.field,
        userData  : userApp.users.userData,
        searchText: userApp.users.searchText,
        user : auth.login.user,
        role : auth.login.user.role
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersTable));
