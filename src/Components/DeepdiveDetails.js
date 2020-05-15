import React, { Component } from "react";
import styles from "./DeepdiveDetails.module.css";
class DeepdiveDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deepdiveData: [],
    };
  }

  render() {
    if (this.props.deepdiveData) {
      for (let i = 0; i < this.props.deepdiveData.results.length; i++) {
        const a = Object.entries(
          this.props &&
            this.props.deepdiveData &&
            this.props.deepdiveData.results &&
            this.props.deepdiveData.results[i] &&
            this.props.deepdiveData.results[i]
        );
        this.state.deepdiveData.push(a);
      }
    }
    console.log(this.state.deepdiveData);
    return (
      <div className={styles.deepDiveBase}>
        {this.state.deepdiveData &&
          this.state.deepdiveData.map((val) => {
            return (
              <div>
                {val.map((day) => {
                  return <>{day[0]}</>;
                })}
              </div>
            );
          })}
      </div>
    );
  }
}

export default DeepdiveDetails;
