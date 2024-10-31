import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'register-pup-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule],
  templateUrl: './register-pup-form.component.html',
  styleUrl: './register-pup-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterPupFormComponent {
  registerForm = new FormGroup({
    company: new FormControl(''),
    description: new FormControl(''),
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
