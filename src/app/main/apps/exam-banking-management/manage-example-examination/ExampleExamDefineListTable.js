import React, {Component} from 'react';
import {Checkbox, Icon, Table, TableBody, TableCell, TablePagination, TableRow} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import ExamDefineListTableHead from "./ExamDefineListTableHead";

class ExampleExamDefineListTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.examDefineData,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        console.log('data ExamDefine', this.props);
        this.props.getAllExamDefine();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.examDefineData, prevProps.examDefineData) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.examDefineData, this.props.searchText);
            this.setState({data})
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
        this.props.history.push('/exampleExamDefine/' + item.idExamDefine);
    };

    deleteExamDefine = item => {
        this.props.deleteExamDefine(item._id, this.props.history);
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

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;
        const {user} = this.props;
        console.log(user);
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
                            rowCount={data.length}
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
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

                                            <TableCell component="th" scope="row" padding="none" align="left" className="w-30">
                                                {/*{n.images.length > 0 ? (
                                                    <img className="w-full block rounded" src={_.find(n.images, {id: n.featuredImageId}).url} alt={n.name}/>
                                                ) : (
                                                    <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={n.name}/>
                                                )}*/}
                                                {n.index}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {n.idExamDefine}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.nameExam}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.subjectName}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.degreeNumber}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.nameClass}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.startTime}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="right">
                                                {n.expiredTime}
                                            </TableCell>
                                            {
                                                user._id === 'SS001' && (
                                                    <TableCell component="th" scope="row" align="right">
                                                        <Icon className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                        <Icon className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa câu hỏi')) this.deleteExamDefine(n)}}>remove_circle</Icon>
                                                    </TableCell>
                                                )
                                            }
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
        getAllExamDefine: Actions.getAllExamDefine,
        deleteExamDefine: Actions.deleteExamDefine,
    }, dispatch);
}

function mapStateToProps({examDefineApp, auth})
{
    return {
        examDefineData  : examDefineApp.examDefines.examDefineData,
        searchText: examDefineApp.topics.searchText,
        user: auth.login.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExampleExamDefineListTable));
