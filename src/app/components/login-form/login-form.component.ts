import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent {
  isDialogVisible = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router){}

  showRegisterDialog() : void{
    this.isDialogVisible = true;
  }

  register(role: string): void{
    this.isDialogVisible = false;
    if (role === 'sp') {
      this.router.navigate(['register-sp']);
    } else if (role === 'eo') {
      this.router.navigate(['register-eo']);
    }
  }

  login() : void{
    this.router.navigate(['home'])
  }
}
