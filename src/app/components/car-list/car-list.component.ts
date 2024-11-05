import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarService, Car } from '../../services/car.service';
import { CarServicesService, CarServiceRecord } from '../../services/carServices.service';
import { Router } from '@angular/router';

// cars [{"brand":"Ford","model":"Mustang","year":2000,"vin":"12345678901234567","id":"2ew5tg3h1"},{"brand":"ford","model":"sigmaedit2","year":2001,"vin":"12345678901234567","id":"wgrllongo"},{"brand":"AUDI","model":"A65","year":2021,"vin":"12345678901234567","id":"dfvho8ysd"},{"brand":"asd","model":"dsa","year":2000,"vin":"12345678901234567","id":"5bmj9asu9","imageId":4},{"brand":"Skibidi","model":"Sigmoza 2gtr","year":2020,"vin":"12345678901234567","id":"gfnud91ar","imageId":4},{"brand":"aaaaaaaaaaaaaaaaaaaaaaaaaaaa","model":"aaaaaaaaaaaaaaaaaaaaaa","year":2000,"vin":"12345678901234567","id":"9eg2wkga8","imageId":3}]
// services [{"id":"6qq6nibm0","carId":"2ew5tg3h1","date":"2024-11-16","parts":[{"name":"Engine","cost":1000}]},{"id":"dy2w3o1th","carId":"dfvho8ysd","date":"2024-11-08","parts":[]},{"id":"alx75puhg","carId":"dfvho8ysd","date":"2024-11-30","parts":[{"name":"asd","cost":1}]},{"id":"3p1w3w5ub","carId":"wgrllongo","date":"2024-11-07","parts":[{"name":"123","cost":11}]},{"id":"557856ezn","carId":"wgrllongo","date":"2024-11-15","parts":[{"name":"engine","cost":4444}]}]

@Component({
    selector: 'app-car-list',
    templateUrl: './car-list.component.html',
    styleUrls: ['./car-list.component.css'],
    imports: [CommonModule],
    standalone: true
})
export class CarListComponent implements OnInit {
    cars: Car[] = []

    constructor(private carService: CarService, private carServicesService: CarServicesService, private router: Router) {}

    ngOnInit(): void {
        this.loadCars()
    }

    loadCars(): void {  
        this.cars = this.carService.getCars()

        //generate some data in first load
        if (this.cars.length === 0){
            console.log("Gerating sample data")
            this.generateData()
            this.cars = this.carService.getCars()
        }
    }
    
    goToDeatails(carId: number): void {
        this.router.navigate(['/cars/', carId])
    }

    goToAddCar(): void {
        this.router.navigate(['/add-car'])
    }

    private getImagePath(car: Car) :string{
        if (car?.imageId){
            return "assets/images/car" + car?.imageId+ ".jpg"
        } else {
            return "assets/images/car1.jpg"
        }
    }



    private generateData(): void{
        localStorage.setItem("cars", JSON.stringify([
            { id: "2ew5tg3h1", brand: "Toyota", model: "Camry", year: 2020, vin: "JT123456789012345", imageId: 1 },
            { id: "wgrllongo", brand: "Honda", model: "Civic", year: 2019, vin: "HG123456789012345", imageId: 3 },
            { id: "dfvho8ysd", brand: "Ford", model: "Mustang", year: 2021, vin: "FM123456789012345", imageId: 4 },
            { id: "3ks9dj2h5", brand: "Chevrolet", model: "Malibu", year: 2018, vin: "CM123456789012345", imageId: 5 },
            { id: "8df3kp7g4", brand: "Nissan", model: "Altima", year: 2022, vin: "NA123456789012345", imageId: 1 },
            { id: "1ht6we2m9", brand: "BMW", model: "3 Series", year: 2021, vin: "BMW12345678901234", imageId: 5 },
            { id: "5jg4tl8p3", brand: "Mercedes", model: "C-Class", year: 2020, vin: "MB123456789012345", imageId: 2 },
            { id: "9bw7fs1j2", brand: "Audi", model: "A4", year: 2019, vin: "AU123456789012345", imageId: 3 },
            { id: "4qp2rh6n5", brand: "Tesla", model: "Model 3", year: 2022, vin: "TS123456789012345", imageId: 4 },
            { id: "7dm1vn3x8", brand: "Volkswagen", model: "Jetta", year: 2020, vin: "VW123456789012345", imageId: 4 }
        ]))
        
        

        this.carServicesService.addServiceRecord({id:"", carId:"2ew5tg3h1", date: "2022-11-07", parts:[{ name: "Brake Pads", cost: 120 },{ name: "Oil Filter", cost: 25 }]})
        this.carServicesService.addServiceRecord({id:"", carId:"2ew5tg3h1", date: "2023-11-07", parts:[{ name: "Air Filter", cost: 30 }]})
        this.carServicesService.addServiceRecord({id:"", carId:"2ew5tg3h1", date: "2024-11-07", parts:[{ name: "Fuel Pump", cost: 200 }, { name: "Spark Plugs", cost: 60 }]})

        this.carServicesService.addServiceRecord({id:"", carId:"wgrllongo", date: "2023-11-07", parts:[{ name: "Battery", cost: 150 },{ name: "Tires", cost: 400 },{ name: "Transmission Fluid", cost: 90 }]})
        this.carServicesService.addServiceRecord({id:"", carId:"wgrllongo", date: "2024-11-07", parts:[{ name: "Alternator", cost: 300 }]})

        this.carServicesService.addServiceRecord({id:"", carId:"dfvho8ysd", date: "2023-02-11", parts:[{ name: "Radiator", cost: 250 }]})
        this.carServicesService.addServiceRecord({id:"", carId:"dfvho8ysd", date: "2024-10-20", parts:[{ name: "Shock Absorbers", cost: 220 }, { name: "Windshield Wipers", cost: 40 }]})
        
        this.carServicesService.addServiceRecord({id:"", carId:"3ks9dj2h5", date: "2021-11-09", parts:[{ name: "Timing Belt", cost: 500 }]})
    }
}