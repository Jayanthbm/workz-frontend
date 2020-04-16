import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { forgotPass } from "../actions/login.action";
import forgotPassword from "../Components/forgotPass";
const mapDispatchToProps = (dispatch) => {
  return {
    forgotPass: (userDetails) => {
      dispatch(forgotPass(userDetails));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    forgotPassDetails: state.loginreducer.forgotPassDetails,
    forgotPassError: state.loginreducer.error,
  };
};
const forgotPassContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(forgotPassword)
);

export default forgotPassContainer;
