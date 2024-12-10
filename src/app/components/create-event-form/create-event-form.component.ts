import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SendInvitationComponent } from "../send-invitation/send-invitation.component";
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CreateEventTypeDTO } from '../create-event-type-form/dtos/create-event-type.dto';

@Component({
  selector: 'app-create-event-form',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CalendarModule, CheckboxModule, SendInvitationComponent, DialogModule],
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
  
  eventTypes: CreateEventTypeDTO[] = []
  services: [] = []
  products: string[] = []
}
