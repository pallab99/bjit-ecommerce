const initialState = {
  userData: {},
};

function userReducers(state = initialState, action) {
  switch (action.type) {
    case "SAVE_USER_DETAILS":
      return { userData: action.payload };

    default:
      return state;
  }
}
export default userReducers;
