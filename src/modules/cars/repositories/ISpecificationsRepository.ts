import { Specification } from "@modules/cars/infra/typeorm/entities/specification";


interface IcreateSpecificationDTO {
    name: string;
    description: string;
    
}

interface ISpecificationsRepository{
    create({description, name}: IcreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, IcreateSpecificationDTO }