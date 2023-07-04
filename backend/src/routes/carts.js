const routes = require("express").Router();
const cartController = require("../controllers/cart");
const authMiddleware = require("../middlewares/auth");
const Role = require("../utils/userRoles.utils");
const uploadImage = require("../middlewares/uploadFileMovie");
const validator = require("../middlewares/validator");

routes
  .route("/addcart-page")
  .post(
    // authMiddleware.authCheck,
    // authMiddleware.authRole(Role.Admin),
    // uploadImage,
    cartController.createCart
  )
  .put(
    // authMiddleware.authCheck,
    // authMiddleware.authRole(Role.Admin),
    cartController.createCart
  )
  .get(cartController.listAllCarts);
routes
  .route("/addcart-page/:userid")
  .get(cartController.listCarts)
  .patch(
    authMiddleware.authCheck,
    cartController.updateSeat
  )
  .put(
    authMiddleware.authCheck,
    cartController.updateSeat
  )
  .delete(
    // authMiddleware.authCheck,
    cartController.deleteCart
  );

module.exports = routes;
