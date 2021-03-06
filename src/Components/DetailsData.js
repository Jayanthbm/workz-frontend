import React, { Component } from "react";
import styles from "./DetailsData.module.css";
import previous from "../images/previous.jpg";
import next from "../images/next.png";
import moment from "moment";
import nextTo from "../images/Next-2-2-icon.png";
import previousTo from "../images/Previous-icon.png";
import zoom from "../images/zoom.png";
import intensity from "../images/intensity.jpg";
import flag from "../images/flag.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faFlag,
  faCrosshairs,
  faBolt,
  faChevronCircleLeft,
  faChevronCircleRight,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
// import moment from "moment";
// import DeepdiveDay from "./DeepdiveDay";
// import DetailsView from "./DetailsView";
import Modal from "./Modal";
class DetailsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsData: [],
      day: [],
      comment: "",
      image: null,
      flagMessage: null,
      allTime: [],
      position: 0,
      render: false,
    };
  }
  componentDidMount() {
    this.setState({ render: true });
  }
  hideModal = () => {
    this.setState({ show: false, flagMessage: null });
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
      this.props.handleBreakup(time, "breakup");
      this.props.handleGetMessage(time);
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
  goForward = () => {
    this.setState({ position: this.state.position + 1 });
  };
  goBack = () => {
    this.setState({ position: this.state.position - 1 });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.allChecker === true) {
        this.setState({ allTime: [] });
      }
      if (this.props.match !== nextProps.match) {
        this.setState({ detailsData: [] });
      }
      if (
        nextProps.detailsData !== this.props.detailsData &&
        this.state.detailsData.length === 0
      ) {
        for (let i = 0; i < nextProps.detailsData.results.length; i++) {
          const a = Object.entries(
            nextProps &&
              nextProps.detailsData &&
              nextProps.detailsData.results &&
              nextProps.detailsData.results[i] &&
              nextProps.detailsData.results[i]
          );

          this.state.detailsData.push(a);
        }
      }
      if (this.props.flagDetails !== nextProps.flagDetails) {
        this.setState({
          flagMessage: nextProps.flagDetails && nextProps.flagDetails.message,
        });
      }
      if (nextProps.breakupDetails !== this.props.breakupDetails) {
        nextProps.breakupDetails &&
          nextProps.breakupDetails.results &&
          nextProps.breakupDetails.results.map((val, i) => {
           
            if (val.timecardBreakupId === this.state.timeDetails && i) {
              this.setState({
                position: val.timecardBreakupId === this.state.timeDetails && i,
              });
            }
          });
      }
    }
  }
  handlekeydown = (e, timecard) => {
    if (e.keyCode === 13) {
      this.props.handleMessage({ comment: this.state.comment }, timecard);
      this.setState({ comment: "" });
    }
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
        flagMessage: null,
        // timecardPosition: this.state.timecardPosition + 1,
        // timeDetails: time,
      });
      // this.props.handleGetMessage(breakup);
    } else {
      this.setState({
        position: this.state.position + 1,
      });
      this.props.handleGetMessage(breakup);
    }
  };

  render() {
    const images = [];
    if (images.length === 0) {
      this.props.breakupDetails &&
        this.props.breakupDetails.results &&
        this.props.breakupDetails.results.map((val, i) => {
          images.push({
            screenshot: val.screenshotUrl,
            webcam: val.webcamUrl,
            intensity: this.props.breakupDetails.intensityScore,
            focus: this.props.breakupDetails.focus,
            timecardId: val.timecardId,
            timeCardBreakup: val.timecardBreakupId,
            previousTime: this.props.breakupDetails.PreviousTimecard,
            nextTime: this.props.breakupDetails.NextTimeCard,
            status: this.props.breakupDetails.status,
            day: val.tday,
            date: val.Datetime,
          });
        });
    }

    return (
      <div className={styles.deepDiveBase}>
        {!this.props.detailsError &&
        this.state.detailsData &&
        this.state.detailsData.length > 0
          ? this.state.detailsData.map((val) => {
              return (
                <div>
                  <div className={styles.dayHolder}>
                    <div className={styles.weekContainer}>
                      <div className={styles.dayText}>{val[0][1][0].tday}</div>
                      <div className={styles.dayText}>
                        {moment(
                          val && val[1] && val[1][1][0].timeCardBreakup
                        ).format("DD,MMMM,YYYY")}
                      </div>
                    </div>
                  </div>
                  {val.map((data) => {
                    return (
                      <div className={styles.imageCont}>
                        {data &&
                          data[1] &&
                          data[1].map((dataCard, i) => {
                            return (
                              <div className={styles.dataCont}>
                                <div className={styles.dataHeader}>
                                  {parseInt(dataCard.time.substring(0, 5)) > 12
                                    ? parseInt(dataCard.time.substring(0, 5)) -
                                      12 +
                                      `${dataCard.time.substring(2, 5)}`
                                    : dataCard.time.substring(0, 5)}{" "}
                                  {dataCard.time.substring(0, 2) >= "12"
                                    ? "PM"
                                    : "AM"}
                                </div>
                                <img
                                  alt="img"
                                  onClick={() => {
                                    this.showModal(
                                      dataCard.screenshotUrl,
                                      "screen",
                                      dataCard.timecardBreakupId
                                    );
                                  }}
                                  src={dataCard.screenshotUrl}
                                  height="100px"
                                  width="150px"
                                />
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
                  {this.state.type && this.state.type === "screen" && (
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
                                        images[this.state.position]
                                          .previousTime,
                                      images.length
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowAltCircleLeft}
                                    size="3x"
                                    color="grey"
                                  />
                                  {/* <img
                                    src={previousTo}
                                    height="50px"
                                    width="50px"
                                  /> */}
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
                                    {/* <img
                                      src={next}
                                      height="50px"
                                      width="50px"
                                    /> */}
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
                              {
                                this.state.image ? (
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
                                      <img
                                        src={flag}
                                        height="20px"
                                        width="20px"
                                      />
                                    ) : this.state.flagMessage ===
                                      "Successfully Unflagged" ? (
                                      <img
                                        src={flag}
                                        height="20px"
                                        width="20px"
                                      />
                                    ) : this.state.flagMessage ===
                                      "Successfully Flagged" ? (
                                      <FontAwesomeIcon
                                        icon={faFlag}
                                        color="red"
                                      />
                                    ) : (
                                      images &&
                                      images[this.state.position] &&
                                      images[this.state.position].status ===
                                        "flagged" && (
                                        <FontAwesomeIcon
                                          icon={faFlag}
                                          color="red"
                                        />
                                      )
                                    )}
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
                              <FontAwesomeIcon
                                icon={faCrosshairs}
                                color="green"
                              />
                              {/* <img src={zoom} height="20px" width="20px" /> */}
                              <span style={{ paddingLeft: "5px" }}>Focus</span>
                            </div>
                            <div>
                              {(images &&
                                images[this.state.position] &&
                                images[this.state.position].focus === null) ||
                              (images &&
                                images[this.state.position] &&
                                images[this.state.position].focus === 0) ? (
                                <FontAwesomeIcon
                                  icon={faDotCircle}
                                  color="red"
                                />
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
                              <FontAwesomeIcon icon={faBolt} color="Orange" />
                              {/* <img src={intensity} height="20px" width="20px" /> */}
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
                                      images[this.state.position]
                                        .timeCardBreakup
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

                      {/* <div className={styles.webContainer}>
                      <div className={styles.webImage}>
                        {images && images.length > 0 && (
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

                            <div
                              className={styles.rightArrow}
                              onClick={() => this.goForward()}
                            >
                              <img src={next} height="50px" width="50px" />
                            </div>
                          </>
                        )}
                        <img
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].screenshot
                          }
                          alt="img"
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <div className={styles.panel}></div>
                    </div> */}
                    </Modal>
                  )}
                  {this.state.type && this.state.type === "web" && (
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
                                        images[this.state.position]
                                          .previousTime,
                                      images.length
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowAltCircleLeft}
                                    size="3x"
                                    color="grey"
                                  />
                                  {/* <img
                                    src={previousTo}
                                    height="50px"
                                    width="50px"
                                  /> */}
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
                                    {/* <img
                                      src={next}
                                      height="50px"
                                      width="50px"
                                    /> */}
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
                                    {/* <img
                                      src={nextTo}
                                      height="50px"
                                      width="50px"
                                    /> */}
                                    <FontAwesomeIcon
                                      icon={faArrowAltCircleRight}
                                      size="3x"
                                      color="grey"
                                    />
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
                              {
                                this.state.image ? (
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
                                    {/* <img
                                      src={flag}
                                      height="20px"
                                      width="20px"
                                    /> */}
                                    {images &&
                                    images[this.state.position] &&
                                    images[this.state.position].status !==
                                      "flagged" &&
                                    this.state.flagMessage === null ? (
                                      <img
                                        src={flag}
                                        height="20px"
                                        width="20px"
                                      />
                                    ) : this.state.flagMessage ===
                                      "Successfully Unflagged" ? (
                                      <img
                                        src={flag}
                                        height="20px"
                                        width="20px"
                                      />
                                    ) : this.state.flagMessage ===
                                      "Successfully Flagged" ? (
                                      <FontAwesomeIcon
                                        icon={faFlag}
                                        color="red"
                                      />
                                    ) : (
                                      images &&
                                      images[this.state.position] &&
                                      images[this.state.position].status ===
                                        "flagged" && (
                                        <FontAwesomeIcon
                                          icon={faFlag}
                                          color="red"
                                        />
                                      )
                                    )}
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
                              <FontAwesomeIcon
                                icon={faCrosshairs}
                                color="green"
                              />
                              {/* <img src={zoom} height="20px" width="20px" /> */}
                              <span style={{ paddingLeft: "5px" }}>Focus</span>
                            </div>
                            <div>
                              {(images &&
                                images[this.state.position] &&
                                images[this.state.position].focus === null) ||
                              (images &&
                                images[this.state.position] &&
                                images[this.state.position].focus === 0) ? (
                                <FontAwesomeIcon
                                  icon={faDotCircle}
                                  color="red"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faDotCircle}
                                  color="##8bc646"
                                />
                              )}
                            </div>
                          </div>
                          <div className={styles.details}>
                            <div>
                              {" "}
                              <FontAwesomeIcon icon={faBolt} color="Orange" />
                              {/* <img src={intensity} height="20px" width="20px" /> */}
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
                                      images[this.state.position]
                                        .timeCardBreakup
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

                      {/* <div className={styles.webContainer}>
                      <div className={styles.webImage}>
                        {images && images.length > 0 && (
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

                            <div
                              className={styles.rightArrow}
                              onClick={() => this.goForward()}
                            >
                              <img src={next} height="50px" width="50px" />
                            </div>
                          </>
                        )}
                        <img
                          src={
                            images &&
                            images[this.state.position] &&
                            images[this.state.position].screenshot
                          }
                          alt="img"
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <div className={styles.panel}></div>
                    </div> */}
                    </Modal>
                  )}
                </div>
              );
            })
          : this.props.detailsError}
      </div>
    );
  }
}

export default DetailsData;
