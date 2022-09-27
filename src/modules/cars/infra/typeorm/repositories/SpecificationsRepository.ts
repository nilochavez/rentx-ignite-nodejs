import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/specification";
import { IcreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>;

    constructor(){
        this.repository = getRepository(Specification);
    }
    
   async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }

   async create({ name, description }: IcreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
        description,
        name,
    });

    await this.repository.save(specification);

    return specification;

    }

   async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            name,
        });
       
        return specification;
    }


}

export { SpecificationsRepository }