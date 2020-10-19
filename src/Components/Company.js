import React, { Component } from "react";
import styles from "./Company.module.css";
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fullname: "",
      phone: "",
      email: "",
      desc: "",
      error: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      billingPlan: "",
      billingRate: "",
      billingCurrency: "",
      timecardsize: "",
      timecardbreakupsize: "",
      enablewebcam: "",
      enablescreenshot: "",
      mousePerTC: "",
      keysPerTC: "",
      IntDiscard: "",
      intRed: "",
      intYellow: "",
      termsConditions: "",
    };
  }
  render() {
    return (
      <div>
        <div className={styles.formContainer}>
          <div className={styles.fieldContainer}>
            {/* <label>Name:</label> */}
            <input
              className={styles.formInput}
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={(val) => {
                this.setState({ name: val.target.value });
              }}
            ></input>
            {/* <label>Company Name:</label> */}
            <input
              type="text"
              placeholder="Full Name"
              className={styles.formInput}
              value={this.state.fullname}
              onChange={(val) => {
                this.setState({ fullname: val.target.value });
              }}
            ></input>
            {/* <label>Phone:</label> */}
            <textarea
              placeholder="Address"
              className={styles.formInput}
              value={this.state.address}
              onChange={(val) => {
                this.setState({ address: val.target.value });
              }}
            ></textarea>
            <input
              type="text"
              placeholder="Country"
              className={styles.formInput}
              value={this.state.country}
              onChange={(val) => {
                this.setState({ country: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="State"
              className={styles.formInput}
              value={this.state.city}
              onChange={(val) => {
                this.setState({ city: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="City"
              className={styles.formInput}
              value={this.state.city}
              onChange={(val) => {
                this.setState({ city: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Pincode"
              className={styles.formInput}
              value={this.state.pincode}
              onChange={(val) => {
                this.setState({ pincode: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Billing Plan"
              className={styles.formInput}
              value={this.state.billingPlan}
              onChange={(val) => {
                this.setState({ billingPlan: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Billing Rate"
              className={styles.formInput}
              value={this.state.billingRate}
              onChange={(val) => {
                this.setState({ billingRate: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Billing Currency"
              className={styles.formInput}
              value={this.state.billingCurrency}
              onChange={(val) => {
                this.setState({ billingCurrency: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Timecard Size"
              className={styles.formInput}
              value={this.state.timecardsize}
              onChange={(val) => {
                this.setState({ timecardsize: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Timecard Breakup Size"
              className={styles.formInput}
              value={this.state.timecardbreakupsize}
              onChange={(val) => {
                this.setState({ timecardbreakupsize: val.target.value });
              }}
            ></input>
            <input
              type="text"
              placeholder="Timecard Breakup Size"
              className={styles.formInput}
              value={this.state.timecardbreakupsize}
              onChange={(val) => {
                this.setState({ timecardbreakupsize: val.target.value });
              }}
            ></input>
            <select
              placeholder="Enable Webcam"
              className={styles.formInput}
              onChange={(val) => {
                this.setState({ enablewebcam: val.target.value });
              }}
            >
              <option value="" disabled selected>
                {" "}
                Enable Webcam
              </option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {/* <label>Email:</label> */}
            <input
              type="email"
              placeholder="Email"
              className={styles.formInput}
              value={this.state.email}
              onChange={(val) => {
                this.setState({ email: val.target.value });
              }}
            ></input>
            {this.props.location.state &&
              this.props.location.state.type === "Demo" && (
                <>
                  {/* <label>Requirement Description:</label> */}
                  <textarea
                    className={styles.formInput}
                    placeholder="Requirement Description"
                    value={this.state.desc}
                    onChange={(val) => {
                      this.setState({ desc: val.target.value });
                    }}
                  ></textarea>
                </>
              )}

            {this.props.location.state &&
              this.props.location.state.type === "Support" && (
                <>
                  {/* <label>Issue Description:</label> */}
                  <textarea
                    className={styles.formInput}
                    placeholder="Issue Description"
                    value={this.state.desc}
                    onChange={(val) => {
                      this.setState({ desc: val.target.value });
                    }}
                  ></textarea>
                </>
              )}
            <button onClick={this.handleClick} className={styles.formButton}>
              {" "}
              Submit{" "}
            </button>
            <button
              className={styles.formButton}
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              {" "}
              Back to login{" "}
            </button>
            {this.state.error && (
              <div className={styles.error}>{this.state.error}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
