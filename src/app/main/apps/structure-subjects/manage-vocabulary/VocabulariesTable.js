import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import SubjectsTableHead from "./VocabulariesTableHead";

class VocabulariesTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.vocabulariesData,
        total      : this.props.total,
        page       : 0,
        rowsPerPage: 10,
        topicData : []
    };

    componentDidMount() {
        console.log('data Classes', this.props);
        this.props.getAllVocabulary(this.state.page, this.state.rowsPerPage, this.props.user.schools[0].id);
        this.props.getTopicsBySubjectAndDegree("", "", this.props.user.schools[0].id);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.vocabulariesData, prevProps.vocabulariesData) || !_.isEqual(this.props.searchText, prevProps.searchText) ||
        (prevProps.field !== "" && !_.isEqual(this.props.field, prevProps.field)))
        {
            const data = this.getFilteredArray(this.props.vocabulariesData, this.props.searchText, this.props.field);
            this.setState({data})
        }
        if ( this.props.total > 0 && !_.isEqual(this.props.total, prevProps.total) )
        {
            this.setState({ total: this.props.total})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.topics.topicsData.length !==0) {
            let result = nextProps.topics.topicsData.map(topicsData => ({ value: topicsData.topicId, label: topicsData.topicName }));
            this.setState({topicData : result})
        }
    }

    getFilteredArray = (data, searchText, field) => {
        if ( searchText.length === 0 || field.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => {
            let s = item[field]
            if (field === "topic") {
                s = this.getTopic(item.topic)
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

    getTopic = (topicId) => {
        console.log('this.state.topicData', this.state.topicData);
        console.log('topicId', topicId);
        let topic = this.state.topicData.find(item => item.value === topicId);
        if  (topic) {
            return topic.label;
        } else {
            return topicId;
        }
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
        this.props.history.push('/vocabulary/' + item._id);
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
        this.props.getAllVocabulary(page, this.state.rowsPerPage, this.props.user.schools[0].id);
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
        this.props.getAllVocabulary(this.state.page, event.target.value, this.props.user.schools[0].id);
    };

    deleteVocabulary = async event => {
        console.log("event", event);

        await this.props.deleteVocabulary(event._id, this.props.user.schools[0].id, this.props.history);
        await this.props.getAllVocabulary(this.state.page, this.state.rowsPerPage, this.props.user.schools[0].id);

    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data, total} = this.state;
        console.log('vocabulary total', total);
        console.log('vocabulary total props', this.props.total);

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
                            rowCount={total}
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
                                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>

                                            <TableCell className="truncate" component="th" scope="row">
                                                {this.getTopic(n.topic)}
                                            </TableCell>
                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.typeWord}
                                            </TableCell>
                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.pronunciationUK}
                                            </TableCell>
                                            <TableCell className="truncate" component="th" scope="row">
                                                {n.pronunciationUS}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                <Icon className="text-green text-20" onClick={event => this.handleClick(n)}>check_circle</Icon>
                                                <Icon className="text-red text-20" onClick={() => { if (window.confirm('Bạn có chắc chắn xóa môn học')) this.deleteVocabulary(n)}}>remove_circle</Icon>
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
        deleteVocabulary : Actions.deleteVocabulary,
        getAllVocabulary: Actions.getAllVocabulary,
        getTopicsBySubjectAndDegree : Actions.getTopicsBySubjectAndDegree
    }, dispatch);
}

function mapStateToProps({vocabularyApp, auth})
{
    console.log('vocabularyApp.vocabularies', vocabularyApp.vocabularies);
    return {
        field  : vocabularyApp.vocabularies.field,
        vocabulariesData  : vocabularyApp.vocabularies.vocabulariesData,
        total  : vocabularyApp.vocabularies.total,
        searchText: vocabularyApp.vocabularies.searchText,
        user : auth.login.user,
        topics: vocabularyApp.topics,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VocabulariesTable));
