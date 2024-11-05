import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [SliderModule,ButtonModule,FormsModule,ReactiveFormsModule,AccordionModule,CheckboxModule,CalendarModule,FloatLabelModule,InputTextModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FiltersComponent {
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      showEvents: [true],
      showServices: [true],
      showProducts: [true],
      events: this.fb.group({
        eventDate: [''],
        type: [''],
        city: ['']
      }),
      services: this.fb.group({
        priceMin: [''],
        priceMax: [''],
        category: [''],
        durationMin: [''],
        durationMax: [''],
        city: ['']
      }),
      products: this.fb.group({
        priceMin: [''],
        priceMax: [''],
        category: [''],
        durationMin: [''],
        durationMax: [''],
        city: ['']
      })
    });
  }

  applyFilters(): void {
    console.log(this.filterForm.value);
  }
}
