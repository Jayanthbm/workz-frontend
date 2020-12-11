import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postManualTimecard } from '../actions/team.action';
import { displayToast } from '../actions/toast.action';
import Manual from '../Components/Manual';

const mapDispatchToProps = (dispatch) => {
  return {
    postManualTimecard: (details) => {
      dispatch(postManualTimecard(details));
    },
    displayToast: (data) => {
      dispatch(displayToast(data));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    postManualTimecardData: state.team.postManualTimecardData,
  };
};
const ManualContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Manual)
);

export default ManualContainer;
