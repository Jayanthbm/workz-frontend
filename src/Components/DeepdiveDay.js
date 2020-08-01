import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
import defaultIcon from "../images/download.png";
// import moment from "moment";
// import next from "../images/next.png";
// import previous from "../images/previous.jpg";
// import nextTo from "../images/Next-2-2-icon.png";
// import previousTo from "../images/Previous-icon.png";
// import zoom from "../images/zoom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faFlag,
  faCrosshairs,
  faBolt,
  faChevronCircleLeft,
  faArrowAltCircleLeft,
  faChevronCircleRight,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import intensity from "../images/intensity.jpg";
import flag from "../images/flag.png";
import Modal from "./Modal";
import moment from "moment";
const a = [];
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
      count: 0,
      show: false,
      image: null,
      type: null,
      alltime: [],
      status: [],
      position: 0,
      flagMessage: null,
      timecardPosition: 0,
      render: false,
      colorChange: false,
      approveArray: [],
    };
    this.Observer = React.createRef();
  }
  handlekeydown = (e, timecard) => {
    if (e.keyCode === 13) {
      this.props.handleMessage({ comment: this.state.comment }, timecard);
      this.setState({ comment: "" });
    }
  };
  showModal = (val, type, time, position) => {
    if (type == "screen") {
      this.setState({
        show: true,
        image: val,
        type: type,
        timeDetails: time,
        position: position ? position : 0,
        timecardPosition: 0,
      });
      this.props.handleBreakup(time);
    } else if (type == "web") {
      this.setState({
        show: true,
        image: val,
        type: type,
        timeDetails: time,
        position: position ? position : 0,
        comment: null,
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
  componentWillReceiveProps = (nextProps) => {
    if (this.props.flagDetails !== nextProps.flagDetails) {
      this.setState({
        flagMessage: nextProps.flagDetails && nextProps.flagDetails.message,
      });
    }
  };
  hideModal = () => {
    this.setState({ show: false, type: null, flagMessage: null });
    window.location.reload();
  };
  goBack = (breakup, time, pos) => {
    if (time !== null) {
      this.props.handleBreakup(time);
      this.setState({
        position: pos - 1,
        timecardPosition: this.state.timecardPosition - 1,
        flagMessage: null,
      });
    } else if (this.state.position > 0) {
      this.setState({
        position: this.state.position - 1,
      });
      this.props.handleGetMessage(breakup);
    }
  };
  goForward = (breakup, time) => {
    if (time !== null) {
      this.props.handleBreakup(time);
      this.setState({
        position: 0,
        timecardPosition: this.state.timecardPosition + 1,
        timeDetails: time,
        flagMessage: null,
      });
      // this.props.handleGetMessage(breakup);
    } else {
      this.setState({
        position: this.state.position + 1,
      });
      this.props.handleGetMessage(breakup);
    }
  };
  approveHandler = (event, timecardId, i) => {
    if (
      this.state.status[0][i] == "flagged" &&
      event.target.style.background != "blue"
    ) {
      a.push(timecardId);
      event.target.style.background = "blue";
      event.target.style.color = "white";
      this.setState({ colorChange: true });
      console.log(a);
      this.props.approver(a);
    } else if (event.target.style.background === "blue") {
      if (this.state.status[0][i] == "defaultimageurl") {
        event.target.style.background = "grey";
      } else if (
        this.state.status[0][i] == "flagged" ||
        this.state.status[0][i] == null
      ) {
        a.splice(a.indexOf(timecardId, 1));
        event.target.style.background = "red";
        event.target.style.color = "black";
        console.log(a);
        this.props.approver(a);
      }
      this.setState({ colorChange: false });
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
            timeCardBreakup: val.timecardBreakupId,
            timecardId: val.timecardId,
            previousTime: this.props.breakupDetails.PreviousTimecard,
            nextTime: this.props.breakupDetails.NextTimeCard,
            day: val.tday,
            status: this.props.breakupDetails.status,
            date: val.Datetime,
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
    return (
      <div className={styles.dayContainer}>
        {this.state.slots[0].map((val, i) => {
          return (
            <div className={styles.minuteContainer} key={i}>
              <div
                onClick={(event) =>
                  this.approveHandler(event, this.state.timecard[0][i], i)
                }
                style={{
                  backgroundColor:
                    this.state.status[0][i] == "defaultimageurl"
                      ? "grey"
                      : this.state.status[0][i] == "approved" ||
                        this.state.status[0][i] == null
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
                                onClick={() =>
                                  this.goBack(
                                    images &&
                                      images[this.state.position - 1] &&
                                      images[this.state.position - 1]
                                        .timeCardBreakup,
                                    null,
                                    null
                                  )
                                }
                              >
                                {/* <img
                                  src={previous}
                                  height="50px"
                                  width="50px"
                                /> */}
                                <FontAwesomeIcon
                                  icon={faChevronCircleLeft}
                                  size="3x"
                                  color="grey"
                                />
                              </div>
                            )}
                            {this.state.position == 0 && (
                              <div
                                className={styles.leftArrow}
                                onClick={() =>
                                  this.goBack(
                                    images &&
                                      images[this.state.position] &&
                                      images[this.state.position]
                                        .timeCardBreakup,
                                    images &&
                                      images[this.state.position] &&
                                      images[this.state.position].previousTime,
                                    images.length
                                  )
                                }
                              >
                                {/* <img
                                  src={previousTo}
                                  height="50px"
                                  width="50px"
                                /> */}
                                <FontAwesomeIcon
                                  icon={faArrowAltCircleLeft}
                                  size="3x"
                                  color="grey"
                                />
                              </div>
                            )}
                            {images &&
                              images.length !== this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() =>
                                    this.goForward(
                                      images &&
                                        images[this.state.position + 1] &&
                                        images[this.state.position + 1]
                                          .timeCardBreakup,
                                      null
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faChevronCircleRight}
                                    size="3x"
                                    color="grey"
                                  />
                                  {/* <img src={next} height="50px" width="50px" /> */}
                                </div>
                              )}
                            {images &&
                              images.length === this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() =>
                                    this.goForward(
                                      images &&
                                        images[this.state.position] &&
                                        images[this.state.position]
                                          .timeCardBreakup,
                                      images &&
                                        images[this.state.position] &&
                                        images[this.state.position].nextTime
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowAltCircleRight}
                                    size="3x"
                                    color="grey"
                                  />
                                  {/* <img
                                    src={nextTo}
                                    height="50px"
                                    width="50px"
                                  /> */}
                                </div>
                              )}
                          </>
                        )}
                        <img
                          onClick={() => {
                            console.log(this.state.webcam[0][i]);
                          }}
                          onLoad={() => {
                            this.props.handleGetMessage(
                              images &&
                                images[this.state.position] &&
                                images[this.state.position].timeCardBreakup
                            );
                          }}
                          onError={() => {
                            this.props.handleGetMessage(
                              images &&
                                images[this.state.position] &&
                                images[this.state.position].timeCardBreakup
                            );
                          }}
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].screenshot
                          }
                          height="100%"
                          width="100%"
                        />
                        <div className={styles.secondaryImage}>
                          <img
                            onClick={() => {
                              this.showModal(
                                images[this.state.position].webcam,
                                "web",
                                null,
                                this.state.position
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
                      </div>
                      <div className={styles.panel}>
                        {this.state.flagMessage && (
                          <div className={styles.error}>
                            {this.state.flagMessage}
                          </div>
                        )}
                        <div className={styles.dateHolder}>
                          <div className={styles.detailsDate}>
                            {moment(
                              images &&
                                images[this.state.position] &&
                                images[this.state.position].date
                            ).format("dddd, MMM DD HH:MM A ")}
                          </div>
                          <div>
                            <div
                              onClick={() =>
                                this.props.handleFlag(
                                  images &&
                                    images[this.state.position] &&
                                    images[this.state.position].timecardId
                                )
                              }
                              className={styles.flagButton}
                            >
                              {/* {this.state.timeDetails} */}
                              {images &&
                              images[this.state.position] &&
                              images[this.state.position].status !==
                                "flagged" &&
                              this.state.flagMessage === null ? (
                                <img src={flag} height="20px" width="20px" />
                              ) : this.state.flagMessage ===
                                "Successfully Unflagged" ? (
                                <img src={flag} height="20px" width="20px" />
                              ) : this.state.flagMessage ===
                                "Successfully Flagged" ? (
                                <FontAwesomeIcon icon={faFlag} color="red" />
                              ) : (
                                images &&
                                images[this.state.position] &&
                                images[this.state.position].status ===
                                  "flagged" && (
                                  <FontAwesomeIcon icon={faFlag} color="red" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={styles.showdetails}>Show Details</div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            {/* <img src={zoom} height="20px" width="20px" /> */}
                            <FontAwesomeIcon
                              icon={faCrosshairs}
                              color="green"
                            />
                            <span style={{ paddingLeft: "5px" }}>Focus</span>
                          </div>
                          <div>
                            {(images &&
                              images[this.state.position] &&
                              images[this.state.position].focus === null) ||
                            (images &&
                              images[this.state.position] &&
                              images[this.state.position].focus === 0) ? (
                              <FontAwesomeIcon icon={faDotCircle} color="red" />
                            ) : (
                              <FontAwesomeIcon
                                icon={faDotCircle}
                                color="#8bc646"
                              />
                            )}
                          </div>
                        </div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            <FontAwesomeIcon icon={faBolt} color="orange" />
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
                          <div className={styles.textContainer}>
                            <input
                              type="text"
                              placeholder="Enter Message"
                              onKeyDown={(e) =>
                                this.handlekeydown(
                                  e,
                                  images &&
                                    images[this.state.position] &&
                                    images[this.state.position].timeCardBreakup
                                )
                              }
                              onChange={(val) => {
                                this.setState({ comment: val.target.value });
                              }}
                              value={this.state.comment}
                              className={styles.textBox}
                            />
                          </div>
                          <div className={styles.messageList}>
                            {this.props.getMessageData &&
                              this.props.getMessageData.map((val) => {
                                return (
                                  <div className={styles.messageHolder}>
                                    <div className={styles.from}>
                                      {val.from}:{" "}
                                    </div>
                                    <div className={styles.message}>
                                      {val.message}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        <div className={styles.buttonHolder}>
                          <div
                            className={styles.button}
                            onClick={() => {
                              this.props.handleMessage(
                                { comment: this.state.comment },
                                images &&
                                  images[this.state.position] &&
                                  images[this.state.position].timeCardBreakup
                              );
                              this.setState({ comment: "" });
                            }}
                          >
                            Share
                          </div>
                        </div>
                        {/* <div className={styles.toggleContainer}>
                          {this.props.empname && (
                            <div>Share with {this.props.empname}</div>
                          )}
                        </div> */}
                        <div className={styles.imageContainer}>
                          {images.length > 0 &&
                            images.map((val, i) => {
                              return (
                                <div
                                  className={
                                    this.state.position === i
                                      ? styles.focusImage
                                      : ""
                                  }
                                >
                                  <img
                                    src={val.screenshot}
                                    height="50px"
                                    width="50px"
                                    onClick={() => {
                                      this.setState({
                                        position: i,
                                        type: "screen",
                                        timeDetails: val.timeCardBreakup,
                                      });
                                      this.props.handleGetMessage(
                                        images &&
                                          images[i] &&
                                          images[i].timeCardBreakup
                                      );
                                    }}
                                  />
                                </div>
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
                onClick={() =>
                  val === "defaultimageurl"
                    ? ""
                    : this.showModal(
                        this.state.webcamImage[0][i],
                        "web",
                        this.state.timecard[0][i]
                      )
                }
                // onClick={
                //   val === "defaultimageurl"
                //     ? ""
                //     : this.showModal(
                //         this.state.webcamImage[0][i],
                //         "web",
                //         this.state.timecard[0][i]
                //       )
                // }
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
                                onClick={() =>
                                  this.goBack(
                                    images &&
                                      images[this.state.position - 1] &&
                                      images[this.state.position - 1]
                                        .timeCardBreakup,
                                    null,
                                    null
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faChevronCircleLeft}
                                  size="3x"
                                  color="grey"
                                />
                                {/* <img
                                  src={previous}
                                  height="50px"
                                  width="50px"
                                /> */}
                              </div>
                            )}
                            {this.state.position == 0 && (
                              <div
                                className={styles.leftArrow}
                                onClick={() =>
                                  this.goBack(
                                    images &&
                                      images[this.state.position] &&
                                      images[this.state.position]
                                        .timeCardBreakup,
                                    images &&
                                      images[this.state.position] &&
                                      images[this.state.position].previousTime,
                                    images.length
                                  )
                                }
                              >
                                {/* <img
                                  src={previousTo}
                                  height="50px"
                                  width="50px"
                                /> */}
                                <FontAwesomeIcon
                                  icon={faArrowAltCircleLeft}
                                  size="3x"
                                  color="grey"
                                />
                              </div>
                            )}
                            {images &&
                              images.length !== this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() =>
                                    this.goForward(
                                      images &&
                                        images[this.state.position + 1] &&
                                        images[this.state.position + 1]
                                          .timeCardBreakup,
                                      null
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faChevronCircleRight}
                                    size="3x"
                                    color="grey"
                                  />
                                  {/* <img src={next} height="50px" width="50px" /> */}
                                </div>
                              )}
                            {images &&
                              images.length === this.state.position + 1 && (
                                <div
                                  className={styles.rightArrow}
                                  onClick={() =>
                                    this.goForward(
                                      images &&
                                        images[this.state.position] &&
                                        images[this.state.position]
                                          .timeCardBreakup,
                                      images &&
                                        images[this.state.position] &&
                                        images[this.state.position].nextTime
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowAltCircleRight}
                                    size="3x"
                                    color="grey"
                                  />
                                  {/* <img
                                    src={nextTo}
                                    height="50px"
                                    width="50px"
                                  /> */}
                                </div>
                              )}
                          </>
                        )}
                        <img
                          onLoad={() => {
                            this.props.handleGetMessage(
                              images &&
                                images[this.state.position] &&
                                images[this.state.position].timeCardBreakup
                            );
                          }}
                          onError={(e) => {
                            this.props.handleGetMessage(
                              images &&
                                images[this.state.position] &&
                                images[this.state.position].timeCardBreakup
                            );
                          }}
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].webcam
                          }
                          height="100%"
                          width="100%"
                        />
                        <div className={styles.secondaryImage}>
                          <img
                            onClick={() => {
                              this.showModal(
                                images[this.state.position].screenshot,
                                "screen",
                                null,
                                this.state.position
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
                      </div>
                      <div className={styles.panel}>
                        {this.state.flagMessage && (
                          <div className={styles.error}>
                            {this.state.flagMessage}
                          </div>
                        )}
                        <div className={styles.dateHolder}>
                          <div className={styles.detailsDate}>
                            {moment(
                              images &&
                                images[this.state.position] &&
                                images[this.state.position].date
                            ).format("dddd, MMM DD HH:MM A ")}
                          </div>
                          <div>
                            <div
                              onClick={() =>
                                this.props.handleFlag(
                                  images &&
                                    images[this.state.position] &&
                                    images[this.state.position].timecardId
                                )
                              }
                              className={styles.flagButton}
                            >
                              {/* {this.state.timeDetails} */}
                              {/* <img src={flag} height="20px" width="20px" /> */}
                              {images &&
                              images[this.state.position] &&
                              images[this.state.position].status !==
                                "flagged" &&
                              this.state.flagMessage === null ? (
                                <img src={flag} height="20px" width="20px" />
                              ) : this.state.flagMessage ===
                                "Successfully Unflagged" ? (
                                <img src={flag} height="20px" width="20px" />
                              ) : this.state.flagMessage ===
                                "Successfully Flagged" ? (
                                <FontAwesomeIcon icon={faFlag} color="red" />
                              ) : (
                                images &&
                                images[this.state.position] &&
                                images[this.state.position].status ===
                                  "flagged" && (
                                  <FontAwesomeIcon icon={faFlag} color="red" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className={styles.showdetails}>Show Details</div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            {/* <img src={zoom} height="20px" width="20px" /> */}
                            <FontAwesomeIcon
                              icon={faCrosshairs}
                              color="green"
                            />
                            <span style={{ paddingLeft: "5px" }}>Focus</span>
                          </div>
                          <div>
                            {(images &&
                              images[this.state.position] &&
                              images[this.state.position].focus === null) ||
                            (images &&
                              images[this.state.position] &&
                              images[this.state.position].focus === 0) ? (
                              <FontAwesomeIcon icon={faDotCircle} color="red" />
                            ) : (
                              <FontAwesomeIcon
                                icon={faDotCircle}
                                color="#8bc646"
                              />
                            )}
                          </div>
                        </div>
                        <div className={styles.details}>
                          <div>
                            {" "}
                            {/* <img src={intensity} height="20px" width="20px" /> */}
                            <FontAwesomeIcon icon={faBolt} color="orange" />
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
                          <div className={styles.textContainer}>
                            <input
                              type="text"
                              placeholder="Enter Message"
                              onChange={(val) => {
                                this.setState({ comment: val.target.value });
                              }}
                              onKeyDown={(e) =>
                                this.handlekeydown(
                                  e,
                                  images &&
                                    images[this.state.position] &&
                                    images[this.state.position].timeCardBreakup
                                )
                              }
                              value={this.state.comment}
                              className={styles.textBox}
                            />
                          </div>
                          <div className={styles.messageList}>
                            {this.props.getMessageData &&
                              this.props.getMessageData.map((val) => {
                                return (
                                  <div className={styles.messageHolder}>
                                    <div className={styles.from}>
                                      {val.from}
                                    </div>
                                    <div className={styles.message}>
                                      {val.message}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        <div className={styles.buttonHolder}>
                          <div
                            className={styles.button}
                            onClick={() => {
                              this.props.handleMessage(
                                { comment: this.state.comment },
                                images &&
                                  images[this.state.position] &&
                                  images[this.state.position].timeCardBreakup
                              );
                              this.setState({ comment: "" });
                            }}
                          >
                            Share
                          </div>
                        </div>
                        {/* <div className={styles.toggleContainer}>
                          {this.props.empname && (
                            <div>Share with {this.props.empname}</div>
                          )}
                        </div> */}
                        <div className={styles.imageContainer}>
                          {images.length > 0 &&
                            images.map((val, i) => {
                              return (
                                <div
                                  className={
                                    this.state.position === i
                                      ? styles.focusImage
                                      : ""
                                  }
                                >
                                  <img
                                    src={val.webcam}
                                    height="50px"
                                    width="50px"
                                    onClick={() => {
                                      this.setState({
                                        position: i,
                                        type: "web",
                                        image: null,
                                      });
                                      this.props.handleGetMessage(
                                        images &&
                                          images[i] &&
                                          images[i].timeCardBreakup
                                      );
                                    }}
                                  />
                                </div>
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
                  title={"Intensity: " + this.state.intensityScore[0][i]}
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
