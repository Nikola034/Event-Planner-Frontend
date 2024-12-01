import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-send-invitation',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CalendarModule, CheckboxModule, SendInvitationComponent, DialogModule],
  templateUrl: './send-invitation.component.html',
  styleUrl: './send-invitation.component.scss'
})
export class SendInvitationComponent {
  inviteForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inviteForm = this.fb.group({
    email: ['']
  });}
}
