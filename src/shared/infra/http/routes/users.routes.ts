import "reflect-metadata";
import { response, Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload"
import { CreateUserController } from "@modules/accounts/UseCases/createUser/CreateUserControler";
import { UpdateUserAvatarController } from "@modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/UseCases/profileUserUseCase/ProfileUserController";


const uploadAvatar = multer(uploadConfig);

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);


usersRoutes.patch(
    "/avatar",
    ensureAuthenticated, 
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);


export { usersRoutes };