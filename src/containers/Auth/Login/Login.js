import React, {Component} from 'react';
import Input from '../../../components/Ui/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from "react-router-dom";
import checkValidity from "../../../utils/validation";

class Login extends Component {
  state = {
    email: {
      value: '',
      config: {
        type: 'email',
        name: 'Email',
        placeholder: 'Your email'
      },
      rules: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      value: '',
      config: {
        type: 'password',
        name: 'Password',
        placeholder: 'Password'
      },
      rules: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  };

  inputChangeHandler = (ev, formIdentifier) => {
    const newValue = ev.target.value;

    const loginData = {email: {...this.state.email}, password: {...this.state.password}};
    const updatedFormValue = {
      ...loginData[formIdentifier],
      valid: checkValidity(newValue, loginData[formIdentifier].rules),
      value: newValue,
      touched: true
    };
    this.setState({
      [formIdentifier]: updatedFormValue
    })
  };

  onSubmitForm = (ev) => {
    ev.preventDefault();
    this.props.signUp(this.state.email.value, this.state.password.value)
  };

  render() {
    return (<div>
      {this.props.isAuthenticated ? <Redirect to="/" /> : null}
      <Input elementConfig={this.state.email.config}
             isValid={this.state.email.valid}
             isTouched={this.state.email.touched}
             handleChange={(ev) => this.inputChangeHandler(ev, 'email')}
             value={this.state.email.value}/>
      <Input elementConfig={this.state.password.config}
             isValid={this.state.password.valid}
             isTouched={this.state.password.touched}
             handleChange={(ev) => this.inputChangeHandler(ev, 'password')}
             value={this.state.password.value}/>
      <button className="Button"
              onClick={() => this.props.signIn(this.state.email.value, this.state.password.value)}>
        Sign in
      </button>
      <button className="Button"
              onClick={() => this.props.signUp(this.state.email.value, this.state.password.value)}>
        Sign up
      </button>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(actions.auth(email, password, false)),
    signUp: (email, password) => dispatch(actions.auth(email, password, true)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
