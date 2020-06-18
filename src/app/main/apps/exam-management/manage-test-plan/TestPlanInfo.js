import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import withReducer from 'app/store/withReducer';

import _ from '@lodash';
import {
  Typography,
  Button,
  Icon,
  withStyles
} from '@material-ui/core';

import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { purple, green, red } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/es';

const styles = theme => ({

});

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  }
});

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

class TestPlanInfo extends Component {

  render() {
    const school = this.props.user.schools[0].name;
    const testPlan = this.props.testPlan;

    let status = 'Chưa thi';
    if (testPlan) {
      let { startTime, endTime, now } = {
        startTime: Date.parse(testPlan.startTime),
        endTime: Date.parse(testPlan.expiredTime),
        now: new Date().getTime()
      }

      if (startTime <= now) {
        status = now >= endTime ? 'Đang thi' : 'Hoàn thành';
      }
    }

    return testPlan && (
      <div style={containerStyle}>
        <table style={tableStyle} className='mx-auto'>
          <tbody>
            <tr>
              <td><Typography variant="subtitle1" gutterBottom>Trường</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{school}</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>Môn học</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.subject}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant="subtitle1" gutterBottom>Khối</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.degreeNumber}</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>Lớp</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.nameClass}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant="subtitle1" gutterBottom>Tên kỳ thi</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.nameExam}</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>Loại hình thời gian</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.typeTime}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant="subtitle1" gutterBottom>Thời gian bắt đầu</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.startTime}</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>Thời gian kết thúc</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.expiredTime}</Typography></td>
            </tr>
            <tr>
              <td><Typography variant="subtitle1" gutterBottom>Hình thức thi</Typography></td>
              <td><Typography variant="subtitle1" gutterBottom>{testPlan.isOnlineExam}</Typography></td>
            </tr>
          </tbody>
        </table>

        {status === 'Đang thi' && (
          <div className='mt-3' style={controlBtnContainer}>
            <MuiThemeProvider theme={theme}>
              <Button style={{ fontSize: 'small' }} variant="contained" size="medium" color="primary" className='m-3'>
                <Icon className='mr-2'>pause_circle_outline</Icon>Dừng thi</Button>
              <RedButton style={{ fontSize: 'small' }} variant="contained" size="medium" className='m-3'>
                <Icon className='mr-2'>cancel</Icon>Hủy thi</RedButton>
              <Button style={{ color: 'white', fontSize: 'small' }} variant="contained" size="medium" color="secondary" className='m-3'>
                <Icon className='mr-2'>repeat</Icon>Thi lại</Button>
            </MuiThemeProvider>
          </div>
        )}

      </div >
    )
  }

}

function mapStateToProps({ testPlanApp, auth }) {
  return {
    testPlan: testPlanApp.testPlan.testPlan,
    user: auth.login.user
  }
}

export default withReducer('testPlanApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, null)(TestPlanInfo))));

const containerStyle = {
  height: '100%',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center'
}

const tableStyle = {
  width: '80%'
}

const controlBtnContainer = {
  display: 'flex',
  alignSelf: 'flex-end'
}