import React, { Component } from "react";
import styles from "./Navigation.module.css";
import moment from "moment";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import Modal from "./Modal";
import { DatePicker, TimePicker } from "antd";
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startTime: "00:00:00",
      EndTime: "00:00:00",
      date: new Date(),
      requestMessage: "",
    };
  }
  selectHandler = (val) => {};
  handleModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({
      show: false,
    });
  };
  onDateChange = (date, dateString) => {
    console.log(dateString);
    this.setState({ date: dateString });
  };
  handleStartTime = (time, timeString) => {
    this.setState({
      startTime: timeString,
    });
  };
  handleEndTime = (time, timeString) => {
    console.log(time, timeString);
    this.setState({
      EndTime: timeString,
    });
  };
  manualHandler = () => {
    this.props.manualTimeCardHandler({
      method: "request",
      date: this.state.date,
      startTime: this.state.startTime,
      EndTime: this.state.EndTime,
      reason: this.state.requestMessage,
    });
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.container}>
          <div className={styles.textHolder}>
            {this.props.admin ? "Admin" : "Virtual office"}
          </div>
          {this.props && this.props.team && (
            <div className={styles.dropdownHolder}>
              <div className={styles.label}>Team</div>
              <div className={styles.selectContainer}>
                <select
                  style={{
                    width: " 250px",
                    height: "22px",
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
                                    type: "team",
                                    id: val.teamId,
                                  })
                                : JSON.stringify({
                                    type: "manager",
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
                                    type: "team",
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
          this.props.match.path === "/deepdive/:userId/:date") ||
          (this.props.match &&
            this.props.match.path === "/details/:userId/:date")) && (
          <div className={styles.menuContainer}>
            {/* <div className={styles.link}>Team Summary</div>
            <div className={styles.link}>Activity</div>
            <div className={styles.link}>Metrics</div> */}
            <div
              className={
                this.props.match.path === "/deepdive/:userId/:date" &&
                this.props.match.params.userId != parsedData.userId
                  ? styles.linkActive
                  : styles.link
              }
              onClick={() =>
                this.props.history.push(
                  `/deepdive/${this.props.match.params.userId}/${moment(
                    new Date(this.props.match.params.date)
                  ).format("YYYY-MM-DD")}`
                )
              }
            >
              Deepdive
            </div>
            <div
              className={
                this.props.match.path === "/deepdive/:userId/:date" &&
                this.props.match.params.userId == parsedData.userId
                  ? styles.linkActive
                  : styles.link
              }
              onClick={() => {
                localStorage.setItem(
                  "secondaryDrop",
                  JSON.stringify({
                    id: parsedData.userId,
                    date: moment(new Date()).format("YYYY-MM-DD"),
                  })
                );
                this.props.history.push(
                  `/deepdive/${parsedData.userId}/${moment(new Date()).format(
                    "YYYY-MM-DD"
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
                  this.handleModal();
                }}
              >
                Manual timecard
              </div>
            )}
          </div>
        )}

        <Modal show={this.state.show} handleClose={this.hideModal} width="auto">
          <div className={styles.manualContainer}>
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>Date</div>
              <div className={styles.datePicker}>
                <DatePicker
                  allowClear={false}
                  value={moment(this.state.date, "YYYY-MM-DD")}
                  format={"YYYY-MM-DD"}
                  onChange={this.onDateChange}
                />
              </div>
            </div>
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>Start Time</div>
              <div className={styles.datePicker}>
                <TimePicker
                  onChange={this.handleStartTime}
                  value={moment(this.state.startTime, "HH:mm:ss")}
                />
              </div>
            </div>
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>End Time</div>
              <div className={styles.datePicker}>
                <TimePicker
                  onChange={this.handleEndTime}
                  value={moment(this.state.EndTime, "HH:mm:ss")}
                />
              </div>
            </div>
            <div className={styles.dateHolder}>
              <div className={styles.dateLabel}>Reason</div>
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
      </div>
    );
  }
}

export default Navigation;
