import React, { Component } from "react";
import styles from "./login.module.css"
import Header from "./Header"
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
      loginError:""
    };
  }
  handleChange = val => {
    this.setState({ uname: val.target.value });
  };
  handleClick = () => {
   
    const reqBody = {
      username: this.state.uname,
      password: this.state.password,
    };
    if (this.props.getLogin) {
      this.props.getLogin(reqBody);
    }
 }
  componentWillReceiveProps(nextProps){
console.log(nextProps)
if(nextProps && nextProps.login){
window.location.reload()
}
if(nextProps && nextProps.loginError && nextProps.loginError.status==="ERROR"){
  this.setState({
    loginError: nextProps.loginError.loginError,
    uname:"",
    password:""
  })
  }
  }
  render() {
    console.log(this.props)
    return (
      <div className={styles.base}>
        <Header/>
        <div className={styles.loginContainer}>
        <label>Username:</label>
        <input
          type="text"
          value={this.state.uname}
          onChange={event => this.handleChange(event)}
        ></input>
        <label>Password:</label>
        <input
          type="password"
          value={this.state.password}
          onChange={val => this.setState({ password: val.target.value })}
        ></input>
        <button onClick={this.handleClick}> Login </button>
{this.state.loginError && <div className={styles.error}>
  {this.state.loginError}
  </div>}
  </div>
      </div>
    );
  }
}

export default Login;
