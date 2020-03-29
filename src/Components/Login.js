import React, { Component } from "react";
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
      password: ""
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

if(nextProps && nextProps.login){
window.location.reload()
}
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <div>Login Screen</div>
        <label>USername:</label>
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
      </div>
    );
  }
}

export default Login;
