
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeOrm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";



interface Irequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;

}

@injectable()
class CreateRentalUseCase {
    
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        
        @inject("DayjsDateProvider")
        private dataProvider: IDateProvider,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
    ){}
    
    
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: Irequest): Promise<Rental>{

        const minimumHour = 24;

        //Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro.
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car is unavailable");
        }

        //Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario.
        const rentalOpenToUser  =  await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!");
        }

        
        //O aluguel deve ter duração minima de 24 horas
        
        const dateNow = this.dataProvider.dateNow();

        const compare = this.dataProvider.compareInHours(dateNow, expected_return_date);

        if(compare < minimumHour){
            throw new AppError("Invalid return time!");
        }




        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;

    };

}

export { CreateRentalUseCase };