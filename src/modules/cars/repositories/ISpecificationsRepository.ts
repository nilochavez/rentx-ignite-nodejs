import { Specification } from "../entities/specification";


interface IcreateSpecificationDTO {
    name: string;
    description: string;
    
}

interface ISpecificationsRepository{
    create({description, name}: IcreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, IcreateSpecificationDTO }