import React, { Component } from "react";
import styles from "./deepdive.module.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
  }
  handleChange = (date) => {
    console.log(date);
    this.setState({
      startDate: date,
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(
      nextProps &&
        nextProps.deepdiveDropdownData &&
        nextProps.deepdiveDropdownData[0] &&
        nextProps.deepdiveDropdownData[0]
    );
    if (nextProps.deepdiveDropdownData !== this.props.deepdiveDropdownData) {
      this.props.handleDeepdive(
        JSON.stringify({
          name:
            nextProps &&
            nextProps.deepdiveDropdownData &&
            nextProps.deepdiveDropdownData[0] &&
            nextProps.deepdiveDropdownData[0].name,
          id:
            nextProps &&
            nextProps.deepdiveDropdownData &&
            nextProps.deepdiveDropdownData[0] &&
            nextProps.deepdiveDropdownData[0].userId,
        })
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
    console.log(this.props.selectedDate);
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
              onChange={(val) => this.props.handleDeepdive(val.target.value)}
            >
              {this.props &&
                this.props.deepdiveDropdownData &&
                this.props.deepdiveDropdownData.map((val) => {
                  return (
                    <>
                      <option
                        value={JSON.stringify({
                          name: val.name,
                          id: val.userId,
                        })}
                      >
                        {val.name}
                      </option>
                      ;
                    </>
                  );
                })}
            </select>
          </div>
        </div>
        <div className={styles.timecardContainer}>
          <div className={styles.timeCard}> Timecard</div>|
          <div className={styles.details}> Details</div>{" "}
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
