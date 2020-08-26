import React, { Component } from "react";
import styles from "./Admin.module.css";
import Header from "../Container/HeaderContainer";
import { USER_DETAILS, ACCESS_TOKEN } from "../utils/constant";
import Checkbox from "@material-ui/core/Checkbox";
import * as Cookie from "../utils/Cookie";
import Modal from "./Modal";
const userDetails = Cookie.getCookie(USER_DETAILS);
let parsedData = userDetails && JSON.parse(userDetails);

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: [], labelsSelected: [], requestMessage: "" };
  }
  componentDidMount = () => {
    this.props.postTimecard();
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
  handleTimecard = () => {
    this.props.postTimecard({
      method: "approval",
      timecardIds: this.state.labelsSelected,
      comments: this.state.requestMessage,
      status: "approved",
    });
    this.setState({ requestMessage: "", show: false, messageShow: true });
  };
  render() {
    console.log(this.state.labelsSelected);
    return (
      <div className={styles.base}>
        <Header pic={parsedData && parsedData.profilePic} />
        <div className={styles.adminBase}>
          {this.props &&
            this.props.postTimecardData &&
            this.props.postTimecardData.map((val) => {
              return (
                <div>
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
                  {val.appName}
                </div>
              );
            })}
          <button onClick={() => this.showModal()}>Submit</button>
        </div>

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
            <div className={styles.disputeButton}>
              <button onClick={() => this.handleTimecard()}>Submit</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Admin;
