import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase"
import { Request, Response } from "express";
import { container } from "tsyringe";



class UpdateUserAvatarController {

    async handle(request: Request , response: Response ) {
        const { id } = request.user;

        const avatar_file = null;

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file})

        return response.status(204).send();

    }



}

export { UpdateUserAvatarController }