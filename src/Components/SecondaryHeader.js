import React, { Component } from "react";
import styles from "./deepdive.module.css";
class SecondaryHeader extends Component {
  render() {
    return (
      <div className={styles.deepdiveContainer}>
        <div className={styles.dropdownText}>Employee</div>
        <div className={styles.dropdownSelectHolder}>
          <select
            style={{
              width: " 250px",
              height: "22px",
            }}
            onChange={(val) => this.handleDeepdive(val.target.value)}
          >
            {this.props &&
              this.props.deepdiveDropdownData &&
              this.props.deepdiveDropdownData.map((val) => {
                return (
                  <>
                    <option value={val.userId}>{val.name}</option>;
                  </>
                );
              })}
          </select>
        </div>
      </div>
    );
  }
}

export default SecondaryHeader;
