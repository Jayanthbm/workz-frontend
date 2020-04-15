import React, { Component } from "react";
import styles from "./reset.module.css";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import HeaderContainer from "../Container/HeaderContainer";
class reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      resetError: "",
      cpass: "",
    };
  }
  handleChange = (val) => {
    this.setState({ password: val.target.value });
  };
  handleClick = () => {
    if (this.state.password === this.state.cpass) {
      const reqBody = {
        password: this.state.password,
      };
      if (this.props.updatePassword) {
        this.props.updatePassword(reqBody);
      }
    } else {
      this.setState({
        resetError: "Passwords do not match",
        password: "",
        cpass: "",
      });
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
      <div className={styles.base}>
        <HeaderContainer />
        <div className={styles.loginContainer}>
          <div className={styles.fieldContainer}>
            <input
              className={styles.resetInput}
              type="password"
              placeholder="Reset Password"
              value={this.state.password}
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
              {" "}
              Reset Password{" "}
            </button>
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
