import { container, injectable } from "tsyringe";
import { Request, Response } from "express";
import { SendForgotPassWordMailUseCase } from "./SendForgetPasswordMailUseCase";

@injectable()
class SendForgotPassWordMailController {
    async handle(request: Request, response: Response): Promise<Response>{

        const {email} = request.body;

        const sendForgotPassWordMailUseCase = container.resolve(SendForgotPassWordMailUseCase);

        await sendForgotPassWordMailUseCase.execute(email);

        return response.send();
    }

   
}


export { SendForgotPassWordMailController }


