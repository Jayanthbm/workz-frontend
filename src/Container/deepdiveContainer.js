import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDeepdive, getDeepdiveDropdown } from "../actions/team.action";
import deepdive from "../Components/deepdive";
const mapDispatchToProps = (dispatch) => {
  return {
    getDeepdive: (userDetails) => {
      dispatch(getDeepdive(userDetails));
    },
    getDeepdiveDropdown: (userDetails) => {
      dispatch(getDeepdiveDropdown(userDetails));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    deepdiveData: state.team.deepdiveData,
    deepdiveDropdownData: state.team.deepdiveDropdownData,
  };
};
const deepdiveContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(deepdive)
);

export default deepdiveContainer;
