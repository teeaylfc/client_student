import React, { Component } from 'react';
import {
  Icon,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { Link } from 'react-router-dom';
import _ from '@lodash';

import * as Actions from '../store/actions';
import TestPlanInfo from './TestPlanInfo'
import TestPlanStudentList from './TestPlanStudentList'

class TestPlan extends Component {

  state = {
    tabValue: 0
  }

  handleChangeTab = (event, tabValue) => {
    this.setState({ tabValue });
  };

  render() {
    const { tabValue } = this.state;

    return (
      <FusePageCarded
        classes={{
          toolbar: "p-0",
          header: "min-h-96 h-96 sm:h-96 sm:min-h-96"
        }}
        header={
          (
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex flex-col items-start max-w-full">

                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/managerTestPlan">
                    <Icon className="mr-4 text-20">arrow_back</Icon>
                    Danh sách ca thi
                  </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                  <FuseAnimate animation="transition.expandIn" delay={300}>
                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" />
                  </FuseAnimate>
                  <div className="flex flex-col min-w-0">
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography className="text-16 sm:text-20 truncate">
                        Thông tin ca thi
                      </Typography>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                      <Typography variant="caption">Thông tin</Typography>
                    </FuseAnimate>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={this.handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-64" }}
          >
            <Tab className="h-64 normal-case" label="Thông tin" />
            <Tab className="h-64 normal-case" label="Học sinh" />
          </Tabs>
        }
        content={
          (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <div>
                  <TestPlanInfo testPlanId={this.props.match.params.id} />
                </div>
              )}
              {tabValue === 1 && (
                <div>
                  <TestPlanStudentList testPlanId={this.props.match.params.id} />
                </div>
              )}
            </div>
          )
        }
        innerScroll
      />
    )
  };
}

export default TestPlan;
