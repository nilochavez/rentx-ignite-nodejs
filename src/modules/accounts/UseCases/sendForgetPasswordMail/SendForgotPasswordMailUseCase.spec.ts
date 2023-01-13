import { SendForgotPassWordMailUseCase } from "./SendForgetPasswordMailUseCase";
import {UsersRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

import { AppError } from "@shared/errors/AppError";


let sendForgotPassWordMailUseCase: SendForgotPassWordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;


describe("Send Forgot Mail", () => {

    beforeEach(() =>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory= new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        
        sendForgotPassWordMailUseCase = new SendForgotPassWordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
       const sendMail = jest.spyOn(mailProvider, "sendMail");
        
        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "teste@testemail.com",
            name: "Kakaroto da Silva",
            password: "1234",
        });

        await sendForgotPassWordMailUseCase.execute("teste@testemail.com");

        expect(sendMail).toHaveBeenCalled();

    });

        it("should not be able to send an email if user does not exists", async() => {
            await expect(
                sendForgotPassWordMailUseCase.execute("erro@fr.com")
            ).rejects.toEqual(new AppError("User does not exists!"));
        });
    

        it("should be able to create an users token", async() => {
           const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

           usersRepositoryInMemory.create({
                driver_license: "777890",
                email:"freeza@dbz.com",
                name: "freeza",
                password: "1234",
           });

           await sendForgotPassWordMailUseCase.execute("freeza@dbz.com");

           expect(generateTokenMail).toHaveBeenCalled();

        });

});


