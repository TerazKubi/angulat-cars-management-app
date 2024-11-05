import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import { CarService, Car } from '../../services/car.service';

@Component({
    selector: 'app-car-form',
    templateUrl: './car-form.component.html',
    styleUrls: ['./car-form.component.css'],
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    standalone: true
})
export class CarFormComponent implements OnInit {
    carForm: FormGroup
    carId: string | null = null

    constructor(
        private fb: FormBuilder, private carService: CarService, private router: Router, private route: ActivatedRoute,) {
            this.carForm = this.fb.group({
                brand: ['', Validators.required],
                model: ['', Validators.required],
                year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
                vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]]
            })
        }

    ngOnInit(): void {
        this.carId = this.route.snapshot.paramMap.get('carId')
        if (this.carId) {
            const car = this.carService.getCarById(this.carId)
            if (car) {
                this.carForm.patchValue(car)
            }
        }
    }

    onSubmit() {
        if (this.carForm.valid) {
            const car: Car = this.carForm.value
            if (this.carId) car.id = this.carId
            
            if (this.carId) {
                this.carService.updateCar(car)
            } else {
                this.carService.addCar(car)
            }

            this.router.navigate(['/cars']); // Navigate back to car list
        }
    }
}