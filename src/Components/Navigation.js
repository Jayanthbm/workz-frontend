import React, { Component } from "react";
import styles from "./Navigation.module.css";
class Navigation extends Component {
  selectHandler = (val) => {};
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.container}>
          <div className={styles.textHolder}>Virtual office</div>
          {this.props && this.props.team && (
            <div className={styles.dropdownHolder}>
              <div className={styles.label}>Team</div>
              <div className={styles.selectContainer}>
                <select
                  style={{
                    width: " 250px",
                    height: "22px",
                  }}
                  onChange={(val) => {
                    this.props.selectHandler(val.target.value);
                  }}
                >
                  {this.props &&
                    this.props.team &&
                    this.props.team.map((val) => {
                      return (
                        <>
                          <option
                            value={
                              val.teamId
                                ? JSON.stringify({
                                    type: "team",
                                    id: val.teamId,
                                  })
                                : JSON.stringify({
                                    type: "manager",
                                    id: val.userId,
                                  })
                            }
                            selected={
                              this.props.man_id
                                ? this.props.man_id === val.userId
                                  ? true
                                  : false
                                : this.props.team_id &&
                                  this.props.team_id === val.teamId
                                ? true
                                : false
                            }
                            // this.props.man_id ?  this.props.man_id === val.userId ? true : false
                            // : this.props.team_id ? this.props.team_id===val.teamId?true:false
                          >
                            {val.name}
                          </option>
                          ;
                          {val.userId &&
                            val.teams &&
                            val.teams.map((team) => {
                              return (
                                <option
                                  value={JSON.stringify({
                                    type: "team",
                                    id: team.teamId,
                                  })}
                                  selected={
                                    this.props.team_id &&
                                    this.props.team_id === team.teamId
                                      ? true
                                      : false
                                  }
                                >
                                  &nbsp; &nbsp; {team.name}
                                </option>
                              );
                            })}
                        </>
                      );
                    })}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navigation;
