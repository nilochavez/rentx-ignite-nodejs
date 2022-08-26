import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface Irequest {
    name: string;
    description: string;

}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){

    }

   async execute({name, description}: Irequest): Promise<void> {

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
        throw new AppError("Category Already exists!");
    }
    
    this.categoriesRepository.create({name, description});

    }


}


export { CreateCategoryUseCase }