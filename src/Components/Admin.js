import React, { Component } from "react";
import styles from "./Admin.module.css";
import Header from "../Container/HeaderContainer";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import * as Cookie from "../utils/Cookie";
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.profilePic} />
        <div className={styles.adminBase}>Admin Panel</div>
      </div>
    );
  }
}

export default Admin;
