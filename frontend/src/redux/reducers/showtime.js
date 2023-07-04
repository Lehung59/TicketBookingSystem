const initialState = {
  showtimes: [],
  timeData: [],
  details: {},
  message: "",
  errorMsg: "",
};

const showtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SHOWTIME": {
      return {
        ...state,
        showtimes: action.payload,
        message: action.message,
      };
    }
    
    case "SET_SELECTED_TIME": // Thêm case mới để cập nhật selectedTime
      return {
        ...state,
        selectedTime: action.payload,
      };
    case "MOVIE_SHOWTIME": {
      return {
        ...state,
        timeData: action.payload,
        message: action.message,
      };
    }
    case "SET_SHOWTIME_MESSAGE": {
      return {
        ...state,
        timeData: [],
        errorMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default showtimeReducer;
