import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppContext from 'app/AppContext';

class FuseAuthorization extends Component {

    constructor(props, context)
    {
        super(props);
        const {routes} = context;
        this.state = {
            accessGranted: true,
            routes
        };
    }

    componentDidMount()
    {
        console.log('FuseAuthorizations componentDidMount')
        if ( !this.state.accessGranted )
        {
            this.redirectRoute(this.props);
        }
    }

    componentDidUpdate()
    {
        console.log('FuseAuthorizations componentDidMount');
        console.log(this.state.accessGranted);
        if ( !this.state.accessGranted )
        {
            this.redirectRoute(this.props);
        }
    }

    static getDerivedStateFromProps(props, state)
    {
        const {location, user} = props;
        const {pathname} = location;
        console.log('getDerivedStateFromProps' + user);

        const matched = matchRoutes(state.routes, pathname)[0];
        console.log(matched);
        let accessGranted = true;
        if (!user) {
            if (user.roles)
                user.roles.forEach((role) => {
                    accessGranted = (matched && matched.route.auth && matched.route.auth.length > 0) ? matched.route.auth.includes(user.role) : true;
                })
            else {
                accessGranted = false;
            }
        }
        console.log(accessGranted);
        return {
            accessGranted
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    redirectRoute(props)
    {
        const {location, user, history} = props;
        const {pathname, state} = location;
        console.log('redirectRoute' + user);

        /*
        User is guest
        Redirect to Login Page
        */
        if ( user.role === 'guest' )
        {
            history.push({
                pathname: '/login',
                state   : {redirectUrl: pathname}
            });
        }
        /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
        else
        {
            const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';

            history.push({
                pathname: redirectUrl
            });
        }
    }

    render()
    {
        const {children} = this.props;
        const {accessGranted} = this.state;
        // console.info('Fuse Authorization rendered', accessGranted);
        return accessGranted ? <React.Fragment>{children}</React.Fragment> : null;
    }
}

function mapStateToProps({fuse, auth})
{
    return {
        user: auth.user
    }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
