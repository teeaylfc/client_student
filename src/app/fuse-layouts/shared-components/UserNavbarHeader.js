import React, {Component} from 'react';
import {AppBar, Avatar, Typography, withStyles} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import * as Actions from "../../auth/store/actions";

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width     : 72,
        height    : 72,
        position  : 'absolute',
        top       : 92,
        padding   : 8,
        background: theme.palette.background.default,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        '& > img' : {
            borderRadius: '50%'
        }
    }
});

class UserNavbarHeader extends Component{

    logoutAction = () => {
        this.props.logout();
        //this.props.history.push('/login')
    }

    render() {
        const {user,classes} = this.props;
        return (
          <AppBar
            position="static"
            color=""
            elevation={0}
            classes={{root: classes.root}}
            className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
          >
              <Typography className="username text-16 whitespace-no-wrap" color="inherit">{user && user.user ? user.user.name : ""}</Typography>
              <Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{user && user.user ? user.user.email : ""}</Typography>
              <Avatar
                className={classNames(classes.avatar, "avatar")}
                alt="user photo"
                src={user && user.user && user.user.avatar && user.user.avatar !== '' ? user.user.avatar : "assets/images/avatars/profile.jpg"}
              />
              {/*<Button
                className=""
                variant="contained"
                //disabled={!this.canBeSubmitted()}
                onClick={() => this.logoutAction()}
              >
                  Logout
              </Button>
              {/*<Link to='/login'>Logout</Link>*/}
              <Link to="/home-login"
                 onClick={()=>this.logoutAction()}>Logout</Link>
          </AppBar>
        );
    }
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        logout : Actions.logout
    }, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        login : auth.login,
        user: auth.login.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UserNavbarHeader));
