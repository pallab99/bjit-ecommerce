import AuthApi from "../../api/AuthApi";

export function logIn(data) {
  return async (dispatch) => {
    dispatch(fetchUserDetailsStarted());
    try {
      const response = await AuthApi.signIn(data);
      console.log("response", response.data.data);
      dispatch(fetchUserDetailsSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchUserDetailsFailure(error.message));
    }
  };
}

const fetchUserDetailsStarted = () => ({
  type: "FETCH_USER_DETAILS_STARTED",
});

const fetchUserDetailsSuccess = (userDetails) => ({
  type: "FETCH_USER_DETAILS_SUCCESS",
  payload: userDetails,
});

const fetchUserDetailsFailure = (error) => ({
  type: "FETCH_USER_DETAILS_FAILURE",
  payload: error,
});
