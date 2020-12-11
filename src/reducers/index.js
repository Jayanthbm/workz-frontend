import { combineReducers } from 'redux';
import loginreducer from './login.reducer';
import team from './team.reducer';
import toast from './toast.reducer';
export default combineReducers({
  loginreducer,
  team,
  toast,
});
