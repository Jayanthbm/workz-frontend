import React, { Component } from "react";
import styles from "./reset.module.css";
import HeaderContainer from "../Container/HeaderContainer";
class reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgotpassword: "",
      forgotSuccess: "",
      error: "",
      forgotError: "",
      cpass: "",
    };
  }
  handleChange = (val) => {
    this.setState({ forgotpassword: val.target.value });
  };
  handleClick = () => {
    let pass = this.state.forgotpassword.trim();
    console.log(pass);
    if (this.state.forgotpassword === this.state.cpass) {
      const reqBody = {
        password: pass,
      };
      if (this.props.forgotPost) {
        if (pass.length === 0) {
          this.setState({
            forgotError: "Password can't be empty",
            forgotpassword: "",
            forgotSuccess: "",
            cpass: "",
          });
        } else this.props.forgotPost(this.props.match.params.token, reqBody);
      }
    } else {
      this.setState({
        forgotError: "Passwords do not match",
        forgotpassword: "",
        forgotSuccess: "",
        cpass: "",
      });
    }
  };
  componentDidMount() {
    if (this.props.forgotValidate) {
      console.log(this.props.match.params.token);
      this.props.forgotValidate({ token: this.props.match.params.token });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.passwordError !== this.props.passwordError) {
      console.log(nextProps.passwordError);
      this.setState({
        forgotError: nextProps.passwordError,
        forgotpassword: "",
        cpass: "",
      });
    }
    if (nextProps.password !== this.props.password) {
      console.log(nextProps.password);
      this.setState({
        forgotSuccess: nextProps.password.message,
        forgotpassword: "",
        cpass: "",
      });
      this.props.history.push({
        pathname: "/",
        state: { forgotMessage: nextProps.password.message },
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <HeaderContainer />
        <div className={styles.loginContainer}>
          {this.props.forgot === "REQUESTING" && (
            <div className={styles.success}>
              Please wait while we check your request
            </div>
          )}
          {this.props.forgot === "SUCCESS" && (
            <div className={styles.fieldContainer}>
              <input
                className={styles.resetInput}
                type="password"
                placeholder="New Password"
                value={this.state.forgotpassword}
                onChange={(event) => this.handleChange(event)}
              ></input>
              <input
                className={styles.resetInput}
                type="password"
                placeholder="Confirm Password"
                value={this.state.cpass}
                onChange={(event) => {
                  this.setState({ cpass: event.target.value });
                }}
              ></input>
              <button className={styles.resetButton} onClick={this.handleClick}>
                Reset Password
              </button>
              {this.state.forgotError && (
                <div className={styles.error}>{this.state.forgotError}</div>
              )}
              {this.state.forgotSuccess && (
                <div className={styles.success}>{this.state.forgotSuccess}</div>
              )}
            </div>
          )}
          {this.props.forgot === "ERROR" && (
            <div className={styles.error}>Invalid Request</div>
          )}
        </div>
      </div>
    );
  }
}

export default reset;
