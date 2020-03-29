import React, { Component } from "react";
import styles from "./Navigation.module.css";
class Navigation extends Component {
  selectHandler = val => {
    console.log(val);
  };
  render() {
    console.log(this.props.team);
    return (
      <div className={styles.base}>
        <div className={styles.container}>
          <div className={styles.textHolder}>Virtual office</div>
          <div className={styles.dropdownHolder}>
            <div className={styles.label}>Team</div>
            <div className={styles.selectContainer}>
              <select
                style={{
                  width: " 250px",
                  borderRadius: "7px"
                }}
                onChange={val => {
                  this.props.selectHandler(val.target.value);
                }}
              >
                {this.props.team &&
                  this.props.team.teams.map(val => {
                    return <option value={val.teamId}>{val.name}</option>;
                  })}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
