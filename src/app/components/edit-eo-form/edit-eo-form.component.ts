import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-eo-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FileUploadModule, ToastModule],
  templateUrl: './edit-eo-form.component.html',
  styleUrl: './edit-eo-form.component.scss'
})
export class EditEoFormComponent {
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
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]); // outputs the first file
  }
}
