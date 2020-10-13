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
    case teamAction.POST_NEWCOMPANY_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.POST_NEWCOMPANY_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        postNewCompanyData: action.postNewCompanyData,
      });
    case teamAction.POST_NEWCOMPANY_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        postManualError: action.error,
      });

    case teamAction.POST_MANUAL_TIMECARD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.POST_MANUAL_TIMECARD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        postManualTimecardData: action.postManualTimecardData,
      });
    case teamAction.POST_MANUAL_TIMECARD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        postManualError: action.error,
      });
    case teamAction.POST_TIMECARD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.POST_TIMECARD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        postTimecardData: action.postTimecardData,
      });
    case teamAction.POST_TIMECARD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        PostTimecardError: action.error,
      });

    case teamAction.GET_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.GET_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        getMessageData: action.getMessageData,
      });
    case teamAction.GET_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });
    case teamAction.GET_DEEPDIVE_DROPDOWN_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        deepdiveDropdownData: action.deepdiveDropdownData,
      });
    case teamAction.GET_DEEPDIVE_DROPDOWN_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });
    case teamAction.GET_DEEPDIVE_DROPDOWN_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        teamError: null,
        loading: true,
      });
    case teamAction.GET_DEEPDIVE_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        deepdiveData: action.deepdiveData,
        deepDiveError: "",
      });
    case teamAction.GET_DEEPDIVE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        deepDiveError: action.error,
      });
    case teamAction.GET_DEEPDIVE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        teamError: null,
        loading: true,
      });
    case teamAction.GET_DETAILS_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        teamError: null,
        loading: true,
      });
    case teamAction.GET_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        detailsData: action.detailsData,
        detailsError: "",
      });
    case teamAction.GET_DETAILS_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        detailsError: action.error,
      });
    case teamAction.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        logoutDetails: action.logoutDetails,
      });
    case teamAction.LOGOUT_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });
    case teamAction.POST_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.POST_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        messageData: action.messageData,
      });
    case teamAction.POST_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });
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
    case teamAction.POST_FLAG_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.POST_FLAG_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        flagDetails: action.flagDetails,
      });
    case teamAction.POST_FLAG_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });

    case teamAction.GET_BREAKUP_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case teamAction.GET_BREAKUP_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        breakupDetails: action.breakupDetails,
      });
    case teamAction.GET_BREAKUP_FAILURE:
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
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        teamDetails: action.teamDetails,
      });
    case teamAction.GET_TEAM_FAILURE:
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
