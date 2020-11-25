import React, { Component } from 'react';
import offline from '../images/offlinepc.png';
import online from '../images/onlinepc.png';
import onlineseat from '../images/onlineseat.png';
import offlineseat from '../images/offlineseat.png';
import leftoffline from '../images/left-offline-cp.png';
import leftonline from '../images/left-online-cp.png';
import styles from './Team.module.css';
import Header from '../Container/HeaderContainer';
import Navigation from './Navigation';
import ProfileStatus from './ProfileStatus';

import * as Cookie from '../utils/Cookie';
import { USER_DETAILS, ACCESS_TOKEN } from '../utils/constant';

const data = [
  {
    name: 'abc',
    status: 'offline',
  },
  {
    name: 'def',
    status: 'online',
  },
  {
    name: 'pqr',
    status: 'online',
  },
  {
    name: 'xyz',
    status: 'offline',
  },
  {
    name: 'asd',
    status: 'online',
  },
];

const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);
class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        this.props.teamDetails &&
        this.props.teamDetails.teams &&
        this.props.teamDetails.teams[0].teamId,
      team_id: '',
      man_id: '',
      a: [],
      b: [],
      c: [],
    };
  }
  componentDidMount() {
    if (parsedData.previousPassword === null) {
      this.props.history.push('/reset');
    } else {
      if (this.props.getTeam) {
        this.props.getTeam(parsedData.userId);
        if (parsedData.isManager === 1) {
          this.setState({ man_id: parsedData.userId });
        }
        this.props.getDeepdive({
          userId: '21',
          date: '2020-04-13',
        });
      }
    }
  }
  summaryHandler = (val) => {
    this.props.getTeamUser(val);
    this.setState({ team_id: val });
  };
  selectHandler = (val) => {
    let data = JSON.parse(val);
    if (data.type === 'manager') {
      this.props.getTeam(data.id);
    } else {
      this.props.getTeamUser(data.id);
    }
  };
  handleManager = (val) => {
    this.props.getTeam(val);
    this.setState({ man_id: val });
  };
  activeHandler = (timeStamp) => {
    var today = new Date();
    var onlineDate = new Date(timeStamp);
    var diffMs = today - onlineDate;
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return (
      diffDays +
      ' days, ' +
      diffHrs +
      ' hours, ' +
      diffMins +
      ' minutes ' +
      'ago'
    );
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.teamError &&
      nextProps.teamError.status === 'ERROR' &&
      nextProps.teamError.teamError === 'You must be logged in.'
    ) {
      Cookie.deleteCookie(ACCESS_TOKEN);
      Cookie.deleteCookie(USER_DETAILS);
      window.location.reload();
    }
  }

  chunkify = (a, n, balanced) => {
    if (n < 2) return [a];

    var len = a.length,
      out = [],
      i = 0,
      size;

    if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
        out.push(a.slice(i, (i += size)));
      }
    } else if (balanced) {
      while (i < len) {
        size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, (i += size)));
      }
    } else {
      n--;
      size = Math.floor(len / n);
      if (len % size === 0) size--;
      while (i < size * n) {
        out.push(a.slice(i, (i += size)));
      }
      out.push(a.slice(size * n));
    }

    return out;
  };

  render() {
    const users1 =
      this.props.teamDetails &&
      this.props.teamDetails.length === 1 &&
      this.props.teamDetails[0] &&
      this.props.teamDetails[0].users &&
      this.props.teamDetails[0].users.length > 10 &&
      this.props.teamDetails[0].managers &&
      this.props.teamDetails[0].managers.length === 0 &&
      this.chunkify(this.props.teamDetails[0].users, 3, true);

    const userArray1 = users1 && users1[0] && users1[0];
    const userArray2 = users1 && users1[1] && users1[1];
    const userArray3 = users1 && users1[2] && users1[2];

    const userDetails = Cookie.getCookie(USER_DETAILS);
    let parsedData = userDetails && JSON.parse(userDetails);

    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.profilePic} />
        <Navigation
          team={parsedData && parsedData.dropdown}
          selectHandler={this.selectHandler}
          team_id={this.state.team_id}
          history={this.props.history}
          {...this.props}
          man_id={this.state.man_id}
          headerText={'Virtual Office'}
        />
        <div className={styles.detailsHolder}>
          <div className={styles.countryContainer}>
            <div className={styles.usersContainer}>
              {this.props &&
                this.props.teamDetails &&
                this.props.teamDetails.map((val, i) => {
                  return (
                    <div className={styles.countryHolder}>
                      <div className={styles.header16}> {val.name}</div>
                      <div className={styles.Holder}>
                        {val.managers && val.managers.length > 0 && (
                          <div className={styles.managerContainer}>
                            <div className={styles.manUserContainer}>
                              {val.managers.map((man, i) => {
                                return (
                                  <div>
                                    <div className={styles.countryUsers}>
                                      {(man[0].onlineStatus === 'offline' ||
                                        man[0].onlineStatus === 'inactive') && (
                                        <>
                                          <span className={styles.seatHolder}>
                                            <span
                                              style={{ bottom: '75px' }}
                                              className={styles.tooltiptext}
                                            >
                                              {
                                                <>
                                                  <div
                                                    className={
                                                      styles.titleNameContainer
                                                    }
                                                  >
                                                    <div
                                                      style={{
                                                        color: '#5BB5F7',
                                                      }}
                                                    >
                                                      {man[0].name}
                                                    </div>
                                                    <div
                                                      className={
                                                        styles.titleCityHolder
                                                      }
                                                    >
                                                      {man[0].city}
                                                    </div>
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Message : {man[0].message}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Skype : {man[0].skype}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Mobile : {man[0].mobile}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Email : {man[0].emailId}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.lastActiveHolder
                                                    }
                                                  >
                                                    Last Active:{' '}
                                                    {man[0].onlineStatus ===
                                                    'active'
                                                      ? 'Active Now'
                                                      : this.activeHandler(
                                                          man[0]
                                                            .onlineStatusTimestamp
                                                        )}
                                                  </div>
                                                </>
                                              }
                                            </span>

                                            <span>
                                              <ProfileStatus
                                                pic={man[0].profilePic}
                                                right={-15}
                                                top={25}
                                                height={50}
                                                width={50}
                                                offline={true}
                                                rightSide={true}
                                                man={true}
                                              />
                                              <div
                                                className={styles.offlineBottom}
                                                onClick={() =>
                                                  this.handleManager(
                                                    man[0].userId
                                                  )
                                                }
                                              ></div>
                                            </span>
                                          </span>
                                          {man.length > 1 &&
                                            man &&
                                            man[1] &&
                                            man[1].map((sum) => {
                                              return (
                                                <div
                                                  onClick={() =>
                                                    this.summaryHandler(
                                                      sum.teamId
                                                    )
                                                  }
                                                  className={styles.summaryBase}
                                                >
                                                  <div
                                                    className={
                                                      styles.summaryHeader
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        (sum.active /
                                                          sum.total_employees) *
                                                          100 >
                                                        80
                                                          ? '#8BC646'
                                                          : (sum.active /
                                                              sum.total_employees) *
                                                              100 >
                                                            50
                                                          ? '#efc165'
                                                          : '#D1BD94',
                                                    }}
                                                  >
                                                    {sum.team}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.summaryContainer
                                                    }
                                                  >
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Total Employees
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.total_employees}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Active
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.active
                                                              ? (sum.active /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#8bc646',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.active}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        InActive
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.inactive
                                                              ? (sum.inactive /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#efc165',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.inactive}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Offline
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.offline
                                                              ? (sum.offline /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#cececf',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.offline}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                        </>
                                      )}
                                      {man[0].onlineStatus === 'active' && (
                                        <>
                                          <span className={styles.seatHolder}>
                                            <span
                                              style={{ bottom: '75px' }}
                                              className={styles.tooltiptext}
                                            >
                                              {
                                                <>
                                                  <div
                                                    className={
                                                      styles.titleNameContainer
                                                    }
                                                  >
                                                    <div
                                                      style={{
                                                        color: '#5BB5F7',
                                                      }}
                                                    >
                                                      {man[0].name}
                                                    </div>
                                                    <div
                                                      className={
                                                        styles.titleCityHolder
                                                      }
                                                    >
                                                      {man[0].city}
                                                    </div>
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Message : {man[0].message}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Skype : {man[0].skype}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Mobile : {man[0].mobile}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Email : {man[0].emailId}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.lastActiveHolder
                                                    }
                                                  >
                                                    Last Active:{' '}
                                                    {man[0].onlineStatus ===
                                                    'active'
                                                      ? 'Active Now'
                                                      : this.activeHandler(
                                                          man[0]
                                                            .onlineStatusTimestamp
                                                        )}
                                                  </div>
                                                </>
                                              }
                                            </span>
                                            <span>
                                              <ProfileStatus
                                                pic={man[0].profilePic}
                                                right={-15}
                                                top={25}
                                                height={50}
                                                width={50}
                                                active={true}
                                                rightSide={true}
                                                man={true}
                                              />
                                              <div
                                                className={styles.onlineBottom}
                                                onClick={() =>
                                                  this.handleManager(
                                                    man[0].userId
                                                  )
                                                }
                                              ></div>
                                            </span>
                                          </span>
                                          {man.length > 1 &&
                                            man &&
                                            man[1] &&
                                            man[1].map((sum) => {
                                              return (
                                                <div
                                                  onClick={() =>
                                                    this.summaryHandler(
                                                      sum.teamId
                                                    )
                                                  }
                                                  className={styles.summaryBase}
                                                >
                                                  <div
                                                    className={
                                                      styles.summaryHeader
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        (sum.active /
                                                          sum.total_employees) *
                                                          100 >
                                                        80
                                                          ? '#8BC646'
                                                          : (sum.active /
                                                              sum.total_employees) *
                                                              100 >
                                                            50
                                                          ? '#efc165'
                                                          : '#D1BD94',
                                                    }}
                                                  >
                                                    {sum.team}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.summaryContainer
                                                    }
                                                  >
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Total Employees
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.total_employees}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Active
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.active
                                                              ? (sum.active /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#8bc646',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.active}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        InActive
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.inactive
                                                              ? (sum.inactive /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#efc165',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.inactive}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Offline
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.offline
                                                              ? (sum.offline /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#cececf',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.offline}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                        </>
                                      )}
                                      {man[0].onlineStatus === 'passive' && (
                                        <div>
                                          <span className={styles.seatHolder}>
                                            <span
                                              className={styles.tooltiptext}
                                              style={{ bottom: '75px' }}
                                            >
                                              {
                                                <>
                                                  <div
                                                    className={
                                                      styles.titleNameContainer
                                                    }
                                                  >
                                                    <div
                                                      style={{
                                                        color: '#5BB5F7',
                                                      }}
                                                    >
                                                      {man[0].name}
                                                    </div>
                                                    <div
                                                      className={
                                                        styles.titleCityHolder
                                                      }
                                                    >
                                                      {man[0].city}
                                                    </div>
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Message : {man[0].message}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Skype : {man[0].skype}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Mobile : {man[0].mobile}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleDataHolder
                                                    }
                                                  >
                                                    Email : {man[0].emailId}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.lastActiveHolder
                                                    }
                                                  >
                                                    Last Active:{' '}
                                                    {man[0].onlineStatus ===
                                                    'active'
                                                      ? 'Active Now'
                                                      : this.activeHandler(
                                                          man[0]
                                                            .onlineStatusTimestamp
                                                        )}
                                                  </div>
                                                </>
                                              }
                                            </span>
                                            {i % 2 > 0 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={man[0].profilePic}
                                                  right={0}
                                                  top={25}
                                                  height={50}
                                                  width={50}
                                                  passive={true}
                                                  man={true}
                                                  rightSide={true}
                                                />
                                                <div
                                                  className={
                                                    styles.inactiveBottom
                                                  }
                                                  onClick={() =>
                                                    this.handleManager(
                                                      man[0].userId
                                                    )
                                                  }
                                                ></div>
                                              </span>
                                            )}
                                            {i % 2 < 1 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={man[0].profilePic}
                                                  right={-15}
                                                  top={25}
                                                  height={50}
                                                  width={50}
                                                  passive={true}
                                                  man={true}
                                                  rightSide={true}
                                                />
                                                <div
                                                  className={
                                                    styles.inactiveBottom
                                                  }
                                                  onClick={() =>
                                                    this.handleManager(
                                                      man[0].userId
                                                    )
                                                  }
                                                ></div>
                                              </span>
                                            )}
                                          </span>
                                          {man &&
                                            man.length > 0 &&
                                            man[1] &&
                                            man[1].length &&
                                            man[1].map((sum) => {
                                              return (
                                                <div
                                                  onClick={() =>
                                                    this.summaryHandler(
                                                      sum.teamId
                                                    )
                                                  }
                                                  className={styles.summaryBase}
                                                >
                                                  <div
                                                    className={
                                                      styles.summaryHeader
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        (sum.active /
                                                          sum.total_employees) *
                                                          100 >
                                                        80
                                                          ? '#8BC646'
                                                          : (sum.active /
                                                              sum.total_employees) *
                                                              100 >
                                                            50
                                                          ? '#efc165'
                                                          : '#D1BD94',
                                                    }}
                                                  >
                                                    {sum.team}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.summaryContainer
                                                    }
                                                  >
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Total Employees
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.total_employees}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Active
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.active
                                                              ? (sum.active /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#8bc646',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.active}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        InActive
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.inactive
                                                              ? (sum.inactive /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#efc165',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.inactive}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Offline
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.completedBar
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            styles.completedLevel
                                                          }
                                                          style={{
                                                            width: sum.offline
                                                              ? (sum.offline /
                                                                  sum.total_employees) *
                                                                100
                                                              : '0%',
                                                            background:
                                                              '#cececf',
                                                          }}
                                                        ></div>
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.offline}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      )}
                                    </div>
                                    {i % 2 > 0 && (
                                      <div className={styles.break} />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            {val.summary &&
                              val.summary.map((sum) => {
                                return (
                                  <div
                                    onClick={() =>
                                      this.summaryHandler(sum.teamId)
                                    }
                                    className={styles.summaryBase}
                                  >
                                    <div
                                      className={styles.summaryHeader}
                                      style={{
                                        backgroundColor:
                                          (sum.active / sum.total_employees) *
                                            100 >
                                          80
                                            ? '#8BC646'
                                            : (sum.active /
                                                sum.total_employees) *
                                                100 >
                                              50
                                            ? '#efc165'
                                            : '#D1BD94',
                                      }}
                                      // style={{
                                      //   backgroundColor:
                                      //     sum.active > sum.offline &&
                                      //     sum.active > sum.inactive
                                      //       ? "#8BC646"
                                      //       : sum.inactive > sum.offline &&
                                      //         sum.inactive > sum.active
                                      //       ? "EFC165"
                                      //       : sum.offline > sum.active &&
                                      //         sum.offline > sum.inactive &&
                                      //         "#CECECE",
                                      // }}
                                    >
                                      {sum.team}
                                    </div>
                                    <div className={styles.summaryContainer}>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          Total Employees
                                        </div>
                                        <div className={styles.value}>
                                          {sum.total_employees}
                                        </div>
                                      </div>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          Active
                                        </div>
                                        <div className={styles.completedBar}>
                                          <div
                                            className={styles.completedLevel}
                                            style={{
                                              width: sum.active
                                                ? (sum.active /
                                                    sum.total_employees) *
                                                  100
                                                : '0%',
                                              background: '#8bc646',
                                            }}
                                          ></div>
                                        </div>
                                        <div className={styles.value}>
                                          {sum.active}
                                        </div>
                                      </div>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          InActive
                                        </div>
                                        <div className={styles.completedBar}>
                                          <div
                                            className={styles.completedLevel}
                                            style={{
                                              width: sum.inactive
                                                ? (sum.inactive /
                                                    sum.total_employees) *
                                                  100
                                                : '0%',
                                              background: '#efc165',
                                            }}
                                          ></div>
                                        </div>
                                        <div className={styles.value}>
                                          {sum.inactive}
                                        </div>
                                      </div>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          Offline
                                        </div>
                                        <div className={styles.completedBar}>
                                          <div
                                            className={styles.completedLevel}
                                            style={{
                                              width: sum.offline
                                                ? (sum.offline /
                                                    sum.total_employees) *
                                                  100
                                                : '0%',
                                              background: '#cececf',
                                            }}
                                          ></div>
                                        </div>
                                        <div className={styles.value}>
                                          {sum.offline}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}

                        {val.users &&
                          val.users.length > 0 &&
                          this.props.teamDetails.length === 1 && (
                            <>
                              {users1 && (
                                <>
                                  <div className={styles.usrContainer}>
                                    {/* {val.users && val.users.length > 0 && (
                            <div>Users</div>
                          )} */}

                                    {userArray1 &&
                                      userArray1.map((val, i) => {
                                        return (
                                          <>
                                            <span
                                              className={styles.countrUsers}
                                            >
                                              {(val.onlineStatus ===
                                                'offline' ||
                                                val.onlineStatus ===
                                                  'inactive') && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        rightSide={true}
                                                        offline={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.offlineright
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        leftSide={true}
                                                        offline={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.offlineleft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                              {val.onlineStatus ===
                                                'active' && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        active={true}
                                                        rightSide={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.onlineright
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        active={true}
                                                        leftSide={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.onlineleft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                              {val.onlineStatus ===
                                                'passive' && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        passive={true}
                                                        rightSide={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.inactiveRight
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        passive={true}
                                                        leftSide={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.inactiveLeft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                            </span>
                                            {i % 2 > 0 && (
                                              <div className={styles.break} />
                                            )}
                                          </>
                                        );
                                      })}
                                  </div>
                                  <div className={styles.usrContainer}>
                                    {/* {val.users && val.users.length > 0 && (
                          <div>Users</div>
                        )} */}

                                    {userArray2 &&
                                      userArray2.map((val, i) => {
                                        return (
                                          <>
                                            <span
                                              className={styles.countrUsers}
                                            >
                                              {(val.onlineStatus ===
                                                'offline' ||
                                                val.onlineStatus ===
                                                  'inactive') && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        rightSide={true}
                                                        offline={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.offlineright
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        leftSide={true}
                                                        offline={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.offlineleft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                              {val.onlineStatus ===
                                                'active' && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        active={true}
                                                        rightSide={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.onlineright
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        active={true}
                                                        leftSide={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.onlineleft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                              {val.onlineStatus ===
                                                'passive' && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        passive={true}
                                                        rightSide={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.inactiveRight
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        passive={true}
                                                        leftSide={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.inactiveLeft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                            </span>
                                            {i % 2 > 0 && (
                                              <div className={styles.break} />
                                            )}
                                          </>
                                        );
                                      })}
                                  </div>
                                  <div className={styles.usrContainer}>
                                    {/* {val.users && val.users.length > 0 && (
                        <div>Users</div>
                      )} */}

                                    {userArray3 &&
                                      userArray3.map((val, i) => {
                                        return (
                                          <>
                                            <span
                                              className={styles.countrUsers}
                                            >
                                              {(val.onlineStatus ===
                                                'offline' ||
                                                val.onlineStatus ===
                                                  'inactive') && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        rightSide={true}
                                                        offline={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.offlineright
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        leftSide={true}
                                                        offline={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.offlineleft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                              {val.onlineStatus ===
                                                'active' && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        active={true}
                                                        rightSide={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.onlineright
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        active={true}
                                                        leftSide={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.onlineleft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                              {val.onlineStatus ===
                                                'passive' && (
                                                <span
                                                  className={styles.seatHolder}
                                                >
                                                  <span
                                                    className={
                                                      styles.tooltiptext
                                                    }
                                                  >
                                                    {
                                                      <>
                                                        <div
                                                          className={
                                                            styles.titleNameContainer
                                                          }
                                                        >
                                                          <div
                                                            style={{
                                                              color: '#5BB5F7',
                                                            }}
                                                          >
                                                            {val.name}
                                                          </div>
                                                          <div
                                                            className={
                                                              styles.titleCityHolder
                                                            }
                                                          >
                                                            {val.city}
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Message :{' '}
                                                          {val.message}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Skype : {val.skype}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Mobile : {val.mobile}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleDataHolder
                                                          }
                                                        >
                                                          Email : {val.emailId}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.lastActiveHolder
                                                          }
                                                        >
                                                          Last Active:{' '}
                                                          {val.onlineStatus ===
                                                          'active'
                                                            ? 'Active Now'
                                                            : this.activeHandler(
                                                                val.onlineStatusTimestamp
                                                              )}
                                                        </div>
                                                      </>
                                                    }
                                                  </span>
                                                  {i % 2 > 0 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        right={-3}
                                                        passive={true}
                                                        rightSide={true}
                                                      />
                                                      <div
                                                        className={
                                                          styles.inactiveRight
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                  {i % 2 < 1 && (
                                                    <span>
                                                      <ProfileStatus
                                                        pic={val.profilePic}
                                                        left={-3}
                                                        passive={true}
                                                        leftSide={true}
                                                      />

                                                      <div
                                                        className={
                                                          styles.inactiveLeft
                                                        }
                                                      ></div>
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                            </span>
                                            {i % 2 > 0 && (
                                              <div className={styles.break} />
                                            )}
                                          </>
                                        );
                                      })}
                                  </div>
                                </>
                              )}

                              {val.users &&
                                val.users.length > 10 &&
                                this.props.teamDetails.length == 1 &&
                                val.managers &&
                                val.managers.length > 0 && (
                                  <div className={styles.usrContainer}>
                                    {val.users.map((val, i) => {
                                      return (
                                        <>
                                          <span className={styles.countrUsers}>
                                            {(val.onlineStatus === 'offline' ||
                                              val.onlineStatus ===
                                                'inactive') && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {
                                                    <>
                                                      <div
                                                        className={
                                                          styles.titleNameContainer
                                                        }
                                                      >
                                                        <div
                                                          style={{
                                                            color: '#5BB5F7',
                                                          }}
                                                        >
                                                          {val.name}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleCityHolder
                                                          }
                                                        >
                                                          {val.city}
                                                        </div>
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Message : {val.message}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Skype : {val.skype}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Mobile : {val.mobile}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Email : {val.emailId}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.lastActiveHolder
                                                        }
                                                      >
                                                        Last Active:{' '}
                                                        {val.onlineStatus ===
                                                        'active'
                                                          ? 'Active Now'
                                                          : this.activeHandler(
                                                              val.onlineStatusTimestamp
                                                            )}
                                                      </div>
                                                    </>
                                                  }
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={-3}
                                                      rightSide={true}
                                                      offline={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.offlineright
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={-3}
                                                      leftSide={true}
                                                      offline={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.offlineleft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                            {val.onlineStatus === 'active' && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {
                                                    <>
                                                      <div
                                                        className={
                                                          styles.titleNameContainer
                                                        }
                                                      >
                                                        <div
                                                          style={{
                                                            color: '#5BB5F7',
                                                          }}
                                                        >
                                                          {val.name}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleCityHolder
                                                          }
                                                        >
                                                          {val.city}
                                                        </div>
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Message : {val.message}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Skype : {val.skype}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Mobile : {val.mobile}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Email : {val.emailId}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.lastActiveHolder
                                                        }
                                                      >
                                                        Last Active:{' '}
                                                        {val.onlineStatus ===
                                                        'active'
                                                          ? 'Active Now'
                                                          : this.activeHandler(
                                                              val.onlineStatusTimestamp
                                                            )}
                                                      </div>
                                                    </>
                                                  }
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={-3}
                                                      active={true}
                                                      rightSide={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.onlineright
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={-3}
                                                      active={true}
                                                      leftSide={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.onlineleft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                            {val.onlineStatus === 'passive' && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {
                                                    <>
                                                      <div
                                                        className={
                                                          styles.titleNameContainer
                                                        }
                                                      >
                                                        <div
                                                          style={{
                                                            color: '#5BB5F7',
                                                          }}
                                                        >
                                                          {val.name}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleCityHolder
                                                          }
                                                        >
                                                          {val.city}
                                                        </div>
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Message : {val.message}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Skype : {val.skype}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Mobile : {val.mobile}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Email : {val.emailId}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.lastActiveHolder
                                                        }
                                                      >
                                                        Last Active:{' '}
                                                        {val.onlineStatus ===
                                                        'active'
                                                          ? 'Active Now'
                                                          : this.activeHandler(
                                                              val.onlineStatusTimestamp
                                                            )}
                                                      </div>
                                                    </>
                                                  }
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={-3}
                                                      passive={true}
                                                      rightSide={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.inactiveRight
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={-3}
                                                      passive={true}
                                                      leftSide={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.inactiveLeft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                          </span>
                                          {i % 2 > 0 && (
                                            <div className={styles.break} />
                                          )}
                                        </>
                                      );
                                    })}
                                  </div>
                                )}

                              {val.users &&
                                val.users.length < 10 &&
                                this.props.teamDetails.length == 1 &&
                                !users1 && (
                                  <div className={styles.usrContainer}>
                                    {val.users.map((val, i) => {
                                      return (
                                        <>
                                          <span className={styles.countrUsers}>
                                            {(val.onlineStatus === 'offline' ||
                                              val.onlineStatus ===
                                                'inactive') && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {
                                                    <>
                                                      <div
                                                        className={
                                                          styles.titleNameContainer
                                                        }
                                                      >
                                                        <div
                                                          style={{
                                                            color: '#5BB5F7',
                                                          }}
                                                        >
                                                          {val.name}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleCityHolder
                                                          }
                                                        >
                                                          {val.city}
                                                        </div>
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Message : {val.message}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Skype : {val.skype}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Mobile : {val.mobile}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Email : {val.emailId}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.lastActiveHolder
                                                        }
                                                      >
                                                        Last Active:{' '}
                                                        {val.onlineStatus ===
                                                        'active'
                                                          ? 'Active Now'
                                                          : this.activeHandler(
                                                              val.onlineStatusTimestamp
                                                            )}
                                                      </div>
                                                    </>
                                                  }
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={-3}
                                                      rightSide={true}
                                                      offline={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.offlineright
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={-3}
                                                      leftSide={true}
                                                      offline={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.offlineleft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                            {val.onlineStatus === 'active' && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {
                                                    <>
                                                      <div
                                                        className={
                                                          styles.titleNameContainer
                                                        }
                                                      >
                                                        <div
                                                          style={{
                                                            color: '#5BB5F7',
                                                          }}
                                                        >
                                                          {val.name}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleCityHolder
                                                          }
                                                        >
                                                          {val.city}
                                                        </div>
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Message : {val.message}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Skype : {val.skype}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Mobile : {val.mobile}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Email : {val.emailId}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.lastActiveHolder
                                                        }
                                                      >
                                                        Last Active:{' '}
                                                        {val.onlineStatus ===
                                                        'active'
                                                          ? 'Active Now'
                                                          : this.activeHandler(
                                                              val.onlineStatusTimestamp
                                                            )}
                                                      </div>
                                                    </>
                                                  }
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={-3}
                                                      active={true}
                                                      rightSide={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.onlineright
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={-3}
                                                      active={true}
                                                      leftSide={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.onlineleft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                            {val.onlineStatus === 'passive' && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {
                                                    <>
                                                      <div
                                                        className={
                                                          styles.titleNameContainer
                                                        }
                                                      >
                                                        <div
                                                          style={{
                                                            color: '#5BB5F7',
                                                          }}
                                                        >
                                                          {val.name}
                                                        </div>
                                                        <div
                                                          className={
                                                            styles.titleCityHolder
                                                          }
                                                        >
                                                          {val.city}
                                                        </div>
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Message : {val.message}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Skype : {val.skype}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Mobile : {val.mobile}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.titleDataHolder
                                                        }
                                                      >
                                                        Email : {val.emailId}
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.lastActiveHolder
                                                        }
                                                      >
                                                        Last Active:{' '}
                                                        {val.onlineStatus ===
                                                        'active'
                                                          ? 'Active Now'
                                                          : this.activeHandler(
                                                              val.onlineStatusTimestamp
                                                            )}
                                                      </div>
                                                    </>
                                                  }
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={-3}
                                                      passive={true}
                                                      rightSide={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.inactiveRight
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={-3}
                                                      passive={true}
                                                      leftSide={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.inactiveLeft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                          </span>
                                          {i % 2 > 0 && (
                                            <div className={styles.break} />
                                          )}
                                        </>
                                      );
                                    })}
                                  </div>
                                )}
                            </>
                          )}

                        {val.users &&
                          val.users.length > 0 &&
                          this.props.teamDetails.length > 1 && (
                            <div className={styles.usrContainer}>
                              {val.users.map((val, i) => {
                                return (
                                  <>
                                    <span className={styles.countrUsers}>
                                      {(val.onlineStatus === 'inactive' ||
                                        val.onlineStatus === 'offline') && (
                                        <span className={styles.seatHolder}>
                                          <span className={styles.tooltiptext}>
                                            {
                                              <>
                                                <div
                                                  className={
                                                    styles.titleNameContainer
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      color: '#5BB5F7',
                                                    }}
                                                  >
                                                    {val.name}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleCityHolder
                                                    }
                                                  >
                                                    {val.city}
                                                  </div>
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Message : {val.message}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Skype : {val.skype}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Mobile : {val.mobile}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Email : {val.emailId}
                                                </div>
                                                <div
                                                  className={
                                                    styles.lastActiveHolder
                                                  }
                                                >
                                                  Last Active:{' '}
                                                  {val.onlineStatus === 'active'
                                                    ? 'Active Now'
                                                    : this.activeHandler(
                                                        val.onlineStatusTimestamp
                                                      )}
                                                </div>
                                              </>
                                            }
                                          </span>

                                          {i % 2 > 0 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                right={-3}
                                                rightSide={true}
                                                offline={true}
                                              />
                                              <div
                                                className={styles.offlineright}
                                              ></div>
                                            </span>
                                          )}
                                          {i % 2 < 1 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                left={-3}
                                                leftSide={true}
                                                offline={true}
                                              />

                                              <div
                                                className={styles.offlineleft}
                                              ></div>
                                            </span>
                                          )}
                                        </span>
                                      )}
                                      {val.onlineStatus === 'active' && (
                                        <span className={styles.seatHolder}>
                                          <span className={styles.tooltiptext}>
                                            {
                                              <>
                                                <div
                                                  className={
                                                    styles.titleNameContainer
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      color: '#5BB5F7',
                                                    }}
                                                  >
                                                    {val.name}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleCityHolder
                                                    }
                                                  >
                                                    {val.city}
                                                  </div>
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Message : {val.message}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Skype : {val.skype}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Mobile : {val.mobile}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Email : {val.emailId}
                                                </div>
                                                <div
                                                  className={
                                                    styles.lastActiveHolder
                                                  }
                                                >
                                                  Last Active:{' '}
                                                  {val.onlineStatus === 'active'
                                                    ? 'Active Now'
                                                    : this.activeHandler(
                                                        val.onlineStatusTimestamp
                                                      )}
                                                </div>
                                              </>
                                            }
                                          </span>
                                          {i % 2 > 0 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                right={-3}
                                                active={true}
                                                rightSide={true}
                                              />
                                              <div
                                                className={styles.onlineright}
                                              ></div>
                                            </span>
                                          )}
                                          {i % 2 < 1 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                left={-3}
                                                active={true}
                                                leftSide={true}
                                              />

                                              <div
                                                className={styles.onlineleft}
                                              ></div>
                                            </span>
                                          )}
                                        </span>
                                      )}
                                      {val.onlineStatus === 'passive' && (
                                        <span className={styles.seatHolder}>
                                          <span className={styles.tooltiptext}>
                                            {
                                              <>
                                                <div
                                                  className={
                                                    styles.titleNameContainer
                                                  }
                                                >
                                                  <div
                                                    style={{
                                                      color: '#5BB5F7',
                                                    }}
                                                  >
                                                    {val.name}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.titleCityHolder
                                                    }
                                                  >
                                                    {val.city}
                                                  </div>
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Message : {val.message}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Skype : {val.skype}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Mobile : {val.mobile}
                                                </div>
                                                <div
                                                  className={
                                                    styles.titleDataHolder
                                                  }
                                                >
                                                  Email : {val.emailId}
                                                </div>
                                                <div
                                                  className={
                                                    styles.lastActiveHolder
                                                  }
                                                >
                                                  Last Active:{' '}
                                                  {val.onlineStatus === 'active'
                                                    ? 'Active Now'
                                                    : this.activeHandler(
                                                        val.onlineStatusTimestamp
                                                      )}
                                                </div>
                                              </>
                                            }
                                          </span>
                                          {i % 2 > 0 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                right={-3}
                                                passive={true}
                                                rightSide={true}
                                              />
                                              <div
                                                className={styles.inactiveRight}
                                              ></div>
                                            </span>
                                          )}
                                          {i % 2 < 1 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                left={-3}
                                                passive={true}
                                                leftSide={true}
                                              />

                                              <div
                                                className={styles.inactiveLeft}
                                              ></div>
                                            </span>
                                          )}
                                        </span>
                                      )}
                                    </span>
                                    {i % 2 > 0 && (
                                      <div className={styles.break} />
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* <div className={styles.block2}>
              {this.props &&
                this.props.teamDetails &&
                this.props.teamDetails.teamusers &&
                this.props.teamDetails.teamName && (
                  <div> {this.props.teamDetails.teamName}</div>
                )}
              {this.props &&
                this.props.teamDetails &&
                this.props.teamDetails.teamusers &&
                this.props.teamDetails.teamusers.map((val, i) => {
                  return (
                    <>
                      <span className={styles.countryUsers}>
                        {val.onlineStatus === "offline" && (
                          <span className={styles.seatHolder}>
                            <span className={styles.tooltiptext}>
                              {val.firstname}
                            </span>
                            {i % 2 > 0 && (
                              <span>
                                <ProfileStatus
                                  right={0}
                                  rightSide={true}
                                  offline={true}
                                />
                                <div className={styles.offlineright}></div>
                              </span>
                            )}
                            {i % 2 < 1 && (
                              <span>
                                <ProfileStatus
                                  left={0}
                                  leftSide={true}
                                  offline={true}
                                />

                                <div className={styles.offlineleft}></div>
                              </span>
                            )}
                          </span>
                        )}
                        {val.onlineStatus === "active" && (
                          <span className={styles.seatHolder}>
                            <span className={styles.tooltiptext}>
                              {val.firstname}
                            </span>
                            {i % 2 > 0 && (
                              <span>
                                <ProfileStatus
                                  right={0}
                                  active={true}
                                  rightSide={true}
                                />
                                <div className={styles.onlineright}></div>
                              </span>
                            )}
                            {i % 2 < 1 && (
                              <span>
                                <ProfileStatus
                                  left={0}
                                  active={true}
                                  leftSide={true}
                                />

                                <div className={styles.onlineleft}></div>
                              </span>
                            )}
                          </span>
                        )}
                        {val.onlineStatus === "passive" && (
                          <span className={styles.seatHolder}>
                            <span className={styles.tooltiptext}>
                              {val.firstname}
                            </span>
                            {i % 2 > 0 && (
                              <span>
                                <ProfileStatus
                                  right={0}
                                  passive={true}
                                  rightSide={true}
                                />
                                <div className={styles.onlineright}></div>
                              </span>
                            )}
                            {i % 2 < 1 && (
                              <span>
                                <ProfileStatus
                                  left={0}
                                  passive={true}
                                  leftSide={true}
                                />

                                <div className={styles.onlineleft}></div>
                              </span>
                            )}
                          </span>
                        )}
                      </span>
                      {i % 2 > 0 && <div className={styles.break} />}
                    </>
                  );
                })}
            </div>

           */}{' '}
            {/* <div className={styles.countryHolder}>
            India
            <br />
            {indiaData &&
              indiaData.map((val, i) => {
                console.log(val);
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={i + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                right={0}
                                rightSide={true}
                                offline={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                leftSide={true}
                                offline={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                right={0}
                                active={true}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                active={true}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                right={0}
                                passive={true}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                passive={true}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {i % 2 > 0 && <br />}
                  </>
                );
              })}
          </div> */}
            {/* 
          <div className={styles.countryHolder}>
            USA
            <br />
            {usaData &&
              usaData.map((val, j) => {
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={j + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + j + val.firstname}
                        >
                          {j % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {j % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + j + val.firstname}
                        >
                          {j % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {j % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + j + val.firstname}
                        >
                          {j % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {j % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {j % 2 > 0 && <br />}
                  </>
                );
              })}
          </div>

          <div className={styles.countryHolder}>
            Australia
            <br />
            {ausData &&
              ausData.map((val, i) => {
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={i + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {i % 2 > 0 && <br />}
                  </>
                );
              })}
          </div>
          <div className={styles.countryHolder}>
            New Zealand
            <br />
            {newData &&
              newData.map((val, i) => {
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={i + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {i % 2 > 0 && <br />}
                  </>
                );
              })}
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
