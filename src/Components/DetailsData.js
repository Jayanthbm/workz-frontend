import React, { Component } from "react";
import styles from "./DetailsData.module.css";
import previous from "../images/previous.jpg";
import next from "../images/next.png";
import nextTo from "../images/Next-2-2-icon.png";
import previousTo from "../images/Previous-icon.png";
import zoom from "../images/zoom.png";
import intensity from "../images/intensity.jpg";
import flag from "../images/flag.png";
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
      image: null,
      allTime: [],
      position: 0,
      render: false,
    };
  }
  componentDidMount() {
    this.setState({ render: true });
  }
  hideModal = () => {
    this.setState({ show: false });
  };
  showModal = (val, type, time, images) => {
    console.log(images);
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

      if (
        (nextProps.detailsData && this.state.detailsData.length === 0) ||
        (nextProps.detailsData &&
          this.state.detailsData &&
          this.state.detailsData[0] &&
          this.state.detailsData[0].length === 0)
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
    }
  }
  goBack = (breakup, time, pos) => {
    if (time !== null) {
      this.props.handleBreakup(time);
      this.setState({
        position: pos - 1,
        timecardPosition: this.state.timecardPosition - 1,
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
      console.log(time);
      this.props.handleBreakup(time);
      this.setState({
        position: 0,
        timecardPosition: this.state.timecardPosition + 1,
        timeDetails: time,
      });
      // this.props.handleGetMessage(breakup);
    } else {
      this.setState({
        position: this.state.position + 1,
      });
      // this.props.handleGetMessage(breakup);
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
            timeCardBreakup: val.timecardBreakupId,
            previousTime: this.props.breakupDetails.PreviousTimecard,
            nextTime: this.props.breakupDetails.NextTimeCard,
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
                                      12
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
                                <img
                                  src={previous}
                                  height="50px"
                                  width="50px"
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
                                  <img src={next} height="50px" width="50px" />
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
                          // onLoad={() => {
                          //   this.props.handleGetMessage(
                          //     images &&
                          //       images[this.state.position] &&
                          //       images[this.state.position].timeCardBreakup
                          //   );
                          // }}
                          // onError={() => {
                          //   this.props.handleGetMessage(
                          //     images &&
                          //       images[this.state.position] &&
                          //       images[this.state.position].timeCardBreakup
                          //   );
                          // }}
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
                                "web"
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
                          <div className={styles.textContainer}>
                            <input
                              type="text"
                              placeholder="Enter Message"
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
                                    this.state.timeDetails ===
                                    val.timeCardBreakup
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
                                      // this.props.handleGetMessage(
                                      //   images &&
                                      //     images[i] &&
                                      //     images[i].timeCardBreakup
                                      // );
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
                </div>
              );
            })
          : "No details available"}
      </div>
    );
  }
}

export default DetailsData;
