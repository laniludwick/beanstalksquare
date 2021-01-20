// ***** formReducer function *****

const formReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE INPUT TEXT":
      return {
        ...state, 
        [action.field]: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;