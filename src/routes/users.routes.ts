import "reflect-metadata";
import { response, Router } from "express";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import  {CreateCategoryController}  from "../modules/cars/useCases/createCategory/createCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";
import { CreateUserController } from "../modules/accounts/UseCases/createUser/CreateUserControler";
import { UpdateUserAvatarController } from "../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";


const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", updateUserAvatarController.handle);


export { usersRoutes };