import React, { Component } from "react";
import styles from "./login.module.css";
import Header from "./Header";
const data = [
  {
    User: "abcd",
    password: "12345"
  }
];
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      password: "",
      loginError: "",
      companyname:""
    };
  }
  handleChange = val => {
    this.setState({ companyname: val.target.value });
  };
  handleClick = () => {
    const reqBody = {
      companyname:this.state.companyname,
      username: this.state.uname,
      password: this.state.password
    };
    if (this.props.getLogin) {
      this.props.getLogin(reqBody);
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.login) {
      if (nextProps.login.password_updated === 0) {
        this.props.history.push("/reset");
      }else{
        window.location.reload()
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
        employeeId:""
      });
    }
  }
  render() {
    console.log(this.state.employeeId)
    return (
      <div className={styles.base}>
        <Header />
        <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
            Sign In
          </div>
        <div className={styles.fieldContainer}>
        
          <label>Company Name:</label>
          <input
            type="text"
            value={this.state.companyname}
            onChange={event => this.handleChange(event)}
          ></input>
            <label>Employee ID:</label>
          <input
            type="text"
            value={this.state.uname}
            onChange={val => this.setState({ uname: val.target.value })}
          ></input>
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={val => this.setState({ password: val.target.value })}
          ></input>
          <button onClick={this.handleClick}> Login </button>
          {this.state.loginError && (
            <div className={styles.error}>{this.state.loginError}</div>
          )}
        </div>
        </div>
      </div>
    );
  }
}

export default Login;
