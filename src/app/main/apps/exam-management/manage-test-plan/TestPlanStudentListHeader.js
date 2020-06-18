import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';

import * as Actions from '../store/actions';
import reducer from '../store/reducers';

import {
  TableHead,
  TableCell,
  TableRow,
  Checkbox,
  withStyles
} from '@material-ui/core';

const rows = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'Mã học sinh',
    sort: true
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Họ tên',
    sort: true
  },
  {
    id: 'birthday',
    align: 'right',
    disablePadding: false,
    label: 'Ngày sinh',
    sort: true
  },
  {
    id: 'elapsedTime',
    align: 'right',
    disablePadding: false,
    label: 'Thời gian thi đã trải qua',
    sort: true
  },
  {
    id: 'status',
    align: 'right',
    disablePadding: false,
    label: 'Trạng thái',
    sort: true
  },
  {
    id: 'totalPoint',
    align: 'right',
    disablePadding: false,
    label: 'Điểm số',
    sort: true
  }
];

const styles = theme => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper
  }
});

class TestPlanListTableHead extends React.Component {

  handleSelectAll = () => {
    const { testStatuses, checkedStudents } = this.props;

    if (checkedStudents.length == 0) {
      this.props.checkStudents(testStatuses);
    } else {
      this.props.checkStudents([]);
    }
  }

  render() {
    return (
      <TableHead>
        <TableRow className="h-54">
          <TableCell padding="none" align="center">
            <Checkbox
              checked={this.props.checkedStudents.length > 0}
              onChange={() => this.handleSelectAll()}
            />
          </TableCell>
          {rows.map((row, i) => {
            return (
              <TableCell
                key={i}
                align='center'
                padding='none'>
                  {row.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const mapStateToProps = ({ testPlanApp }) => {
  return {
    checkedStudents: testPlanApp.testPlan.checkedStudents,
    testStatuses: testPlanApp.testPlan.testStatuses
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    checkStudents: Actions.checkStudents
  }, dispatch);
}

export default withReducer('testPlanApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TestPlanListTableHead))));
