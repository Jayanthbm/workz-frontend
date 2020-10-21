import React, { Component } from "react";
import styles from "./Company.module.css";
class CreateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fullname: "",
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
  handleClick = () => {
    this.props.postNewCompany({
      method: "add",
      name: this.state.name,
      fullName: this.state.fullname,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      pincode: this.state.pincode,
      country: this.state.country,
      billingPlan: this.state.billingPlan,
      billingRate: this.state.billingRate,
      billingCurrency: this.state.billingCurrency,
      timecardsize: this.state.timecardsize,
      timecardbreakupsize: this.state.timecardbreakupsize,
      enablewebcam: this.state.enablewebcam,
      enablescreenshot: this.state.enablescreenshot,
      mousePerTC: this.state.mousePerTC,
      keysPerTC: this.state.keysPerTC,
      IntDiscard: this.state.IntDiscard,
      intRed: this.state.intRed,
      intYellow: this.state.intYellow,
      termsConditions: this.state.termsConditions,
    });
    this.setState({
      name: "",
      fullname: "",
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
    });
  };
  componentDidMount = () => {
    this.props.postNewCompany();
  };
  // componentWillReceiveProps = (nextProps) => {
  //   if (
  //     nextProps &&
  //     nextProps.postNewCompanyData !== this.props.postNewCompanyData
  //   ) {
  //     this.setState({error:})
  //   }
  // };
  render() {
    return (
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
            value={this.state.state}
            onChange={(val) => {
              this.setState({ state: val.target.value });
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
          <select
            placeholder="Enable Screenshot"
            className={styles.formInput}
            onChange={(val) => {
              this.setState({ enablescreenshot: val.target.value });
            }}
          >
            <option value="" disabled selected>
              {" "}
              Enable Screenshot
            </option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <input
            type="text"
            placeholder="Mouse per TC"
            className={styles.formInput}
            value={this.state.mousePerTC}
            onChange={(val) => {
              this.setState({ mousePerTC: val.target.value });
            }}
          ></input>
          <input
            type="text"
            placeholder="Keys per TC"
            className={styles.formInput}
            value={this.state.keysPerTC}
            onChange={(val) => {
              this.setState({ keysPerTC: val.target.value });
            }}
          ></input>
          <input
            type="text"
            placeholder="Int discard"
            className={styles.formInput}
            value={this.state.IntDiscard}
            onChange={(val) => {
              this.setState({ IntDiscard: val.target.value });
            }}
          ></input>
          <input
            type="text"
            placeholder="Int red"
            className={styles.formInput}
            value={this.state.intRed}
            onChange={(val) => {
              this.setState({ intRed: val.target.value });
            }}
          ></input>
          <input
            type="text"
            placeholder="Int Yellow"
            className={styles.formInput}
            value={this.state.intYellow}
            onChange={(val) => {
              this.setState({ intYellow: val.target.value });
            }}
          ></input>
          <textarea
            placeholder="Address"
            className={styles.formInput}
            value={this.state.termsConditions}
            onChange={(val) => {
              this.setState({ termsConditions: val.target.value });
            }}
          ></textarea>
          {/* <label>Email:</label> */}

          <button onClick={this.handleClick} className={styles.formButton}>
            Submit
          </button>

          {this.state.error && (
            <div className={styles.error}>{this.state.error}</div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateCompany;
