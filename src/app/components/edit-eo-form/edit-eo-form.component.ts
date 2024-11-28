import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-eo-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule],
  templateUrl: './edit-eo-form.component.html',
  styleUrl: './edit-eo-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditEoFormComponent {
  selectedPhoto: undefined

  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl({value: '', disabled: true}),
  })
  
  constructor(private router: Router){}

  editAccount(): void{
    this.router.navigate(['']);
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }

  changePassword(): void{
    this.router.navigate(['reset-password']);
  }
}
