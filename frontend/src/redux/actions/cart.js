import http from "../../helpers/http";

export const cart = (user_id, movie_id) => {
	return async (dispatch) => {
		const params = new URLSearchParams();
		params.append("user_id", user_id);
		params.append("movie_id", movie_id);
		try {
			dispatch({
				type: "SET_CREATE_CART_MESSAGE",
				payload: "",
			});
			const results = await http().post(`addcart-page`, params);
			localStorage.setItem("token", results.data.token);
			dispatch({
				type: "CREATE_CART",
				payload: results.data.token,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: "SET_CREATE_CART_MESSAGE",
				payload: message,
			});
		}
	};
};

export const delete_cart = (user_id, id) => {
	return async (dispatch) => {
		const params = new URLSearchParams();
		console.log("DELETE ID: ", id)
		console.log("USER ID: ", user_id)
		params.append("id", id);
		console.log("params",params.id)
		try {
			dispatch({
				type: "SET_CREATE_CART_MESSAGE",
				payload: "",
			});
			const response = await http().delete(`addcart-page/${user_id}?id=${id}`);
			// localStorage.setItem("token", results.data.token);
			console.log("response.data.results",response.data.results)
			dispatch({
				type: "DELETE_CART",
				payload: response.data.results,
			});
		} catch (err) {
			// const { message } = err.response.data;
			dispatch({
				type: "SET_CREATE_CART_MESSAGE",
				payload: "message",
			});
		}
	};
};


export const getCart = (id) => {
	return async (dispatch) => {
		const response = await http().get(`addcart-page/${id}`);
		console.log("responseresponseresponse: ", response.data.results)
		dispatch({
			type: "GET_CART_DETAIL",
			payload: response.data.results,
		});
		dispatch({
			type: "TOGGLE_CART_LOADING",
		});
	};
};
