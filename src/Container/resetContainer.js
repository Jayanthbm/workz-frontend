import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getLogin, updatePassword } from "../actions/login.action";
import reset from "../Components/reset";
const mapDispatchToProps = dispatch => {
  return {
    getLogin: userDetails => {
      dispatch(getLogin(userDetails));
    },
    updatePassword: userDetails => {
      dispatch(updatePassword(userDetails));
    }
  };
};
const mapStateToProps = state => {
  return {
    updatePasswordData: state.loginreducer
  };
};
const resetContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(reset)
);

export default resetContainer;
