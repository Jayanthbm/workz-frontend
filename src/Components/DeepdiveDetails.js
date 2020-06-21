import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import DeepdiveDay from "./DeepdiveDay";
import moment from "moment";
class DeepdiveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepdiveData: [],
      day: [],
      allTime: [],
      render: false,
    };
  }
  componentDidMount() {
    this.setState({ render: true });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.allChecker === true) {
        this.setState({ allTime: [] });
      }
      function timeConvert(n) {
        var num = n;
        var hours = num / 60;
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        if (rhours > 1 && rminutes > 1) {
          return rhours + " hours and " + rminutes + " minutes";
        }
        if (rhours > 1 && rminutes === 1) {
          return rhours + " hours and " + rminutes + " minute";
        }
        if (rhours > 1 && rminutes === 0) {
          return rhours + " hours";
        }
        if (rhours === 1 && rminutes > 0) {
          return rhours + " hour and " + rminutes + " minutes";
        }
        if (rhours === 1 && rminutes === 0) {
          return rhours + " hour";
        }
        if (rhours === 1 && rminutes === 1) {
          return rhours + " hour and " + rminutes + " minute";
        }
        if (rhours === 0 && rminutes === 1) {
          return rminutes + " minute";
        }
        if (rhours === 0 && rminutes > 0) {
          return rminutes + " minutes";
        }
      }
      this.setState({
        totalhours: function totalhours(data) {
          let totalminutes = 0;
          for (let y = 0; y < data.length; y++) {
            totalminutes = totalminutes + Object.keys(data[y][1]).length;
          }
          return timeConvert(totalminutes * 10);
        },
      });
      if (
        (nextProps.deepdiveData && this.state.deepdiveData.length === 0) ||
        (nextProps.deepdiveData &&
          this.state.deepdiveData &&
          this.state.deepdiveData[0] &&
          this.state.deepdiveData[0].length === 0)
      ) {
        for (let i = 0; i < nextProps.deepdiveData.results.length; i++) {
          const a = Object.entries(
            nextProps &&
              nextProps.deepdiveData &&
              !nextProps.deepDiveError &&
              nextProps.deepdiveData.results &&
              nextProps.deepdiveData.results[i] &&
              nextProps.deepdiveData.results[i]
          );

          this.state.deepdiveData.push(a);
        }
      }
    }
  }

  render() {
    console.log(new Date(this.props.match.params.date));
    // function timeConvert(n) {
    //   var num = n;
    //   var hours = num / 60;
    //   var rhours = Math.floor(hours);
    //   var minutes = (hours - rhours) * 60;
    //   var rminutes = Math.round(minutes);
    //   if (rhours > 1 && rminutes > 1) {
    //     return rhours + " hours and " + rminutes + " minutes";
    //   }
    //   if (rhours > 1 && rminutes === 1) {
    //     return rhours + " hours and " + rminutes + " minute";
    //   }
    //   if (rhours > 1 && rminutes === 0) {
    //     return rhours + " hours";
    //   }
    //   if (rhours === 1 && rminutes > 0) {
    //     return rhours + " hour and " + rminutes + " minutes";
    //   }
    //   if (rhours === 1 && rminutes === 0) {
    //     return rhours + " hour";
    //   }
    //   if (rhours === 1 && rminutes === 1) {
    //     return rhours + " hour and " + rminutes + " minute";
    //   }
    //   if (rhours === 0 && rminutes === 1) {
    //     return rminutes + " minute";
    //   }
    //   if (rhours === 0 && rminutes > 0) {
    //     return rminutes + " minutes";
    //   }
    // }
    // function totalhours(data) {
    //   let totalminutes = 0;
    //   for (let y = 0; y < data.length; y++) {
    //     totalminutes = totalminutes + Object.keys(data[y][1]).length;
    //   }
    //   return timeConvert(totalminutes * 10);
    // }
    return (
      <div className={styles.deepDiveBase}>
        {!this.props.deepDiveError && this.props.deepdiveData && (
          <div className={styles.headerContainer}>
            <div className={styles.hoursHeader}>
              Hours Logged:{" "}
              {Math.floor(
                this.props.deepdiveData &&
                  (this.props.deepdiveData.totalMinutes / 60) * 100
              ) / 100}
            </div>
            <div>
              Intensity:{" "}
              {Math.floor(
                this.props.deepdiveData &&
                  this.props.deepdiveData.AverageIntensity * 100
              ) / 100}
            </div>
          </div>
        )}
        {!this.props.deepDiveError && this.state.deepdiveData
          ? this.state.deepdiveData.map((val, i) => {
              return (
                val.length > 0 && (
                  <div>
                    <div className={styles.dayHolder}>
                      <div className={styles.weekContainer}>
                        <div className={styles.dayText}>
                          {val && val[1] && val[1][1][0].tday}{" "}
                        </div>
                        <div className={styles.dayText}>
                          {moment(
                            val && val[1] && val[1][1][0].timecard
                          ).format("DD,MMMM")}
                        </div>
                        <div className={styles.hourText}>
                          {" "}
                          {this.state.totalhours(val)}
                        </div>
                      </div>
                    </div>
                    {val.map((time) => {
                      this.state.allTime.push(time[1]);

                      return (
                        <div className={styles.dataContainer}>
                          <div className={styles.timeSlots}>
                            {time[0] < 13 ? time[0] : time[0] - 12}
                            {time[0] < 12 ? "AM" : "PM"}
                          </div>
                          <div className={styles.imgContainer}>
                            <DeepdiveDay
                              time={time[1]}
                              allTime={this.state.allTime}
                              empname={this.props.empname}
                            />

                            {/* {time[1].map((day, i) => {
                          console.log(
                            day.time ==
                              `${day.hour > 9 ? "" : "0"}${day.hour}:${
                                i == 0 ? "00" : i * 10
                              }:00`
                          );
                          return <DeepdiveDay time={day} />;
                        })} */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              );
            })
          : "No timecards available"}
      </div>
    );
  }
}

export default DeepdiveDetails;
