import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../Components/Header";

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {};
};
const HeaderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);

export default HeaderContainer;
