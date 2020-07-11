import React, { Component } from "react";
import styles from "./deepdive.module.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      details: false,
    };
  }
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.deepdiveDropdownData !== this.props.deepdiveDropdownData) {
      this.props.handleDeepdive(
        JSON.stringify({
          id:
            this.props.match.params.userId &&
            this.props.match.params.userId != undefined &&
            this.props.match.params.userId != "undefined" &&
            !this.props.change
              ? this.props.match.params.userId
              : nextProps.deepdiveDropdownData &&
                nextProps.deepdiveDropdownData.length
              ? nextProps.deepdiveDropdownData &&
                nextProps.deepdiveDropdownData[0] &&
                nextProps.deepdiveDropdownData[0].userId
              : nextProps.deepdiveDropdownData &&
                nextProps.deepdiveDropdownData.userId,
        }),
        false
      );
    }
  }

  handleWeeks = (type) => {
    let d = new Date();
    if (type === "last") {
      d.setDate(d.getDate() - 7);
      this.props.handleChange(d);
    } else {
      this.props.handleChange(new Date());
    }
  };
  handleCalender = (type) => {
    let d = new Date(this.props.selectedDate);
    if (type === "prev") {
      d.setDate(d.getDate() - 7);
      this.props.handleChange(d);
    } else {
      d.setDate(d.getDate() + 7);
      this.props.handleChange(d);
    }
  };
  render() {
    return (
      <div className={styles.deepdiveContainer}>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownText}>Employee</div>
          <div className={styles.dropdownSelectHolder}>
            <select
              style={{
                width: " 250px",
                height: "22px",
              }}
              onChange={(val) =>
                this.props.handleDeepdive(val.target.value, true)
              }
            >
              {this.props &&
              this.props.deepdiveDropdownData &&
              this.props.deepdiveDropdownData.length ? (
                this.props.deepdiveDropdownData.map((val) => {
                  return (
                    <>
                      <option
                        value={JSON.stringify({
                          name: val.name,
                          id: val.userId,
                        })}
                        selected={
                          val.userId == this.props.match.params.userId
                            ? true
                            : false
                        }
                      >
                        {val.name}
                      </option>
                      ;
                    </>
                  );
                })
              ) : (
                <option
                  value={JSON.stringify({
                    name:
                      this.props.deepdiveDropdownData &&
                      this.props.deepdiveDropdownData.name,
                    id:
                      this.props.deepdiveDropdownData &&
                      this.props.deepdiveDropdownData.userId,
                  })}
                >
                  {this.props.deepdiveDropdownData &&
                    this.props.deepdiveDropdownData.name}
                </option>
              )}
            </select>
          </div>
        </div>
        <div className={styles.timecardContainer}>
          <div
            onClick={() => {
              this.props.history.push(
                `/deepdive/${this.props.match.params.userId}/${moment(
                  new Date(this.props.match.params.date)
                ).format("YYYY-MM-DD")}`
              );
            }}
            className={
              this.props.match.path == "/deepdive/:userId/:date"
                ? styles.timeCard
                : styles.details
            }
          >
            {" "}
            Timecard
          </div>
          |
          <div
            className={
              this.props.match.path == "/details/:userId/:date"
                ? styles.timeCard
                : styles.details
            }
            onClick={() => {
              this.props.history.push(
                `/details/${this.props.match.params.userId}/${moment(
                  new Date(this.props.match.params.date)
                ).format("YYYY-MM-DD")}`
              );
            }}
          >
            {" "}
            Details
          </div>{" "}
        </div>
        <div className={styles.timecardContainer}>
          <div
            className={styles.lastWeek}
            onClick={() => this.handleWeeks("last")}
          >
            Last Week
          </div>
          |{" "}
          <div
            className={styles.thisWeek}
            onClick={() => this.handleWeeks("this")}
          >
            This Week
          </div>
        </div>

        <div className={styles.dateContainer}>
          <div
            className={styles.prev}
            onClick={() => this.handleCalender("prev")}
          >
            {"<"}
          </div>
          <DatePicker
            selected={this.props.selectedDate}
            onChange={(date) => this.props.handleChange(date)}
            maxDate={new Date()}
            placeholder={"asa"}
          />
          <div
            className={styles.next}
            onClick={() => this.handleCalender("next")}
          >
            {" "}
            {">"}{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryHeader;
