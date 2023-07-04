const initialState = {
  token: null,
  errorMsg: "",
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        token: action.payload,
        message: action.message,
        errorMsg: "",
      };
    }
    case "REGISTER": {
      return {
        ...state,
        message: action.message,
        errorMsg: "",
      };
    }
    case "SET_AUTH_MESSAGE": {
      return {
        ...state,
        message: "",
        errorMsg: action.payload,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        token: null,
        message: "",
        errorMsg: "",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default authReducer;
