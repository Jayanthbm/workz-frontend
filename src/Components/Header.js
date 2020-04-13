import React, { Component } from "react";
import styles from "./Header.module.css";
import Popup from "reactjs-popup";
import image from "../images/Profile-Fill-grey2.svg";
import * as Cookie from "../utils/Cookie";
import Demo from "../images/Icon_Request-a-Demo.png";
import settings from "../images/Icon_Support.png";
import call from "../images/Icon_Call.png";
import wf from "../images/wf.png";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";

const links = [
  {
    text: "Virtual Office",
  },
  {
    text: "My Team",
  },
];
class Header extends Component {
  logoutHandler = () => {
    Cookie.deleteCookie(USER_DETAILS);
    Cookie.deleteCookie(ACCESS_TOKEN);
    window.location.reload();
  };
  render() {
    console.log(this.props);
    const isLoggedin = Cookie.getCookie(USER_DETAILS) ? true : false;
    return (
      <div className={styles.headerBase}>
        <div className={styles.container}>
          <div className={styles.logoHolder}>
            <img src={wf} height="35px" />
          </div>
          {isLoggedin && (
            <div className={styles.linkHolder}>
              {links &&
                links.map((val) => {
                  return <div className={styles.links}>{val.text}</div>;
                })}
              <div className={styles.profileHolder}>
                <img
                  src={this.props.pic ? this.props.pic : image}
                  height="40px"
                  width="40px"
                  alt=""
                  style={{ borderRadius: "100%" }}
                />
              </div>
              <div className={styles.links} onClick={this.logoutHandler}>
                {"Logout"}
              </div>
            </div>
          )}
          {!isLoggedin && (
            <div className={styles.linkHolder}>
              {/* <Popup
                modal
                trigger={<div className={styles.links}>Request a demo</div>}
              >
                <Request />
              </Popup> */}

              <div
                className={styles.links}
                onClick={() => {
                  this.props.history.push({
                    pathname: "/form",
                    state: { type: "Demo" },
                  });
                }}
              >
                <div className={styles.icon}>
                  <img src={Demo} height="20px" width="25px" />
                </div>{" "}
                <div> Request a demo</div>
              </div>
              <div className={styles.links}>
                {/* <a
                  href="tel:9999999999"
                  style={{ textDecoration: "none", color: " #fff" }}
                > */}
                <div className={styles.icon}>
                  <img src={call} height="20px" width="25px" />
                </div>
                <div> Call 99999 99999</div>
                {/* </a> */}
              </div>
              <div
                className={styles.links}
                onClick={() => {
                  this.props.history.push({
                    pathname: "/form",
                    state: {
                      type: "Support",
                    },
                  });
                }}
              >
                <div className={styles.icon}>
                  <img src={settings} height="20px" width="25px" />
                </div>
                <div>Support</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
