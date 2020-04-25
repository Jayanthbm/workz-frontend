import React, { Component } from "react";
import profileImage from "../images/Profile-Fill-grey2.svg";
import ReactTooltip from "react-tooltip";
import styles from "./profileStatus.module.css"; class ProfileStatus extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <img
          data-tip data-for={"Hello" + this.props.data.userId}
          src={this.props.pic ? this.props.pic : profileImage}
          height={"40px"}
          alt=""
          width={"40px"}
          style={{
            position: "absolute",
            left: this.props.left,
            right: this.props.right,
            top: this.props.top,
            border: "1px solid #cecece",
            borderRadius: "100%",
          }}
        />
        <ReactTooltip
          id={"Hello" + this.props.data.userId}
          place="top"
          type="light"
          effect="solid"
          border={true}
          backgroundColor={'#fff'}
          clickable={true}
          resizeHide={true}
        >
          <span>{this.props.data.name}</span>
          &nbsp;
          <span>{this.props.data.city}</span><br />
          <span>Message:{this.props.data.message}</span><br />
          <span>skype:{this.props.data.message}</span><br />
          <span>Mobile:{this.props.data.mobile}</span><br />
          <span>Email:{this.props.data.emailId}</span><br />
        </ReactTooltip>
        {this.props.offline && this.props.leftSide && (
          <div className={styles.offlineStatus}> </div>
        )}
        {this.props.offline && this.props.rightSide && (
          <div
            className={
              this.props.man
                ? styles.offlineStatusman
                : styles.offlineStatusright
            }
          ></div>
        )}
        {this.props.active && this.props.leftSide && (
          <div className={styles.onlineStatus}> </div>
        )}
        {this.props.active && this.props.rightSide && (
          <div
            className={
              this.props.man ? styles.onlineStatusman : styles.onlineStatusright
            }
          ></div>
        )}
        {this.props.passive && this.props.rightSide && (
          <div
            className={
              this.props.man
                ? styles.passiveStatusman
                : styles.passiveStatusright
            }
          ></div>
        )}
        {this.props.passive && this.props.leftSide && (
          <div className={styles.passiveStatus}> </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
