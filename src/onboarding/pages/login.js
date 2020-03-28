import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/styles.css';
import { getAccessToken } from '../actions/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.getAccessTokenSuccess !== prevProps.getAccessTokenSuccess &&
      this.props.getAccessTokenSuccess
    ) {
      window.location.href = '/user';
    }
  }

  getAccessToken = () => {
    const { userName, password } = this.state;
    if (userName && password) {
      this.props.getAccessToken(userName, password);
    } else {
      if (!userName) {
        alert(`User name required`);
        return;
      }

      if (!password) {
        alert(`Password required`);
        return;
      }
    }
  };

  handleUserNameChange = event => {
    event.preventDefault();
    this.setState({ userName: event.target.value });
  };

  handlePswdNameChange = event => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="title-container">
          <h2 className="title"> Login </h2>
        </div>
        <div className="container-fluid">
          <div>
            <div className="imgcontainer">
              <img
                src={require('../../assests/img_avatar2.png')}
                alt="Avatar"
                className="avatar"
              />
            </div>

            <div className="container">
              <label>
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                value={this.state.userName}
                onChange={this.handleUserNameChange}
                name="accountId"
                required
              />
              <label>
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.handlePswdNameChange}
                name="pswd"
                required
              />
              <button type="submit" onClick={this.getAccessToken}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.loginReducer.accessToken,
    getAccessTokenSuccess: state.loginReducer.getAccessTokenSuccess,
    error: state.loginReducer.error,
  };
};

const mapDispatchToProps = {
  getAccessToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
