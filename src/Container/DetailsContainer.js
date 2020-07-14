import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Details from "../Components/Details";
import {
  getDeepdive,
  getDeepdiveDropdown,
  getDetails,
  postFlag,
  getBreakup,
  postMessage,
  gettMessage,
} from "../actions/team.action";
const mapDispatchToProps = (dispatch) => {
  return {
    getDetails: (userDetails) => {
      dispatch(getDetails(userDetails));
    },
    getDeepdiveDropdown: (userDetails) => {
      dispatch(getDeepdiveDropdown(userDetails));
    },
    postFlag: (timecardId) => {
      dispatch(postFlag(timecardId));
    },
    getBreakup: (timecardId) => {
      dispatch(getBreakup(timecardId));
    },
    postMessage: (formData, timecardId) => {
      dispatch(postMessage(formData, timecardId));
    },
    gettMessage: (timecardId) => {
      dispatch(gettMessage(timecardId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    deepdiveData: state.team.deepdiveData,
    detailsData: state.team.detailsData,
    deepdiveDropdownData: state.team.deepdiveDropdownData,
    detailsError: state.team.detailsError,
    flagDetails: state.team.flagDetails,
    breakupDetails: state.team.breakupDetails,
    getMessageData:
      state.team.getMessageData && state.team.getMessageData.message,
    messageData: state.team.messageData,
  };
};
const DetailsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Details)
);
export default DetailsContainer;
