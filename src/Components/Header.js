import React, { Component } from "react";
import styles from "./Header.module.css";
import Popup from "reactjs-popup";
import image from "../images/Profile-Fill-grey2.svg";
import * as Cookie from "../utils/Cookie";
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
    const isLoggedin = Cookie.getCookie(USER_DETAILS) ? true : false;
    return (
      <div className={styles.headerBase}>
        <div className={styles.container}>
          <div className={styles.logoHolder}>WorkforceZ</div>
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

<Popup modal trigger={   <div className={styles.links}>Request a demo</div>}>
       <div style={{color:"#000"}}>
       Modal Content
         </div> 
      </Popup>
           
              <div className={styles.links}>
                <a
                  href="tel:9999999999"
                  style={{ textDecoration: "none", color: " #fff" }}
                >
                  {" "}
                  Call 99999 99999
                </a>
              </div>
              <div className={styles.links}>Support</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
