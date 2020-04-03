import React, { Component } from "react";
import offline from "../images/offlinepc.png";
import online from "../images/onlinepc.png";
import onlineseat from "../images/onlineseat.png";
import offlineseat from "../images/offlineseat.png";
import leftoffline from "../images/left-offline-cp.png";
import leftonline from "../images/left-online-cp.png";
import styles from "./Team.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import ProfileStatus from "./ProfileStatus";
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
    const indiaData =
      this.props.teamUserDetails &&
      this.props.teamUserDetails.users &&
      this.props.teamUserDetails.users.filter(data => data.country === "India");
    const usaData =
      this.props.teamUserDetails &&
      this.props.teamUserDetails.users &&
      this.props.teamUserDetails.users.filter(data => data.country === "USA");
    const ausData =
      this.props.teamUserDetails &&
      this.props.teamUserDetails.users &&
      this.props.teamUserDetails.users.filter(
        data => data.country === "Australia"
      );
    const newData =
      this.props.teamUserDetails &&
      this.props.teamUserDetails.users &&
      this.props.teamUserDetails.users.filter(
        data => data.country === "New Zealand"
      );
    console.log(newData);
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.pic} />
        <Navigation
          team={this.props.teamDetails}
          selectHandler={this.selectHandler}
        />
        <div className={styles.countryContainer}>
          <div className={styles.countryHolder}>
            India
            <br />
            {indiaData &&
              indiaData.map((val, i) => {
                console.log(val);
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={i + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                right={0}
                                rightSide={true}
                                offline={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                leftSide={true}
                                offline={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                right={0}
                                active={true}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                active={true}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                right={0}
                                passive={true}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                passive={true}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {i % 2 > 0 && <br />}
                  </>
                );
              })}
          </div>

          <div className={styles.countryHolder}>
            USA
            <br />
            {usaData &&
              usaData.map((val, j) => {
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={j + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + j + val.firstname}
                        >
                          {j % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {j % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + j + val.firstname}
                        >
                          {j % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {j % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + j + val.firstname}
                        >
                          {j % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {j % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {j % 2 > 0 && <br />}
                  </>
                );
              })}
          </div>

          <div className={styles.countryHolder}>
            Australia
            <br />
            {ausData &&
              ausData.map((val, i) => {
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={i + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {i % 2 > 0 && <br />}
                  </>
                );
              })}
          </div>
          <div className={styles.countryHolder}>
            New Zealand
            <br />
            {newData &&
              newData.map((val, i) => {
                return (
                  <>
                    <span className={styles.counryUsers}>
                      {val.onlineStatus === "offline" && (
                        <span
                          id={i + val.firstname}
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.offlineright}></div>
                              <img className={styles.abc} src={offlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                offline={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftoffline} />
                              <div className={styles.offlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "active" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                active={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                      {val.onlineStatus === "passive" && (
                        <span
                          className={styles.seatHolder}
                          title={"name : " + i + val.firstname}
                        >
                          {i % 2 > 0 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                right={0}
                                rightSide={true}
                              />
                              <div className={styles.onlineright}></div>
                              <img className={styles.abc} src={onlineseat} />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                passive={true}
                                left={0}
                                leftSide={true}
                              />
                              <img className={styles.abc} src={leftonline} />
                              <div className={styles.onlineleft}></div>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                    {i % 2 > 0 && <br />}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
