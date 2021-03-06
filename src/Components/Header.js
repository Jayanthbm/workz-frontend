import React, { Component } from 'react';
import styles from './Header.module.css';
import Popup from 'reactjs-popup';
import image from '../images/Profile-Fill-grey2.svg';
import * as Cookie from '../utils/Cookie';
import Demo from '../images/Icon_Request-a-Demo.png';
import settings from '../images/Icon_Support.png';
import call from '../images/Icon_Call.png';
import help from '../images/Icon_Help.png';
import wf from '../images/wf.png';
import virtualOffice from '../images/Icon_Virtual-Office.png';
import teamIcon from '../images/Icon_Team.png';
import moment from 'moment';
import { USER_DETAILS, ACCESS_TOKEN } from '../utils/constant';
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);
const secondData = JSON.parse(localStorage.getItem('secondaryDrop'));
class Header extends Component {
  logoutHandler = async () => {
    Cookie.deleteCookie(USER_DETAILS);
    Cookie.deleteCookie(ACCESS_TOKEN);
    Cookie.deleteCookie('CloudFront-Key-Pair-Id');
    Cookie.deleteCookie('CloudFront-Policy');
    Cookie.deleteCookie('CloudFront-Signature');
    Cookie.deleteCookie('userId');
    Cookie.deleteCookie('*');
    Cookie.deleteCookie('userDate');
    this.props.logout();
    window.location.href = '/';
  };
  render() {
    console.log(this.props);
    const userDetails = Cookie.getCookie(USER_DETAILS);
    let parsedData = userDetails && JSON.parse(userDetails);
    const isLoggedin = Cookie.getCookie(USER_DETAILS) ? true : false;
    const secondData = JSON.parse(localStorage.getItem('secondaryDrop'));
    const links = [
      {
        text: 'Virtual Office',
        image: virtualOffice,
        redirect: '/',
        active:
          this.props.match && this.props.match.path === '/' ? true : false,
      },
      {
        text: 'My Team',
        image: teamIcon,
        redirect: `/deepdive/${
          parsedData && parsedData.isManager == 1 && secondData && secondData.id
            ? secondData.id
            : this.props.userId
        }/${
          secondData && secondData.date
            ? moment(new Date(secondData.date)).format('YYYY-MM-DD')
            : moment(new Date()).format('YYYY-MM-DD')
        }`,
        // Cookie.getCookie("userDate") &&
        // Cookie.getCookie("userDate") !== "Invalid date" &&
        // Cookie.getCookie("userId")
        //   ? `/deepdive/${Cookie.getCookie("userId")}/${moment(
        //       new Date(
        //         Cookie.getCookie("userDate") &&
        //           Cookie.getCookie("userDate") !== "Invalid date" &&
        //           Cookie.getCookie("userDate")
        //       )
        //     ).format("YYYY-MM-DD")}`
        // : `/deepdive/${this.props.userId}/${moment(new Date()).format(
        //     "YYYY-MM-DD"
        //   )}`,
        active:
          (this.props.match &&
            this.props.match.path === '/deepdive/:userId/:date') ||
          (this.props.match &&
            this.props.match.path === '/details/:userId/:date')
            ? true
            : false,
      },
      // {
      //   text: 'Help',
      //   image: help,
      // },
      {
        text: 'Admin',
        redirect: '/admin',
        isManager: true,
      },
    ];
    return (
      <div className={styles.headerBase}>
        <div className={styles.container}>
          <div
            className={styles.logoHolder}
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <img src={wf} height="35px" />
          </div>
          {isLoggedin && (
            <div className={styles.linkHolder}>
              {links &&
                links.map((val) => {
                  return parsedData &&
                    parsedData.isManager == 1 &&
                    val.isManager ? (
                    <div
                      className={val.active ? styles.linksActive : styles.links}
                      onClick={() => (window.location.href = val.redirect)}
                    >
                      <div className={styles.icon}>
                        <img src={val.image} height="25px" width="35px" />
                      </div>
                      <div className={val.active && styles.linkText}>
                        {val.text}
                      </div>
                    </div>
                  ) : (
                    !val.isManager && (
                      <div
                        className={
                          val.active ? styles.linksActive : styles.links
                        }
                        onClick={() => (window.location.href = val.redirect)}
                      >
                        <div className={styles.icon}>
                          <img src={val.image} height="25px" width="35px" />
                        </div>
                        <div className={val.active && styles.linkText}>
                          {val.text}
                        </div>
                      </div>
                    )
                  );
                })}
              <div className={styles.links} onClick={this.logoutHandler}>
                {'Logout'}
              </div>
              <div className={styles.profileHolder}>
                <img
                  src={this.props.pic ? this.props.pic : image}
                  height="40px"
                  width="40px"
                  alt=""
                  style={{ borderRadius: '100%' }}
                />
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
                    pathname: '/form',
                    state: { type: 'Demo' },
                  });
                }}
              >
                <div className={styles.icon}>
                  <img src={Demo} height="20px" width="25px" />
                </div>{' '}
                <div> Request a demo</div>
              </div>
              <div className={styles.links}>
                {/* <a
                  href="tel:9999999999"
                  style={{ textDecoration: "none", color: " #fff" }}
                > */}
                <div className={styles.icon}>
                  <img src={call} height="25px" width="25px" />
                </div>
                <div> Call 99999 99999</div>
                {/* </a> */}
              </div>
              <div
                className={styles.links}
                onClick={() => {
                  this.props.history.push({
                    pathname: '/form',
                    state: {
                      type: 'Support',
                    },
                  });
                }}
              >
                <div className={styles.icon}>
                  <img src={settings} height="25px" width="25px" />
                </div>
                <div>Support</div>
              </div>
              <div className={styles.links}>
                <div className={styles.icon}>
                  <img src={help} height="25px" width="35px" />
                </div>
                <div> Help</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
