import React from 'react';
import {FuseNavigation} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';

const Navigation = ({navigation, layout, dense, className, login, user}) => {

    let _navigation = JSON.parse(JSON.stringify(navigation));
    if(user && (user.userType ==='SUPER ' || user.userType ==='QTV')) {
        _navigation[0].children =  navigation[0].children.filter(item => item.role =='staff');
    } else {
        _navigation[0].children =  navigation[0].children.filter(item => item.role =='partner');
    }

    let hideModules =[];
    if(login && login.role && login.role.rights) {
        login.role.rights.forEach(function(v){
            if(v) {
                if(!v.view && !v.create && !v.update && !v.delete) {
                    hideModules.push(v.id);
                }
            }

        });

        _navigation[0].children.forEach(function(v){
            v.children = v.children.filter(item => !hideModules.includes(item.id))
        });
    }


    return (
        <FuseNavigation className={classNames("navigation", className)} navigation={_navigation} layout={layout} dense={dense}/>
    );

};


function mapStateToProps({fuse, auth})
{
    return {
        navigation: fuse.navigation,
        login: auth.login.user,
        user : auth.login.user.user
    }
}

Navigation.defaultProps = {
    layout: "vertical"
};

export default withRouter(connect(mapStateToProps)(Navigation));
