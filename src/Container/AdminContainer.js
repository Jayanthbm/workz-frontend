import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Admin from "../Components/Admin";
import { postTimecard, postManualTimecard } from "../actions/team.action";
const mapDispatchToProps = (dispatch) => {
  return {
    postTimecard: (details) => {
      dispatch(postTimecard(details));
    },
    postManualTimecard: (details) => {
      dispatch(postManualTimecard(details));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    postTimecardData: state.team.postTimecardData,
    postManualTimecardData: state.team.postManualTimecardData,
  };
};
const AdminContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Admin)
);

export default AdminContainer;
