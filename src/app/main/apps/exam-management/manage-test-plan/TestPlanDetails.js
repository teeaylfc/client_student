import React from 'react';
import { Tabs, Tab, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import TestPlanInfo from './TestPlanInfo';
import TestPlanStudentList from './TestPlanStudentList';
import { purple } from '@material-ui/core/colors';

function TabPanel(props) {
  const { index, value, component } = props;
  return index === value && component;

}

const theme = createMuiTheme({
  palette: {
    primary: purple
  }
})

class TestPlanDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'info'
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ ...this.state, value: newValue })
  }

  render() {
    return (
      <div style={body}>
        <MuiThemeProvider theme={theme}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="full width tabs example"
          >
            <Tab value='info' label="Thông tin" />
            <Tab value='students' label="Học sinh dự thi" />
          </Tabs>
        </MuiThemeProvider>
        <div style={tabDivider} />
        <TabPanel index='info' value={this.state.value} component={(<TestPlanInfo />)} />
        <TabPanel index='students' value={this.state.value} component={(<TestPlanStudentList />)} />
      </div>
    )
  }
}

export default TestPlanDetails;

const tabDivider = {
  height: '2px',
  backgroundColor: 'purple',
  borderRadius: '25px'
};

const body = {
  display: 'flex',
  flexFlow: 'column',
  height: '100%'
}

