import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarListComponent } from './components/car-list/car-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule, CarListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  
}
