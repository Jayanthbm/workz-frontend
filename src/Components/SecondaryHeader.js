import React, { Component } from "react";
import styles from "./deepdive.module.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
const secondData = JSON.parse(localStorage.getItem("secondaryDrop"));
class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      details: false,
      startingDate: null,
      endingDate: null,
    };
  }
  // handleChange = (date) => {
  //   this.setState({
  //     startDate: date,
  //   });
  // };
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
    if (this.props.match !== nextProps.match) {
      this.setState({
        startingDate: this.toISOLocal(
          this.startOfWeek(new Date(nextProps.match.params.date))
        ).split("T")[0],
        endingDate: this.toISOLocal(
          this.endOfWeek(new Date(nextProps.match.params.date))
        ).split("T")[0],
      });
    }
  }

  handleWeeks = (type) => {
    let d = new Date();
    if (type === "last") {
      let newDate = this.addDays(this.state.startingDate, -3);
      let newStarDate = this.toISOLocal(this.startOfWeek(newDate)).split(
        "T"
      )[0];
      let newEndDate = this.toISOLocal(this.endOfWeek(newDate)).split("T")[0];
      this.setState({ startingDate: newStarDate });
      this.setState({ endingDate: newEndDate });

      this.props.handleChange(newStarDate);
      this.props.handleChange(new Date());
      localStorage.setItem(
        "secondaryDrop",
        JSON.stringify({
          id: this.props.match.params.userId,
          date: newStarDate,
        })
      );
    } else {
      let newStarDate = this.toISOLocal(this.startOfWeek(new Date())).split(
        "T"
      )[0];
      let newEndDate = this.toISOLocal(this.endOfWeek(new Date())).split(
        "T"
      )[0];
      this.setState({ startingDate: newStarDate });
      this.setState({ endingDate: newEndDate });

      this.props.handleChange(new Date());
      localStorage.setItem(
        "secondaryDrop",
        JSON.stringify({
          id: this.props.match.params.userId,
          date: moment(new Date()).format("YYYY-MM-DD"),
        })
      );
    }
  };
  // handleCalender = (type) => {
  //   let d = new Date(this.props.selectedDate);
  //   if (type === "prev") {
  //     d.setDate(d.getDate() - 7);
  //     this.props.handleChange(d);
  //   } else {
  //     d.setDate(d.getDate() + 7);
  //     this.props.handleChange(d);
  //   }
  // };
  addDays = (date, days) => {
    var dat = new Date(date);
    dat.setDate(dat.getDate() + days);
    return dat;
  };
  prev = () => {
    let newDate = this.addDays(this.state.startingDate, -3);
    let newStarDate = this.toISOLocal(this.startOfWeek(newDate)).split("T")[0];
    let newEndDate = this.toISOLocal(this.endOfWeek(newDate)).split("T")[0];
    this.setState({ startingDate: newStarDate });
    this.setState({ endingDate: newEndDate });
    this.props.handleChange(newStarDate);
    localStorage.setItem(
      "secondaryDrop",
      JSON.stringify({
        id: this.props.match.params.userId,
        date: newStarDate,
      })
    );
  };

  next = () => {
    var ed = new Date(this.state.endingDate); //dd-mm-YYYY
    var today = new Date();

    if (ed < today) {
      let newDate = this.addDays(this.state.endingDate, 3);
      let newStarDate = this.toISOLocal(this.startOfWeek(newDate)).split(
        "T"
      )[0];
      let newEndDate = this.toISOLocal(this.endOfWeek(newDate)).split("T")[0];
      this.setState({ startingDate: newStarDate });
      this.setState({ endingDate: newEndDate });
      this.props.handleChange(newStarDate);
      localStorage.setItem(
        "secondaryDrop",
        JSON.stringify({
          id: this.props.match.params.userId,
          date: newStarDate,
        })
      );
    } else {
      console.log("No Action");
    }
  };

  toISOLocal = (d) => {
    var z = (n) => ("0" + n).slice(-2);
    var zz = (n) => ("00" + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0 ? "+" : "-";
    off = Math.abs(off);
    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(
      d.getHours()
    )}:${z(d.getMinutes())}:${z(d.getSeconds())}.${zz(
      d.getMilliseconds()
    )}${sign}${z((off / 60) | 0)}:${z(off % 60)}`;
  };
  startOfWeek = (date) => {
    date = new Date(date);
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };
  endOfWeek = (date) => {
    var lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));
  };
  componentDidMount = () => {
    this.setState({
      startingDate: this.toISOLocal(
        this.startOfWeek(new Date(this.props.match.params.date))
      ).split("T")[0],
      endingDate: this.toISOLocal(
        this.endOfWeek(new Date(this.props.match.params.date))
      ).split("T")[0],
    });
  };
  selectHandler = (val) => {
    const data = JSON.parse(val);
    this.props.handleDeepdive(val, true);
    localStorage.setItem(
      "secondaryDrop",
      JSON.stringify({
        id: data.id,
        date: this.props.match.params.date,
      })
    );
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
              onChange={(val) => this.selectHandler(val.target.value, true)}
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
                          val.userId ==
                          (secondData && secondData.id
                            ? secondData.id
                            : this.props.match.params.userId)
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
          <div className={styles.prev} onClick={() => this.prev()}>
            {"<"}
          </div>
          <div className={styles.datePicker}>
            {moment(new Date(this.state.startingDate)).format("DD MMMM")} -{" "}
            {moment(new Date(this.state.endingDate)).format("DD MMMM, YYYY")}
          </div>
          {/* <DatePicker
            selected={this.props.selectedDate}
            onChange={(date) => this.props.handleChange(date)}
            maxDate={new Date()}
            placeholder={"asa"}
          /> */}
          <div className={styles.next} onClick={() => this.next()}>
            {" "}
            {">"}{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryHeader;
