import React, { Component } from "react";
import styles from "./DetailsData.module.css";
class DetailsView extends Component {
  componentWillReceiveProps = (nextprops) => {
    console.log(nextprops);
    if (this.props !== nextprops) {
      console.log(nextprops);
    }
  };
  render() {
    return (
      <div className={styles.dayContainer}>
        {this.props.allTime &&
          this.props.allTime.length >= 1 &&
          this.props.allTime.map((val) => {
            return (
              <div className={styles.minuteContainer}>
                {val.map((data) => {
                  return <div>{data.timecardBreakupId}</div>;
                })}{" "}
              </div>
            );
          })}
      </div>
    );
  }
}

export default DetailsView;
