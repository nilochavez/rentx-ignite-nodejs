"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _AppError = require("../../../errors/AppError");
var _auth = _interopRequireDefault(require("../../../../config/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    //funcao verify recebe o token e a (chave Token) criada em AuthenticateUserUseCase,
    //para validar
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid token!", 401);
  }
}