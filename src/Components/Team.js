import React, { Component } from "react";
import offline from "../images/offlinepc.png";
import online from "../images/onlinepc.png";
import onlineseat from "../images/onlineseat.png";
import offlineseat from "../images/offlineseat.png";
import leftoffline from '../images/left-offline-cp.png';
import leftonline from '../images/left-online-cp.png';
import styles from "./Team.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
const data = [
  {
    name: "abc",
    status: "offline"
  },
  {
    name: "def",
    status: "online"
  },
  {
    name: "pqr",
    status: "online"
  },
  {
    name: "xyz",
    status: "offline"
  },
  {
    name: "asd",
    status: "online"
  }
];
class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        this.props.teamDetails &&
        this.props.teamDetails.teams &&
        this.props.teamDetails.teams[0].teamId
    };
  }
  componentDidMount() {
    if (this.props.getTeam) this.props.getTeam();
    // if (this.props.getTeamUser)
    //   this.props.getTeamUser(
    //     this.props.teamDetails &&
    //       this.props.teamDetails.teams &&
    //       this.props.teamDetails.teams[0].teamId
    //   );
  }
  selectHandler = val => {
    this.props.getTeamUser(val);
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.teamError);
    if (
      nextProps.teamError &&
      nextProps.teamError.status === "ERROR" &&
      nextProps.teamError.teamError === "You must be logged in."
    ) {
      Cookie.deleteCookie(ACCESS_TOKEN);
      Cookie.deleteCookie(USER_DETAILS);
      this.props.history.push("/");
    }
    if (nextProps.teamDetails !== this.props.teamDetails) {
      nextProps.getTeamUser(
        nextProps.teamDetails &&
        nextProps.teamDetails.teams &&
        nextProps.teamDetails.teams[0].teamId
      );
    }
  }
  render() {
    const userDetails = Cookie.getCookie(USER_DETAILS);
    let parsedData = userDetails && JSON.parse(userDetails);
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.pic} />
        <Navigation
          team={this.props.teamDetails}
          selectHandler={this.selectHandler}
        />
        <div className={styles.countryContainer}>
          <div className={styles.countryHolder}>
            India<br />
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map((val, i) => {
                console.log(i);
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.country === "India" && (
                        <>
                          {val.onlineStatus === "offline" && (
                            <span id={i + val.firstname}
                              className={styles.seatHolder}
                              title={"name : " + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.offlineright}></div>
                                  <img className="abc" src={offlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftoffline} />
                                  <div className={styles.offlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "active" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "passive" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                        </>
                      )}
                    </span>{i % 2 > 0 && <br />}</>
                );
              })}
          </div>

          <div className={styles.countryHolder}>
            USA<br />
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map((val, i) => {
                console.log(i)
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.country === "USA" && (
                        <>
                          {val.onlineStatus === "offline" && (
                            <span id={i + val.firstname}
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.offlineright}></div>
                                  <img className="abc" src={offlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftoffline} />
                                  <div className={styles.offlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "active" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "passive" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                        </>
                      )}
                    </span>{i % 2 > 0 && <br />}</>
                );
              })}
          </div>

          <div className={styles.countryHolder}>
            Australia
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map((val, i) => {
                console.log(i)
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.country === "Australia" && (
                        <>
                          {val.onlineStatus === "offline" && (
                            <span id={i + val.firstname}
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.offlineright}></div>
                                  <img className="abc" src={offlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftoffline} />
                                  <div className={styles.offlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "active" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "passive" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                        </>
                      )}
                    </span>{i % 2 > 0 && <br />}</>
                );
              })}
          </div>
          <div className={styles.countryHolder}>
            New Zealand
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map((val, i) => {
                console.log(i)
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.country === "New Zealand" && (
                        <>
                          {val.onlineStatus === "offline" && (
                            <span id={i + val.firstname}
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.offlineright}></div>
                                  <img className="abc" src={offlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftoffline} />
                                  <div className={styles.offlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "active" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                          {val.onlineStatus === "passive" && (
                            <span
                              className={styles.seatHolder}
                              title={"name : " + i + val.firstname}
                            >
                              {i % 2 > 0 &&
                                <span>
                                  <div className={styles.onlineright}></div>
                                  <img className="abc" src={onlineseat} height="70px" width="53px" />
                                </span>
                              }
                              {i % 2 < 1 &&
                                <span>
                                  <img className="abc" src={leftonline} height="70px" width="53px" />
                                  <div className={styles.onlineleft}></div>
                                </span>
                              }
                            </span>
                          )}
                        </>
                      )}
                    </span>{i % 2 > 0 && <br />}</>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
