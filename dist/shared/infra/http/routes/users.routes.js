"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;
require("reflect-metadata");
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _upload = _interopRequireDefault(require("../../../../config/upload"));
var _CreateUserControler = require("../../../../modules/accounts/UseCases/createUser/CreateUserControler");
var _UpdateUserAvatarController = require("../../../../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
var _ProfileUserController = require("../../../../modules/accounts/UseCases/profileUserUseCase/ProfileUserController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const uploadAvatar = (0, _multer.default)(_upload.default);
const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new _CreateUserControler.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/profile", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);