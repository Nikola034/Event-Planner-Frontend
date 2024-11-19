import { Component, input, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-service-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-service-form.component.html',
  styleUrl: './add-service-form.component.scss'
})
export class AddServiceFormComponent implements OnInit {
  addServiceForm!: FormGroup;
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

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addServiceForm = this.fb.group({
      title: [''],
      description: [''],
      specificity: [''],
      price: [null],
      discount: [null],
      category: [null],
      eventTypes: [[]],
      minDuration: [null],
      maxDuration: [null],
      duration: [null],
      reservationDeadline: [null],
      cancellationDeadline: [null],
      automaticReservation: [null],
      profilePhoto: [null],
    });
  }

  uploadFile($event: any) {
    console.log($event.tartget.files[0]);
  }
}
