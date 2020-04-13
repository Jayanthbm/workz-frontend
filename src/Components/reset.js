import React, { Component } from "react";
import styles from "./reset.module.css";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
class reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      resetError: "",
    };
  }
  handleChange = (val) => {
    this.setState({ password: val.target.value });
  };
  handleClick = () => {
    const reqBody = {
      password: this.state.password,
    };
    if (this.props.updatePassword) {
      this.props.updatePassword(reqBody);
    }
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      nextProps.updatePasswordData &&
      nextProps.updatePasswordData.passwordError ===
        "Password Updated Succesfully"
    ) {
      Cookie.deleteCookie(USER_DETAILS);
      Cookie.deleteCookie(ACCESS_TOKEN);
      nextProps.history.push("/");
      window.location.reload();
    } else {
      this.setState({
        resetError:
          nextProps.updatePasswordData &&
          nextProps.updatePasswordData.passwordError,
      });
    }
  }
  render() {
    return (
      <div>
        <div className={styles.loginContainer}>
          <div className={styles.fieldContainer}>
            <label>Reset Password:</label>
            <input
              className={styles.resetInput}
              type="text"
              value={this.state.password}
              onChange={(event) => this.handleChange(event)}
            ></input>

            <button onClick={this.handleClick}> Reset Password </button>
            {this.state.resetError && (
              <div className={styles.error}>{this.state.resetError}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default reset;
