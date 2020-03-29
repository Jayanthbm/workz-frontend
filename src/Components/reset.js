import React, { Component } from "react";
import styles from "./login.module.css";
class reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      loginError: ""
    };
  }
  handleChange = val => {
    this.setState({ password: val.target.value });
  };
  handleClick = () => {
   
    const reqBody = {
      password: this.state.password
    };
    if (this.props.getLogin) {
      this.props.updatePassword(reqBody);
    }
 }
 componentWillReceiveProps(nextProps){
    if(nextProps.updatePasswordData &&nextProps.updatePasswordData.passwordError==="Password Updated Succesfully"){
        nextProps.history.push("/")
        window.location.reload()
    }
 }
  render() {
    return (
      <div>
        <div className={styles.loginContainer}>
          <label>Reset Password:</label>
          <input
            type="text"
            value={this.state.password}
            onChange={event => this.handleChange(event)}
          ></input>

          <button onClick={this.handleClick}> Reset Password </button>
          {this.state.loginError && (
            <div className={styles.error}>{this.state.loginError}</div>
          )}
        </div>
      </div>
    );
  }
}

export default reset;
