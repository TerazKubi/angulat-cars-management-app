import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { CarService, Car } from '../../services/car.service';
import { CarServicesService ,CarServiceRecord } from '../../services/carServices.service';

@Component({
    selector: 'app-car-details',
    templateUrl: './car-details.component.html',
    styleUrls: ['./car-details.component.css'],
    imports: [CommonModule, ReactiveFormsModule],
    standalone: true
})
export class CarDetailsComponent implements OnInit {
    carId: string | null = null
    editingServiceId: string | null = null
    showServiceForm: boolean = false

    car: Car | undefined
    services : CarServiceRecord[] | undefined

    serviceForm: FormGroup;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute, 
        private carService: CarService, 
        private carServicesService: CarServicesService,
        private fb: FormBuilder
    ) {
        this.serviceForm = this.fb.group({
            date: ['', Validators.required],
            parts: this.fb.array([])
        })
    }

    ngOnInit(): void {
        this.carId = this.route.snapshot.paramMap.get('carId');  // Get carId from route parameters
        if (this.carId) {
        this.car = this.carService.getCarById(this.carId);  // Fetch car details using carId
        this.services = this.carServicesService.getCarServices(this.carId)
        }
    }

    get parts(): FormArray {
        return this.serviceForm.get('parts') as FormArray
    }
    
    addPart(name: string = '', cost: number | null = null): void {
        const partGroup = this.fb.group({
            name: [name, Validators.required],
            cost: [cost, [Validators.required, Validators.min(0)]]
        });
        this.parts.push(partGroup)
    }
    removePart(index: number): void {
        this.parts.removeAt(index)
    }
    
    deleteService(serviceId: string){
        this.carServicesService.deleteServiceRecord(serviceId)
        this.services = this.carServicesService.getCarServices(this.carId!)
    }

    onSubmit(): void {
        if (this.serviceForm.valid) {
            const serviceRecord: CarServiceRecord = {
                id: this.editingServiceId ? this.editingServiceId : "",
                carId: this.carId!,
                date: this.serviceForm.value.date,
                parts: this.serviceForm.value.parts,         
            }

            if (this.editingServiceId) {
                this.carServicesService.updateServiceRecord(serviceRecord)

                this.services = this.carServicesService.getCarServices(this.carId!)
            } else {
                this.carServicesService.addServiceRecord(serviceRecord)
                this.services = this.carServicesService.getCarServices(this.carId!)
            }
        
            this.serviceForm.reset()
            this.parts.clear()
            this.editingServiceId = null
            this.showServiceForm = false
            this.addPart()           
        }
    }

    goToEditCar(carId: string | null) : void{
        if (carId)
            this.router.navigate(['/edit-car/', carId])
    }

    toggleServiceForm(service: CarServiceRecord | null = null): void {
        if (!this.showServiceForm) window.scrollTo({ top: 0, behavior: 'smooth' })
  
        this.showServiceForm = !this.showServiceForm

        if (service){
            this.editingServiceId = service.id
            this.serviceForm.patchValue({
                date: service.date,
            })

            this.parts.clear()
            service.parts.forEach(part =>  this.addPart(part.name, part.cost))

        } else {
            this.editingServiceId = null
            this.serviceForm.reset()
            this.parts.clear()
            this.addPart()
        }
    }
    deleteCar(id: string): void {
        this.carService.deleteCar(id)
        this.carServicesService.deleteAllCarServiceRecords(id)
        this.router.navigate(['/cars'])
    }

    private getImagePath() :string{
        if (this.car?.imageId){
            return "assets/images/car" + this.car?.imageId+ ".jpg"

        } else {
            return "assets/images/car1.jpg"
        }
    }

}