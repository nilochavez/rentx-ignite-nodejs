
import { IcreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeOrm/entities/Rental"
 
interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data: IcreateRentalDTO): Promise<Rental>;

}

export { IRentalsRepository };