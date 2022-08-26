import { ICreateCarDTO } from "../dtos/IcreateCarDTO"



interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<void>;

}


export { ICarsRepository }