import React, { Component } from "react";
import styles from "./DetailsData.module.css";
import previous from "../images/previous.jpg";
import next from "../images/next.png";
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
  showModal = (data, i) => {
    this.setState({
      show: true,
      image: data.screenshot,
    });
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
  render() {
    const images = [];
    if (images.length === 0) {
      this.state.detailsData &&
        this.state.detailsData.length > 0 &&
        this.state.detailsData.map((val, i) => {
          val.map((data) => {
            data &&
              data[1] &&
              data[1].map((dataCard) => {
                images.push({
                  timecardBreakup: dataCard.timecardBreakupId,
                  screenshot: dataCard.screenshotUrl,
                  webcam: dataCard.webcamUrl,
                });
              });
          });
        });
    }
    console.log(images);
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
                                    let data = {
                                      screenshot: dataCard.screenshotUrl,
                                      webcam: dataCard.webcamUrl,
                                      time: dataCard.time,
                                    };
                                    this.showModal(data, i);
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
                          src={images[this.state.position].screenshot}
                          alt="img"
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <div className={styles.panel}></div>
                    </div>
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
