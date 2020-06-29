import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getDeepdive,
  getDeepdiveDropdown,
  postFlag,
  getBreakup,
  postMessage,
  gettMessage,
} from "../actions/team.action";
import deepdive from "../Components/deepdive";
const mapDispatchToProps = (dispatch) => {
  return {
    getDeepdive: (userDetails) => {
      dispatch(getDeepdive(userDetails));
    },
    getDeepdiveDropdown: (userDetails) => {
      dispatch(getDeepdiveDropdown(userDetails));
    },
    postFlag: (timecardId) => {
      dispatch(postFlag(timecardId));
    },
    postMessage: (formData, timecardId) => {
      dispatch(postMessage(formData, timecardId));
    },
    getBreakup: (timecardId) => {
      dispatch(getBreakup(timecardId));
    },
    gettMessage: (timecardId) => {
      dispatch(gettMessage(timecardId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    deepdiveData: state.team.deepdiveData,
    deepdiveDropdownData: state.team.deepdiveDropdownData,
    deepDiveError: state.team.deepDiveError,
    flagDetails: state.team.flagDetails,
    breakupDetails: state.team.breakupDetails,
    getMessageData:
      state.team.getMessageData && state.team.getMessageData.message,
    messageData: state.team.messageData,
  };
};
const deepdiveContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(deepdive)
);

export default deepdiveContainer;
