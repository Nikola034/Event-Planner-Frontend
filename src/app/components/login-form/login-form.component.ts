import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router){}

  login() : void{
    this.router.navigate(['home'])
  }
}
