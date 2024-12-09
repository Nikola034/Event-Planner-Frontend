import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { JwtService } from '../auth/jwt.service';
import { LoginDTO } from './login.dto';
import { AuthResponse } from '../auth/auth-response.model';
import { catchError, Observable, takeUntil, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EventToken } from '../auth/event-token';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {
  isDialogVisible = false;
  eventToken: EventToken = { eventToken: "" };
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private jwtService: JwtService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['inviteToken']) {
        this.eventToken = { eventToken: params['inviteToken'] };
      }
    });
    if (this.eventToken.eventToken != "" && typeof window !== 'undefined' && window.localStorage) {
      this.jwtService.setEventToken(this.eventToken);
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      if (this.jwtService.IsLoggedIn()) {
        this.router.navigate(['home']);
      }
    }
  }

  showRegisterDialog(): void {
    this.isDialogVisible = true;
  }

  register(role: string): void {
    this.isDialogVisible = false;
    if (role === 'sp') {
      this.router.navigate(['register-sp']);
    } else if (role === 'eo') {
      this.router.navigate(['register-eo']);
    }
    else if (role === 'au') {
      this.router.navigate(['register-au']);
    }
  }

  login(): void {
    const login: LoginDTO = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || ''
    };
    this.jwtService.login(login).pipe(tap(
      response => {
        this.jwtService.setTokens(response)
        if (this.jwtService.IsLoggedIn()) {
          this.router.navigate(['home']);
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
        else {
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
