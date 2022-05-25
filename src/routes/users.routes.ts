import "reflect-metadata";
import { response, Router } from "express";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import  {CreateCategoryController}  from "../modules/cars/useCases/createCategory/createCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";
import { CreateUserController } from "../modules/accounts/UseCases/createUser/CreateUserControler";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);


export { usersRoutes };