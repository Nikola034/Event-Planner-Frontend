import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { JwtService } from '../auth/jwt.service';
import { ChangePasswordDto } from '../auth/update-dtos/register-dtos/ChangePassword.dto';
import { tap } from 'rxjs';

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
  
  userId!: number

  constructor(private router: Router, private jwtService: JwtService, private route: ActivatedRoute){}

  changePassword(): void{
    const id = this.route.snapshot.paramMap.get('id');
      this.userId = id ? Number(id) : -1;

    if(this.registerForm.controls.new1.value != this.registerForm.controls.new2.value){
      //nisu iste 
      return;
    }
    const dto: ChangePasswordDto = {
      oldPassword: this.registerForm.controls.current.value,
      newPassword1: this.registerForm.controls.new1.value,
      newPassword2: this.registerForm.controls.new2.value
    }
    this.jwtService.changePassword(this.userId, dto).pipe(tap(response => {
        this.router.navigate(['home'])
    })).subscribe();
  }
}
