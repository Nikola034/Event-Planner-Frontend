import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-register-sp-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule],
  templateUrl: './register-sp-form.component.html',
  styleUrl: './register-sp-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterSpFormComponent {
  selectedPhoto: undefined

  registerForm = new FormGroup({
    company: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
  })
  
  constructor(private router: Router){}

  createAccount(): void{
    this.router.navigate(['']);
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }
}
