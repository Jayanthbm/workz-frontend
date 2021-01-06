import React, { Component } from 'react';
import { USER_DETAILS } from '../utils/constant';
import * as Cookie from '../utils/Cookie';
import Header from '../Container/HeaderContainer';
import { Form, Switch } from 'antd';
import styles from './Manual.module.css';
import { Checkbox } from '@material-ui/core';
import Navigation from './Navigation';
import Modal from './Modal';
import DatePicker from 'react-datepicker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
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
      startTime: '',
      EndTime: '',
      date: new Date(),
      requestMessage: '',
      manualError: false,
      manualModal: false,
    };
  }
  componentDidMount() {
    this.props.postManualTimecard({ myManual: true });
  }
  handleModal = () => {
    this.setState({ manualModal: true });
  };
  showModal = (val) => {
    this.setState({ show: true, type: val });
  };
  hideModal = () => {
    this.setState({ show: false, manualModal: false });
  };
  handleManualtimecard = (flag) => {
    if (flag == 0) {
      this.props.postManualTimecard({
        method: 'delete',
        manualtimecardIds: this.state.labelsSelected,
        // comments: this.state.requestMessage,
        // myManual: true,
        // status: 'approved',
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
  onDateChange = (date) => {
    this.setState({ date: date });
  };
  handleStartTime = (time) => {
    this.setState({
      startTime: time,
      manualError: false,
    });
  };
  handleEndTime = (time) => {
    this.setState({
      EndTime: time,
      manualError: false,
    });
  };
  manualHandler = () => {
    if (
      moment(new Date()).format('YYYY-MM-DD') ==
        moment(new Date(this.state.date)).format('YYYY-MM-DD') &&
      moment(new Date()).format('HH:mm') >
        moment(new Date(this.state.EndTime)).format('HH:mm') &&
      moment(new Date(this.state.startTime)).format('HH:mm') <
        moment(new Date(this.state.EndTime)).format('HH:mm')
    ) {
      if (this.state.requestMessage && this.state.requestMessage.length > 0) {
        this.props.postManualTimecard({
          method: 'request',
          date: moment(this.state.date).format('YYYY-MM-DD'),
          startTime: moment(this.state.startTime).format('HH:mm'),
          EndTime: moment(this.state.EndTime).format('HH:mm'),
          reason: this.state.requestMessage,
        });
        this.setState({
          show: false,
          startTime: '',
          EndTime: '',
          requestMessage: '',
          manualError: false,
        });
      } else {
        alert('Justification is Required');
      }
    } else if (
      moment(new Date()).format('YYYY-MM-DD') >
        moment(new Date(this.state.date)).format('YYYY-MM-DD') &&
      moment(new Date(this.state.startTime)).format('HH:mm') <
        moment(new Date(this.state.EndTime)).format('HH:mm')
    ) {
      if (this.state.requestMessage && this.state.requestMessage.length > 0) {
        this.props.postManualTimecard({
          method: 'request',
          date: moment(this.state.date).format('YYYY-MM-DD'),
          startTime: moment(this.state.startTime).format('HH:mm'),
          EndTime: moment(this.state.EndTime).format('HH:mm'),
          reason: this.state.requestMessage,
        });
        this.setState({
          show: false,
          startTime: '',
          EndTime: '',
          requestMessage: '',
          manualError: false,
        });
      } else {
        alert('Justification is Required');
      }
    } else {
      this.setState({
        manualError: true,
      });
    }
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.postManualTimecardData &&
      nextProps.postManualTimecardData.message ==
        'Manual Timecard Requested Successfully'
    ) {
      this.setState({ manualModal: false });
      this.props.postManualTimecard({ myManual: true });
      this.props.displayToast(nextProps.postManualTimecardData.message);
    }
  }
  render() {
    if (this.state.startTime && this.state.EndTime)
      var duration = moment.duration(
        this.state.EndTime.diff(this.state.startTime)
      );
    console.log(this.props);
    return (
      <div className={styles.base}>
        <Modal
          show={this.state.manualModal}
          handleClose={this.hideModal}
          width="auto"
        >
          <div className={styles.manualContainer}>
            {this.state.manualError && (
              <div style={{ color: 'red' }}>Check the time and try again</div>
            )}
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>Date</div>
              <div className={styles.datePicker}>
                <DatePicker
                  selected={this.state.date}
                  dateFormat={'yyyy-MM-dd'}
                  onChange={(date) => this.onDateChange(date)}
                  maxDate={new Date()}
                  className={styles.dateFormat}
                />
              </div>
            </div>
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>Start Time</div>
              <div className={styles.datePicker}>
                <TimePicker
                  onChange={this.handleStartTime}
                  value={this.state.startTime}
                  showSecond={false}
                  minuteStep={10}
                  // use12Hours={true}
                />
              </div>
            </div>
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>End Time</div>
              <div className={styles.datePicker}>
                <TimePicker
                  onChange={this.handleEndTime}
                  value={this.state.EndTime}
                  showSecond={false}
                  minuteStep={10}
                  // use12Hours={true}
                />
              </div>
            </div>
            {this.state.startTime && this.state.EndTime && (
              <div className={styles.dateHolder}>
                <div className={styles.dateLabel}>Duration</div>
                <div className={styles.datePicker}>
                  <input
                    type="text"
                    value={
                      duration._data.hours > 1
                        ? `${duration._data.hours} hours` +
                          +` ${duration._data.minutes} mins`
                        : duration._data.hours > 0
                        ? `${duration._data.hours} hour` +
                          ` ${duration._data.minutes} mins`
                        : '' + ` ${duration._data.minutes} mins`
                    }
                    readonly
                    disabled
                  />
                </div>
              </div>
            )}
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>Justification</div>
              <div className={styles.datePicker}>
                <textarea
                  placeholder="Enter comments"
                  row="3"
                  className={styles.disputeComment}
                  value={this.state.requestMessage}
                  onChange={(e) => {
                    this.setState({ requestMessage: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <button onClick={this.manualHandler}> Submit</button>
            </div>
          </div>
        </Modal>
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
              this.handleModal();
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
                <div className={styles.manualHead}>Justification</div>
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
                    Delete
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.manbase}>{this.props.postManualError}</div>
          )}
        </div>
      </div>
    );
  }
}
