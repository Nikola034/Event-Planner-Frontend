import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-create-activity-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './create-activity-form.component.html',
  styleUrl: './create-activity-form.component.scss'
})
export class CreateActivityFormComponent {
  addActivityForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addActivityForm = this.fb.group({
    title: [''],
    address: [''],
    description: [''],
    start: [''],
    end: ['']
  });}
}
