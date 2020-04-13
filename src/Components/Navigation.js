import React, { Component } from "react";
import styles from "./Navigation.module.css";
class Navigation extends Component {
  selectHandler = (val) => {};
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <div className={styles.container}>
          <div className={styles.textHolder}>Virtual office</div>
          {this.props.team && (
            <div className={styles.dropdownHolder}>
              <div className={styles.label}>Team</div>
              <div className={styles.selectContainer}>
                <select
                  style={{
                    width: " 250px",
                    height: "22px",
                  }}
                  onChange={(val) => {
                    this.props.selectHandler(val.target.value);
                  }}
                >
                  {this.props &&
                    this.props.team &&
                    this.props.team.map((val) => {
                      return <option value={val.id}>{val.name}</option>;
                    })}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navigation;
