import { Component, Input, input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { Service } from '../service/service';

@Component({
  selector: 'app-edit-service-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './edit-service-form.component.html',
  styleUrl: './edit-service-form.component.scss'
})
export class EditServiceFormComponent implements OnChanges {
  @Input() serviceData!: Service; 
  editServiceForm: FormGroup; //Deklaracija forme

  constructor() { //inicijalizacija prazne forme
    this.editServiceForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      specificity: new FormControl(''),
      price: new FormControl(null),
      discount: new FormControl(null),
      category: new FormControl(null),
      eventTypes: new FormControl(null),
      minDuration: new FormControl(null),
      maxDuration: new FormControl(null),
      duration: new FormControl(null),
      reservationDeadline: new FormControl(null),
      cancellationDeadline: new FormControl(null),
      automaticReservation: new FormControl(null),
      photo: new FormControl(null),
      visible: new FormControl(false),
      available: new FormControl(false)
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['serviceData'] && changes['serviceData'].currentValue) {
      const data = changes['serviceData'].currentValue;
      data.visible = false;
      this.editServiceForm.patchValue({
        title: data.title || '',
        description: data.description || '',
        specificity: data.specificity || '',
        price: data.price || null,
        discount: data.discount || null,
        category: data.category.title || null,
        eventTypes: data.eventTypes || null,
        minDuration: data.minDuration || null,
        maxDuration: data.maxDuration || null,
        duration: data.maxDuration - data.minDuration || null,
        reservationDeadline: data.reservationDeadline || null,
        cancellationDeadline: data.cancelReservation || null,
        automaticReservation: data.automaticReservation ? 'true' : 'false',
        photo: null,
        visible: data.visible || false,
        available: data.available || false
      })
    }
  }
  categories: string[] = [
    'vanue',
    'food',
    'drinks',
    'decorations',
    'transportation'
  ];
  eventTypes: string[] = [
    'wedding',
    'funeral',
    'birthday',
    'conference'
  ]

  uploadFile($event: any) {
    console.log($event.target.files[0]);
  }
}
