"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;
var _SendForgetPasswordMailController = require("../../../../modules/accounts/UseCases/sendForgetPasswordMail/SendForgetPasswordMailController");
var _express = require("express");
const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgetPasswordMailController = new _SendForgetPasswordMailController.SendForgotPassWordMailController();
passwordRoutes.post("/forgot", sendForgetPasswordMailController.handle);