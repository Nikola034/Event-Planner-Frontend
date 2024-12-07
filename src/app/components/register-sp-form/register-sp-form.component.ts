import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RegisterSpDto } from '../auth/register-dtos/RegisterSp.dto';
import { tap } from 'rxjs';
import { JwtService } from '../auth/jwt.service';
@Component({
  selector: 'app-register-sp-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule],
  templateUrl: './register-sp-form.component.html',
  styleUrl: './register-sp-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterSpFormComponent {
  selectedPhoto: string | undefined;
  selectedPhotos: string[] | undefined;

  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl<number | null>(1),
    latitude: new FormControl<number | null>(1),
    longitude: new FormControl<number | null>(1),
    phone: new FormControl(''),
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
    company: new FormControl(''),
    description: new FormControl(''),
  })
  
  constructor(private router: Router, private jwtService: JwtService){}

  createAccount(): void{
    if(this.registerForm.controls.password1.value != this.registerForm.controls.password2.value){
      //nisu iste sifre
      return;
    }
    const dto: RegisterSpDto = {
      name: this.registerForm.controls.name.value,
      surname: this.registerForm.controls.surname.value,
      phoneNumber: this.registerForm.controls.phone.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password1.value,
      photo: this.selectedPhoto,
      role: 'EO',
      address: {
        city: this.registerForm.controls.city.value,
        street: this.registerForm.controls.street.value,
        number: this.registerForm.controls.number.value,
        latitude: this.registerForm.controls.latitude.value,
        longitude: this.registerForm.controls.longitude.value,
      },
      company: this.registerForm.controls.company.value,
      description: this.registerForm.controls.description.value,
      photos: ['s','s']
    }
    this.jwtService.registerSp(dto).pipe(
      tap(response => {
          console.log('ohhhh')
      })
    ).subscribe()
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }
}
