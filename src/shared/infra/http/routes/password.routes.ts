

import { SendForgotPassWordMailController } from "@modules/accounts/UseCases/sendForgetPasswordMail/SendForgetPasswordMailController";
import { Router } from "express"


const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgotPassWordMailController;



passwordRoutes.post("/forgot", sendForgetPasswordMailController.handle)



export { passwordRoutes};