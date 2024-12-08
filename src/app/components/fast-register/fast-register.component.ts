import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JwtService } from '../auth/jwt.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-fast-register',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule,ToastModule],
  templateUrl: './fast-register.component.html',
  styleUrl: './fast-register.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class FastRegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
  })
  
  constructor(private router: Router, private jwtService: JwtService, private messageService: MessageService){}

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
    this.jwtService.fastRegister(login).pipe(tap(
      response => {
        this.jwtService.setTokens(response)
        if(this.jwtService.IsLoggedIn()) {
          this.router.navigate(['home'])
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
