import React, { Component } from 'react';
import { USER_DETAILS } from '../utils/constant';
import * as Cookie from '../utils/Cookie';
import Header from './Header';
import { Form, Switch } from 'antd';
import styles from './Manual.module.css';
import { Checkbox } from '@material-ui/core';
import Navigation from './Navigation';
import Modal from './Modal';
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);

export default class Manual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      labelsSelected: [],
      requestMessage: '',
      hierarchy: false,
      showTimecard: true,
      showManual: false,
      type: null,
    };
  }
  componentDidMount() {
    this.props.postManualTimecard({ myManual: true });
  }
  showModal = (val) => {
    this.setState({ show: true, type: val });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  handleManualtimecard = (flag) => {
    if (flag == 0) {
      this.props.postManualTimecard({
        method: 'approval',
        manualtimecardIds: this.state.labelsSelected,
        comments: this.state.requestMessage,
        status: 'approved',
      });
    } else {
      this.props.postManualTimecard({
        method: 'approval',
        manualtimecardIds: this.state.labelsSelected,
        comments: this.state.requestMessage,
        status: 'rejected',
      });
    }
    this.setState({ requestMessage: '', show: false, messageShow: true });
  };
  handleManualCheckbox = (val, state) => {
    let filteredCatg = { ...val };
    let data = [];
    let dataExist =
      this.state.selected &&
      this.state.selected.length > 0 &&
      this.state.selected.find((categories, i) => {
        return categories.manualTimeId === filteredCatg.manualTimeId;
      });
    if (dataExist) {
      var index = this.state.selected.findIndex(function (cat) {
        return cat.manualTimeId == dataExist.manualTimeId;
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
      labelsSelected: data.map((e) => e.manualTimeId).slice(),
    });
  };
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <Modal show={this.state.show} handleClose={this.hideModal} width="auto">
          <div>
            <textarea
              placeholder="Enter comments"
              row="3"
              className={styles.disputeComment}
              value={this.state.requestMessage}
              onChange={(e) => {
                this.setState({ requestMessage: e.target.value });
              }}
            ></textarea>
            <div className={styles.buttonContainer}>
              <div className={styles.disputeButton}>
                <button
                  onClick={() => this.handleManualtimecard(this.state.type)}
                  className={styles.button}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Header pic={parsedData && parsedData.profilePic} />
        <Navigation headerText={'Manual Timecard'} />
        <div className={styles.manualBase}>
          <div
            onClick={() => {
              this.setState({ add: !this.state.add });
              this.props.postNewCompany();
            }}
            className={styles.addButton}
          >
            Add Manual Timecard
          </div>
          {this.props &&
          this.props.postManualTimecardData &&
          this.props.postManualTimecardData.length > 0 ? (
            <>
              <div className={styles.headHolder}>
                <div className={styles.manualHead}>Checkbox</div>
                <div className={styles.manualHead}>Manual Timecard ID</div>
                <div className={styles.manualHead}>Start Time</div>
                <div className={styles.manualHead}>End Time</div>
                <div className={styles.manualHead}>Reason</div>
              </div>
              {this.props &&
                this.props.postManualTimecardData &&
                !this.props.postManualTimecardData.message &&
                this.props.postManualTimecardData.map((val) => {
                  return (
                    <div className={styles.headHolder}>
                      <div className={styles.manualHead}>
                        {' '}
                        <Checkbox
                          checked={
                            this.state.selected &&
                            this.state.selected.length > 0 &&
                            this.state.selected.find((categories) => {
                              return (
                                categories.manualTimeId === val.manualTimeId
                              );
                            })
                              ? true
                              : false
                          }
                          color="primary"
                          onChange={() => {
                            this.handleManualCheckbox(val, this.state.selected);
                          }}
                        />
                      </div>
                      <div className={styles.manualHead}>
                        {val.manualTimeId}
                      </div>
                      <div className={styles.manualHead}>{val.startTime}</div>
                      <div className={styles.manualHead}>{val.endTime}</div>
                      <div className={styles.manualHead}>
                        {val.manualTimeReason}
                      </div>
                    </div>
                  );
                })}
              <div className={styles.buttonContainer}>
                <div className={styles.disputeButton}>
                  <button
                    onClick={() => this.showModal(0)}
                    className={styles.button}
                  >
                    Approve
                  </button>
                </div>
                <div className={styles.disputeButton}>
                  <button
                    onClick={() => this.showModal(1)}
                    className={styles.button}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.base}>{this.props.postManualError}</div>
          )}
        </div>
      </div>
    );
  }
}
