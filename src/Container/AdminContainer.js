import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Admin from "../Components/Admin";
import { postTimecard } from "../actions/team.action";
const mapDispatchToProps = (dispatch) => {
  return {
    postTimecard: (details) => {
      dispatch(postTimecard(details));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    postTimecardData: state.team.postTimecardData,
  };
};
const AdminContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Admin)
);

export default AdminContainer;
