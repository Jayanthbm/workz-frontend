import React, { Component } from "react";
import offline from "../images/offlinepc.png";
import online from "../images/onlinepc.png";
import onlineseat from "../images/onlineseat.png";
import offlineseat from "../images/offlineseat.png";
import leftoffline from "../images/left-offline-cp.png";
import leftonline from "../images/left-online-cp.png";
import styles from "./Team.module.css";
import Header from "../Container/HeaderContainer";
import Navigation from "./Navigation";
import ProfileStatus from "./ProfileStatus";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
const data = [
  {
    name: "abc",
    status: "offline",
  },
  {
    name: "def",
    status: "online",
  },
  {
    name: "pqr",
    status: "online",
  },
  {
    name: "xyz",
    status: "offline",
  },
  {
    name: "asd",
    status: "online",
  },
];
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);
console.log(parsedData);
class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        this.props.teamDetails &&
        this.props.teamDetails.teams &&
        this.props.teamDetails.teams[0].teamId,
    };
  }
  componentDidMount() {
    if (parsedData.previousPassword === null) {
      this.props.history.push("/reset");
    } else {
      if (this.props.getTeam) {
        if (parsedData && parsedData.isManager === 0) {
          console.log("ssjd");
          this.props.getTeam(parsedData.userId);
        } else {
          this.props.getTeam(
            parsedData && parsedData.dropdown && parsedData.dropdown[0].id === 0
              ? parsedData.userId
              : parsedData.dropdown && parsedData.dropdown[0].id
          );
        }
      }
    }
  }
  selectHandler = (val) => {
    if (val === "0") {
      this.props.getTeam(parsedData.userId);
    } else {
      this.props.getTeamUser(val);
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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
      // nextProps.getTeamUser(
      //   nextProps.teamDetails &&
      //     nextProps.teamDetails.teams &&
      //     nextProps.teamDetails.teams[0].teamId
      // );
    }
  }
  render() {
    console.log(this.props);
    const users =
      this.props.teamDetails &&
      this.props.teamDetails.length === 1 &&
      this.props.teamDetails[0] &&
      this.props.teamDetails[0].users &&
      this.props.teamDetails[0].users.length > 20 &&
      this.props.teamDetails[0].users.splice(
        this.props.teamDetails[0].users.length / 2
      );
    console.log(users);
    const userDetails = Cookie.getCookie(USER_DETAILS);
    let parsedData = userDetails && JSON.parse(userDetails);
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.profilePic} />
        <Navigation
          team={parsedData && parsedData.dropdown}
          selectHandler={this.selectHandler}
        />
        <div className={styles.detailsHolder}>
          <div className={styles.countryContainer}>
            <div className={styles.usersContainer}>
              {this.props &&
                this.props.teamDetails &&
                this.props.teamDetails.map((val, i) => {
                  return (
                    <div className={styles.countryHolder}>
                      <div className={styles.header16}> {val.name}</div>
                      <div className={styles.Holder}>
                        {val.managers && val.managers.length > 0 && (
                          <div className={styles.managerContainer}>
                            <div className={styles.manUserContainer}>
                              {val.managers.map((man, i) => {
                                console.log(man);
                                return (
                                  <div>
                                    <div className={styles.countryUsers}>
                                      {man[0].onlineStatus === "offline" && (
                                        <>
                                          <span className={styles.seatHolder}>
                                            <span
                                              className={styles.tooltiptext}
                                            >
                                              {"Name:" +
                                                man[0].name +
                                                "\n" +
                                                "email:" +
                                                man[0].emailId}
                                            </span>

                                            <span>
                                              <ProfileStatus
                                                pic={man[0].profilePic}
                                                right={0}
                                                top={27}
                                                height={50}
                                                width={50}
                                                offline={true}
                                                rightSide={true}
                                              />
                                              <div
                                                className={styles.offlineBottom}
                                              ></div>
                                            </span>
                                          </span>
                                          {man.length > 1 &&
                                            man &&
                                            man[1] &&
                                            man[1].map((sum) => {
                                              return (
                                                <div
                                                  className={styles.summaryBase}
                                                >
                                                  <div
                                                    className={
                                                      styles.summaryHeader
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        sum.active >
                                                          sum.offline &&
                                                        sum.active >
                                                          sum.inactive
                                                          ? "#8BC646"
                                                          : sum.inactive >
                                                              sum.offline &&
                                                            sum.inactive >
                                                              sum.active
                                                          ? "EFC165"
                                                          : sum.offline >
                                                              sum.active &&
                                                            sum.offline >
                                                              sum.inactive &&
                                                            "#CECECE",
                                                    }}
                                                  >
                                                    {sum.team}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.summaryContainer
                                                    }
                                                  >
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Total Employees
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.total_employees}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Active
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.active}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        InActive
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.inactive}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Offline
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.offline}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                        </>
                                      )}
                                      {man[0].onlineStatus === "active" && (
                                        <>
                                          <span className={styles.seatHolder}>
                                            <span
                                              className={styles.tooltiptext}
                                            >
                                              {"Name:" +
                                                man[0].name +
                                                "\n" +
                                                "email:" +
                                                man[0].emailId}
                                            </span>

                                            <span>
                                              <ProfileStatus
                                                pic={man[0].profilePic}
                                                right={0}
                                                top={27}
                                                height={50}
                                                width={50}
                                                active={true}
                                                rightSide={true}
                                              />
                                              <div
                                                className={styles.onlineBottom}
                                              ></div>
                                            </span>
                                          </span>
                                          {man.length > 1 &&
                                            man &&
                                            man[1] &&
                                            man[1].map((sum) => {
                                              return (
                                                <div
                                                  className={styles.summaryBase}
                                                >
                                                  <div
                                                    className={
                                                      styles.summaryHeader
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        sum.active >
                                                          sum.offline &&
                                                        sum.active >
                                                          sum.inactive
                                                          ? "#8BC646"
                                                          : sum.inactive >
                                                              sum.offline &&
                                                            sum.inactive >
                                                              sum.active
                                                          ? "EFC165"
                                                          : sum.offline >
                                                              sum.active &&
                                                            sum.offline >
                                                              sum.inactive &&
                                                            "#CECECE",
                                                    }}
                                                  >
                                                    {sum.team}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.summaryContainer
                                                    }
                                                  >
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Total Employees
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.total_employees}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Active
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.active}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        InActive
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.inactive}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Offline
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.offline}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                        </>
                                      )}
                                      {man[0].onlineStatus === "passive" && (
                                        <div>
                                          <span className={styles.seatHolder}>
                                            <span
                                              className={styles.tooltiptext}
                                            >
                                              {"Name:" +
                                                man[0].name +
                                                "\n" +
                                                "email:" +
                                                man[0].emailId}
                                            </span>
                                            {i % 2 > 0 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={man[0].profilePic}
                                                  right={0}
                                                  top={27}
                                                  height={50}
                                                  width={50}
                                                  passive={true}
                                                  rightSide={true}
                                                />
                                                <div
                                                  className={
                                                    styles.inactiveBottom
                                                  }
                                                ></div>
                                              </span>
                                            )}
                                            {i % 2 < 1 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={man[0].profilePic}
                                                  right={0}
                                                  top={27}
                                                  height={50}
                                                  width={50}
                                                  passive={true}
                                                  rightSide={true}
                                                />
                                                <div
                                                  className={
                                                    styles.inactiveBottom
                                                  }
                                                ></div>
                                              </span>
                                            )}
                                          </span>
                                          {man &&
                                            man.length > 0 &&
                                            man[1] &&
                                            man[1].length &&
                                            man[1].map((sum) => {
                                              return (
                                                <div
                                                  className={styles.summaryBase}
                                                >
                                                  <div
                                                    className={
                                                      styles.summaryHeader
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        sum.active >
                                                          sum.offline &&
                                                        sum.active >
                                                          sum.inactive
                                                          ? "#8BC646"
                                                          : sum.inactive >
                                                              sum.offline &&
                                                            sum.inactive >
                                                              sum.active
                                                          ? "EFC165"
                                                          : sum.offline >
                                                              sum.active &&
                                                            sum.offline >
                                                              sum.inactive &&
                                                            "#CECECE",
                                                    }}
                                                  >
                                                    {sum.team}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles.summaryContainer
                                                    }
                                                  >
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Total Employees
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.total_employees}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Active
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.active}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        InActive
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.inactive}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className={styles.valCont}
                                                    >
                                                      <div
                                                        className={styles.lable}
                                                      >
                                                        Offline
                                                      </div>
                                                      <div
                                                        className={styles.value}
                                                      >
                                                        {sum.offline}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      )}
                                    </div>
                                    {i % 2 > 0 && (
                                      <div className={styles.break} />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            {val.summary &&
                              val.summary.map((sum) => {
                                return (
                                  <div className={styles.summaryBase}>
                                    <div
                                      className={styles.summaryHeader}
                                      style={{
                                        backgroundColor:
                                          sum.active > sum.offline &&
                                          sum.active > sum.inactive
                                            ? "#8BC646"
                                            : sum.inactive > sum.offline &&
                                              sum.inactive > sum.active
                                            ? "EFC165"
                                            : sum.offline > sum.active &&
                                              sum.offline > sum.inactive &&
                                              "#CECECE",
                                      }}
                                    >
                                      {sum.team}
                                    </div>
                                    <div className={styles.summaryContainer}>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          Total Employees
                                        </div>
                                        <div className={styles.value}>
                                          {sum.total_employees}
                                        </div>
                                      </div>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          Active
                                        </div>
                                        <div className={styles.value}>
                                          {sum.active}
                                        </div>
                                      </div>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          InActive
                                        </div>
                                        <div className={styles.value}>
                                          {sum.inactive}
                                        </div>
                                      </div>
                                      <div className={styles.valCont}>
                                        <div className={styles.lable}>
                                          Offline
                                        </div>
                                        <div className={styles.value}>
                                          {sum.offline}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                        {console.log(val)}

                        {val.users &&
                          val.users.length > 0 &&
                          this.props.teamDetails.length === 1 && (
                            <>
                              {users && (
                                <div className={styles.usrContainer}>
                                  {/* {val.users && val.users.length > 0 && (
                            <div>Users</div>
                          )} */}

                                  {users &&
                                    users.map((val, i) => {
                                      return (
                                        <>
                                          <span className={styles.countrUsers}>
                                            {val.onlineStatus === "offline" && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {"Name:" +
                                                    val.name +
                                                    "\n" +
                                                    "email:" +
                                                    val.emailId}
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={0}
                                                      rightSide={true}
                                                      offline={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.offlineright
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={0}
                                                      leftSide={true}
                                                      offline={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.offlineleft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                            {val.onlineStatus === "active" && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {"Name:" +
                                                    val.name +
                                                    "\n" +
                                                    "email:" +
                                                    val.emailId}
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={0}
                                                      active={true}
                                                      rightSide={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.onlineright
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={0}
                                                      active={true}
                                                      leftSide={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.onlineleft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                            {val.onlineStatus === "passive" && (
                                              <span
                                                className={styles.seatHolder}
                                              >
                                                <span
                                                  className={styles.tooltiptext}
                                                >
                                                  {"Name:" +
                                                    val.name +
                                                    "\n" +
                                                    "email:" +
                                                    val.emailId}
                                                </span>
                                                {i % 2 > 0 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      right={0}
                                                      passive={true}
                                                      rightSide={true}
                                                    />
                                                    <div
                                                      className={
                                                        styles.inactiveRight
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                                {i % 2 < 1 && (
                                                  <span>
                                                    <ProfileStatus
                                                      pic={val.profilePic}
                                                      left={0}
                                                      passive={true}
                                                      leftSide={true}
                                                    />

                                                    <div
                                                      className={
                                                        styles.inactiveLeft
                                                      }
                                                    ></div>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                          </span>
                                          {i % 2 > 0 && (
                                            <div className={styles.break} />
                                          )}
                                        </>
                                      );
                                    })}
                                </div>
                              )}
                              <div className={styles.usrContainer}>
                                {/* {val.users && val.users.length > 0 && (
                            <div>Users</div>
                          )} */}

                                {val.users.map((val, i) => {
                                  return (
                                    <>
                                      <span className={styles.countrUsers}>
                                        {val.onlineStatus === "offline" && (
                                          <span className={styles.seatHolder}>
                                            <span
                                              className={styles.tooltiptext}
                                            >
                                              {"Name:" +
                                                val.name +
                                                "\n" +
                                                "email:" +
                                                val.emailId}
                                            </span>
                                            {i % 2 > 0 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={val.profilePic}
                                                  right={0}
                                                  rightSide={true}
                                                  offline={true}
                                                />
                                                <div
                                                  className={
                                                    styles.offlineright
                                                  }
                                                ></div>
                                              </span>
                                            )}
                                            {i % 2 < 1 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={val.profilePic}
                                                  left={0}
                                                  leftSide={true}
                                                  offline={true}
                                                />

                                                <div
                                                  className={styles.offlineleft}
                                                ></div>
                                              </span>
                                            )}
                                          </span>
                                        )}
                                        {val.onlineStatus === "active" && (
                                          <span className={styles.seatHolder}>
                                            <span
                                              className={styles.tooltiptext}
                                            >
                                              {"Name:" +
                                                val.name +
                                                "\n" +
                                                "email:" +
                                                val.emailId}
                                            </span>
                                            {i % 2 > 0 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={val.profilePic}
                                                  right={0}
                                                  active={true}
                                                  rightSide={true}
                                                />
                                                <div
                                                  className={styles.onlineright}
                                                ></div>
                                              </span>
                                            )}
                                            {i % 2 < 1 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={val.profilePic}
                                                  left={0}
                                                  active={true}
                                                  leftSide={true}
                                                />

                                                <div
                                                  className={styles.onlineleft}
                                                ></div>
                                              </span>
                                            )}
                                          </span>
                                        )}
                                        {val.onlineStatus === "passive" && (
                                          <span className={styles.seatHolder}>
                                            <span
                                              className={styles.tooltiptext}
                                            >
                                              {"Name:" +
                                                val.name +
                                                "\n" +
                                                "email:" +
                                                val.emailId}
                                            </span>
                                            {i % 2 > 0 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={val.profilePic}
                                                  right={0}
                                                  passive={true}
                                                  rightSide={true}
                                                />
                                                <div
                                                  className={
                                                    styles.inactiveRight
                                                  }
                                                ></div>
                                              </span>
                                            )}
                                            {i % 2 < 1 && (
                                              <span>
                                                <ProfileStatus
                                                  pic={val.profilePic}
                                                  left={0}
                                                  passive={true}
                                                  leftSide={true}
                                                />

                                                <div
                                                  className={
                                                    styles.inactiveLeft
                                                  }
                                                ></div>
                                              </span>
                                            )}
                                          </span>
                                        )}
                                      </span>
                                      {i % 2 > 0 && (
                                        <div className={styles.break} />
                                      )}
                                    </>
                                  );
                                })}
                              </div>
                            </>
                          )}

                        {val.users &&
                          val.users.length > 0 &&
                          this.props.teamDetails.length > 1 && (
                            <div className={styles.usrContainer}>
                              {/* {val.users && val.users.length > 0 && (
                            <div>Users</div>
                          )} */}
                              {val.users.map((val, i) => {
                                return (
                                  <>
                                    <span className={styles.countrUsers}>
                                      {val.onlineStatus === "offline" && (
                                        <span className={styles.seatHolder}>
                                          <span className={styles.tooltiptext}>
                                            {"Name:" +
                                              val.name +
                                              "\n" +
                                              "email:" +
                                              val.emailId}
                                          </span>
                                          {i % 2 > 0 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                right={0}
                                                rightSide={true}
                                                offline={true}
                                              />
                                              <div
                                                className={styles.offlineright}
                                              ></div>
                                            </span>
                                          )}
                                          {i % 2 < 1 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                left={0}
                                                leftSide={true}
                                                offline={true}
                                              />

                                              <div
                                                className={styles.offlineleft}
                                              ></div>
                                            </span>
                                          )}
                                        </span>
                                      )}
                                      {val.onlineStatus === "active" && (
                                        <span className={styles.seatHolder}>
                                          <span className={styles.tooltiptext}>
                                            {"Name:" +
                                              val.name +
                                              "\n" +
                                              "email:" +
                                              val.emailId}
                                          </span>
                                          {i % 2 > 0 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                right={0}
                                                active={true}
                                                rightSide={true}
                                              />
                                              <div
                                                className={styles.onlineright}
                                              ></div>
                                            </span>
                                          )}
                                          {i % 2 < 1 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                left={0}
                                                active={true}
                                                leftSide={true}
                                              />

                                              <div
                                                className={styles.onlineleft}
                                              ></div>
                                            </span>
                                          )}
                                        </span>
                                      )}
                                      {val.onlineStatus === "passive" && (
                                        <span className={styles.seatHolder}>
                                          <span className={styles.tooltiptext}>
                                            {"Name:" +
                                              val.name +
                                              "\n" +
                                              "email:" +
                                              val.emailId}
                                          </span>
                                          {i % 2 > 0 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                right={0}
                                                passive={true}
                                                rightSide={true}
                                              />
                                              <div
                                                className={styles.inactiveRight}
                                              ></div>
                                            </span>
                                          )}
                                          {i % 2 < 1 && (
                                            <span>
                                              <ProfileStatus
                                                pic={val.profilePic}
                                                left={0}
                                                passive={true}
                                                leftSide={true}
                                              />

                                              <div
                                                className={styles.inactiveLeft}
                                              ></div>
                                            </span>
                                          )}
                                        </span>
                                      )}
                                    </span>
                                    {i % 2 > 0 && (
                                      <div className={styles.break} />
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* <div className={styles.block2}>
              {this.props &&
                this.props.teamDetails &&
                this.props.teamDetails.teamusers &&
                this.props.teamDetails.teamName && (
                  <div> {this.props.teamDetails.teamName}</div>
                )}
              {this.props &&
                this.props.teamDetails &&
                this.props.teamDetails.teamusers &&
                this.props.teamDetails.teamusers.map((val, i) => {
                  return (
                    <>
                      <span className={styles.countryUsers}>
                        {val.onlineStatus === "offline" && (
                          <span className={styles.seatHolder}>
                            <span className={styles.tooltiptext}>
                              {val.firstname}
                            </span>
                            {i % 2 > 0 && (
                              <span>
                                <ProfileStatus
                                  right={0}
                                  rightSide={true}
                                  offline={true}
                                />
                                <div className={styles.offlineright}></div>
                              </span>
                            )}
                            {i % 2 < 1 && (
                              <span>
                                <ProfileStatus
                                  left={0}
                                  leftSide={true}
                                  offline={true}
                                />

                                <div className={styles.offlineleft}></div>
                              </span>
                            )}
                          </span>
                        )}
                        {val.onlineStatus === "active" && (
                          <span className={styles.seatHolder}>
                            <span className={styles.tooltiptext}>
                              {val.firstname}
                            </span>
                            {i % 2 > 0 && (
                              <span>
                                <ProfileStatus
                                  right={0}
                                  active={true}
                                  rightSide={true}
                                />
                                <div className={styles.onlineright}></div>
                              </span>
                            )}
                            {i % 2 < 1 && (
                              <span>
                                <ProfileStatus
                                  left={0}
                                  active={true}
                                  leftSide={true}
                                />

                                <div className={styles.onlineleft}></div>
                              </span>
                            )}
                          </span>
                        )}
                        {val.onlineStatus === "passive" && (
                          <span className={styles.seatHolder}>
                            <span className={styles.tooltiptext}>
                              {val.firstname}
                            </span>
                            {i % 2 > 0 && (
                              <span>
                                <ProfileStatus
                                  right={0}
                                  passive={true}
                                  rightSide={true}
                                />
                                <div className={styles.onlineright}></div>
                              </span>
                            )}
                            {i % 2 < 1 && (
                              <span>
                                <ProfileStatus
                                  left={0}
                                  passive={true}
                                  leftSide={true}
                                />

                                <div className={styles.onlineleft}></div>
                              </span>
                            )}
                          </span>
                        )}
                      </span>
                      {i % 2 > 0 && <div className={styles.break} />}
                    </>
                  );
                })}
            </div>

           */}{" "}
            {/* <div className={styles.countryHolder}>
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
          </div> */}
            {/* 
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
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
