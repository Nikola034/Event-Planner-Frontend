import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-au-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule],
  templateUrl: './edit-au-form.component.html',
  styleUrl: './edit-au-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditAuFormComponent {
  selectedPhoto: undefined

  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
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
    this.router.navigate(['change-password']);
  }
}
