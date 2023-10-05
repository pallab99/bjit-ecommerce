const initialState = {
  loading: false,
  userDetails: null,
  error: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_DETAILS_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USER_DETAILS_SUCCESS":
      console.log("user data", action.payload);
      return {
        ...state,
        loading: false,
        userDetails: action.payload,
      };
    case "FETCH_USER_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
