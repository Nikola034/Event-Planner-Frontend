import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { JwtService } from '../auth/jwt.service';
import { LoginDTO } from './login.dto';
import { AuthResponse } from '../auth/auth-response.model';
import { catchError, EMPTY, Observable, takeUntil, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EventToken } from '../auth/event-token';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../photos/photo.service';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule, DialogModule, CommonModule,AutoFocusModule],
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
  displayErrorDialog = false;
  errorMessage = '';
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
      if (this.jwtService.IsLoggedIn()&&this.jwtService.isInviteTokenValid()) {
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

  guest(): void{
    this.router.navigate(['home'])
  }

  login(): void {
    // Validate form before submission
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const login: LoginDTO = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || ''
    };

    this.jwtService.login(login).pipe(
      tap(response => {
        this.jwtService.setTokens(response);

        // Check if logged in and navigate based on role
        if (this.jwtService.IsLoggedIn()) {
          this.router.navigate(['home']);
          //this.navigateBasedOnRole();
        } else {
          this.showErrorDialog('Unable to validate login');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle specific error scenarios
        this.showErrorDialog(this.getErrorMessage(error));
        return EMPTY; // Prevents unhandled error propagation
      })
    ).subscribe();
  }

  private navigateBasedOnRole(): void {
    try {
      if (this.jwtService.IsAdmin()) {
        this.router.navigate(['admin']);
      } else if (this.jwtService.IsEo()) {
        this.router.navigate(['eo']);
      } else if (this.jwtService.IsSp()) {
        this.router.navigate(['sp']);
      } else if (this.jwtService.IsAu()) {
        this.router.navigate(['au']);
      } else {
        this.showErrorDialog('Invalid user role');
      }
    } catch (error) {
      this.showErrorDialog('Navigation error occurred');
    }
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    // Check if error response has a body with a message
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return error.error.message || 'Client-side error occurred';
    } else {
      // Server-side error
      // Try multiple ways to extract the error message
      if (error.error && error.error.message) {
        // Directly from error object
        return error.error.message;
      }
  
      if (error.error && typeof error.error === 'string') {
        // If error is a string message
        return error.error;
      }
  
      if (error.error && error.error.errorMessage) {
        // Alternative error message property
        return error.error.errorMessage;
      }
  
      // Fallback to status text or a generic message
      return error.statusText || 'An unexpected error occurred';
    }
  }

  private showErrorDialog(message: string): void {
    this.errorMessage = message;
    this.displayErrorDialog = true;

    // Optional: Log the error
    console.error('Login Error:', message);
  }

  closeErrorDialog(): void {
    this.displayErrorDialog = false;
    this.errorMessage = '';
  }
}
