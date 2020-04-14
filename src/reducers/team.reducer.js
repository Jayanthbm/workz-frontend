import * as teamAction from "../actions/team.action";
const team = (
  state = {
    teamDetails: null,
    status: null,
    error: null,
    teamError: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case teamAction.POST_FORM_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.POST_FORM_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        formData: action.formData,
      });
    case teamAction.POST_FORM_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });

    case teamAction.GET_TEAM_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        teamError: null,
        loading: true,
      });

    case teamAction.GET_TEAM_SUCCESS:
      console.log(action.teamDetails);
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        teamDetails: action.teamDetails,
      });
    case teamAction.GET_TEAM_FAILURE:
      console.log(action.error);
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        teamError: action.error,
      });
    case teamAction.GET_TEAM_USER_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        teamError: null,
        loading: true,
      });

    case teamAction.GET_TEAM_USER_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        teamDetails: action.teamUserDetails,
      });
    case teamAction.GET_TEAM_USER_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        teamError: action.error,
      });

    default:
      return state;
  }
};
export default team;
