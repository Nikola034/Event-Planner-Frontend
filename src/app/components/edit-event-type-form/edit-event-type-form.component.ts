import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-edit-event-type-form',
  standalone: true,
  imports: [DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-event-type-form.component.html',
  styleUrl: './edit-event-type-form.component.scss'
})
export class EditEventTypeFormComponent {
  editEventTypeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editEventTypeForm = new FormGroup({
      title: new FormControl({value: '', disabled: true}),
      description: new FormControl('')
    })
  }

  serviceCategories: string[] = [
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
  productCategories: string[] = [
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
