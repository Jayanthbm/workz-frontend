import { combineReducers } from "redux";
import loginreducer from "./login.reducer"
import team from "./team.reducer"
export default combineReducers({
    loginreducer,
    team
  });
  