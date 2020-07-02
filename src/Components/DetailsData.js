import React, { Component } from "react";
import styles from "./DetailsData.module.css";
import moment from "moment";
import DeepdiveDay from "./DeepdiveDay";
import DetailsView from "./DetailsView";
class DetailsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsData: [],
      day: [],
      allTime: [],
      render: false,
    };
  }
  componentDidMount() {
    this.setState({ render: true });
  }
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
    return (
      <div className={styles.deepDiveBase}>
        {this.state.detailsData && this.state.detailsData.length > 0
          ? this.state.detailsData.map((val) => {
              return (
                <div>
                  {val.map((data) => {
                    return (
                      <div className={styles.imageCont}>
                        {data &&
                          data[1] &&
                          data[1].map((dataCard) => {
                            return (
                              <React.Fragment>
                                <img
                                  src={dataCard.screenshotUrl}
                                  height="100px"
                                  width="150px"
                                />
                              </React.Fragment>
                            );
                          })}
                      </div>
                    );
                  })}
                </div>
              );
            })
          : "No details available"}
      </div>
    );
  }
}

export default DetailsData;
