import React, { Component } from "react";
import styles from "./login.module.css";
import logo from "../images/logo.png";
import Header from "../Container/HeaderContainer";
const data = [
  {
    User: "abcd",
    password: "12345",
  },
];
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      password: "",
      loginError: "",
      companyname: "",
    };
  }
  handleChange = (val) => {
    this.setState({ companyname: val.target.value });
  };
  handleClick = () => {
    this.props.history.push({ state: { forgotMessage: "" } });
    const reqBody = {
      companyname: this.state.companyname,
      username: this.state.uname,
      password: this.state.password,
    };
    if (this.props.getLogin) {
      this.props.getLogin(reqBody);
    }
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps && nextProps.login) {
      if (nextProps.login.previousPassword === null) {
        this.props.history.push("/reset");
      } else {
        window.location.reload();
      }
    }
    if (
      nextProps &&
      nextProps.loginError &&
      nextProps.loginError.status === "ERROR"
    ) {
      this.setState({
        loginError: nextProps.loginError.loginError,
        uname: "",
        password: "",
        employeeId: "",
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <Header />
        <div className={styles.loginContainer}>
          {this.props.location.state &&
            this.props.location.state.forgotMessage && (
              <div style={{ color: "green" }}>
                {this.props.location.state.forgotMessage + "!"}
              </div>
            )}
          <div className={styles.loginHeader}>
            <img src={logo} />
          </div>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              className={styles.loginInput}
              placeholder="Company Name"
              value={this.state.companyname}
              onChange={(event) => this.handleChange(event)}
            ></input>

            <input
              type="text"
              className={styles.loginInput}
              placeholder="Employee ID"
              value={this.state.uname}
              onChange={(val) => this.setState({ uname: val.target.value })}
            ></input>

            <input
              type="password"
              className={styles.loginInput}
              placeholder="Password"
              value={this.state.password}
              onChange={(val) => this.setState({ password: val.target.value })}
            ></input>
            <button className={styles.signinButton} onClick={this.handleClick}>
              {" "}
              Sign in{" "}
            </button>
            {this.state.loginError && (
              <div className={styles.error}>{this.state.loginError}</div>
            )}
          </div>
          <div
            className={styles.forgotPassword}
            onClick={() => {
              this.props.history.push("/forgot");
            }}
          >
            Forgot Password ?
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
