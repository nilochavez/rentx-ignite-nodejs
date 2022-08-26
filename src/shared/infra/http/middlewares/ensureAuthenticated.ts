import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";


interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {


    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
       
       //funcao verify recebe o token e a (chave Token) criada em AuthenticateUserUseCase,
       //para validar
        const { sub: user_id } = verify(token, "b4a9ad0d41433925b4320749fb22ddec") as IPayload;
       //sub recebe o id do usuario contido no token
        const usersRepository = new UsersRepository();
       
        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user_id
        }
       
       next();
    } catch {
        throw new AppError("Invalid token!", 401)
    } 
}