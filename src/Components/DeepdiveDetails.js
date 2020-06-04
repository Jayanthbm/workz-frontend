import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import DeepdiveDay from "./DeepdiveDay";
class DeepdiveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepdiveData: [],
      day: [],
      allTime: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.allChecker === true) {
      this.setState({ allTime: [] });
    }
  }
  render() {
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
    function totalhours(data) {
      let totalminutes = 0;
      for (let y = 0; y < data.length; y++) {
        totalminutes = totalminutes + Object.keys(data[y][1]).length;
      }
      return timeConvert(totalminutes * 10);
    }
    console.log(this.props.deepdiveData);
    if (this.props.deepdiveData && this.state.deepdiveData.length === 0) {
      for (let i = 0; i < this.props.deepdiveData.results.length; i++) {
        const a = Object.entries(
          this.props &&
            this.props.deepdiveData &&
            !this.props.deepDiveError &&
            this.props.deepdiveData.results &&
            this.props.deepdiveData.results[i] &&
            this.props.deepdiveData.results[i]
        );

        this.state.deepdiveData.push(a);
      }
    }
    console.log(this.state.deepdiveData);
    return (
      <div className={styles.deepDiveBase}>
        {!this.props.deepDiveError && this.state.deepdiveData
          ? this.state.deepdiveData.map((val, i) => {
              return (
                <div>
                  <div className={styles.dayHolder}>
                    <div className={styles.weekContainer}>
                      <div className={styles.dayText}>
                        {val && val[1] && val[1][1][0].tday}
                      </div>
                      <div className={styles.hourText}> {totalhours(val)}</div>
                    </div>
                  </div>
                  {val.map((time) => {
                    console.log(i);
                    this.state.allTime.push(time[1]);

                    return (
                      <div className={styles.dataContainer}>
                        <div className={styles.timeSlots}>
                          {time[0] < 10 ? 0 : ""}
                          {time[0]}:00
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
              );
            })
          : "No data Found"}
      </div>
    );
  }
}

export default DeepdiveDetails;
