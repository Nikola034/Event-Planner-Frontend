import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-create-event-type-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './create-event-type-form.component.html',
  styleUrl: './create-event-type-form.component.scss'
})
export class CreateEventTypeFormComponent {
  addEventTypeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addEventTypeForm = this.fb.group({
    title: [''],
    description: [''],
  });}

  categories: string[] = [
    'vanue',
    'food',
    'drinks',
    'decorations',
    'transportation',
    'wedding',
    'funeral',
    'birthday',
    'conference',
    'wedding',
    'funeral',
    'birthday',
    'conference',
    'wedding',
    'funeral',
    'birthday',
    'conference'
  ];
  eventTypes: string[] = [
    'wedding',
    'funeral',
    'birthday',
    'conference',
    'wedding',
    'funeral',
    'birthday',
    'conference',
    'wedding',
    'funeral',
    'birthday',
    'conference',
    'wedding',
    'funeral',
    'birthday',
    'conference'
  ]
  
}
