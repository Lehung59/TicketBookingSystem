import http from "../../helpers/http";
export const userDetail = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_USER_MESSAGE",
        payload: "",
        message: "",
      });

      // Add Authorization header with JWT token
      const headers = { 'authorization': `Bearer ${token}` };

      const response = await http(token).get("user", { headers });
      localStorage.setItem("token", token);

      dispatch({
        type: "GET_USER",
        payload: response.data.results,
        message: response.data.message,
      });
    } catch (err) {
      const { message } = err.response.data;

      dispatch({
        type: "SET_USER_MESSAGE",
        payload:message,
      });
    }
  };
};

export const updateUser = (token, data, id) => {
  console.log("vua update xong")
  console.log(token)
  return async (dispatch) => {
    const params = new URLSearchParams();

    if (data.firstName) {
      params.append("firstName", data.firstName);
    }
    if (data.lastName) {
      params.append("lastName",data.lastName);
    }
    if (data.phoneNumber) {
      params.append("phoneNumber",data.phoneNumber);
    }
    if (data.picture) {
      params.append("picture", data.picture);
    }
    if (data.email) {
      params.append("email", data.email);
    }
    if (data.password) {
      params.append("password", data.password);
    }
    try {
      dispatch({
        type: "SET_USER_MESSAGE",
        message: "",
      });
      const response = await http(token).patch(`user/${id}`, params);
      dispatch({
        type: "UPDATE_USER",
        payload: response.data.results,
        message: response.data.message,
      });
    } catch (err) {
      const { message } = err.response.data;
      dispatch({
        type: "SET_USER_MESSAGE",
        payload: message,
      });
    }
  };
};
