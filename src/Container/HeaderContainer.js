import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../Components/Header";
import { logout } from "../actions/team.action";
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

const mapStateToProps = (state) => {
  return {};
};
const HeaderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);

export default HeaderContainer;
