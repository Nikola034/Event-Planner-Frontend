import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventToken } from '../../../infrastructure/auth/model/event-token';
import { DialogModule } from 'primeng/dialog';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  selector: 'app-fast-register',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule,ToastModule,DialogModule,AutoFocusModule],
  templateUrl: './fast-register.component.html',
  styleUrl: './fast-register.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class FastRegisterComponent implements OnInit{
  registerForm = new FormGroup({
    email: new FormControl(''),
  })
  eventToken: EventToken = { eventToken: "" };
  displayErrorDialog = false;
  errorMessage = '';

  constructor(private router: Router, private jwtService: JwtService, private messageService: MessageService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['inviteToken']) {
        this.eventToken = { eventToken: params['inviteToken'] };

      }
    });
    if (this.eventToken.eventToken != ""&&typeof window !== 'undefined' && window.localStorage) {
      this.jwtService.setEventToken(this.eventToken);
      const token = this.jwtService.getEventToken() ?? "";
      const decodedEventToken=this.jwtService.decodeToken(token);
      console.log(decodedEventToken);
      this.registerForm.patchValue({
        email:decodedEventToken.userEmail
      });
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  createAccount(): void{
    if (!this.isValidEmail(this.registerForm.get('email')?.value || '')) {
      this.messageService.add({ severity: 'error', summary: 'Fail', detail: "Invalid email format!" });
      return;
    }
    const login:string=this.registerForm.get('email')?.value || '';
    this.jwtService.fastRegister(login).pipe(
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
