const cartModel = require("../models/carts");
const { APP_URL } = process.env;
const status = require("../helpers/Response");
const qs = require("querystring");
const fs = require("fs");


exports.createCart = async (req, res) => {
  const {
    user_id,
    movie_id,
    showtime = "10:00AM-2:00PM",
    price = 12,
    seat = null,
    state= "not paid",
  } = req.body;
	const data = req.body;
  const datalength = 10
  const results2 = await cartModel.getCartByUser(user_id)
  let a = false
  for (let i = 0; i < results2.length; i++) {
    const result2 = results2[i];
    console.log(9, result2.movie_id)
    console.log(movie_id)
    if (result2.movie_id == movie_id) {
      console.log("Đã tìm thấy đối tượng có movie_id = 135");
      a=true;
      break;
    }
  }
    
  if(a===false){
    const results = await cartModel.createCart({
      user_id,
      movie_id,
      showtime ,
      price,
      seat,
      state,
    });
    if (results) {
      return status.ResponseStatus(res, 200, "Genre created successfully", {
        id: results.insertId,
        ...data,
      });
    }
  }
	
};

exports.listAllCarts = async (req, res) => {
	const results = await cartModel.getAllCarts();
	if (results) {
		return status.ResponseStatus(
			res,
			200,
			"List of all Seats",
			results,
		);
	}
};


exports.listCarts = async (req, res) => {
    const { userid } = req.params; // Lấy giá trị id từ params
  
    try {
      const results = await cartModel.getCartByUser(userid);
      console.log(1111);
      if (results.length > 0) {
        return status.ResponseStatus(res, 200, "Details of cart", results);
      } else {
        return status.ResponseStatus(res, 400, "Movie not exists");
      }
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal Server Error");
    }
  };
  


exports.deleteCart = async (req, res) => {
    const { userid } = req.params;
    const { id } = req.query;
    console.log("id", id);
    const results = await cartModel.deleteCartById(id);
    const listCart = await cartModel.getCartByUser(userid);
    if (results) {
        return status.ResponseStatus(
        res,
        200,
        "Data deleted successfully",
        listCart
        );
    }
};
  

exports.updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const finalResult = await cartModel.updateSeat(id,data);
    if (finalResult.affectedRows > 0) {
      return status.ResponseStatus(res, 200, "seat successfully updated", {
        ...data,
      });
    }
    return status.ResponseStatus(res, 400, "Failed to update seat");
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, "Bad Request");
  }
};

exports.updateState = async (req, res) => {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
  
      const finalResult = await cartModel.updateState(id,data);
      if (finalResult.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "state successfully updated", {
          ...data,
        });
      }
      return status.ResponseStatus(res, 400, "Failed to update state");
    } catch (err) {
      console.log(err);
      return status.ResponseStatus(res, 400, "Bad Request");
    }
  };