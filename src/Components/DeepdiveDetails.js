import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
class DeepdiveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepdiveData: [],
      day: [],
    };
  }

  render() {
    if (this.props.deepdiveData) {
      for (let i = 0; i < this.props.deepdiveData.results.length; i++) {
        const a = Object.entries(
          this.props &&
            this.props.deepdiveData &&
            this.props.deepdiveData.results &&
            this.props.deepdiveData.results[i] &&
            this.props.deepdiveData.results[i]
        );
        this.state.deepdiveData.push(a);
      }
    }

    return (
      <div className={styles.deepDiveBase}>
        {this.state.deepdiveData &&
          this.state.deepdiveData.map((val) => {
            return (
              <div>
                {val[1][1][0].tday}
                {val.map((time) => {
                  return (
                    <div className={styles.dataContainer}>
                      <div className={styles.timeSlots}>{time[0]}</div>
                      <div className={styles.imgContainer}>
                        {time[1].map((day, i) => {
                          console.log(
                            day.time ==
                              `${day.hour > 9 ? "" : "0"}${day.hour}:${
                                i == 0 ? "00" : i * 10
                              }:00`
                          );
                          return (
                            <div>
                              {day.hour == time[0] && (
                                <img
                                  src={day.screenshotUrl}
                                  height="50px"
                                  width="50px"
                                  alt="imag"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  }
}

export default DeepdiveDetails;
