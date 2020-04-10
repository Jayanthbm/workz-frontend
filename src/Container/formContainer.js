import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Form from "../Components/Form";
import {postForm} from "../actions/team.action"

const mapDispatchToProps = dispatch => {
    return {
        postForm: formData => {
            dispatch(postForm(formData));
          }
    };
  };
  
  const mapStateToProps = state => {
    return {
   
    };
  };
  const formContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Form)
  );
  
  export default formContainer;
  