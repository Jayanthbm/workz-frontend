import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { forgotValidate, forgotPost } from "../actions/login.action";
import forgot from "../Components/forgot";
const mapDispatchToProps = (dispatch) => {
  return {
    forgotValidate: (token) => {
      dispatch(forgotValidate(token));
    },
    forgotPost: (token, postDetails) => {
      dispatch(forgotPost(token, postDetails));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    forgot: state.loginreducer.status,
    password: state.loginreducer.forgotPost,
    passwordError: state.loginreducer.passwordError,
  };
};
const forgotContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(forgot)
);

export default forgotContainer;
