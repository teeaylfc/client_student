import React, { Component } from 'react';
import { withStyles, Collapse, Icon, IconButton, ListItem, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FuseNavVerticalGroup from './FuseNavVerticalGroup';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import FuseNavBadge from './../FuseNavBadge';
import FuseNavVerticalLink from './FuseNavVerticalLink';
import _ from '@lodash';
import { changeTabNavigation } from 'app/store/actions/actionNavigationMenu';

const propTypes = {
    item: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            icon: PropTypes.string,
            children: PropTypes.array
        })
};

const defaultProps = {};

const styles = theme => ({
    root: {
        padding: 0
    },
    item: {
        height: 50,
        width: 'calc(100% - 28px)',
        borderRadius: '5px',
        margin: '0px auto',
        paddingRight: 12,
        '&.square': {
            width: '100%',
            borderRadius: '0'
        }
    }
});

function needsToBeOpened(props) {
    return props.location && isUrlInChildren(props.item, props.location.pathname)
}

function isUrlInChildren(parent, url) {
    if (!parent.children) {
        return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].children) {
            if (isUrlInChildren(parent.children[i], url)) {
                return true;
            }
        }

        if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
            return true;
        }
    }

    return false;
}

class FuseNavVerticalCollapse extends Component {

    constructor(props) {
        super(props);

        this.state = { open: needsToBeOpened(this.props) };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            !prevState.open &&
            (!_.isEqual(this.props.location, prevProps.location) || !_.isEqual(this.props.item, prevProps.item)) &&
            needsToBeOpened(this.props)
        ) {
            this.setState({ open: true });
        }
    }

    handleClick = () => {
        const { item, idTab, changeTab } = this.props;
        if(!item.children){
            this.props.history.push(item.url)
        }
        if (item.id != idTab) {
            if (this.state.open == false) {
                this.setState({ open: !this.state.open });
            }
            changeTab(item.id)
        }
        else {
            this.setState({ open: !this.state.open });
        }

    };

    render() {
        const { item, nestedLevel, classes, userRole, active, idTab } = this.props;
        if (item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest')))) {
            return null;
        }
        let paddingValue = 40 + (nestedLevel * 16);
        const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-12';
        return (
            <ul className={classNames(classes.root, idTab == item.id && "open")}>
                <ListItem
                    button
                    to={item.url}
                    className={classNames(classes.item, listItemPadding, active, 'list-item')}
                    style={{ backgroundImage: idTab == item.id ? "linear-gradient(to right, #334690, #3E57B9)" : null }}
                    onClick={this.handleClick}
                >
                    {item.icon && (
                        <Icon color="action" className={`text-16 flex-no-shrink ${idTab == item.id ? "root-item-icon-active" : "root-item-icon"}  `}>{item.icon}</Icon>
                    )}
                    {/* <h3 className={classNames(idTab == item.id ? "root-item-text-active" : "root-item-text", "mx-12 flex-1") }>
                        {item.title}
                    </h3> */}
                    <ListItemText
                        className="list-item-text"
                        primary={item.title}
                        classes={{ primary: `text-14 ${idTab == item.id ? "root-item-text-active" : "root-item-text"}  root-item-text-menu` }} />
                    {item.badge && (
                        <FuseNavBadge className="mr-4" badge={item.badge} />
                    )}
                    {
                        item.children && item.children.length > 0 &&
                        <IconButton
                            disableRipple
                            className={`
                            w-16 h-16 p-0  root-item-icon-arrow 
                        ${idTab == item.id ? "root-item-icon-active" : "root-item-icon"}
                         ${this.state.open ? 'root-item-icon_more' : 'root-item-icon_right'}
                         `}>
                            <Icon className="text-16 arrow-icon" color="inherit">
                                {this.state.open ? 'expand_more' : 'chevron_right'}
                            </Icon>
                        </IconButton>
                    }

                </ListItem>

                {item.children && (
                    <Collapse in={this.state.open} className="collapse-children">
                        {
                            item.children.map((child) => (

                                <React.Fragment key={child.id}>

                                    {child.type === 'group' && (
                                        <FuseNavVerticalGroup item={child} nestedLevel={nestedLevel + 1} active={active} />
                                    )}

                                    {child.type === 'collapse' && (
                                        <NavVerticalCollapse item={child} nestedLevel={nestedLevel + 1} active={active} />
                                    )}

                                    {child.type === 'item' && (
                                        <FuseNavVerticalItem idParent={item.id} item={child} nestedLevel={nestedLevel + 1} active={active} />
                                    )}

                                    {child.type === 'link' && (
                                        <FuseNavVerticalLink item={child} nestedLevel={nestedLevel + 1} active={active} />
                                    )}

                                </React.Fragment>
                            ))
                        }
                    </Collapse>
                )}
            </ul>
        );
    };
}

const mapStateToProps = (store) => {
    return {
        idTab: store.navigationReducer.idTab,
        userRole: store.auth.user.role
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeTab: (id) => dispatch((changeTabNavigation(id)))
    }
}

FuseNavVerticalCollapse.propTypes = propTypes;
FuseNavVerticalCollapse.defaultProps = defaultProps;

const NavVerticalCollapse = withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseNavVerticalCollapse)));

export default NavVerticalCollapse;
