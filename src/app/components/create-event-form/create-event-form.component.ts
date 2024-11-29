import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-create-event-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CalendarModule, CheckboxModule ],
  templateUrl: './create-event-form.component.html',
  styleUrl: './create-event-form.component.scss'
})
export class CreateEventFormComponent {
  addEventTypeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addEventTypeForm = this.fb.group({
    title: [''],
    description: [''],
    date: [''],
    address: [''],
    maxParticipants: [''],
    public: ['']
  });}
  
  eventTypes: string[] = [
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
  services: string[] = [
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
  products: string[] = [
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
