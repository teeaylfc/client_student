import React, {Component} from 'react';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {withStyles, Card, CardContent, Avatar, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import JWTLoginTab from './TeacherLoginTab';
const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
});

class HomeLogin extends Component {
    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 justify-center login-bg-image")} 
                style={{ backgroundImage: "url(assets/images/login/image_background_home.png)" }}>
                <div className="w-full xl:max-w-3xl lg:max-w-2xl mx-auto">
                    <div className="home-login login-page">
                        <Card className="w-full form-login rounded">
                            <CardContent className="flex flex-col items-center justify-center">
                                <Avatar alt="User" src="assets/images/login/avt_login.png" style={{width:"100px", height:"100px"}} />
                                <h1 className="font-bold color_text text-center md:w-full mb-32 mt-24">ĐĂNG NHẬP</h1>
                                <JWTLoginTab/>
                                <div className="flex flex-row items-center justify-center">
                                    <Link className="font-medium pr-3 underline" to="/signUp">Tạo một tài khoản</Link>
                                    <Link className="font-medium underline" to="/reset-password">Quên mật khẩu</Link>
                                </div>
                            </CardContent>
                            <img alt="Book" src="assets/images/login/icon_book.png" className="absolute icon_book"/>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(HomeLogin);
