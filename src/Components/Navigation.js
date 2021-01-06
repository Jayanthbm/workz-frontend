import React, { Component } from 'react';
import styles from './Navigation.module.css';
import moment from 'moment';
import * as Cookie from '../utils/Cookie';
import { USER_DETAILS, ACCESS_TOKEN } from '../utils/constant';
import Modal from './Modal';
import DatePicker from 'react-datepicker';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startTime: '',
      EndTime: '',
      date: new Date(),
      requestMessage: '',
      manualError: false,
    };
  }
  selectHandler = (val) => {};
  handleModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({
      show: false,
      startTime: '',
      EndTime: '',
      date: new Date(),
      requestMessage: '',
      manualError: false,
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
      this.props.manualTimeCardHandler({
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
    } else if (
      moment(new Date()).format('YYYY-MM-DD') >
        moment(new Date(this.state.date)).format('YYYY-MM-DD') &&
      moment(new Date(this.state.startTime)).format('HH:mm') <
        moment(new Date(this.state.EndTime)).format('HH:mm')
    ) {
      this.props.manualTimeCardHandler({
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
      this.setState({
        manualError: true,
      });
    }
  };
  render() {
    console.log(this.props.manualCount);
    return (
      <div className={styles.base}>
        <div className={styles.container}>
          <div className={styles.textHolder}>{this.props.headerText}</div>
          {this.props && this.props.team && (
            <div className={styles.dropdownHolder}>
              <div className={styles.label}>Team</div>
              <div className={styles.selectContainer}>
                <select
                  style={{
                    width: ' 250px',
                    height: '22px',
                  }}
                  onChange={(val) => {
                    this.props.selectHandler(val.target.value);
                  }}
                >
                  {this.props &&
                    this.props.team &&
                    this.props.team.map((val) => {
                      return (
                        <>
                          <option
                            value={
                              val.teamId
                                ? JSON.stringify({
                                    type: 'team',
                                    id: val.teamId,
                                  })
                                : JSON.stringify({
                                    type: 'manager',
                                    id: val.userId,
                                  })
                            }
                            selected={
                              this.props.man_id
                                ? this.props.man_id === val.userId
                                  ? true
                                  : false
                                : this.props.team_id &&
                                  this.props.team_id === val.teamId
                                ? true
                                : false
                            }
                            // this.props.man_id ?  this.props.man_id === val.userId ? true : false
                            // : this.props.team_id ? this.props.team_id===val.teamId?true:false
                          >
                            {val.name}
                          </option>
                          ;
                          {val.userId &&
                            val.teams &&
                            val.teams.map((team) => {
                              return (
                                <option
                                  value={JSON.stringify({
                                    type: 'team',
                                    id: team.teamId,
                                  })}
                                  selected={
                                    this.props.team_id &&
                                    this.props.team_id === team.teamId
                                      ? true
                                      : false
                                  }
                                >
                                  &nbsp; &nbsp; {team.name}
                                </option>
                              );
                            })}
                        </>
                      );
                    })}
                </select>
              </div>
            </div>
          )}
        </div>
        {((this.props.match &&
          this.props.match.path === '/deepdive/:userId/:date') ||
          (this.props.match &&
            this.props.match.path === '/details/:userId/:date')) && (
          <div className={styles.menuContainer}>
            {/* <div className={styles.link}>Team Summary</div>
            <div className={styles.link}>Activity</div>
            <div className={styles.link}>Metrics</div> */}
            <div
              className={
                this.props.match.path === '/deepdive/:userId/:date' &&
                this.props.match.params.userId != parsedData.userId
                  ? styles.linkActive
                  : styles.link
              }
              onClick={() =>
                this.props.history.push(
                  `/deepdive/${this.props.match.params.userId}/${moment(
                    new Date(this.props.match.params.date)
                  ).format('YYYY-MM-DD')}`
                )
              }
            >
              Deepdive
            </div>
            <div
              className={
                this.props.match.path === '/deepdive/:userId/:date' &&
                this.props.match.params.userId == parsedData.userId
                  ? styles.linkActive
                  : styles.link
              }
              onClick={() => {
                localStorage.setItem(
                  'secondaryDrop',
                  JSON.stringify({
                    id: parsedData.userId,
                    date: moment(new Date()).format('YYYY-MM-DD'),
                  })
                );
                this.props.history.push(
                  `/deepdive/${parsedData.userId}/${moment(new Date()).format(
                    'YYYY-MM-DD'
                  )}`
                );
                window.location.reload();
              }}
            >
              Me
            </div>
            {this.props.match.params.userId == parsedData.userId && (
              <div
                className={styles.link}
                onClick={() => {
                  this.props.history.push(`/manualtime`);
                }}
              >
                Manual timecard
              </div>
            )}
          </div>
        )}

        {this.props.match && this.props.match.path == '/admin' && (
          <div className={styles.menuContainer}>
            {/* <div className={styles.link}>Team Summary</div>
            <div className={styles.link}>Activity</div>
            <div className={styles.link}>Metrics</div> */}
            <div
              className={
                this.props.match.path === '/admin' &&
                this.props.location &&
                this.props.location.state &&
                this.props.location.state.tab == 'timecard'
                  ? styles.linkActive
                  : styles.link
              }
              onClick={() => this.props.showTimecard()}
            >
              Timecard{' '}
              {this.props &&
              this.props.timecardCount &&
              this.props.timecardCount > 0
                ? `(${this.props.timecardCount})`
                : ''}
            </div>
            <div
              className={
                this.props.match.path === '/admin' &&
                this.props.location &&
                this.props.location.state &&
                this.props.location.state.tab == 'manual'
                  ? styles.linkActive
                  : styles.link
              }
              onClick={() => this.props.showManual()}
            >
              Manual{' '}
              {this.props &&
              this.props.manualCount &&
              this.props.manualCount > 0
                ? `(${this.props.manualCount})`
                : ''}
            </div>
            <div
              className={
                this.props.match.path === '/admin' &&
                this.props.location &&
                this.props.location.state &&
                this.props.location.state.tab == 'company'
                  ? styles.linkActive
                  : styles.link
              }
              onClick={() => this.props.showCompany()}
            >
              Company
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Navigation;
