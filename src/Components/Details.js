import React, { Component } from "react";
import styles from "./Details.module.css";
import Header from "../Container/HeaderContainer";
import Navigation from "./Navigation";
import SecondaryHeader from "./SecondaryHeader";
import moment from "moment";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import * as Cookie from "../utils/Cookie";
import DetailsData from "./DetailsData";
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: "",
      man_id: "",
      selectedDate: new Date(),
      userId: "",
      change: false,
      show: false,
      allChecker: false,
    };
  }
  componentDidMount = () => {
    if (parsedData.isManager === 1) {
      this.setState({
        man_id: parsedData.userId,
        userId: parsedData.userId,
        selectedDate: new Date(this.props.match.params.date),
      });
      this.props.getDeepdiveDropdown({
        managerId: parsedData.userId,
      });

      // this.props.getDeepdive({
      //   userId:
      //     this.props.deepdiveDropdownData &&
      //     this.props.deepdiveDropdownData[0] &&
      //     this.props.deepdiveDropdownData[0].userId,
      //   date: moment(new Date()).format("YYYY-MM-DD"),
      // });
    } else {
      this.setState({
        team_id: parsedData.userId,
        userId: parsedData.userId,
        selectedDate: new Date(this.props.match.params.date),
      });
      this.props.getDeepdiveDropdown({
        teamId: parsedData.userId,
      });
      // this.props.getDeepdive({
      //   userId: parsedData.userId,
      //   date: moment(new Date()).format("YYYY-MM-DD"),
      // });
    }
  };
  handleFlag = (timecardId) => {
    this.props.postFlag(timecardId);
  };
  handleBreakup = (timecardId, type) => {
    console.log(timecardId);
    if (type === "breakup") {
      this.props.getBreakup({
        timecardBreakupId: timecardId,
        startDate: this.props.detailsData && this.props.detailsData.startDate,
        endDate: this.props.detailsData && this.props.detailsData.endDate,
      });
    } else {
      this.props.getBreakup({
        timecardId: timecardId,
        startDate: this.props.detailsData && this.props.detailsData.startDate,
        endDate: this.props.detailsData && this.props.detailsData.endDate,
      });
    }
  };
  handleChange = (date) => {
    this.setState({
      selectedDate: date,
      allChecker: true,
    });
    this.props.getDetails({
      companyId: parsedData.companyId,
      userId: this.props.match.params.userId,
      date: moment(date).format("YYYY-MM-DD"),
    });
    if (this.state.userId != undefined)
      this.props.history.push(
        `/details/${this.state.userId}/${moment(date).format("YYYY-MM-DD")}`
      );
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
  selectHandler = (val) => {
    this.setState({ change: true });
    let data = JSON.parse(val);
    if (data.type === "manager") {
      this.props.getDeepdiveDropdown({
        managerId: data.id,
      });
    } else {
      this.props.getDeepdiveDropdown({
        teamId: data.id,
      });
    }
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
    this.props.getDetails({
      companyId: parsedData.companyId,
      userId: data.id,
      date: this.props.match.params.date,
    });
    this.setState({ userId: data.id, empname: data.name });
    this.props.history.push(
      `/details/${data.id}/${this.props.match.params.date}`
    );
    if (flag) {
      window.location.reload();
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (this.props.flagDetails !== nextProps.flagDetails) {
      this.props.getDetails({
        companyId: parsedData.companyId,
        userId: this.props.match.params.userId,
        date: this.props.match.params.date,
      });
      //window.location.reload();
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.profilePic} />
        <Navigation
          team={parsedData && parsedData.dropdown}
          selectHandler={this.selectHandler}
          team_id={this.state.team_id}
          man_id={this.state.man_id}
        />
        <SecondaryHeader
          deepdiveDropdownData={this.props && this.props.deepdiveDropdownData}
          handleDeepdive={this.handleDeepdive}
          selectedDate={this.state.selectedDate}
          handleChange={this.handleChange}
          change={this.state.change}
          {...this.props}
        />
        <DetailsData
          detailsData={this.props.detailsData}
          {...this.props}
          handleFlag={this.handleFlag}
          handleMessage={this.handleMessage}
          handleGetMessage={this.handleGetMessage}
          handleBreakup={this.handleBreakup}
        />
      </div>
    );
  }
}

export default Details;
