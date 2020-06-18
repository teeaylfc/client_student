import React, { Component } from 'react';
import { withStyles, Icon, ListItem, ListItemText } from '@material-ui/core';
import { NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'app/store/actions';
import FuseNavBadge from './../FuseNavBadge';
import { changeTabNavigation } from 'app/store/actions/actionNavigationMenu';

const propTypes = {
    item: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            icon: PropTypes.string,
            url: PropTypes.string
        })
};

const defaultProps = {};

const styles = theme => ({
    item: {
        height: 50,
        width: 'calc(100% - 28px)',
        margin: '0px auto',
        borderRadius: '5px',
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '&.square, &.active.square': {
            width: '100%',
            borderRadius: '0'
        },
        '& .list-item-icon': {},
        '& .list-item-text': {},
        color: 'inherit!important',
        textDecoration: 'none!important'
    }
});

class FuseNavVerticalItem extends Component {
    render() {
        const { item, classes, nestedLevel, userRole, active} = this.props;
        if (item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest')))) {
            return null;
        }
      

        let paddingValue = 40 + (nestedLevel * 16);
        const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-12';
        return (
            <ListItem
                button
                component={NavLink}
                to={item.url}
                activeClassName="active"
                className={classNames(classes.item, listItemPadding, 'list-item', active)}
                onClick={this.clickItem}
                exact={item.exact}
            >
                {item.icon && (
                    <Icon className="list-item-icon text-16 flex-no-shrink" color="action">{item.icon}</Icon>
                )}
                <ListItemText className="list-item-text" primary={item.title} classes={{ primary: 'text-14 list-item-text-primary' }} />
                {item.badge && (
                    <FuseNavBadge badge={item.badge} />
                )}
            </ListItem>
        )
    }
    clickItem = () =>{
        this.props.changeTab(this.props.idParent)
        // this.props.navbarCloseMobile()
    }
}
const mapStateToProps = (store) => {
    return {
        idTab: store.navigationReducer.idTab,
        userRole: store.auth.user.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeTab: (id) => dispatch((changeTabNavigation(id))),
        navbarCloseMobile: () => dispatch(Actions.navbarCloseMobile)
    }
}


FuseNavVerticalItem.propTypes = propTypes;
FuseNavVerticalItem.defaultProps = defaultProps;

const NavVerticalItem = withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseNavVerticalItem)));

export default NavVerticalItem;
