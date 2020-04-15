import React, { Component } from "react";
import profileImage from "../images/Profile-Fill-grey2.svg";
import styles from "./profileStatus.module.css";
class ProfileStatus extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <img
          src={this.props.pic ? this.props.pic : profileImage}
          height={"40px"}
          width={"40px"}
          style={{
            position: "absolute",
            left: this.props.left,
            right: this.props.right,
            top: this.props.top,
          }}
        />
        {this.props.offline && this.props.leftSide && (
          <div className={styles.offlineStatus}> </div>
        )}
        {this.props.offline && this.props.rightSide && (
          <div className={styles.offlineStatusright}> </div>
        )}
        {this.props.active && this.props.leftSide && (
          <div className={styles.onlineStatus}> </div>
        )}
        {this.props.active && this.props.rightSide && (
          <div className={styles.onlineStatusright}> </div>
        )}
        {this.props.passive && this.props.rightSide && (
          <div className={styles.passiveStatusright}> </div>
        )}
        {this.props.passive && this.props.leftSide && (
          <div className={styles.passiveStatus}> </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
