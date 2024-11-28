import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-sp-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule],
  templateUrl: './edit-sp-form.component.html',
  styleUrl: './edit-sp-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditSpFormComponent {
  selectedPhoto: undefined

  registerForm = new FormGroup({
    company: new FormControl({value: '', disabled: true}),
    description: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
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
