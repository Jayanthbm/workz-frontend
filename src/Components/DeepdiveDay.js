import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import defaultIcon from "../images/download.png";
import Popup from "reactjs-popup";
class DeepdiveDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
      timeframes: [],
      webcam: [],
      ssImage: [],
      webcamImage: [],
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
      let ssImage = [
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
      ];
      let webcamImage = [
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
      ];
      let webcam = [
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
            slots[i] = this.props.time[j].screenshotUrl_thumb;
            webcam[i] = this.props.time[j].webcamUrl_thumb;
            ssImage[i] = this.props.time[j].screenshotUrl;
            webcamImage[i] = this.props.time[j].webcamUrl;
          }
        }
      }
      this.state.slots.push(slots);
      this.state.webcam.push(webcam);
      this.state.ssImage.push(ssImage);
      this.state.webcamImage.push(webcamImage);
      this.state.timeframes.push(timeframes);
    }
    console.log(this.state.webcamImage[0]);
    return (
      <div className={styles.dayContainer}>
        {this.state.slots[0].map((val, i) => {
          return (
            <div className={styles.minuteContainer}>
              <div> {this.state.timeframes[0][i]} </div>
              {val === "defaultimageurl" && (
                <img
                  onClick={() => {
                    console.log(val);
                  }}
                  src={val == "defaultimageurl" ? defaultIcon : val}
                  height="100px"
                  width="150px"
                />
              )}
              {val !== "defaultimageurl" && (
                <Popup
                  trigger={
                    <img
                      onClick={() => {
                        console.log(val);
                      }}
                      src={val == "defaultimageurl" ? defaultIcon : val}
                      height="100px"
                      width="150px"
                    />
                  }
                  modal
                >
                  <div>
                    <img
                      src={this.state.ssImage[0][i]}
                      height="100px"
                      width="150px"
                    />{" "}
                  </div>
                </Popup>
              )}
              {/* <img
                onClick={() => {
                  console.log(val);
                }}
                src={val == "defaultimageurl" ? defaultIcon : val}
                height="100px"
                width="150px"
              /> */}
              {this.state.webcam[0][i] === "defaultimageurl" && (
                <img
                  onClick={() => {
                    console.log(this.state.webcam[0][i]);
                  }}
                  src={
                    this.state.webcam[0][i] == "defaultimageurl"
                      ? defaultIcon
                      : this.state.webcam[0][i]
                  }
                  height="100px"
                  width="150px"
                />
              )}
              {this.state.webcam[0][i] !== "defaultimageurl" && (
                <Popup
                  trigger={
                    <img
                      onClick={() => {
                        console.log(this.state.webcam[0][i]);
                      }}
                      src={
                        this.state.webcam[0][i] == "defaultimageurl"
                          ? defaultIcon
                          : this.state.webcam[0][i]
                      }
                      height="100px"
                      width="150px"
                    />
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div> {this.state.webcam[0][i]} </div>
                </Popup>
              )}
              {/* <img
                onClick={() => {
                  console.log(this.state.webcam[0][i]);
                }}
                src={
                  this.state.webcam[0][i] == "defaultimageurl"
                    ? defaultIcon
                    : this.state.webcam[0][i]
                }
                height="100px"
                width="150px"
              /> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default DeepdiveDay;
