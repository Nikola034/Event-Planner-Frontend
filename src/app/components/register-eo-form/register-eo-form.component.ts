import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register-eo-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule],
  templateUrl: './register-eo-form.component.html',
  styleUrl: './register-eo-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterEoFormComponent {
  selectedPhoto: undefined

  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  })
  
  constructor(private router: Router){}

  createAccount(): void{
    this.router.navigate(['']);
    console.log('import test')
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }
}
