import React, { Component } from "react";
import styles from "./Admin.module.css";
import { Form, Switch } from "antd";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "./Modal";
class ManualTimecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      labelsSelected: [],
      requestMessage: "",
      hierarchy: false,
      showTimecard: true,
      showManual: false,
      show: false,
    };
  }
  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  handleManualtimecard = (flag) => {
    if (flag == 0) {
      this.props.postManualTimecard({
        method: "approval",
        manualtimecardIds: this.state.labelsSelected,
        comments: this.state.requestMessage,
        status: "approved",
      });
    } else {
      this.props.postManualTimecard({
        method: "approval",
        manualtimecardIds: this.state.labelsSelected,
        comments: this.state.requestMessage,
        status: "rejected",
      });
    }
    this.setState({ requestMessage: "", show: false, messageShow: true });
  };
  handleManualCheckbox = (val, state) => {
    let filteredCatg = { ...val };
    let data = [];
    let dataExist =
      this.state.selected &&
      this.state.selected.length > 0 &&
      this.state.selected.find((categories, i) => {
        return categories.manualTimeId === filteredCatg.manualTimeId;
      });
    if (dataExist) {
      var index = this.state.selected.findIndex(function (cat) {
        return cat.manualTimeId == dataExist.manualTimeId;
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
    console.log(data.map((e) => e.manualTimeId).slice());
    this.setState({
      labelsSelected: data.map((e) => e.manualTimeId).slice(),
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <Modal show={this.state.show} handleClose={this.hideModal} width="auto">
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
                  onClick={() => this.handleManualtimecard(0)}
                  className={styles.button}
                >
                  Approve
                </button>
              </div>
              <div className={styles.disputeButton}>
                <button
                  onClick={() => this.handleManualtimecard(1)}
                  className={styles.button}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {this.props && this.props.postManualTimecardData ? (
          <>
            <div className={styles.baseHolder}>
              <Form.Item label="Hierarchy">
                <Switch
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  onChange={(e) => {
                    this.setState({
                      hierarchy: e,
                    });
                    if (e == true) {
                      this.props.postManualTimecard({ hierarchy: "Full" });
                    }
                  }}
                />
              </Form.Item>
            </div>
            <div className={styles.headHolder}>
              <div className={styles.head}>Checkbox</div>
              <div className={styles.head}>Manual Timecard ID</div>
              <div className={styles.head}>Start Time</div>
              <div className={styles.head}>End Time</div>
              <div className={styles.head}>Reason</div>
            </div>
            {this.props &&
              this.props.postManualTimecardData &&
              this.props.postManualTimecardData.map((val) => {
                return (
                  <div className={styles.headHolder}>
                    <div className={styles.head}>
                      {" "}
                      <Checkbox
                        checked={
                          this.state.selected &&
                          this.state.selected.length > 0 &&
                          this.state.selected.find((categories) => {
                            return categories.manualTimeId === val.manualTimeId;
                          })
                            ? true
                            : false
                        }
                        color="primary"
                        onChange={() => {
                          this.handleManualCheckbox(val, this.state.selected);
                        }}
                      />
                    </div>
                    <div className={styles.head}>{val.manualTimeId}</div>
                    <div className={styles.head}>{val.startTime}</div>
                    <div className={styles.head}>{val.endTime}</div>
                    <div className={styles.head}>{val.manualTimeReason}</div>
                  </div>
                );
              })}

            <button onClick={() => this.showModal()}>Submit</button>
          </>
        ) : (
          <div className={styles.adminBase}>No ManualTimecard</div>
        )}
      </div>
    );
  }
}

export default ManualTimecard;
