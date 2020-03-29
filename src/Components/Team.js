import React, { Component } from "react";
import offline from "../images/offlinepc.png";
import online from "../images/onlinepc.png";
import onlineseat from "../images/onlineseat.png";
import offlineseat from "../images/offlineseat.png";
import styles from "./Team.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import * as Cookie from "../utils/Cookie";
import { USER_DETAILS } from "../utils/constant";
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
    if (this.props.getTeamUser)
      this.props.getTeamUser(
        this.props.teamDetails &&
          this.props.teamDetails.teams &&
          this.props.teamDetails.teams[0].teamId
      );
    console.log(this.state.id);
  }
  selectHandler = val => {
    this.props.getTeamUser(val);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.teamDetails !== this.props.teamDetails) {
      nextProps.getTeamUser(
        nextProps.teamDetails &&
          nextProps.teamDetails.teams &&
          nextProps.teamDetails.teams[0].teamId
      );
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
          team={this.props.teamDetails}
          selectHandler={this.selectHandler}
        />
        <div className={styles.countryContainer}>
          <div className={styles.countryHolder}>
            India
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map(val => {
                return (
                  <div>
                    {val.country === "India" && (
                      <div>
                        {val.onlineStatus === "offline" && (
                          <div className={styles.seatHolder}>
                            <img src={offline} height="80px" width="80px" />
                            <img src={offlineseat} height="80px" width="80px" />
                      
                          </div>
                        )}
                        {val.onlineStatus === "active" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                        {val.onlineStatus === "passive" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div className={styles.countryHolder}>
            USA
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map(val => {
                return (
                  <div>
                    {val.country === "USA" && (
                      <div>
                          {val.onlineStatus === "offline" && (
                          <div  className={styles.seatHolder}> 
                            <img src={offline} height="80px" width="80px" />
                            <img src={offlineseat} height="80px" width="80px" />
                            {val.firstname}
                          </div>
                        )}
                        {val.onlineStatus === "active" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                        {val.onlineStatus === "passive" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div className={styles.countryHolder}>
            Australia
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map(val => {
                return (
                  <div>
                    {val.country === "Australia" && (
                      <div>
                              {val.onlineStatus === "offline" && (
                          <div  className={styles.seatHolder}> 
                            <img src={offline} height="80px" width="80px" />
                            <img src={offlineseat} height="80px" width="80px" />
                            {val.firstname}
                          </div>
                        )}
                        {val.onlineStatus === "active" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                        {val.onlineStatus === "passive" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className={styles.countryHolder}>
            New Zealand
            {this.props.teamUserDetails &&
              this.props.teamUserDetails.users &&
              this.props.teamUserDetails.users.map(val => {
                return (
                  <div>
                    {val.country === "New Zealand" && (
                      <div>
                               {val.onlineStatus === "offline" && (
                          <div  className={styles.seatHolder}> 
                            <img src={offline} height="80px" width="80px" />
                            <img src={offlineseat} height="80px" width="80px" />
                            {val.firstname}
                          </div>
                        )}
                        {val.onlineStatus === "active" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                        {val.onlineStatus === "passive" && (
                          <div  className={styles.seatHolder}>
                            <img src={online} height="80px" width="80px" />
                            <img src={onlineseat} height="80px" width="80px" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
