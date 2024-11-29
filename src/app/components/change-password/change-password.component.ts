import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  registerForm = new FormGroup({
    current: new FormControl(''),
    new1: new FormControl(''),
    new2: new FormControl('')
  })
  
  constructor(private router: Router){}

  changePassword(): void{
    this.router.navigate(['']);
  }
}
