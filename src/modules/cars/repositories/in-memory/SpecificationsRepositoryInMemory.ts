import { Specification } from "../../infra/typeorm/entities/specification";
import { IcreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    
    specifications: Specification[] = [];
    
   async create({ description, name }: IcreateSpecificationDTO): Promise<Specification> {
        const specification =  new Specification();

        Object.assign(specification, {
            description, name
        });

     await  this.specifications.push(specification);

     return specification;
    }
   async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specification) => specification.name === name);
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification)=> 
            ids.includes(specification.id)
        )
            return allSpecifications;
        
    }
}

export { SpecificationsRepositoryInMemory }