"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPassWordMailController = void 0;
var _tsyringe = require("tsyringe");
var _SendForgetPasswordMailUseCase = require("./SendForgetPasswordMailUseCase");
var _dec, _class;
let SendForgotPassWordMailController = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class SendForgotPassWordMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;
    const sendForgotPassWordMailUseCase = _tsyringe.container.resolve(_SendForgetPasswordMailUseCase.SendForgotPassWordMailUseCase);
    await sendForgotPassWordMailUseCase.execute(email);
    return response.send();
  }
}) || _class);
exports.SendForgotPassWordMailController = SendForgotPassWordMailController;