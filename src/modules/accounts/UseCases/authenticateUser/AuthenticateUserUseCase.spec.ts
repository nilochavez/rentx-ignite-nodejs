
import { IcreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"




let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", ()=> {
    beforeEach(() =>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async()=> {
        const user: ICreateUserDTO = {
            driver_license: "00123",
            email:"user@test.com",
            password:"1234",
            name: "User Test"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexist user", () => {

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@test.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
        
    });

    it("should not be able to authenticate with incorret password", () => {

        expect(async () => {
            const user: ICreateUserDTO = {
            driver_license: "9999",
            email:"user@user.com",
            password:"1234",
            name: "User Test Error"
            }
        await createUserUseCase.execute(user);

        await authenticateUserUseCase.execute({
            email: user.email,
            password: "incorretPassword",
        });
    }).rejects.toBeInstanceOf(AppError);

});

})
