import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getDeepdive,
  getDeepdiveDropdown,
  postFlag,
  getBreakup,
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
    getBreakup: (timecardId) => {
      dispatch(getBreakup(timecardId));
    },
  };
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    deepdiveData: state.team.deepdiveData,
    deepdiveDropdownData: state.team.deepdiveDropdownData,
    deepDiveError: state.team.deepDiveError,
    flagDetails: state.team.flagDetails,
    breakupDetails: state.team.breakupDetails,
  };
};
const deepdiveContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(deepdive)
);

export default deepdiveContainer;
