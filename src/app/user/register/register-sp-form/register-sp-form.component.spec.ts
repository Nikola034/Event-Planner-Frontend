import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RegisterSpFormComponent } from './register-sp-form.component';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../../infrastructure/auth/jwt.service';
import { PhotoService } from '../../../shared/photos/photo.service';
import { of, throwError } from 'rxjs';
import { RegisterSpDto } from '../../../infrastructure/auth/model/register-dtos/RegisterSp.dto';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { MessageService } from 'primeng/api';
import { UserService } from '../../user.service';
import { RegisterSpResponseDto } from '../../../infrastructure/auth/model/register-dtos/RegisterSpResponse.dto';

describe('RegisterSpFormComponent', () => {
  let component: RegisterSpFormComponent;
  let fixture: ComponentFixture<RegisterSpFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockJwtService: jasmine.SpyObj<JwtService>;
  let mockPhotoService: jasmine.SpyObj<PhotoService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockAdd: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockJwtService = jasmine.createSpyObj('JwtService', ['getRoleFromToken', 'getIdFromToken', 'registerSp', 'Logout']);
    mockPhotoService = jasmine.createSpyObj('PhotoService', ['uploadUserPhoto', 'deleteUserPhoto', 'getPhotoUrl']);
    mockUserService = jasmine.createSpyObj('UserService', ['getAuById']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockAdd = spyOn(MessageService.prototype, 'add').and.callFake((c: any) => {
      console.log(c);
    });

    mockJwtService.getRoleFromToken.and.returnValue('AU');
    mockJwtService.getIdFromToken.and.returnValue(1);
    mockUserService.getAuById.and.returnValue(of({
      id: 1,
      message: 'Success',
      name: 'Test',
      surname: 'User',
      phoneNumber: '1234567890',
      address: { city: 'Test City', street: 'Test Street', number: '123', latitude: 1, longitude: 1 },
      email: 'test@test.com',
      password: 'hashedPassword',
      photo: '',
      role: 1,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token'
    }));

    await TestBed.configureTestingModule({
      imports: [
        RegisterSpFormComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        DialogModule,
        ButtonModule,
        CalendarModule,
        InputNumberModule,
        ListboxModule,
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: JwtService, useValue: mockJwtService },
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: UserService, useValue: mockUserService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterSpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle passwords not matching', fakeAsync(() => {
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      phone: '1234567890',
      email: 'test@test.com',
      password1: 'password123',
      password2: 'differentPassword', // Intentional mismatch
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      latitude: 1,
      longitude: 1,
      company: 'Test Company',
      description: 'Test Description'
    });

    component.registerForm.controls['password1'].markAsTouched();
    component.registerForm.controls['password2'].markAsTouched();

    fixture.detectChanges();

    component.createAccount();
    tick();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Password Mismatch',
      detail: 'Passwords do not match'
    });
  }));

  it('should handle successful registration', fakeAsync(() => {
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      phone: '1234567890',
      email: 'test@test.com',
      password1: 'password123',
      password2: 'password123', // Matching passwords
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      latitude: 1,
      longitude: 1,
      company: 'Test Company',
      description: 'Test Description'
    });

    const expectedDto: RegisterSpDto = {
      name: 'Test',
      surname: 'User',
      phoneNumber: '1234567890',
      email: 'test@test.com',
      password: 'password123',
      role: 'SP',
      photo: null,
      address: {
        city: 'Test City',
        street: 'Test Street',
        number: '123',
        latitude: 1,
        longitude: 1
      },
      company: 'Test Company',
      description: 'Test Description',
      photos: []
    };

    mockJwtService.registerSp.and.returnValue(of({
      id: 1,
      message: 'Success',
      name: 'Test',
      surname: 'User',
      phoneNumber: '1234567890',
      address: { city: 'Test City', street: 'Test Street', number: '123', latitude: 1, longitude: 1 },
      email: 'test@test.com',
      password: 'password123',
      photo: '',
      role: 1,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      company: 'Test Company',
      description: 'Test Description',
      photos: []
    }));

    component.createAccount();
    flush();

    expect(mockJwtService.registerSp).toHaveBeenCalledWith(expectedDto, false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Registration Successful',
      detail: 'Your account has been created successfully!'
    });
  }));

  it('should handle registration failure', fakeAsync(() => {
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      phone: '1234567890',
      email: 'test@test.com',
      password1: 'password123',
      password2: 'password123',
      city: 'Test City',
      street: 'Test Street',
      number: '123',
      latitude: 1,
      longitude: 1,
      company: 'Test Company',
      description: 'Test Description'
    });

    const errorResponse = { error: 'Server error' };

    mockJwtService.registerSp.and.returnValue(throwError(errorResponse));

    component.createAccount();
    flush();

    expect(mockAdd).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Registration Failed',
      detail: 'An error occurred while creating your account. Please try again later.'
    });
  }));

});
