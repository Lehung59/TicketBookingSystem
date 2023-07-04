const initialState = {
	movies: [],
	details: {},
	token: null,
	errorMsg: "",
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CREATE_CART": {
			console.log(3333)
			return {
				...state,
				token: action.payload,
			};
		}
		case "SET_CREATE_CART_MESSAGE": {
			console.log(2222)
			return {
				...state,
				errorMsg: action.payload,
			};
		}
		case "GET_CART_DETAIL": {
			return {
				...state,
				details: action.payload,
			};
		}
		case "DELETE_CART":{
			console.log(44444)
			return{
				...state,
				details: action.payload,
			}
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default cartReducer;