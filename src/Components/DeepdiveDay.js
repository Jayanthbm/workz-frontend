import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import defaultIcon from "../images/download.png";
import moment from "moment";
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
      intensityScore: [],
      show: false,
      image: null,
      type: null,
      alltime: [],
      status: [],
      position: 0,
      render: false,
    };
  }
  showModal = (val, type) => {
    this.setState({ show: true, image: val, type: type });
  };
  componentDidMount() {
    if (this.props.time) {
      let arr = [];
      arr.push(this.props.time);
      this.setState({ render: true });
    }
  }
  hideModal = () => {
    this.setState({ show: false, type: null });
  };
  goBack = () => {
    if (this.state.position > 0) {
      this.setState({
        position: this.state.position - 1,
      });
    }
  };
  goForward = () => {
    this.setState({
      position: this.state.position + 1,
    });
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
      let intensityScore = [
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
        "defaultimageurl",
      ];
      let status = [
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
            intensityScore[i] = this.props.time[j].intensityScore;
            status[i] = this.props.time[j].status;
          }
        }
      }
      this.state.slots.push(slots);
      this.state.webcam.push(webcam);
      this.state.ssImage.push(ssImage);
      this.state.webcamImage.push(webcamImage);
      this.state.timeframes.push(timeframes);
      this.state.intensityScore.push(intensityScore);
      this.state.status.push(status);
    }

    const images = [];
    if (images.length === 0) {
      this.props.allTime.map((iterator) => {
        iterator.map((val) => {
          images.push({
            screenshot: val.screenshotUrl,
            webcam: val.webcamUrl,
            intensity: val.intensityScore,
            day: val.tday,
            date: moment(val.timecard).format("DD,MMMM"),
          });
        });
      });
    }
    console.log(this.state.status);
    return (
      <div className={styles.dayContainer}>
        {this.state.slots[0].map((val, i) => {
          return (
            <div className={styles.minuteContainer}>
              <div
                style={{
                  backgroundColor:
                    this.state.status[0][i] == "defaultimageurl"
                      ? "grey"
                      : this.state.status[0][i] == "approved"
                      ? "#8bc646"
                      : this.state.status[0][i] == "rejected"
                      ? "#d2bd94"
                      : this.state.status[0][i] == "flagged" && "red",
                }}
              >
                {" "}
                :{this.state.timeframes[0][i].substring(0, 2)}{" "}
              </div>
              {/* {val !== "defaultimageurl" && (
                <div>Intensity: {this.state.intensityScore[0][i]}</div>
              )} */}
              <img
                onClick={() =>
                  val === "defaultimageurl"
                    ? ""
                    : this.showModal(this.state.ssImage[0][i], "screen")
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
                        {images && images.length > 1 && !this.state.image && (
                          <>
                            <div
                              className={styles.leftArrow}
                              onClick={() => this.goBack()}
                            >
                              {">"}
                            </div>
                            <div
                              className={styles.rightArrow}
                              onClick={() => this.goForward()}
                            >
                              {"<"}
                            </div>
                          </>
                        )}
                        <img
                          onClick={() => {
                            console.log(this.state.webcam[0][i]);
                          }}
                          src={
                            this.state.image
                              ? this.state.image
                              : images[this.state.position].screenshot
                          }
                          height="100%"
                          width="100%"
                        />
                        <img
                          onClick={() => {
                            this.showModal(
                              images[this.state.position].webcam,
                              "web"
                            );
                          }}
                          src={images[this.state.position].webcam}
                          height="100px"
                          width="100px"
                        />
                      </div>
                      <div className={styles.panel}>
                        <div>
                          {images[this.state.position].day}{" "}
                          {images[this.state.position].date}
                        </div>
                        <div className={styles.details}>Show Details</div>
                        <div className={styles.details}>Focus</div>
                        <div className={styles.details}>
                          <div> Intensity</div>{" "}
                          <div>{images[this.state.position].intensity}</div>
                        </div>

                        <textarea rows="10" className={styles.commentBox} />
                        <div className={styles.toggleContainer}>
                          {this.props.empname && (
                            <div>Share with {this.props.empname}</div>
                          )}
                        </div>
                        <div className={styles.imageContainer}>
                          {images.length > 0 &&
                            images.map((val, i) => {
                              return (
                                <img
                                  src={val.screenshot}
                                  height="50px"
                                  width="50px"
                                  onClick={() =>
                                    this.setState({
                                      position: i,
                                      type: "screen",
                                      image: null,
                                    })
                                  }
                                />
                              );
                            })}
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
                onClick={
                  val === "defaultimageurl"
                    ? ""
                    : () => this.showModal(this.state.webcamImage[0][i], "web")
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
                        {images && images.length > 1 && !this.state.image && (
                          <>
                            <div
                              className={styles.leftArrow}
                              onClick={() => this.goBack()}
                            >
                              {">"}
                            </div>
                            <div
                              className={styles.rightArrow}
                              onClick={() => this.goForward()}
                            >
                              {"<"}
                            </div>
                          </>
                        )}
                        <img
                          onClick={() => {
                            console.log(this.state.webcam[0][i]);
                          }}
                          src={
                            this.state.image
                              ? this.state.image
                              : images[this.state.position].webcam
                          }
                          height="100%"
                          width="100%"
                        />
                        <img
                          onClick={() => {
                            this.showModal(
                              images[this.state.position].screenshot,
                              "screen"
                            );
                          }}
                          src={images[this.state.position].screenshot}
                          height="100px"
                          width="100px"
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
                        <div className={styles.imageContainer}>
                          {images.length > 0 &&
                            images.map((val, i) => {
                              return (
                                <img
                                  src={val.webcam}
                                  height="50px"
                                  width="50px"
                                  onClick={() =>
                                    this.setState({
                                      position: i,
                                      type: "web",
                                      image: null,
                                    })
                                  }
                                />
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </Modal>
                )}

              {this.state.intensityScore[0][i] !== "defaultimageurl" && (
                <div className={styles.completedBar}>
                  <div
                    className={styles.completedLevel}
                    style={{
                      width:
                        this.state.intensityScore[0][i] === "defaultimageurl"
                          ? 0
                          : this.state.intensityScore[0][i],
                      background:
                        this.state.intensityScore[0][i] < 20
                          ? "red"
                          : this.state.intensityScore[0][i] > 20 &&
                            this.state.intensityScore[0][i] < 60
                          ? "#efc165"
                          : "#8bc646",
                    }}
                  ></div>
                </div>
              )}
              {this.state.intensityScore[0][i] === "defaultimageurl" && (
                <div className={styles.completedBar}>
                  <div
                    className={styles.completedLevel}
                    style={{
                      width: "0",
                    }}
                  ></div>
                </div>
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
