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
        if (parsedData.isManager && parsedData.isManager === 0) {
          this.props.getTeam(parsedData.userId);
        } else this.props.getTeam(parsedData.dropdown[0].id);
      }
    }
  }
  selectHandler = (val) => {
    this.props.getTeam(val);
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
    const userDetails = Cookie.getCookie(USER_DETAILS);
    let parsedData = userDetails && JSON.parse(userDetails);
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.pic} />
        <Navigation
          team={parsedData && parsedData.dropdown}
          selectHandler={this.selectHandler}
        />
        <div className={styles.countryContainer}>
          <div className={styles.usersContainer}>
            {this.props &&
              this.props.teamDetails &&
              !this.props.teamDetails.teamusers &&
              this.props.teamDetails.map((val) => {
                return (
                  <div className={styles.countryHolder}>
                    <div> {val.name}</div>
                    <div className={styles.Holder}>
                      <div className={styles.managerContainer}>
                        {val.managers && val.managers.length > 0 && (
                          <div>managers</div>
                        )}
                        {val.managers.map((man, i) => {
                          return (
                            <>
                              <span className={styles.counryUsers}>
                                {man.onlineStatus === "offline" && (
                                  <span className={styles.seatHolder}>
                                    <span className={styles.tooltiptext}>
                                      {man.name}
                                    </span>
                                    {i % 2 > 0 && (
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
                                          alt=""
                                        />
                                      </span>
                                    )}
                                    {i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          leftSide={true}
                                          offline={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftoffline}
                                          alt=""
                                        />
                                        <div
                                          className={styles.offlineleft}
                                        ></div>
                                      </span>
                                    )}
                                  </span>
                                )}
                                {man.onlineStatus === "active" && (
                                  <span className={styles.seatHolder}>
                                    <span className={styles.tooltiptext}>
                                      {man.firstname}
                                    </span>
                                    {i % 2 > 0 && (
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
                                          alt=""
                                        />
                                      </span>
                                    )}
                                    {i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          active={true}
                                          leftSide={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftonline}
                                          alt=""
                                        />
                                        <div
                                          className={styles.onlineleft}
                                        ></div>
                                      </span>
                                    )}
                                  </span>
                                )}
                                {man.onlineStatus === "passive" && (
                                  <div>
                                    <span className={styles.seatHolder}>
                                      <span className={styles.tooltiptext}>
                                        {man.firstname}
                                      </span>
                                      {i % 2 > 0 && (
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
                                            alt=""
                                          />
                                        </span>
                                      )}
                                      {i % 2 < 1 && (
                                        <span>
                                          <ProfileStatus
                                            left={0}
                                            passive={true}
                                            leftSide={true}
                                          />
                                          <img
                                            className={styles.abc}
                                            src={leftonline}
                                            alt=""
                                          />
                                          <div
                                            className={styles.onlineleft}
                                          ></div>
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                )}
                              </span>
                              {i % 2 > 0 && <div className={styles.break} />}
                            </>
                          );
                        })}

                        {val.summary.map((sum) => {
                          return (
                            <div className={styles.summaryBase}>
                              <div className={styles.summaryHeader}>
                                {sum.team}
                              </div>
                              <div className={styles.summaryContainer}>
                                <div className={styles.valCont}>
                                  <div className={styles.lable}>
                                    Total Employees:
                                  </div>
                                  <div className={styles.value}>
                                    {sum.total_employees}
                                  </div>
                                </div>
                                <div className={styles.valCont}>
                                  <div className={styles.lable}>Active:</div>
                                  <div className={styles.value}>
                                    {sum.active}
                                  </div>
                                </div>
                                <div className={styles.valCont}>
                                  <div className={styles.lable}>InActive:</div>
                                  <div className={styles.value}>
                                    {sum.inactive}
                                  </div>
                                </div>
                                <div className={styles.valCont}>
                                  <div className={styles.lable}>Offline:</div>
                                  <div className={styles.value}>
                                    {sum.offline}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className={styles.usrContainer}>
                        {val.users && val.users.length > 0 && <div>Users</div>}
                        {val.users.map((val, i) => {
                          return (
                            <>
                              <span className={styles.counryUsers}>
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
                                        <div
                                          className={styles.offlineright}
                                        ></div>
                                        <img
                                          className={styles.abc}
                                          src={offlineseat}
                                          alt=""
                                        />
                                      </span>
                                    )}
                                    {i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          leftSide={true}
                                          offline={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftoffline}
                                          alt=""
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
                                      {val.firstname}
                                    </span>
                                    {i % 2 > 0 && (
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
                                          alt=""
                                        />
                                      </span>
                                    )}
                                    {i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          active={true}
                                          leftSide={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftonline}
                                          alt=""
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
                                      {val.firstname}
                                    </span>
                                    {i % 2 > 0 && (
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
                                          alt=""
                                        />
                                      </span>
                                    )}
                                    {i % 2 < 1 && (
                                      <span>
                                        <ProfileStatus
                                          left={0}
                                          passive={true}
                                          leftSide={true}
                                        />
                                        <img
                                          className={styles.abc}
                                          src={leftonline}
                                          alt=""
                                        />
                                        <div
                                          className={styles.onlineleft}
                                        ></div>
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
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.countryHolder}>
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
                    <span className={styles.counryUsers}>
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
                              <img
                                className={styles.abc}
                                src={offlineseat}
                                alt=""
                              />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                leftSide={true}
                                offline={true}
                              />
                              <img
                                className={styles.abc}
                                src={leftoffline}
                                alt=""
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
                              <img
                                className={styles.abc}
                                src={onlineseat}
                                alt=""
                              />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                active={true}
                                leftSide={true}
                              />
                              <img
                                className={styles.abc}
                                src={leftonline}
                                alt=""
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
                              <img
                                className={styles.abc}
                                src={onlineseat}
                                alt=""
                              />
                            </span>
                          )}
                          {i % 2 < 1 && (
                            <span>
                              <ProfileStatus
                                left={0}
                                passive={true}
                                leftSide={true}
                              />
                              <img
                                className={styles.abc}
                                src={leftonline}
                                alt=""
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
    );
  }
}

export default Team;
