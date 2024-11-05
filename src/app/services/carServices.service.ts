import { Injectable } from '@angular/core';

export interface CarServiceRecord {
    id: string
    carId: string
    date: string
    parts: { name: string, cost: number }[]
}

@Injectable({
    providedIn: 'root'
})
export class CarServicesService{
    private STORAGE_KEY: string = "carsServices"

    constructor() {}

    private getAllServices(): CarServiceRecord[] {
      const services = localStorage.getItem(this.STORAGE_KEY)
      return services ? JSON.parse(services) : []
    }

    private saveAllServiceRecords(records: CarServiceRecord[]): void {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records))
      console.log(this.getAllServices())
    }

    getCarServices(carId: string): CarServiceRecord[] {
      return this.getAllServices().filter(record => record.carId === carId)
    }

    addServiceRecord(serviceRecord: CarServiceRecord): void {
        const records = this.getAllServices()
        serviceRecord.id = this.generateId()
        records.push(serviceRecord)
        this.saveAllServiceRecords(records)

    }

    updateServiceRecord(updatedRecord: CarServiceRecord): void {
        const records = this.getAllServices().map(record =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
        this.saveAllServiceRecords(records)
    }

    deleteServiceRecord(id: string): void {
        const records = this.getAllServices().filter(record => record.id !== id)
        this.saveAllServiceRecords(records)
    }
    deleteAllCarServiceRecords(carId: string): void{
      const records = this.getAllServices().filter(record => record.carId !== carId)
      this.saveAllServiceRecords(records)
    }


    private generateId(): string {
        return Math.random().toString(36).substr(2, 9)
    }
}