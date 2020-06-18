import React, {Component} from 'react';
import {withStyles, Button, Card, CardContent, Typography, InputAdornment, Icon} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from '../auth/store/actions';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

const styles = theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText
    }
});

class ResetPasswordPage extends Component {
    
    state = {
        canSubmit: false
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.props.submitResetPassword(model, this.props.history);
    };

    goBack = () => {
        this.props.history.goBack();
    }

    render()
    {
        const {classes} = this.props;
        const {canSubmit} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 justify-center login-bg-image")} 
                style={{ backgroundImage: "url(assets/images/backgrounds/backgrond_password.png)" }}>

                <div className="w-full xl:max-w-3xl lg:max-w-2xl mx-auto">

                    <FuseAnimate animation={{translateX: [0, '100%']}}>
                        <Card className="w-full max-w-500 login-page" square>
                            <CardContent className="flex flex-col items-center justify-center login-box">

                                <Avatar alt="Cindy Baker" src="assets/images/logos/icon_forgotpass.png" className="avatar-custom mb-32" />
                                <Typography variant="h6" className="text-center md:w-full mb-48">QUÊN MẬT KHẨU</Typography>
                                
                                <Typography variant="p" className="text-xs mb-32 text-center desc">
                                    Đừng lo lắng! Hãy nhập email bạn đã đăng ký và chúng tôi sẽ gửi mật khẩu mới đến cho bạn!
                                </Typography>

                                <div className="w-full">
                                    <Formsy
                                        onValidSubmit={this.onSubmit}
                                        onValid={this.enableButton}
                                        onInvalid={this.disableButton}
                                        ref={(form) => this.form = form}
                                        className="flex flex-col justify-center w-full form-login"
                                    >
                                        <Typography variant="h6" className="text-center mb-12 text-xs font-medium">
                                            Email đã đăng kí
                                        </Typography>
                                        <TextFieldFormsy
                                            className="mb-45px"
                                            type="email"
                                            name="email"
                                            validations="isEmail"
                                            validationError="This is not a valid email"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                                            }}
                                            variant="outlined"
                                            required
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            aria-label="NHẬN MẬT KHẨU MỚI"
                                            disabled={!canSubmit}
                                            value="legacy"
                                            className="w-full btn btn-secondary"
                                        >
                                            NHẬN MẬT KHẨU MỚI
                                        </Button>

                                    </Formsy>
                                </div>
                                <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                    <Link className="font-medium" onClick={this.goBack}>Go back to login</Link>
                                </div>
                            </CardContent>
                        </Card>
                    </FuseAnimate>
                    
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitResetPassword: authActions.submitResetPassword
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        state: auth.state
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)));