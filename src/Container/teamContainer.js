import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTeam, getTeamUser } from "../actions/team.action";
import Team from "../Components/Team";
const mapDispatchToProps = (dispatch) => {
  return {
    getTeam: (userId) => {
      dispatch(getTeam(userId));
    },
    getTeamUser: (teamId) => {
      dispatch(getTeamUser(teamId));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    teamDetails: state.team.teamDetails && state.team.teamDetails,
    // teamUserDetails:state.team.teamUserDetails,
    teamError: state.team,
    teamUserDetails: state.team.teamUserDetails,
  };
};
const teamContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Team)
);

export default teamContainer;
