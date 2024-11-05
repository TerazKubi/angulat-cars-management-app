import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { CarListComponent } from './components/car-list/car-list.component';
import { AppComponent } from './app.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CarDetailsComponent } from './components/car-detail/car-details.component';


export const routes: Routes = [
    { path: '', redirectTo: '/cars', pathMatch: 'full' },
    { path: 'cars', component: CarListComponent },
    { path: 'cars/:carId', component: CarDetailsComponent },
    { path: 'add-car', component: CarFormComponent },
    { path: 'edit-car/:carId', component: CarFormComponent }
];

export const appRoutingProviders = [
    provideRouter(routes)
];