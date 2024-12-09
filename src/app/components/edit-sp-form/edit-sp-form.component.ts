import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { JwtService } from '../auth/jwt.service';
import { UpdateSpDto } from '../auth/update-dtos/register-dtos/UpdateSp.dto';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-sp-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule],
  templateUrl: './edit-sp-form.component.html',
  styleUrl: './edit-sp-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditSpFormComponent {
  selectedPhoto: string | undefined;
  selectedPhotos: string[] | undefined;

  registerForm = new FormGroup({
    company: new FormControl({value: '', disabled: true}),
    description: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl<number | null>(1),
    latitude: new FormControl<number | null>(1),
    longitude: new FormControl<number | null>(1),
    phone: new FormControl(''),
    email: new FormControl({value: '', disabled: true}),
  })
  constructor(private router: Router, private jwtService: JwtService){}

  editAccount(): void{
    const dto: UpdateSpDto = {
      name: this.registerForm.controls.name.value,
      surname: this.registerForm.controls.surname.value,
      phoneNumber: this.registerForm.controls.phone.value,
      photo: this.selectedPhoto,
      address: {
        city: this.registerForm.controls.city.value,
        street: this.registerForm.controls.street.value,
        number: this.registerForm.controls.number.value,
        latitude: this.registerForm.controls.latitude.value,
        longitude: this.registerForm.controls.longitude.value,
      },
      description: this.registerForm.controls.description.value,
      photos: this.selectedPhotos
    }
    this.jwtService.updateSp(2, dto).pipe(
      tap(response => {
          
      })
    ).subscribe()
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }

  changePassword(): void{
    this.router.navigate(['change-password']);
  }
}
