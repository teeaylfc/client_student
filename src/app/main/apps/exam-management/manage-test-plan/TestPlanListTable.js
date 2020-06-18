import React, { Component } from 'react';
import { Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import TestPlanListTableHead from "./TestPlanListTableHead";
import TestPlanDetails from './TestPlanDetails';
import { getPrettyDateTime } from 'app/utils/datetime';

class TestPlanListTable extends Component {

    state = {
        criteria: {},
        page: 0,
        rowsPerPage: 10,
        selectedRow: -1
    };

    componentDidMount() {
        this.updateTestPlans();
    }

    handleChangePage = (event, page) => {
        this.setState({ ...this.state, page, selectedRow: -1 });
        this.updateTestPlans();
    };

    handleChangeRowsPerPage = event => {
        this.setState({ ...this.state, rowsPerPage: event.target.value, selectedRow: -1 });
        this.updateTestPlans();
    };

    handleSelectRow = (i) => {
        let newSelectedRow = this.state.selectedRow === i ? -1 : i;
        this.setState({ ...this.state, selectedRow: newSelectedRow });
        this.updateSelectedTestPlan(newSelectedRow);
    }

    updateTestPlans = () => {
        const { criteria, page, rowsPerPage } = this.state;
        this.props.getTestPlanPage(criteria, { page: page + 1, pageSize: rowsPerPage });
    }

    updateSelectedTestPlan = selectedIndex => {
        this.props.selectTestPlan(selectedIndex);
    }

    render() {
        const { page, rowsPerPage, selectedRow } = this.state;

        let data = this.props.testPlans;
        let total = this.props.total;


        return (
            <div className="w-full flex flex-col">
                <FuseScrollbars className="flex-grow overflow-x-auto">
                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                        <TestPlanListTableHead />
                        <TableBody>
                            {data.map((n, i) => {
                                const startTime = Date.parse(n.startTime);
                                const endTime = Date.parse(n.expiredTime);
                                const now = new Date().getTime();
                                let status = 'Chưa thi';
                                if (startTime <= now) {
                                    status = now <= endTime ? 'Đang thi' : 'Hoàn thành';
                                }
                                return [
                                    (<TableRow
                                        className="h-54 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={i}
                                        onClick={() => this.handleSelectRow(i)}>

                                        <TableCell component="td" scope="col" padding="none" align="center" style={{ maxWidth: '10px' }}>
                                            {page * rowsPerPage + i + 1}
                                        </TableCell>

                                        <TableCell component="td" scope="col">
                                            {n.nameExam}
                                        </TableCell>

                                        <TableCell component="td" scope="col" align="center" style={{ minWidth: '150px' }}>
                                            {n.subject}
                                        </TableCell>

                                        <TableCell component="td" scope="col" align="center">
                                            {n.degreeNumber}
                                        </TableCell>

                                        <TableCell component="td" scope="col" align="center">
                                            {n.nameClass}
                                        </TableCell>

                                        <TableCell component="td" scope="col" align="center" style={{ minWidth: '205px' }}>
                                            {n.startTime ? getPrettyDateTime(n.startTime) : ''}
                                        </TableCell>

                                        <TableCell component="td" scope="col" align="center" style={{ minWidth: '150px' }}>
                                            {n.expiredTime ? getPrettyDateTime(n.expiredTime) : ''}
                                        </TableCell>

                                        <TableCell component="td" scope="col" align="center">
                                            {(n.examDefineList[0] && n.examDefineList[0].questionsPack) ? n.examDefineList[0].questionsPack : ''}
                                        </TableCell>

                                        <TableCell component="td" scope="col" align="center">
                                            {status}
                                        </TableCell>
                                    </TableRow>),
                                    (i === selectedRow && <TableRow key={'details'} style={{ backgroundColor: '#f2f2f2', height: '500px' }}>
                                        <TableCell component='td' colSpan={9} style={{ verticalAlign: 'top', height: '500px' }}>
                                            <TestPlanDetails />
                                        </TableCell>
                                    </TableRow>)
                                ];

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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTestPlanPage: Actions.getTestPlanPage,
        selectTestPlan: Actions.selectTestPlan
    }, dispatch);
}

function mapStateToProps({ testPlanApp }) {
    return {
        testPlans: testPlanApp.testPlan.testPlans,
        total: testPlanApp.testPlan.total
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestPlanListTable));
