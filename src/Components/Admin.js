import React, { Component } from "react";
import styles from "./Admin.module.css";
import Header from "../Container/HeaderContainer";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import Checkbox from "@material-ui/core/Checkbox";
import * as Cookie from "../utils/Cookie";
import { Form, Switch } from "antd";
import "antd/dist/antd.css";
import Modal from "./Modal";
import Navigation from "./Navigation";
import ManualTimecard from "./ManualTimecard";
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      labelsSelected: [],
      requestMessage: "",
      hierarchy: false,
      showTimecard: true,
      showManual: false,
    };
  }

  componentDidMount = () => {
    this.props.postTimecard();
    this.props.postManualTimecard();
  };
  componentWillReceiveProps = (nextprops) => {
    if (
      this.props &&
      this.props.postManualTimecardData !== nextprops &&
      nextprops.postManualTimecardData
    ) {
      if (
        nextprops.postManualTimecardData &&
        nextprops.postManualTimecardData.message ==
          "Manual Timecard Updated Successfully"
      ) {
        this.props.postManualTimecard();
      }
    }
  };
  handleCheckbox = (val, state) => {
    let filteredCatg = { ...val };
    let data = [];
    let dataExist =
      this.state.selected &&
      this.state.selected.length > 0 &&
      this.state.selected.find((categories, i) => {
        return categories.timecardId === filteredCatg.timecardId;
      });
    if (dataExist) {
      var index = this.state.selected.findIndex(function (cat) {
        return cat.timecardId == dataExist.timecardId;
      });
      data.push(...this.state.selected);
      if (index == 0) {
        data.splice(index, 1);
        this.setState({ selected: data });
      } else {
        data.splice(index, 1);
        this.setState({ selected: data });
      }
    } else {
      data.push(...this.state.selected);
      data.push(filteredCatg);
      this.setState({ selected: data, firstLoader: true });
    }

    this.setState({
      labelsSelected: data.map((e) => e.timecardId).slice(),
    });
  };

  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  handleTimecard = (flag) => {
    if (flag == 0) {
      this.props.postTimecard({
        method: "approval",
        timecardIds: this.state.labelsSelected,
        comments: this.state.requestMessage,
        status: "approved",
      });
    } else {
      this.props.postTimecard({
        method: "approval",
        timecardIds: this.state.labelsSelected,
        comments: this.state.requestMessage,
        status: "rejected",
      });
    }
    this.setState({ requestMessage: "", show: false, messageShow: true });
  };
  showManual = () => {
    this.setState({
      showTimecard: false,
      showManual: true,
    });
  };
  showTimecard = () => {
    this.setState({
      showTimecard: true,
      showManual: false,
    });
  };
  render() {
    console.log(this.props);
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.profilePic} />
        <Navigation admin={true} />
        <div className={styles.adminBase}>
          <div className={styles.header}>
            <div
              className={
                this.state.showTimecard ? styles.seletedText : styles.text
              }
              onClick={() => this.showTimecard()}
            >
              Timecard
            </div>
            <div
              className={
                this.state.showManual ? styles.seletedText : styles.text
              }
              onClick={() => this.showManual()}
            >
              Manual
            </div>
          </div>
          {this.props &&
          this.props.postTimecardData &&
          this.state.showTimecard ? (
            <>
              <div className={styles.baseHolder}>
                <Form.Item label="Hierarchy">
                  <Switch
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={this.state.eventDateEnable}
                    onChange={(e) => {
                      this.setState({
                        hierarchy: e,
                      });
                      if (e == true) {
                        this.props.postTimecard({ hierarchy: "Full" });
                      }
                    }}
                  />
                </Form.Item>
              </div>
              <div className={styles.headHolder}>
                <div className={styles.head}>Checkbox</div>
                <div className={styles.head}>Employee ID</div>
                <div className={styles.head}>Employee Name</div>
                <div className={styles.head}>App Name</div>
                <div className={styles.head}>Key Counter</div>
                <div className={styles.head}>Mouse Counter</div>
                <div className={styles.head}>Window Name</div>
                <div className={styles.head}>Window URL</div>
                <div className={styles.head}>Timecard</div>
                <div className={styles.head}>Timecard Link</div>
              </div>
              {this.props &&
                this.props.postTimecardData &&
                this.props.postTimecardData.map((val) => {
                  return (
                    <div className={styles.headHolder}>
                      <div className={styles.head}>
                        {" "}
                        <Checkbox
                          checked={
                            this.state.selected &&
                            this.state.selected.length > 0 &&
                            this.state.selected.find((categories) => {
                              return categories.timecardId === val.timecardId;
                            })
                              ? true
                              : false
                          }
                          color="primary"
                          onChange={() => {
                            this.handleCheckbox(val, this.state.selected);
                          }}
                        />
                      </div>
                      <div className={styles.head}>{val.empId}</div>
                      <div className={styles.head}>{val.name}</div>
                      <div className={styles.head}>{val.appName}</div>
                      <div className={styles.head}>{val.keyCounter}</div>
                      <div className={styles.head}>{val.mouseCounter}</div>
                      <div className={styles.head}>{val.windowName}</div>
                      <div className={styles.head}>{val.windowUrl}</div>
                      <div className={styles.head}> {val.timecard}</div>
                      <div
                        className={styles.head}
                        onClick={() =>
                          window.open(`deepdive/${val.timecardLink}`, "_blank")
                        }
                      >
                        <button>Open</button>
                      </div>
                    </div>
                  );
                })}

              <button onClick={() => this.showModal()}>Submit</button>
            </>
          ) : (
            this.state.showTimecard && (
              <div className={styles.adminBase}>
                {this.props.PostTimecardError}
              </div>
            )
          )}

          {this.state.showManual && <ManualTimecard {...this.props} />}

          <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            width="auto"
          >
            <div>
              <textarea
                placeholder="Enter comments"
                row="3"
                className={styles.disputeComment}
                value={this.state.requestMessage}
                onChange={(e) => {
                  this.setState({ requestMessage: e.target.value });
                }}
              ></textarea>
              <div className={styles.buttonContainer}>
                <div className={styles.disputeButton}>
                  <button
                    onClick={() => this.handleTimecard(0)}
                    className={styles.button}
                  >
                    Approve
                  </button>
                </div>
                <div className={styles.disputeButton}>
                  <button
                    onClick={() => this.handleTimecard(1)}
                    className={styles.button}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Admin;
