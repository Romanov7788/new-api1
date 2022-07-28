const Reducer = (state, action) => {
  switch (action.type) {
    case "Login_Success":
      return {
        user: action.payload,
      };

    case "Logout":
      return {
        user: null,
      };

    default:
      return state;
  }
};

export default Reducer;
