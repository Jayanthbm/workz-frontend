import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import defaultIcon from "../images/download.png";
class DeepdiveDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
      timeframes: [],
    };
  }
  render() {
    if (this.props.time) {
      let timeframes = ["00:00", "10:00", "20:00", "30:00", "40:00", "50:00"];
      let slots = [
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
      ];
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.props.time.length; j++) {
          let time = this.props.time[j].time.substring(3);
          if (time === timeframes[i]) {
            slots[i] = this.props.time[j].screenshotUrl;
          }
        }
      }
      this.state.slots.push(slots);
      this.state.timeframes.push(timeframes);
    }

    return (
      <div className={styles.dayContainer}>
        {this.state.slots[0].map((val, i) => {
          return (
            <div className={styles.minuteContainer}>
              <div> {this.state.timeframes[0][i]} </div>
              <img
                onClick={() => {
                  console.log(val);
                }}
                src={val == "defaultimageurl" ? defaultIcon : val}
                height="100px"
                width="150px"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DeepdiveDay;
