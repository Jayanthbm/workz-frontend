import React, { Component } from 'react';
import styles from "./Team.module.css";
import onlineseat from "../images/onlineseat.png";
import offlineseat from "../images/offlineseat.png";
import leftoffline from "../images/left-offline-cp.png";
import leftonline from "../images/left-online-cp.png";
import ProfileStatus from './ProfileStatus';
class Seat extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                   {this.props.managers &&<div> <span className={styles.counryUsers}>
                                {this.props.managers.onlineStatus === "offline" && (
                                  <span
                                    id={this.props.i + this.props.managers.firstname}
                                    className={styles.seatHolder}
                                    title={"name : " + this.props.managers.firstname}
                                  >
                                    {this.props.i % 2 > 0 && (
                                      <span>
                                        <ProfileStatus
                                          right={0}
                                          rightSide={true}
                                          offline={true}
                                        />
                                        <div
                                          className={styles.offlineright}
                                        ></div>
                                        <img
                                          className={styles.abc}
                                          src={offlineseat}
                                        />
                                      </span>
                                    )}
                                    {this.props.i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          leftSide={true}
                                          offline={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftoffline}
                                        />
                                        <div
                                          className={styles.offlineleft}
                                        ></div>
                                      </span>
                                    )}
                                  </span>
                                )}
                                {this.props.managers.onlineStatus === "active" && (
                                  <span
                                    className={styles.seatHolder}
                                    title={"name : " + this.props.managers.firstname}
                                  >
                                    {this.props.i % 2 > 0 && (
                                      <span>
                                        <ProfileStatus
                                          right={0}
                                          active={true}
                                          rightSide={true}
                                        />
                                        <div
                                          className={styles.onlineright}
                                        ></div>
                                        <img
                                          className={styles.abc}
                                          src={onlineseat}
                                        />
                                      </span>
                                    )}
                                    {this.props.i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          active={true}
                                          leftSide={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftonline}
                                        />
                                        <div
                                          className={styles.onlineleft}
                                        ></div>
                                      </span>
                                    )}
                                  </span>
                                )}
                                {this.props.managers.onlineStatus === "passive" && (
                                  <span
                                    className={styles.seatHolder}
                                    title={"name : " + this.props.managers.firstname}
                                  >
                                    {this.props.i % 2 > 0 && (
                                      <span>
                                        <ProfileStatus
                                          right={0}
                                          passive={true}
                                          rightSide={true}
                                        />
                                        <div
                                          className={styles.onlineright}
                                        ></div>
                                        <img
                                          className={styles.abc}
                                          src={onlineseat}
                                        />
                                      </span>
                                    )}
                                    {this.props.i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          passive={true}
                                          leftSide={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftonline}
                                        />
                                        <div
                                          className={styles.onlineleft}
                                        ></div>
                                      </span>
                                    )}
                                  </span>
                                )}
                              </span>
                              {this.props.i % 2 > 0 && <div className={styles.break} />}
                              </div>
                              }
                        
            </div>
        );
    }
}

export default Seat;