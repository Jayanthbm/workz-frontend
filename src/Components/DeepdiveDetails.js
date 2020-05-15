import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
class DeepdiveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepdiveData: [],
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
    console.log(this.state.deepdiveData);
    return (
      <div className={styles.deepDiveBase}>
        {this.state.deepdiveData &&
          this.state.deepdiveData.map((val) => {
            console.log(val[1][1][0].tday);
            return (
              <div>
                {val[1][1][0].tday}
                {val.map((time) => {
                  console.log(time);
                  return (
                    <div>
                      {" "}
                      <div className={styles.timeSlots}>{time[0]}</div>
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
