import React, { Component } from "react";
import styles from "./reset.module.css";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import HeaderContainer from "../Container/HeaderContainer";
class reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgotpassword: "",
      ForgotError: "",
      uid: "",
      success: "",
    };
  }
  handleChange = (val) => {
    this.setState({ uid: val.target.value });
  };
  handleClick = () => {
    let uid = this.state.uid.trim();
    const reqBody = {
      username: uid,
    };
    if (this.props.forgotPass) {
      if (uid.length === 0) {
        this.setState({ ForgotError: "Employee Id / Email cannot be empty" });
      } else this.props.forgotPass(reqBody);
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.forgotPassDetails !== this.props.forgotPassDetails) {
      this.setState({ success: nextProps.forgotPassDetails.message });
    }
    if (nextProps.forgotPassError !== this.props.forgotPassError) {
      this.setState({ ForgotError: nextProps.forgotPassError });
    }
  }
  //   componentWillReceiveProps(nextProps) {
  //     console.log(nextProps);
  //     if (
  //       nextProps.updatePasswordData &&
  //       nextProps.updatePasswordData.passwordError ===
  //         "Password Updated Succesfully"
  //     ) {
  //       Cookie.deleteCookie(USER_DETAILS);
  //       Cookie.deleteCookie(ACCESS_TOKEN);
  //       nextProps.history.push("/");
  //       window.location.reload();
  //     } else {
  //       this.setState({
  //         resetError:
  //           nextProps.updatePasswordData &&
  //           nextProps.updatePasswordData.passwordError,
  //       });
  //     }
  //   }
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <HeaderContainer />
        <div className={styles.loginContainer}>
          <div className={styles.fieldContainer}>
            <input
              className={styles.resetInput}
              type="text"
              placeholder="Enter your Employee ID/Email ID"
              value={this.state.uid}
              onChange={(event) => this.handleChange(event)}
            ></input>

            <button className={styles.resetButton} onClick={this.handleClick}>
              Send Reset Link
            </button>
            {this.state.ForgotError && (
              <div className={styles.error}>{this.state.ForgotError}</div>
            )}
            {this.state.success && (
              <div className={styles.success}>{this.state.success}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default reset;
