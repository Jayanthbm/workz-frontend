import React, { Component } from 'react';
import styles from './deepdive.module.css';
import Header from '../Container/HeaderContainer';
import Navigation from './Navigation';
import * as Cookie from '../utils/Cookie';
import { USER_DETAILS, ACCESS_TOKEN } from '../utils/constant';
import SecondaryHeader from './SecondaryHeader';
import DeepdiveDetails from './DeepdiveDetails';
import moment from 'moment';
import { postFlag } from '../actions/team.action';
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);
const dropData = JSON.parse(localStorage.getItem('dropdown'));
const secondData = JSON.parse(localStorage.getItem('secondaryDrop'));

class deepdive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: '',
      man_id: '',
      selectedDate: new Date(),
      userId: '',
      count: 0,
      change: false,
      show: false,
      messageTimeCard: null,
      allChecker: false,
      render: false,
      approve: null,
    };
  }
  handleChange = (date) => {
    this.setState({
      selectedDate: date,
      allChecker: true,
    });
    this.props.getDeepdive({
      companyId: parsedData.companyId,
      userId: this.props.match.params.userId,
      date: moment(date).format('YYYY-MM-DD'),
    });

    if (this.state.userId != undefined)
      this.props.history.push(
        `/deepdive/${this.state.userId}/${moment(date).format('YYYY-MM-DD')}`
      );
  };
  selectHandler = (val) => {
    this.setState({ change: true });
    let data = JSON.parse(val);
    if (data.type === 'manager') {
      this.props.getDeepdiveDropdown({
        managerId: data.id,
      });

      localStorage.setItem(
        'dropdown',
        JSON.stringify({
          id: data.id,
          type: 'manager',
        })
      );
    } else {
      this.props.getDeepdiveDropdown({
        teamId: data.id,
      });
      localStorage.setItem(
        'dropdown',
        JSON.stringify({
          id: data.id,
          type: 'team',
        })
      );
    }
    window.location.reload();
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  handleDeepdive = (val, flag) => {
    this.setState({
      allChecker: true,
    });
    let data = JSON.parse(val);
    this.props.getDeepdive({
      companyId: parsedData.companyId,
      userId: data.id,
      date: this.props.match.params.date,
    });
    this.setState({ userId: data.id, empname: data.name });
    this.props.history.push(
      `/deepdive/${data.id}/${this.props.match.params.date}`
    );
    // if (secondData) {
    //   this.props.history.push(
    //     `/deepdive/${secondData.id}/${this.props.match.params.date}`
    //   );
    // } else {
    //   this.props.history.push(
    //     `/deepdive/${data.id}/${this.props.match.params.date}`
    //   );
    // }
    // localStorage.setItem(
    //   "secondaryDrop",
    //   JSON.stringify({
    //     id: data.id,
    //     date: this.props.match.params.date,
    //   })
    // );
    // if (flag) {
    //   window.location.reload();
    // }

    // Cookie.deleteCookie("userId");
    // Cookie.deleteCookie("userDate");
    // document.cookie = "userId=" + `${data.id}` + ";";
    // document.cookie = "userDate=" + `${this.props.match.params.date}` + ";";
  };
  handleFlag = (timecardId) => {
    this.props.postFlag(timecardId);
    this.handleBreakup(timecardId);
  };
  handleMessage = async (formData, timecardId) => {
    await this.props.postMessage(formData, timecardId);
    this.setState({
      messageTimeCard: timecardId,
    });
    await this.props.gettMessage(timecardId);
  };
  handleGetMessage = (timecardId) => {
    this.props.gettMessage(timecardId);
    this.setState({
      messageTimeCard: timecardId,
    });
  };
  handleBreakup = (timecardId) => {
    this.props.getBreakup({
      timecardId: timecardId,
      startDate: this.props.deepdiveData && this.props.deepdiveData.startDate,
      endDate: this.props.deepdiveData && this.props.deepdiveData.endDate,
    });
    this.setState({
      messageTimeCard: timecardId,
    });
    // this.props.gettMessage(timecardId);
  };
  componentDidMount = () => {
    if (parsedData.isManager === 1) {
      this.setState({
        man_id: dropData ? dropData.id : parsedData.userId,
        userId: parsedData.userId,
        selectedDate: new Date(this.props.match.params.date),
      });
      if (dropData && dropData.type === 'manager') {
        this.setState({
          man_id: dropData ? dropData.id : parsedData.userId,
          userId: parsedData.userId,
          team_id: null,
          selectedDate: new Date(this.props.match.params.date),
        });
        this.props.getDeepdiveDropdown({
          managerId: dropData ? dropData.id : parsedData.userId,
        });
      }
      if (dropData && dropData.type === 'team') {
        this.setState({
          team_id: dropData ? dropData.id : parsedData.userId,
          userId: parsedData.userId,
          man_id: null,
          selectedDate: new Date(this.props.match.params.date),
        });
        this.props.getDeepdiveDropdown({
          teamId: dropData ? dropData.id : parsedData.userId,
        });
      }
      if (!dropData) {
        this.props.getDeepdiveDropdown({
          managerId: dropData ? dropData.id : parsedData.userId,
        });
        localStorage.setItem(
          'dropdown',
          JSON.stringify({
            id: parsedData.userId,
            type: 'manager',
          })
        );
      }
      // this.props.getDeepdive({
      //   userId:
      //     this.props.deepdiveDropdownData &&
      //     this.props.deepdiveDropdownData[0] &&
      //     this.props.deepdiveDropdownData[0].userId,
      //   date: moment(new Date()).format("YYYY-MM-DD"),
      // });
    } else {
      this.setState({
        team_id: dropData ? dropData.id : parsedData.userId,
        userId: parsedData.userId,
        selectedDate: new Date(this.props.match.params.date),
      });
      this.props.getDeepdiveDropdown({
        teamId: parsedData.userId,
      });
      if (!dropData)
        localStorage.setItem(
          'dropdown',
          JSON.stringify({
            id: parsedData.userId,
            type: 'manager',
          })
        );
      // this.props.getDeepdive({
      //   userId: parsedData.userId,
      //   date: moment(new Date()).format("YYYY-MM-DD"),
      // });
    }
  };
  approver = (data) => {
    this.setState({ approve: data });
  };
  componentWillReceiveProps = (nextProps) => {
    if (this.props.match !== nextProps.match) {
      nextProps.getDeepdive({
        companyId: parsedData.companyId,
        userId: nextProps.match.params.userId,
        date: nextProps.match.params.date,
      });

      this.setState({ render: true });
    }

    if (this.props.flagDetails !== nextProps.flagDetails) {
      nextProps.getDeepdive({
        companyId: parsedData.companyId,
        userId: nextProps.match.params.userId,
        date: nextProps.match.params.date,
      });
    }
  };
  manualTimeCardHandler = (details) => {
    this.props.postManualTimecard(details);
  };
  render() {
    return (
      <div className={styles.base}>
        <Header
          pic={parsedData && parsedData.profilePic}
          userId={this.state.userId}
        />
        <Navigation
          team={parsedData && parsedData.dropdown}
          selectHandler={this.selectHandler}
          manualTimeCardHandler={this.manualTimeCardHandler}
          team_id={this.state.team_id}
          man_id={this.state.man_id}
          {...this.props}
          headerText={'My Team'}
        />
        <SecondaryHeader
          deepdiveDropdownData={this.props && this.props.deepdiveDropdownData}
          handleDeepdive={this.handleDeepdive}
          selectedDate={this.state.selectedDate}
          handleChange={this.handleChange}
          change={this.state.change}
          {...this.props}
        />
        <DeepdiveDetails
          deepdiveData={this.props.deepdiveData}
          deepDiveError={this.props.deepDiveError}
          empname={this.state.empname}
          allChecker={this.state.allChecker}
          flag={this.handleFlag}
          message={this.handleMessage}
          breakup={this.handleBreakup}
          approver={this.approver}
          approveData={this.state.approve}
          postTimecard={this.props.postTimecard}
          handleGetMessage={this.handleGetMessage}
          {...this.props}
        />
      </div>
    );
  }
}

export default deepdive;
