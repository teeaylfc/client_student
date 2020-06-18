import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';
import {
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  withStyles
} from '@material-ui/core';
import { FuseScrollbars } from '@fuse';

import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import TestPlanStudentListHeader from './TestPlanStudentListHeader';

const styles = theme => ({

});

class TestPlanStudentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: {
        page: 1,
        pageSize: 10
      }
    }
  }

  componentWillMount() {
    this.updateTestPlanStudents();
  }

  handleCheck = i => {
    const { testStatuses, checkedStudents } = this.props;

    // Tim vi tri cua student duoc check
    let position = checkedStudents.findIndex(student => student.examStatus._id === testStatuses[i].examStatus._id);

    // Them vao giua neu tim thay, con khong thi them vao cuoi checkedStudents
    let newCheckedStudents;
    if (position !== -1) {
      newCheckedStudents = [...checkedStudents.slice(0, position), ...checkedStudents.slice(position + 1, checkedStudents.length)]
    } else {
      newCheckedStudents = [...checkedStudents, testStatuses[i]];
    }

    // Cap nhat danh sach checkedStudents moi
    this.props.checkStudents(newCheckedStudents);
  }

  updateTestPlanStudents = () => {
    if (this.props.testPlan && this.props.testPlan.idExamDefine) {
      this.props.getTestStatuses(this.props.testPlan.idExamDefine, this.state.page);
    }
  }

  render() {
    const { testStatuses, checkedStudents } = this.props;

    return (
      <div className="w-full flex flex-col">
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <Table className="min-w-xl" aria-labelledby="tableTitle">
            <TestPlanStudentListHeader />
            <TableBody>
              {testStatuses.map((n, i) => {
                const { examStatus, student, examDefine } = n;

                const pauseTime = examStatus.pauseTime;
                const startTime = Date.parse(examDefine.startTime);
                const endTime = Date.parse(examDefine.expiredTime);
                const now = new Date().getTime();
                const elapsedTime = calculateTime(startTime, endTime, pauseTime);

                let status = 'Chưa thi';
                if (startTime <= now) {
                  status = now <= endTime ? 'Đang thi' : 'Hoàn thành';
                }

                return student && (
                  <TableRow
                    className="h-54 cursor-pointer"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}>
                    <TableCell component="td" scope="row" padding="none" align="center">
                      <Checkbox
                        checked={checkedStudents.findIndex(student => student.examStatus._id === testStatuses[i].examStatus._id) > -1}
                        onChange={() => this.handleCheck(i)}>
                      </Checkbox>
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" align="center">
                      {student.id}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" align="center">
                      {student.name}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" align="center">
                      {student.birthday}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" align="center">
                      {elapsedTime}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" align="center">
                      {status}
                    </TableCell>
                    <TableCell component="td" scope="row" padding="none" align="center">
                      {Math.floor(examStatus.totalPoint * 100) / 100}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </FuseScrollbars>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTestStatuses: Actions.getTestStatuses,
    checkStudents: Actions.checkStudents
  }, dispatch);
}

function mapStateToProps({ testPlanApp, auth }) {
  return {
    testPlan: testPlanApp.testPlan.testPlan,
    testStatuses: testPlanApp.testPlan.testStatuses,
    checkedStudents: testPlanApp.testPlan.checkedStudents,
    user: auth.login.user
  }
}

export default withReducer('testPlanApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TestPlanStudentList))));

function calculateTime(startTime, endTime, pauseTime) {
  const now = new Date().getTime();
  let elapsedTime = now > endTime + pauseTime ? endTime - startTime : now - startTime - pauseTime;
  elapsedTime = Math.floor(elapsedTime / 1000);

  let minnutes = Math.floor(elapsedTime / 60);
  let seconds = elapsedTime % 60;
  minnutes = minnutes > 9 ? minnutes : '0' + minnutes;
  seconds = seconds > 9 ? seconds : '0' + seconds;

  return `${minnutes}:${seconds}`;
}