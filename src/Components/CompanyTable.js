import { Checkbox } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './Company.module.css';
import CreateCompany from './CreateCompany';
class CompanyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      name: '',
      fullname: '',
      error: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      billingPlan: '',
      billingRate: '',
      billingCurrency: '',
      timecardsize: '',
      timecardbreakupsize: '',
      enablewebcam: '',
      enablescreenshot: '',
      mousePerTC: '',
      keysPerTC: '',
      IntDiscard: '',
      intRed: '',
      intYellow: '',
      termsConditions: '',
      selected: [],
      labelsSelected: [],
    };
  }
  handleClick = () => {
    this.props.postNewCompany({
      method: 'add',
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
      name: '',
      fullname: '',
      error: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      billingPlan: '',
      billingRate: '',
      billingCurrency: '',
      timecardsize: '',
      timecardbreakupsize: '',
      enablewebcam: '',
      enablescreenshot: '',
      mousePerTC: '',
      keysPerTC: '',
      IntDiscard: '',
      intRed: '',
      intYellow: '',
      termsConditions: '',
    });
  };
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    // if (
    //   nextProps &&
    //   nextProps.postNewCompanyData !== this.props.postNewCompanyData
    // ) {
    //   this.props.postNewCompany();
    // }
  };
  handleCompanyCheckbox = (val, state) => {
    let filteredCatg = { ...val };
    let data = [];
    let dataExist =
      this.state.selected &&
      this.state.selected.length > 0 &&
      this.state.selected.find((categories, i) => {
        return categories.companyId === filteredCatg.companyId;
      });
    if (dataExist) {
      var index = this.state.selected.findIndex(function (cat) {
        return cat.companyId == dataExist.companyId;
      });
      data.push(...this.state.selected);
      if (index == 0) {
        data.splice(index, 1);
        this.setState({ selected: data });
      } else {
        data.splice(index, 1);
        this.setState({ selected: data });
      }
    } else {
      data.push(...this.state.selected);
      data.push(filteredCatg);
      this.setState({ selected: data, firstLoader: true });
    }

    this.setState({
      labelsSelected: data.map((e) => e.companyId).slice(),
    });
  };
  handleDelete = async () => {
    await this.props.postNewCompany({
      method: 'delete',
      compnayId: this.state.labelsSelected,
    });
    // this.props.postNewCompany();
  };
  render() {
    return (
      <div className={styles.addHolder}>
        {this.props &&
        this.props.postNewCompanyData &&
        this.props.postNewCompanyData.length > 0 ? (
          <>
            <div className={styles.baseHolder}></div>
            <div className={styles.headHolder}>
              <div className={styles.manualHead}></div>
              <div className={styles.manualHead}>Name</div>
              <div className={styles.manualHead}>Full Name</div>
              <div className={styles.manualHead}>Address</div>
              <div className={styles.manualHead}>City</div>
              <div className={styles.manualHead}>State</div>
              <div className={styles.manualHead}>Pincode</div>
              <div className={styles.manualHead}>Country</div>
              <div className={styles.manualHead}>Billing Plan</div>
              <div className={styles.manualHead}>Billing Rate</div>
              <div className={styles.manualHead}>Billing Currency</div>
              <div className={styles.manualHead}>Timecard Size</div>
              <div className={styles.manualHead}>Timecard Breakup Size</div>
              <div className={styles.manualHead}>Enable Webcam</div>
              <div className={styles.manualHead}>Enable Screenshot</div>
              <div className={styles.manualHead}>mousePerTC</div>
              <div className={styles.manualHead}>keysPerTC</div>
              <div className={styles.manualHead}>IntDiscard</div>
              <div className={styles.manualHead}>intRed</div>
              <div className={styles.manualHead}>intYellow</div>
              <div className={styles.manualHead}>Terms</div>
            </div>
            {this.props &&
              this.props.postNewCompanyData &&
              this.props.postNewCompanyData.length > 0 &&
              typeof this.props.postNewCompanyData != 'string' &&
              !this.props.postNewCompanyData.message &&
              this.props.postNewCompanyData.map((val) => {
                return (
                  <div className={styles.headHolder}>
                    <div className={styles.manualHead}>
                      {' '}
                      <Checkbox
                        checked={
                          this.state.selected &&
                          this.state.selected.length > 0 &&
                          this.state.selected.find((categories) => {
                            return categories.companyId === val.companyId;
                          })
                            ? true
                            : false
                        }
                        color="primary"
                        onChange={() => {
                          this.handleCompanyCheckbox(val, this.state.selected);
                        }}
                      />
                    </div>
                    <div className={styles.manualHead}>{val.name}</div>
                    <div className={styles.manualHead}>{val.fullName}</div>
                    <div className={styles.manualHead}>{val.address}</div>
                    <div className={styles.manualHead}>{val.city}</div>
                    <div className={styles.manualHead}>{val.state}</div>
                    <div className={styles.manualHead}>{val.pincode}</div>
                    <div className={styles.manualHead}>{val.country}</div>
                    <div className={styles.manualHead}>{val.billingPlan}</div>
                    <div className={styles.manualHead}>{val.billingRate}</div>
                    <div className={styles.manualHead}>
                      {val.billingCurrency}
                    </div>
                    <div className={styles.manualHead}>{val.timecardsize}</div>
                    <div className={styles.manualHead}>
                      {val.timecardbreakupsize}
                    </div>
                    <div className={styles.manualHead}>{val.enablewebcam}</div>
                    <div className={styles.manualHead}>
                      {val.enablescreenshot}
                    </div>
                    <div className={styles.manualHead}>{val.mousePerTC}</div>
                    <div className={styles.manualHead}>{val.keysPerTC}</div>
                    <div className={styles.manualHead}>{val.IntDiscard}</div>
                    <div className={styles.manualHead}>{val.intRed}</div>
                    <div className={styles.manualHead}>{val.intYellow}</div>
                    <div className={styles.manualHead}>
                      {val.termsConditions}
                    </div>
                  </div>
                );
              })}
            <div className={styles.buttonContainer}>
              <div className={styles.disputeButton}>
                <button onClick={this.handleDelete} className={styles.button}>
                  Delete
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.adminBase}>{this.props.postManualError}</div>
        )}
      </div>
    );
  }
}

export default CompanyTable;
