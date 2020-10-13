import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Admin from "../Components/Admin";
import {
  postTimecard,
  postManualTimecard,
  postNewCompany,
} from "../actions/team.action";
const mapDispatchToProps = (dispatch) => {
  return {
    postTimecard: (details) => {
      dispatch(postTimecard(details));
    },
    postManualTimecard: (details) => {
      dispatch(postManualTimecard(details));
    },
    postNewCompany: (details) => {
      dispatch(postNewCompany(details));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    postTimecardData: state.team.postTimecardData,
    postManualTimecardData: state.team.postManualTimecardData,
    postManualError: state.team.postManualError,
    PostTimecardError: state.team.PostTimecardError,
    postNewCompanyData: state.team.postNewCompanyData,
  };
};
const AdminContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Admin)
);

export default AdminContainer;
