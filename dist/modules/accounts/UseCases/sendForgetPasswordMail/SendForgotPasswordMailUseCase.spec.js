"use strict";

var _SendForgetPasswordMailUseCase = require("./SendForgetPasswordMailUseCase");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");
var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
var _AppError = require("../../../../shared/errors/AppError");
let sendForgotPassWordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPassWordMailUseCase = new _SendForgetPasswordMailUseCase.SendForgotPassWordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "teste@testemail.com",
      name: "Kakaroto da Silva",
      password: "1234"
    });
    await sendForgotPassWordMailUseCase.execute("teste@testemail.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPassWordMailUseCase.execute("erro@fr.com")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "777890",
      email: "freeza@dbz.com",
      name: "freeza",
      password: "1234"
    });
    await sendForgotPassWordMailUseCase.execute("freeza@dbz.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});