import * as loginAction from "../actions/login.action";
const login = (
  state = {
    loginDetails: null,
    status: null,
    error: null,
    loginError: null,
    loading: false,
    updatePassword: null,
    postStatus: null,
  },
  action
) => {
  switch (action.type) {
    case loginAction.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loginError: null,
        loading: true,
      });

    case loginAction.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        loginDetails: action.loginDetails,
      });
    case loginAction.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        loginError: action.error,
      });
    case loginAction.FORGOT_VALIDATE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case loginAction.FORGOT_VALIDATE_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        forgotDetails: action.forgotDetails,
      });
    case loginAction.FORGOT_VALIDATE_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });
    case loginAction.FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        error: null,
        loading: true,
      });

    case loginAction.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        forgotPassDetails: action.forgotPassDetails,
      });
    case loginAction.FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
      });
    case loginAction.UPDATE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        passwordError: null,
        loading: true,
      });

    case loginAction.UPDATE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        updatePassword: action.updatePassword,
      });
    case loginAction.UPDATE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        passwordError: action.error,
      });
    case loginAction.FORGOT_POST_REQUEST:
      return Object.assign({}, state, {
        postStatus: action.postStatus,
        passwordError: null,
        loading: true,
      });

    case loginAction.FORGOT_POST_SUCCESS:
      return Object.assign({}, state, {
        postStatus: action.postStatus,
        loading: false,
        forgotPost: action.postDetails,
      });
    case loginAction.FORGOT_POST_FAILURE:
      return Object.assign({}, state, {
        postStatus: action.postStatus,
        loading: false,
        passwordError: action.error,
      });
    default:
      return state;
  }
};
export default login;
