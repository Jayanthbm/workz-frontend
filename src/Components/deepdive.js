import React, { Component } from "react";
import styles from "./deepdive.module.css";
import Header from "../Container/HeaderContainer";
import Navigation from "./Navigation";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import SecondaryHeader from "./SecondaryHeader";
import DeepdiveDetails from "./DeepdiveDetails";
import moment from "moment";
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);

class deepdive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: "",
      man_id: "",
      selectedDate: new Date(),
      userId: "",
    };
  }
  handleChange = (date) => {
    console.log(moment(date).format("YYYY-MM-DD"));
    this.setState({
      selectedDate: date,
    });
    this.props.getDeepdive({
      companyId: parsedData.companyId,
      userId: this.state.userId,
      date: moment(date).format("YYYY-MM-DD"),
    });
  };
  selectHandler = (val) => {
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
  handleDeepdive = (val) => {
    console.log(val);
    this.props.getDeepdive({
      companyId: parsedData.companyId,
      userId: val,
      date: moment(this.state.selectedDate).format("YYYY-MM-DD"),
    });
    this.setState({ userId: val });
  };
  componentDidMount = () => {
    if (parsedData.isManager === 1) {
      this.setState({ man_id: parsedData.userId, userId: parsedData.userId });
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
      this.setState({ team_id: parsedData.userId, userId: parsedData.userId });
      this.props.getDeepdiveDropdown({
        teamId: parsedData.userId,
      });
      // this.props.getDeepdive({
      //   userId: parsedData.userId,
      //   date: moment(new Date()).format("YYYY-MM-DD"),
      // });
    }
  };

  render() {
    console.log(parsedData.companyId);
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
        />
        <DeepdiveDetails
          deepdiveData={this.props.deepdiveData}
          deepDiveError={this.props.deepDiveError}
        />
      </div>
    );
  }
}

export default deepdive;
