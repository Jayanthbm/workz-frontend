import React, { Component } from "react";
import styles from "./deepdive.module.css";
import Header from "../Container/HeaderContainer";
import Navigation from "./Navigation";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import SecondaryHeader from "./SecondaryHeader";
import DeepdiveDetails from "./DeepdiveDetails";

const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);

class deepdive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: "",
      man_id: "",
    };
  }
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
      userId: val,
    });
  };
  componentDidMount = () => {
    this.props.getDeepdive({
      userId: "21",
      date: "2020-04-13",
    });
    if (parsedData.isManager === 1) {
      this.setState({ man_id: parsedData.userId });
      this.props.getDeepdiveDropdown({
        managerId: parsedData.userId,
      });
    } else {
      this.setState({ team_id: parsedData.userId });
      this.props.getDeepdiveDropdown({
        teamId: parsedData.userId,
      });
    }
  };
  render() {
    console.log(this.props);
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
