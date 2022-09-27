import { CarsRepositoryInMemory } from "@modules/cars/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {


    beforeEach(() =>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory, 
            specificationRepositoryInMemory
            
        );
        
    });

    it("should not able able to add a new specification to a now_existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({car_id, specifications_id});

        }).rejects.toBeInstanceOf(AppError);
        
    });
    
    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name:":Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        const specification = await specificationRepositoryInMemory.create({
        description: "test",
        name: "teste"
        });
        
        const specifications_id = [specification.id];

       const specificationCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });


        expect(specificationCars).toHaveProperty("specifications")
        expect(specificationCars.specifications.length).toBe(1);
        
    });

});