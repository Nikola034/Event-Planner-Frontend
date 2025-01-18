import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RegisterSpDto } from '../../../infrastructure/auth/model/register-dtos/RegisterSp.dto';
import { catchError, of, tap } from 'rxjs';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { PhotoService } from '../../../shared/photos/photo.service';
import { CreateBusinessPhotoDTO, CreateMerchandisePhotoDTO, PhotoToAdd } from '../../../merchandise/merchandise/model/merchandise-photos-request-dto';
import { MapComponent } from '../../../shared/map/map.component';
import { AddressDTO } from '../../../infrastructure/auth/model/register-dtos/address.dto';
import { UserService } from '../../user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register-sp-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule,MapComponent, ToastModule, CommonModule],
  templateUrl: './register-sp-form.component.html',
  styleUrl: './register-sp-form.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class RegisterSpFormComponent {
  selectedPhoto: string | undefined;
  selectedPhotos: string[] | undefined;
  selectedProfilePhoto: string | null = null;
  photosToShow: string[] = [];

  photosToAdd: PhotoToAdd[] = [];
  loadingPhotos: { id: string; loading: boolean }[] = [];

  fbl: FormBuilder = new FormBuilder();


  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl<string | null>(""),
    latitude: new FormControl<number | null>(1),
    longitude: new FormControl<number | null>(1),
    phone: new FormControl(''),
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl(''),
    company: new FormControl(''),
    description: new FormControl(''),
    companyPhotos: this.fbl.array([])
  })

  constructor(private router: Router, private jwtService: JwtService, private photoService: PhotoService, private userService: UserService, private messageService: MessageService){}

  ngOnInit(){
    if(this.jwtService.getRoleFromToken() == 'AU'){
      this.userService.getAuById(this.jwtService.getIdFromToken()).pipe(
        tap(response => {
          this.registerForm.get('email')?.disable();
          this.registerForm.patchValue({
            email: response.email,
          });
        })
      ).subscribe()
    }
  }

  onAddressSelected(address: AddressDTO) {
    this.registerForm.patchValue({
      city: address.city,
      street: address.street,
      number: address.number,
      latitude:address.latitude,
      longitude:address.longitude
    });
  }


  createAccount(): void{
    if(this.registerForm.controls.password1.value != this.registerForm.controls.password2.value){
      // Passwords do not match
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Password Mismatch', 
        detail: 'Passwords do not match' 
      });
      return;
    }

    
    const dto: RegisterSpDto = {
      name: this.registerForm.controls.name.value,
      surname: this.registerForm.controls.surname.value,
      phoneNumber: this.registerForm.controls.phone.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password1.value,
      role: 'SP',
      photo: this.selectedProfilePhoto,
      address: {
        city: this.registerForm.controls.city.value,
        street: this.registerForm.controls.street.value,
        number: this.registerForm.controls.number.value,
        latitude: this.registerForm.controls.latitude.value,
        longitude: this.registerForm.controls.longitude.value,
      },
      company: this.registerForm.controls.company.value,
      description: this.registerForm.controls.description.value,
      photos: this.photosToAdd.map(x => x.id)
    }
    let promotion = false;
    if(this.jwtService.getRoleFromToken() == 'AU'){
      promotion = true;
      this.jwtService.Logout();
    }
    this.jwtService.registerSp(dto, promotion).pipe(
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Registration Failed',
              detail: 'An error occurred while creating your account. Please try again later.',
            });
            return of(null); // Return a fallback observable
          })
        ).subscribe((response) => {
          if (response) {
            this.router.navigate(['home']);
            this.messageService.add({
              severity: 'success',
              summary: 'Registration Successful',
              detail: 'Your account has been created successfully!',
            });
          }
        });
  }

  uploadFile($event: any): void {
    const files = $event.target.files as File[];
    if (files && files.length > 0) {
        const file = files[0];
        const photosArray = this.registerForm.get('companyPhotos') as FormArray;

        // Generate a temporary ID for the loading state
        const tempId = `${file.name}-${Date.now()}`;
        this.loadingPhotos.push({ id: tempId, loading: true });

        // Add a placeholder while the photo uploads
        photosArray.push(this.fbl.group({
            photo: new FormControl(tempId) // Use tempId as a placeholder
        }));
        this.updatePhotosToShow();

        this.photoService.uploadBusinessPhoto(file).pipe(
            tap(response => {
                // Replace the placeholder ID with the real photo URL
                const photoIndex = this.photosToAdd.findIndex(x => x.photo === tempId);
                if (photoIndex !== -1) {
                    this.photosToAdd[photoIndex] = {
                        id: response,
                        photo: file.name
                    };
                } else {
                    this.photosToAdd.push({
                        id: response,
                        photo: file.name
                    });
                }

                // Mark the photo as not loading
                this.loadingPhotos = this.loadingPhotos.filter(x => x.id !== tempId);

                // Update the form array
                const photosArray = this.registerForm.get('companyPhotos') as FormArray;
                const photoControlIndex = photosArray.value.findIndex(
                    (photo: { photo: string }) => photo.photo === tempId
                );
                if (photoControlIndex !== -1) {
                    photosArray.at(photoControlIndex).patchValue({ photo: file.name });
                }

                this.updatePhotosToShow();
            })
        ).subscribe({
            error: () => {
                // Remove the placeholder if the upload fails
                this.loadingPhotos = this.loadingPhotos.filter(x => x.id !== tempId);
                photosArray.removeAt(photosArray.length - 1); // Remove the last added placeholder
                this.updatePhotosToShow();
            }
        });
    }
}

  getPhotoUrl(photo: string): string{
    return this.photoService.getPhotoUrl(photo);
  }

  addPhoto(photoName: string): void {
    const photosArray = this.registerForm.get('companyPhotos') as FormArray;
    photosArray.push(this.fbl.group({
      photo: new FormControl(photoName)
    }));
    this.updatePhotosToShow();
  }

  updatePhotosToShow(): void {
    const photosArray = this.registerForm.get('companyPhotos') as FormArray;
    this.photosToShow = photosArray.value.map((photo: { photo: string }) => {
        const isLoading = this.loadingPhotos.some(x => x.id === photo.photo);
        return isLoading ? 'loading-indicator.png' : this.getPhotoUrl(photo.photo);
    });
}

  removePhoto(index: number): void {
    const photosArray = this.registerForm.get('companyPhotos') as FormArray;

    // Get the photo name from the form array
    const photoUrl = photosArray.at(index).value.photo;
    const photoName = photoUrl.split('/').pop() // extract just the filename without the extension

    // Find the ID of the photo
    const photoId = this.photosToAdd.find(photo => {
      const storedPhotoName = photo.photo.split('/').pop()
      return storedPhotoName === photoName;
    })?.id;

    if (photoId) {
      this.photoService.deleteBusinessPhoto(photoId, -1, false).pipe(
        tap(response => {
          // Success handling here
        })
      ).subscribe();

      // Remove the corresponding photo from photosToAdd
      const photoIndex = this.photosToAdd.findIndex(photo => {
        const storedPhotoName = photo.photo.split('/').pop()
        return storedPhotoName === photoName;
      });
      if (photoIndex !== -1) {
        this.photosToAdd.splice(photoIndex, 1);
      }
      // Remove the photo from the FormArray
      photosArray.removeAt(index);

      // Update the list of photos to show
      this.updatePhotosToShow();
    } else {
      console.log('Photo not found in photosToAdd array');
    }
  }

  uploadProfilePhoto(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.photoService.uploadUserPhoto(file, -1).pipe(
        tap(response => {
          this.selectedProfilePhoto = file.name; // Assuming the server returns the file name
        })
      ).subscribe();
    }
  }

  removeProfilePhoto(): void {
    if (this.selectedProfilePhoto) {
      this.photoService.deleteUserPhoto(-1).pipe(
        tap(() => {
          this.selectedProfilePhoto = null;
        })
      ).subscribe();
    }
  }


  getPhotos(): CreateMerchandisePhotoDTO[] {
    const photosArray = this.registerForm.get('companyPhotos') as FormArray;
    return photosArray.value as CreateMerchandisePhotoDTO[];
  }
}
