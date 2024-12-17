import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RegisterSpDto } from '../auth/register-dtos/RegisterSp.dto';
import { tap } from 'rxjs';
import { JwtService } from '../auth/jwt.service';
import { PhotoService } from '../photos/photo.service';
import { CreateBusinessPhotoDTO, CreateMerchandisePhotoDTO } from '../merchandise/merchandise-photos-request-dto';
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

  photosToShow: string[] = [];

  photosToAdd: number[] = [];
  fbl: FormBuilder = new FormBuilder();


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
    businessPhotos: this.fbl.array([])
  })
  
  constructor(private router: Router, private jwtService: JwtService, private photoService: PhotoService){}

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
      role: 'SP',
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
          
      })
    ).subscribe()
  }

  uploadFile($event: any): void {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
        const file = files[0]; 

        const photosArray = this.registerForm.get('businessPhotos') as FormArray;

        // Check if the file name already exists in the array
        const existingPhoto = photosArray.value.find((photo: { photo: string }) => photo.photo === file.name);
        
        if (!existingPhoto) {
            this.addPhoto(file.name); 
            this.photoService.uploadBusinessPhoto(file).pipe(tap(response => {
                this.photosToAdd.push(response)
            })).subscribe();
        } else {
            console.log('File already exists, skipping upload.');
        }
    }
}
   
  getPhotoUrl(photo: string): string{
    return this.photoService.getPhotoUrl(photo);
  }

  addPhoto(photoName: string): void {
    const photosArray = this.registerForm.get('businessPhotos') as FormArray;
    photosArray.push(this.fbl.group({
      photo: new FormControl(photoName)
    }));
    this.updatePhotosToShow();
  }

  updatePhotosToShow(): void {
    const photosArray = this.registerForm.get('businessPhotos') as FormArray;
    this.photosToShow = photosArray.value.map((photo: { photo: string }) => photo.photo);
  }

  removePhoto(index: number): void {
    const photosArray = this.registerForm.get('businessPhotos') as FormArray;
    photosArray.removeAt(index);
    this.updatePhotosToShow();
  }

  getPhotos(): CreateBusinessPhotoDTO[] {
    const photosArray = this.registerForm.get('businessPhotos') as FormArray;
    return photosArray.value as CreateBusinessPhotoDTO[];
  }
}
