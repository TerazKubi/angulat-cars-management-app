import { Injectable } from '@angular/core';

export interface Car {
    id: string
    brand: string
    model: string
    year: number
    vin: string
    imageId: number | null
    
}

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private STORAGE_KEY: string = "cars"

    getCars(): Car[] {
        const carsData = localStorage.getItem(this.STORAGE_KEY)
        return carsData ? JSON.parse(carsData) : []
    }

    getCarById(id: string): Car | undefined {
        const cars = this.getCars()
        return cars.find(car => car.id === id)
    }

    addCar(car: Car): void {
        const cars = this.getCars()
        car.id = this.generateId()  // Generate a unique ID
        car.imageId = this.generateImageId()
        cars.push(car);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cars))
    }

    updateCar(updatedCar: Car): void {
        const cars = this.getCars();
        const index = cars.findIndex(car => car.id === updatedCar.id)
        if (index !== -1) {
            cars[index] = updatedCar;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cars))
        }
    }
    
    deleteCar(id: string): void {
        const cars = this.getCars().filter(car => car.id !== id)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cars))
    }
    
    private generateId(): string {
        return Math.random().toString(36).substr(2, 9)
    }

    private generateImageId(): number {
        return Math.floor(Math.random() * 5) + 1
    }
}