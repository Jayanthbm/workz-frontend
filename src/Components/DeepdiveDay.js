import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import defaultIcon from "../images/download.png";
import Popup from "reactjs-popup";
import Modal from "./Modal";
class DeepdiveDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
      timeframes: [],
      webcam: [],
      ssImage: [],
      webcamImage: [],
      show: false,
      image: null,
      type: null,
    };
  }
  showModal = (val, type) => {
    console.log(val);

    this.setState({ show: true, image: val, type: type });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
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
              <img
                onClick={() =>
                  this.showModal(this.state.ssImage[0][i], "screen")
                }
                src={val == "defaultimageurl" ? defaultIcon : val}
                height="100px"
                width="150px"
              />
              {this.state.type &&
                this.state.type === "screen" &&
                val !== "defaultimageurl" && (
                  <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div className={styles.webContainer}>
                      <div className={styles.webImage}>
                        {" "}
                        <img
                          onClick={() => {
                            console.log(this.state.webcam[0][i]);
                          }}
                          src={
                            this.state.image ? this.state.image : defaultIcon
                          }
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <div className={styles.panel}>
                        <div className={styles.details}>Show Details</div>
                        <div className={styles.details}>Focus</div>
                        <div className={styles.details}>Intensity</div>

                        <textarea rows="10" className={styles.commentBox} />
                        <div className={styles.toggleContainer}>
                          {this.props.empname && (
                            <div>Share with {this.props.empname}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Modal>
                  // <Popup
                  //   trigger={
                  //     <img
                  //       onClick={() => {
                  //         console.log(val);
                  //       }}
                  //       src={val == "defaultimageurl" ? defaultIcon : val}
                  //       height="100px"
                  //       width="150px"
                  //     />
                  //   }
                  //   modal
                  // >
                  //   <div>
                  //     <img
                  //       src={this.state.ssImage[0][i]}
                  //       height="100px"
                  //       width="150px"
                  //     />{" "}
                  //   </div>
                  // </Popup>
                )}
              {/* <img
                onClick={() => {
                  console.log(val);
                }}
                src={val == "defaultimageurl" ? defaultIcon : val}
                height="100px"
                width="150px"
              /> */}

              <img
                onClick={() =>
                  this.showModal(this.state.webcamImage[0][i], "web")
                }
                src={
                  this.state.webcam[0][i] == "defaultimageurl"
                    ? defaultIcon
                    : this.state.webcam[0][i]
                }
                height="100px"
                width="150px"
              />

              {this.state.type &&
                this.state.type === "web" &&
                this.state.webcam[0][i] !== "defaultimageurl" && (
                  <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div className={styles.webContainer}>
                      <div className={styles.webImage}>
                        {" "}
                        <img
                          onClick={() => {
                            console.log(this.state.webcam[0][i]);
                          }}
                          src={
                            this.state.image ? this.state.image : defaultIcon
                          }
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <div className={styles.panel}>
                        <div className={styles.details}>Show Details</div>
                        <div className={styles.details}>Focus</div>
                        <div className={styles.details}>Intensity</div>

                        <textarea rows="10" className={styles.commentBox} />
                        <div className={styles.toggleContainer}>
                          {this.props.empname && (
                            <div>Share with {this.props.empname}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Modal>
                )}
              <div className={styles.completedBar}>
                <div
                  className={styles.completedLevel}
                  style={{
                    width: Math.random() * 100,
                    background: "#8bc646",
                  }}
                ></div>
              </div>
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
