import { Component, Inject } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { JwtService } from '../auth/jwt.service';
import { LoginDTO } from './login.dto';
import { AuthResponse } from '../auth/auth-response.model';
import { catchError, Observable, takeUntil, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private router: Router, private jwtService: JwtService){}

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
    else if (role === 'au'){
      this.router.navigate(['register-au']);
    }
  }

  login() : void{
    //this.router.navigate(['home'])
    const login: LoginDTO = {
      email: "johnadoe@example.com",
      password: "securepassword123"
    }
    this.jwtService.login(login).pipe(tap(
      response => {
        this.jwtService.setTokens(response)
        if(this.jwtService.IsLoggedIn()) {
          // if(this.jwtService.IsAu()){
          //   this.router.navigate([''])
          // }
          // if(this.jwtService.IsEo()) 
          //   this.router.navigate([''])
          // if(this.jwtService.IsSp()) 
          //   this.router.navigate([''])
          // if(this.jwtService.IsAdmin()) 
          //   this.router.navigate([''])
          // else
          //   this.swal.fireSwalError("Invalid role found in token")
        }
        else
        {
          //this.swal.fireSwalError("An error occured while reading token")
        }
      }
    ), catchError(
      (error: HttpErrorResponse): Observable<any> => {
          return throwError(() => error);
      },
    )).subscribe()
  }
}
