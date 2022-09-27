import { CarsRepositoryInMemory } from "@modules/cars/in-memory/CarsRepositoryInMemory";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    
    beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);  
    })

    it("should be able to list all avaible cars", async () =>{
       const car = await carsRepositoryInMemory.create({

        name: "Car1",
        description: "Car Description",
        daily_rate: 110.00,
        license_plate: "DEF-1234",
        fine_amount: 40,
        brand: "Car_brand",
        category_id: "552094a3-6c24-4c7a-96a2-44e6f75dfba2"

        });

        
        const cars = await listAvailableCarsUseCase.execute({
          
        });
        
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
      const car = await carsRepositoryInMemory.create({

        name: "Car2",
        description: "Car Description",
        daily_rate: 110.00,
        license_plate: "DEF-1234",
        fine_amount: 40,
        brand: "Car_brand_test",
        category_id: "552094a3-6c24-4c7a-96a2-44e6f75dfba2"

        });

        const cars = await listAvailableCarsUseCase.execute({
          brand: "Car_brand_test",
        });
        
        expect(cars).toEqual([car]);

    })


    it("should be able to list all available cars by name", async () => {
      const car = await carsRepositoryInMemory.create({

        name: "Car3",
        description: "Car Description",
        daily_rate: 110.00,
        license_plate: "DEF-1235",
        fine_amount: 40,
        brand: "Car_brand_test",
        category_id: "552094a3-6c24-4c7a-96a2-44e6f75dfba2"

        });

        const cars = await listAvailableCarsUseCase.execute({
          name: "Car3",
        });
        
        expect(cars).toEqual([car]);

    })


    it("should be able to list all available cars by category", async () => {
      const car = await carsRepositoryInMemory.create({

        name: "Car3",
        description: "Car Description",
        daily_rate: 110.00,
        license_plate: "DEF-1235",
        fine_amount: 40,
        brand: "Car_brand_test",
        category_id: "12345"

        });

        const cars = await listAvailableCarsUseCase.execute({
          category_id: "12345",
        });
        
        expect(cars).toEqual([car]);

    })

})