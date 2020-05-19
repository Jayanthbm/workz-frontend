import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import DeepdiveDay from "./DeepdiveDay";
class DeepdiveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepdiveData: [],
      day: [],
    };
  }

  render() {
    console.log(this.props.deepdiveData);
    if (this.props.deepdiveData) {
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

    return (
      <div className={styles.deepDiveBase}>
        {!this.props.deepDiveError && this.state.deepdiveData
          ? this.state.deepdiveData.map((val) => {
              return (
                <div>
                  {val && val[1] && val[1][1][0].tday}
                  {val.map((time) => {
                    return (
                      <div className={styles.dataContainer}>
                        <div className={styles.timeSlots}>{time[0]}</div>
                        <div className={styles.imgContainer}>
                          <DeepdiveDay time={time[1]} />

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
