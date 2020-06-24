import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import defaultIcon from "../images/download.png";
import moment from "moment";
import next from "../images/next.png";
import previous from "../images/previous.jpg";
import nextTo from "../images/Next-2-2-icon.png";
import previousTo from "../images/Previous-icon.png";
import zoom from "../images/zoom.png";
import intensity from "../images/intensity.jpg";
import flag from "../images/flag.png";
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
      timecard: [],
      show: false,
      image: null,
      type: null,
      alltime: [],
      status: [],
      position: 0,
      timecardPosition: 0,
      render: false,
    };
  }
  showModal = (val, type, time) => {
    if (type == "screen") {
      this.setState({
        show: true,
        image: val,
        type: type,
        timeDetails: time,
        position: 0,
        timecardPosition: 0,
      });
      this.props.handleBreakup(time);
    } else if (type == "web") {
      this.setState({
        show: true,
        image: val,
        type: type,
        timeDetails: time,
        position: 0,
        timecardPosition: 0,
      });
      this.props.handleBreakup(time);
    }
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
  goBack = (time, pos) => {
    if (time) {
      this.props.handleBreakup(time);
      this.setState({
        position: pos - 1,
        timecardPosition: this.state.timecardPosition - 1,
      });
    } else if (this.state.position > 0) {
      this.setState({
        position: this.state.position - 1,
      });
    }
  };
  goForward = (time) => {
    if (time) {
      console.log(time);
      this.props.handleBreakup(time);
      this.setState({
        position: 0,
        timecardPosition: this.state.timecardPosition + 1,
        timeDetails: time,
      });
    } else {
      this.setState({
        position: this.state.position + 1,
      });
    }
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
      let timecard = [
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
            timecard[i] = this.props.time[j].timecardId;
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
      this.state.timecard.push(timecard);
    }

    const images = [];
    const time = [];
    if (images.length === 0) {
      this.props.breakupDetails &&
        this.props.breakupDetails.results &&
        this.props.breakupDetails.results.map((val, i) => {
          images.push({
            screenshot: val.screenshotUrl,
            webcam: val.webcamUrl,
            intensity: this.props.breakupDetails.intensityScore,
            focus: this.props.breakupDetails.focus,
            day: val.tday,
            date: moment(val.timeCardBreakup).format("DD,MMMM,HH:MM:SS:MS"),
          });
        });
    }
    if (time.length === 0) {
      this.props.allTime &&
        this.props.allTime &&
        this.props.allTime.map((iterator, i) => {
          iterator.map((val) => {
            time.push({
              timecard: val.timecardId,
            });
          });
        });
    }
    console.log(images);
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
                    : this.showModal(
                        this.state.ssImage[0][i],
                        "screen",
                        this.state.timecard[0][i]
                      )
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
                        {images && images.length > 1 && (
                          <>
                            {this.state.position > 0 && (
                              <div
                                className={styles.leftArrow}
                                onClick={() => this.goBack()}
                              >
                                <img
                                  src={previous}
                                  height="50px"
                                  width="50px"
                                />
                              </div>
                            )}
                            {this.state.timecardPosition > 0 &&
                              this.state.position == 0 && (
                                <div
                                  className={styles.leftArrow}
                                  onClick={() =>
                                    this.goBack(
                                      time &&
                                        time[this.state.timecardPosition - 1]
                                          .timecard,
                                      images.length
                                    )
                                  }
                                >
                                  <img
                                    src={previousTo}
                                    height="50px"
                                    width="50px"
                                  />
                                </div>
                              )}
                            {images &&
                              images.length !== this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() => this.goForward()}
                                >
                                  <img src={next} height="50px" width="50px" />
                                </div>
                              )}
                            {images &&
                              images.length === this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() =>
                                    this.goForward(
                                      time &&
                                        time[this.state.timecardPosition + 1]
                                          .timecard
                                    )
                                  }
                                >
                                  <img
                                    src={nextTo}
                                    height="50px"
                                    width="50px"
                                  />
                                </div>
                              )}
                          </>
                        )}
                        <img
                          onClick={() => {
                            console.log(this.state.webcam[0][i]);
                          }}
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].screenshot
                          }
                          height="100%"
                          width="100%"
                        />
                        <img
                          onClick={() => {
                            this.showModal(
                              images[this.state.position].webcam,
                              "web",
                              this.state.timecard[0][i]
                            );
                          }}
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].webcam
                          }
                          height="100px"
                          width="100px"
                        />
                      </div>
                      <div className={styles.panel}>
                        <div className={styles.dateHolder}>
                          <div className={styles.detailsDate}>
                            {images &&
                              images[this.state.position] &&
                              images[this.state.position].date}
                          </div>
                          <div>
                            {
                              this.state.image ? (
                                <div
                                  onClick={() =>
                                    this.props.handleFlag(
                                      this.state.timeDetails
                                    )
                                  }
                                >
                                  {/* {this.state.timeDetails} */}
                                  <img src={flag} height="20px" width="20px" />
                                </div>
                              ) : null
                              // <div>{images[this.state.position].timecard}</div>
                            }
                          </div>
                        </div>
                        <div className={styles.showdetails}>Show Details</div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            <img src={zoom} height="20px" width="20px" />
                            <span style={{ paddingLeft: "5px" }}>Focus</span>
                          </div>
                          <div>
                            {images &&
                            images[this.state.position] &&
                            images[this.state.position].focus === null
                              ? "0 min"
                              : `${
                                  images &&
                                  images[this.state.position] &&
                                  images[this.state.position].focus
                                } min`}
                          </div>
                        </div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            <img src={intensity} height="20px" width="20px" />
                            <span style={{ paddingLeft: "5px" }}>
                              Intensity
                            </span>
                          </div>{" "}
                          <div>
                            {images &&
                              images[this.state.position] &&
                              images[this.state.position].intensity}
                            %
                          </div>
                        </div>
                        <div className={styles.messageConatiner}>
                          <input type="text" />
                        </div>
                        <div className={styles.buttonHolder}>
                          <div className={styles.button}>Share</div>
                        </div>
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
                                      timeDetails: val.timeCardBreakup,
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
                    : () =>
                        this.showModal(
                          this.state.webcamImage[0][i],
                          "web",
                          this.state.timecard[0][i]
                        )
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
                        {images && images.length > 1 && (
                          <>
                            {this.state.position > 0 && (
                              <div
                                className={styles.leftArrow}
                                onClick={() => this.goBack()}
                              >
                                <img
                                  src={previous}
                                  height="50px"
                                  width="50px"
                                />
                              </div>
                            )}
                            {this.state.timecardPosition > 0 &&
                              this.state.position == 0 && (
                                <div
                                  className={styles.leftArrow}
                                  onClick={() =>
                                    this.goBack(
                                      time &&
                                        time[this.state.timecardPosition - 1]
                                          .timecard,
                                      images.length
                                    )
                                  }
                                >
                                  <img
                                    src={previousTo}
                                    height="50px"
                                    width="50px"
                                  />
                                </div>
                              )}
                            {images &&
                              images.length !== this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() => this.goForward()}
                                >
                                  <img src={next} height="50px" width="50px" />
                                </div>
                              )}
                            {images &&
                              images.length === this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() =>
                                    this.goForward(
                                      time &&
                                        time[this.state.timecardPosition + 1]
                                          .timecard
                                    )
                                  }
                                >
                                  <img
                                    src={nextTo}
                                    height="50px"
                                    width="50px"
                                  />
                                </div>
                              )}
                          </>
                        )}
                        <img
                          onClick={() => {
                            console.log(this.state.webcam[0][i]);
                          }}
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].webcam
                          }
                          height="100%"
                          width="100%"
                        />
                        <img
                          onClick={() => {
                            this.showModal(
                              images[this.state.position].screenshot,
                              "screen",
                              this.state.timecard[0][i]
                            );
                          }}
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].screenshot
                          }
                          height="100px"
                          width="100px"
                        />
                      </div>
                      <div className={styles.panel}>
                        <div className={styles.dateHolder}>
                          <div className={styles.detailsDate}>
                            {images &&
                              images[this.state.position] &&
                              images[this.state.position].date}
                          </div>
                          <div>
                            <div
                              onClick={() =>
                                this.props.handleFlag(this.state.timeDetails)
                              }
                            >
                              {/* {this.state.timeDetails} */}
                              <img src={flag} height="20px" width="20px" />
                            </div>
                          </div>
                        </div>
                        <div className={styles.showdetails}>Show Details</div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            <img src={zoom} height="20px" width="20px" />
                            <span style={{ paddingLeft: "5px" }}>Focus</span>
                          </div>
                          <div>
                            {images &&
                            images[this.state.position] &&
                            images[this.state.position].focus === null
                              ? "0 min"
                              : `${
                                  images &&
                                  images[this.state.position] &&
                                  images[this.state.position].focus
                                } min`}
                          </div>
                        </div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            <img src={intensity} height="20px" width="20px" />
                            <span style={{ paddingLeft: "5px" }}>
                              Intensity
                            </span>
                          </div>{" "}
                          <div>
                            {images &&
                              images[this.state.position] &&
                              images[this.state.position].intensity}
                            %
                          </div>
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
                <div
                  className={styles.completedBar}
                  title={"Intensity : " + this.state.intensityScore[0][i]}
                >
                  <div
                    className={styles.completedLevel}
                    style={{
                      width:
                        this.state.intensityScore[0][i] === "defaultimageurl"
                          ? 0
                          : `${this.state.intensityScore[0][i]}%`,
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
