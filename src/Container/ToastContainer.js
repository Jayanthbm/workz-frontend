import { connect } from 'react-redux';
import ToastRoot from '../Components/ToastRoot';
import { withRouter } from 'react-router-dom';
import * as toastActions from '../actions/toast.action';
const mapStateToProps = (state) => {
  return {
    toastDisplayed: state.toast.toastDisplayed,
    message: state.toast.toastMessage,
    subMessage: state.toast.toastsubMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    hideToast: () => {
      dispatch(toastActions.hideToast());
    },
  };
};
const ToastContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ToastRoot)
);
export default ToastContainer;
