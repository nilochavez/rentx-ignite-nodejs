import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

import { SpecificationsRepository } from "../../repositories/implementations/SpecificationRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

interface Irequest {
    name: string;
    description: string;

}

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository){

    }

    async execute({name, description}: Irequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError("Specification already exists!");
        }
    
        await this.specificationsRepository.create({
            name, 
            description});
            
        }


}


export { CreateSpecificationUseCase }