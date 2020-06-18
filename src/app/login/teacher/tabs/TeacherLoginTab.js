import React, {Component} from 'react';
import {Button, InputAdornment, Icon,Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from '../../../auth/store/actions';

class TeacherLoginTab extends Component {

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
        model.typeUser = 'P';
        this.props.submitLogin(model, this.props.history);
    };

    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.login.error && (this.props.login.error.email || this.props.login.error.password) )
        {
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

    render()
    {
        const {canSubmit} = this.state;

        return (
            <div className="w-full">
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full form-login"
                >
                    <Typography variant="h6" className="text-center mb-12 text-xs font-medium">
                        Tên đăng nhập
                    </Typography>
                    <TextFieldFormsy
                        className="mb-20px"
                        type="text"
                        name="email"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <Typography variant="h6" className="text-center mb-12 text-xs font-medium">
                        Mật khẩu
                    </Typography>
                    <TextFieldFormsy
                        className="mb-20px"
                        type="password"
                        name="password"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <FormControlLabel 
                        className="justify-center login-checkbox"
                        control={<Checkbox
                            name="rememberMe"
                            //onChange={event => this.handleCheck(event, n.id)}
                        />}
                        label="Lưu lại mật khẩu"
                    />
                    
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className="w-full"
                        aria-label="ĐĂNG NHẬP"
                        disabled={!canSubmit}
                        value="legacy"
                        className="btn btn-secondary"
                    >
                        ĐĂNG NHẬP
                    </Button>

                </Formsy>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
        user : auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherLoginTab));
