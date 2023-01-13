"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRoutes = void 0;
var _express = require("express");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");
var _ensureAdmin = require("../middlewares/ensureAdmin");
const specificationRoutes = (0, _express.Router)();
exports.specificationRoutes = specificationRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
specificationRoutes.use(_ensureAuthenticated.ensureAuthenticated);
specificationRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);