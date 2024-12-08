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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-send-invitation',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, MultiSelectModule, RadioButtonModule, ButtonModule, ReactiveFormsModule, CalendarModule, CheckboxModule, DialogModule, ConfirmDialogModule, ToastModule],
  templateUrl: './send-invitation.component.html',
  styleUrl: './send-invitation.component.scss',
  providers: [MessageService]
})
export class SendInvitationComponent {
  inviteForm!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.inviteForm = this.fb.group({
      email: ['']
    });
  }


  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  show() {
    if (this.isValidEmail(this.inviteForm.value.email)) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Invite sent to: " + this.inviteForm.value.email });
      this.inviteForm.reset({email:""});
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Invalid email format!" });
    }
    
  }
}
