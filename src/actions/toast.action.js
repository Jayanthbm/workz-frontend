import delay from 'lodash.delay';
export const TOAST_DELAY = 3000;
export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const SOMETHING_WENT_WRONG = 'Something went wrong. Please try again.';
export function hideToast() {
  return {
    type: HIDE_TOAST,
  };
}
export function showToast(message) {
  return {
    type: SHOW_TOAST,
    message,
  };
}
export function displayToast(message) {
  let updatedMessage = message;

  return async (dispatch) => {
    dispatch(showToast(updatedMessage));
    delay(() => {
      dispatch(hideToast());
    }, TOAST_DELAY);
  };
}
