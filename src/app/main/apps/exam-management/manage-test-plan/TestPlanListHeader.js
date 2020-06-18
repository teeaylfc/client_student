import React from 'react';
import {Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import * as Actions from '../store/actions';

const TestPlanListHeader = () => {

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="header-right-top-desc flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="mr-7 sm:mr-12">shopping_basket</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Quản lý ca thi</Typography>
                </FuseAnimate>
            </div>

        </div>
    );
};

export default TestPlanListHeader;
