import { ICreateCarDTO } from "../dtos/IcreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";
import { Category } from "../infra/typeorm/entities/Category";
import { ICarsRepository } from "../repositories/ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
   async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        name,
        license_plate,

    }: ICreateCarDTO): Promise<void> {
       const cars = new Car();

       Object.assign(cars, {
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        name,
        license_plate,
       })

       this.cars.push(cars);
    }
    

}

export { CarsRepositoryInMemory }