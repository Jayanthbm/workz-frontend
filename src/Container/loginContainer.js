import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {getLogin} from "../actions/login.action";
import Login from "../Components/Login";
const mapDispatchToProps = dispatch => {
  return {
    getLogin: userDetails => {
      dispatch(getLogin(userDetails));
    }
  };
};
const mapStateToProps = state => {
  return {
   login: state.loginreducer.loginDetails
  };
};
const loginContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);

export default loginContainer;
