import React, {Component} from 'react'
import {withStyles, Card, CardContent, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import JWTLoginTab from './tabs/TeacherLoginTab';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
});

class TeacherLogin extends Component {

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 justify-center login-bg-image")} 
                style={{ backgroundImage: "url(assets/images/login/image_background.png)" }}>

                <div className="w-full xl:max-w-3xl lg:max-w-2xl mx-auto">
                    <FuseAnimate animation={{translateX: [0, '100%']}}>
                        <Card className="w-full max-w-500 login-page" square>
                            <CardContent className="flex flex-col items-center justify-center login-box">
                                <Avatar alt="User" src="assets/images/login/avt_login.png" className="avatar-custom" />
                                <Typography variant="h6" className="text-center md:w-full mb-48">ĐĂNG NHẬP GIÁO VIÊN</Typography>
                                <JWTLoginTab/>
                                <div className="flex flex-row items-center justify-center pt-32">
                                    <Link className="font-medium pr-3 underline" to="/register">Tạo một tài khoản</Link>
                                    <Link className="font-medium underline" to="/reset-password">Quên mật khẩu</Link>
                                </div>
                            </CardContent>
                            <img alt="Book" src="assets/images/login/icon_book.png" className="absolute custom_icon_book"/>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(TeacherLogin));
