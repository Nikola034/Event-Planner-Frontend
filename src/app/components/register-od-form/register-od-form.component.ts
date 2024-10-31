import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'register-od-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule],
  templateUrl: './register-od-form.component.html',
  styleUrl: './register-od-form.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class RegisterOdFormComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  })
  
  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }
}
