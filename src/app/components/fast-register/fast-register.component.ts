import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-fast-register',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './fast-register.component.html',
  styleUrl: './fast-register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FastRegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
  })
  
  constructor(private router: Router){}

  createAccount(): void{
    this.router.navigate(['']);
  }
}
