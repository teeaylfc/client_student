import React, { Component } from 'react'
import { Card, FormControlLabel, Checkbox, Button, } from '@material-ui/core'
import TextInputBase from '../../common/TextInputBase'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from '../auth/store/actions';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            canSubmit: false,
            userName: '',
            password: ''
        }
    }


    form = React.createRef();

    onSubmitLogin = (model) => () => {
        // model.typeUser = 'P';
        console.log("callllll");
        this.props.submitLogin(model, this.props.history);
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.login.error && (this.props.login.error.email || this.props.login.error.password)) {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login.success) {
            this.props.history.push('/homeTeacher');
        }
    }

    handleTextChange = (event) => {
        console.log(event.target)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    disabledSubmit = () => {
        const { userName, password, canSubmit } = this.state
        if (userName == "" || userName.length < 4) return true
        if (password == "" || password.length < 4) return true
        return false
    }

    pri = () => {
        console.log("abc1");
    }
    handleChange = () => {
        this.setState({
            remember: !this.state.remember
        });
    };
    render() {
        const { remember, canSubmit, userName, password } = this.state
        return (
            <div className="image-background-signIn"
                style={{ backgroundImage: "url(assets/images/backgrounds/background.png)" }}>
                <div className="flex flex-row w-full py-56">
                    <div className="sign-in-left">
                        <div className="header-sign-up">
                            <img className="logo-sign-up" src="assets/images/logos/logo_ss_white.png" />
                        </div>
                        <img className="image-sign-up" src="assets/images/icons/image_signup.png" />
                        <div className="div-descrip">
                            <div className="flex flex-row items-center justify-center mb-24">
                                <div className="div-icon-tutorial mr-24">
                                    <img width="25px" className="object-contain" src="assets/images/icons/ic_documents.png" />
                                </div>
                                <h2 className="text-white font-bold">HƯỚNG DẪN</h2>
                            </div>
                            <h5 className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h5>
                        </div>
                    </div>
                    <div className="sign-in-right">
                        <Card className="form-sign-up items-center flex flex-col ">
                            <div className="flex w-full justify-center mb-40 mt-24">
                                <h2 className="font-bold text-xl">Đăng nhập</h2>
                            </div>
                            <div className="flex  w-3/5 flex-1 flex-col mb-24">
                                <TextInputBase
                                    value={userName}
                                    name="userName"
                                    error={userName.length < 4 && "Tên đăng nhập phải lớn hơn 4 kí tự"}
                                    placeholder={"Tên đăng nhập"}
                                    onChange={this.handleTextChange}
                                    className="color_blue input_base mt-12"
                                />
                            </div>
                            <div className="flex  w-3/5 flex-1 flex-col mb-24">
                                <TextInputBase
                                    value={password}
                                    name="password"
                                    type="password"
                                    error={password.length < 4 && "Mật khẩu phải có ít nhất 1 ký tự bao gồm chữ cái hoặc số và các ký tự đặc biệt"}
                                    placeholder={"Mật khẩu"}
                                    onChange={this.handleTextChange}
                                    className="color_blue input_base mt-12"
                                />
                            </div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={this.handleChange}
                                        name="isRemember"
                                        color="primary"
                                    />
                                }
                                label="Ghi nhớ mật khẩu"
                            />
                            <Button
                                variant="contained"
                                disabled={this.disabledSubmit()}
                                onClick={this.onSubmitLogin({
                                    email: userName,
                                    password: password
                                })}
                                className={`p-16 mt-24 w-1/3 items-center justify-center ${this.disabledSubmit() ? "gradient_gray" : "gradient_blue"}  text-white`}>
                                <h2 className="text_button_base">Đăng nhập</h2>

                            </Button>
                            <h3 className="mt-32 mb-32">Chưa có tài khoản? <Link className='underline' to='/signUp'>Đăng kí ngay</Link></h3>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }


}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({ auth }) {
    return {
        login: auth.login,
        user: auth.user
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));